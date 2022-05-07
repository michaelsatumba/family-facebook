import { useEffect, useState } from 'react';
import { authentication } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import Image from 'next/image';

function Home() {

	const router = useRouter();

	const [user, setUser] = useState();

	useEffect(() => {
		onAuthStateChanged(authentication, (user) => {
			if (user) {
			  console.log('signed in');
			  setUser(user)
			} else {
			  // User is signed out
			  // ...
			  console.log('not signed in');
			  router.push('/');
			}
		  });
	  }, []);


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
	return (
		<div>
			<div className="flex justify-evenly">
				<p>Welcome {user?.displayName} </p>

				<button onClick={logout}>
					<div className="h-14 w-14 relative rounded-lg">
						<Image
							src={user?.photoURL}
							alt="userPhoto"
							layout="fill"
							className="rounded-full"
						/>
					</div>
				</button>
			</div>
		</div>
	);
}

export default Home;
