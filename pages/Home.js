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
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import Image from 'next/image';

function Home() {
	const router = useRouter();

	const [user, setUser] = useState();
	const [picture, setPicture] = useState();
	const [input, setInput] = useState('');
	const [posts, setPosts] = useState(['hello', 'hi', 'world']);

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
				// User is signed out
				// ...
				console.log('not signed in');
				router.push('/');
			}
		});

		getDocs(colRef)
			.then((snapshot) => {
				let post = [];
				let ex = [];
				snapshot.docs.forEach((doc) => {
					post.push({ ...doc.data() });
				});
				// snapshot.docs.forEach((doc) => {
				// 	ex.push({ ...doc });
				// });
				// console.log(ex);
				setPosts(post);
			})
			.catch((err) => {
				console.error(err.message);
			});
	}, [input]);

	const logout = () => {
		signOut(authentication)
			.then(() => {
				// alert('signOut');
				router.push('/');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const post = (e) => {
		// alert('post');
		e.preventDefault();
		addDoc(colRef, {
			text: input,
			author: user.displayName,
			timestamp: serverTimestamp(),
		});
		setInput('');
	};

	const remove = (index) => {
		// alert('remove');
		console.log(index);
		// const docRef = doc(db, 'post', '45ZTswNoSp1PdpU06EvL');
		// deleteDoc(docRef).then(() => {
		// 	window.location.reload();
		// });
	};
	return (
		<div>
			<div className="flex justify-evenly">
				<p>Welcome {user?.displayName} </p>

				<button onClick={logout}>
					<div className="h-14 w-14 relative rounded-lg">{picture}</div>
				</button>
			</div>
			<form>
				<input
					className="bg-red-500"
					value={input}
					type="text"
					onChange={(e) => setInput(e.target.value)}
				/>

				<button onClick={post}>Post</button>
			</form>

			<p>posts</p>
			<div>
				{posts.map((post, index) => (
					<div key={index}>
						<p>{post.text}</p>
						<button className="bg-red-500" onClick={remove}>
							Delete
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default Home;
