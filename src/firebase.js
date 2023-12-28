import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
	apiKey: 'AIzaSyAXTygJensZK1ayGj0DNY5opyEqhzXKhv8',
	authDomain: 'trip-a-peg.firebaseapp.com',
	projectId: 'trip-a-peg',
	storageBucket: 'trip-a-peg.appspot.com',
	messagingSenderId: '54212365817',
	appId: '1:54212365817:web:ff2dd01b1cdd3dba934128',
};

const fb = initializeApp(firebaseConfig);
export const db = getFirestore(fb);
export const storage = getStorage(fb);
