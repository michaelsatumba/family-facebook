import { useEffect, useState } from 'react';
import { authentication, db, storage } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
	addDoc,
	collection,
	getDocs,
	serverTimestamp,
	deleteDoc,
	doc,
	orderBy,
	onSnapshot,
	query,
	updateDoc,
} from 'firebase/firestore';
import {
	ref,
	uploadBytes,
	getDownloadURL,
	listAll,
	list,
} from 'firebase/storage';
import { v4 } from 'uuid';
import { useRouter } from 'next/router';
import Image from 'next/image';

function Home() {
	const router = useRouter();

	const [user, setUser] = useState();
	const [picture, setPicture] = useState();
	const [input, setInput] = useState('');
	const [posts, setPosts] = useState(['hello', 'hi', 'world']);
	const [updateButton, setUpdateButton] = useState('bg-gray-500');

	const colRef = collection(db, 'post');

	const [imageUpload, setImageUpload] = useState(null);

	useEffect(() => {
		onAuthStateChanged(authentication, (user) => {
			if (user) {
				console.log('signed in');
				setUser(user);
				setPicture(
					<Image
						src={user?.photoURL}
						alt="userPhoto"
						layout="fill"
						className="rounded-full"
					/>
				);
			} else {
				console.log('not signed in');
				router.push('/');
			}
		});
	}, []);

	useEffect(() => {
		const q = query(colRef, orderBy('timestamp', 'desc'));
		onSnapshot(q, (snapshot) => {
			let post = [];
			snapshot.docs.forEach((doc) => {
				post.push({ ...doc.data(), id: doc.id });
			});
			setPosts(post);
		});
	}, [db]);

	const logout = () => {
		signOut(authentication)
			.then(() => {
				router.push('/');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const submit = (e) => {
		e.preventDefault();
		addDoc(colRef, {
			text: input,
			author: user.displayName,
			photoURL: user.photoURL,
			timestamp: serverTimestamp(),
		});
		setInput('');
	};

	const remove = (post) => {
		if (user.photoURL == post.photoURL) {
			deleteDoc(doc(db, 'post', post.id));
		}
	};

	const handleUpdate = (post) => {
		if (user.photoURL == post.photoURL) {
			updateDoc(doc(db, 'post', post.id), {
				text: post.text,
				timestamp: serverTimestamp(),
			});
		}
		setCurrentId(null);
	};

	// const handleUpdate = async (e, post) => {
	// 	try {
	// 	  await updateDoc(doc(colRef, post.id), {
	// 		text: post.text,
	// 		timestamp: serverTimestamp(),
	// 	  });
	// 	} catch (e) {
	// 	  console.log(e.message);
	// 	}
	//   };

	//M2: we are mapping through the posts... and in instances where the id matches, copy the other fields and replace text: e.target.value
	// else where id does not match, return copy of the post
	const [currentId, setCurrentId] = useState(null);
	const handleChange = (e, id, post) => {
		if (user.photoURL == post.photoURL) {
			setCurrentId(post.id);
			setPosts((posts) => {
				//(M2) Here
				return posts.map((post) => {
					if (post.id === id) {
						// setUpdateButton('bg-blue-500');
						return {
							...post,
							text: e.target.value,
						};
					} else {
						return {
							...post,
						};
					}
				});
			});
		}
	};

	const incompleteForm = !input;
	// const incompleteUpdate = post.text == post.text;

	// const uploadImage = () => {
	// 	if (imageUpload == null) return;
	// 	const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
	// 	uploadBytes(imageRef, imageUpload).then((snapshot) => {
	// 		getDownloadURL(snapshot.ref).then((url) => {
	// 			setImageUrls((prev) => [...prev, url]);
	// 		});
	// 	});
	// };
	return (
		<div className="min-h-screen bg-gray-900">
			<div className="flex justify-evenly items-center p-3 bg-gray-700">
				<p className="text-white">Welcome {user?.displayName} </p>

				<button onClick={logout}>
					<div className="h-14 w-14 relative rounded-lg">{picture}</div>
				</button>
			</div>

			<form className="flex flex-col items-center p-3 text-white mt-4 bg-gray-700">
				<input
					className="bg-gray-500 rounded-full px-4 py-2"
					value={input}
					placeholder="What's on your mind?"
					type="text"
					onChange={(e) => setInput(e.target.value)}
				/>
				<button
					className={`${
						incompleteForm ? 'bg-gray-500' : 'bg-blue-500'
					} my-2 rounded-md px-40 py-1`}
					disabled={incompleteForm}
					onClick={submit}
				>
					Post
				</button>
				{/* <input
					type="file"
					onChange={(event) => {
						setImageUpload(event.target.files[0]);
					}}
				/>
				<button
					onClick={uploadImage}
					className={`${
						incompleteForm ? 'bg-gray-500' : 'bg-blue-500'
					} my-2 rounded-md px-40 py-1`}
					disabled={incompleteForm}
				>
					Upload Image
				</button> */}
			</form>

			<div className="flex flex-col items-center text-white">
				<div>
					{posts.map((post, id) => (
						<div
							key={id}
							className="bg-gray-700 my-2 w-screen flex flex-col items-center"
						>
							<input
								className="bg-gray-700"
								type="text"
								value={post.text}
								onChange={(e) => handleChange(e, post.id, post)}
							/>
							<p>by {post.author}</p>
							<div className="space-x-2">
								{/* {JSON.stringify(currentId)} */}
								<button
									className={`${
										currentId === post.id ? 'bg-blue-500' : 'bg-gray-500'
									} my-2 rounded-md px-5 py-1`}
									onClick={() => handleUpdate(post)}
									disabled={currentId !== post.id}
								>
									Update
								</button>
								<button
									className={`${
										user?.photoURL == post.photoURL
											? 'bg-red-500'
											: 'bg-gray-500'
									} rounded-md px-5 py-1`}
									onClick={() => remove(post)}
									disabled={user?.photoURL !== post.photoURL}
								>
									Delete
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Home;

// TODO:
// update
