import { authentication } from '../firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

function Home() {
	const router = useRouter();

	const {
		query: { name },
	} = router;

	const props = {
		name,
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
			<p>Welcome {props.name} </p>
			<button onClick={logout}>Logout</button>
		</div>
	);
}

export default Home;
