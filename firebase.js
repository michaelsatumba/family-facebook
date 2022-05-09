import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

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

export const db = getFirestore();

// const colRef = collection(db, 'post');

// getDocs(colRef).then((snapshot) => {
// 	console.log(snapshot.docs);
// });
