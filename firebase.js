import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDhPazuEj4O0TW9iXmhCzHcj7MUotEtweI',
	authDomain: 'family-facebook.firebaseapp.com',
	projectId: 'family-facebook',
	storageBucket: 'family-facebook.appspot.com',
	messagingSenderId: '429252768209',
	appId: '1:429252768209:web:7bd85af5518f277761b0f0',
};

const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
