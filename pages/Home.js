import { authentication } from '../firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import Image from 'next/image';

function Home() {
	const router = useRouter();

	const {
		query: { name, photo },
	} = router;

	const props = {
		name,
		photo,
	};

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
				<p>Welcome {props.name} </p>

				<button onClick={logout}>
					<div className="h-14 w-14 relative rounded-lg">
						<Image
							src={props.photo}
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
