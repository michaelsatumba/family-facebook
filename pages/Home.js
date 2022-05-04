import { useEffect, useState } from 'react';
import { authentication } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import Image from 'next/image';

function Home() {
	// const [user, setUser] = useState(null);
	const router = useRouter();

	const user = authentication.currentUser;

	if (user) {
		console.log('signed in');
		// console.log(user);
		// router.push('/');
	} else {
		console.log('not signed in');
		// router.push('/');
	}

	// const {
	// 	query: { name, photo },
	// } = router;

	// const props = {
	// 	name,
	// 	photo,
	// };

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
				{/* <p>Welcome {props.name} </p>

				<button onClick={logout}>
					<div className="h-14 w-14 relative rounded-lg">
						<Image
							src={props.photo}
							alt="userPhoto"
							layout="fill"
							className="rounded-full"
						/>
					</div>
				</button> */}
			</div>
		</div>
	);
}

export default Home;
