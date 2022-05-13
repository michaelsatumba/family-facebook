import { useEffect, useState } from 'react';
import { authentication, db } from '../firebase';
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
import { useRouter } from 'next/router';
import Image from 'next/image';

function Home() {
	const router = useRouter();

	const [user, setUser] = useState();
	const [picture, setPicture] = useState();
	const [input, setInput] = useState('');
	const [posts, setPosts] = useState(['hello', 'hi', 'world']);
	const [inputTwo, setInputTwo] = useState();

	const colRef = collection(db, 'post');

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

	const remove = async (post) => {
		await deleteDoc(doc(db, 'post', post.id));
	};

	const handleUpdate = async (post) => {
		await updateDoc(
			doc(db, 'post', post.id),
			{
				text: inputTwo,
				timestamp: serverTimestamp(),
			},
			{ merge: true }
		);
	};
	return (
		<div className="">
			<div className="flex justify-evenly items-center ">
				<p>Welcome {user?.displayName} </p>

				<button onClick={logout}>
					<div className="h-14 w-14 relative rounded-lg">{picture}</div>
				</button>
			</div>

			<form className="flex flex-col  items-center">
				<input
					className="bg-red-500"
					value={input}
					type="text"
					onChange={(e) => setInput(e.target.value)}
				/>

				<button className="bg-red-500 my-2" onClick={submit}>
					Post
				</button>
			</form>

			<div className="flex flex-col items-center ">
				<p>Posts</p>
				<div>
					{posts.map((post, id) => (
						<div key={id}>
							{/* <input
								type="text"
								placeholder={post.text}
								value={inputTwo}
								onChange={(e) => setInputTwo(e.target.value)}
							/> */}
							{/* <p>{post.text}</p> */}
							<p>by {post.author}</p>
							<button
								className="bg-blue-500"
								onClick={() => handleUpdate(post)}
							>
								Update
							</button>
							<button className="bg-red-500" onClick={() => remove(post)}>
								Delete
							</button>
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
