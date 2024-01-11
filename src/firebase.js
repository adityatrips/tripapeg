import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCjyMZQilbKlBYzNMiZJKuANvq2yjlt520',
	authDomain: 'tripapeg-website.firebaseapp.com',
	projectId: 'tripapeg-website',
	storageBucket: 'tripapeg-website.appspot.com',
	messagingSenderId: '408956286590',
	appId: '1:408956286590:web:0ac4a0e569f7715335ca2f',
};

const fb = initializeApp(firebaseConfig);
export const db = getFirestore(fb);
