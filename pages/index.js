import Head from 'next/head';
import { authentication } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/router';

export default function Home() {
	const router = useRouter();

	const signInWithGoogle = () => {
		// alert('click');
		const provider = new GoogleAuthProvider();
		signInWithPopup(authentication, provider)
			.then((result) => {
				console.log(result);
				router.push('/Home');
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<div>
			<Head>
				<title>Family Facebook</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<p className="flex justify-center text-3xl font-bold">Family Facebook</p>

			<div className="flex justify-center">
				<button className="text-xl font-bold" onClick={signInWithGoogle}>
					Login
				</button>
			</div>
		</div>
	);
}
