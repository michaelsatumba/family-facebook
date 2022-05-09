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
	}, []);

	useEffect(() => {
		const q = query(colRef, orderBy('timestamp', 'desc'));
		onSnapshot(q, (snapshot) => {
			let post = [];
			snapshot.docs.forEach((doc) => {
				post.push({ ...doc.data(), id: doc.id });
			});
			console.log(new Date(post[0].timestamp.seconds * 1000).getHours());
			setPosts(post);
		});
	}, [db]);

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

	const remove = async (post) => {
		// alert('remove');
		await deleteDoc(doc(db, 'post', post.id));
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
				{posts.map((post, id) => (
					<div key={id}>
						<p>{post.text}</p>
						<p>by {post.author}</p>
						{/* <p>
							{`${new Date(
								post.timestamp.seconds * 1000
							).getMinutes()}:0${new Date(
								post.timestamp.seconds * 1000
							).getMinutes()}`}{' '}
							minutes ago
						</p> */}

						<button className="bg-red-500" onClick={() => remove(post)}>
							Delete
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default Home;

// TODO:
// update
