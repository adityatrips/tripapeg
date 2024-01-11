import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import TripsPage from './pages/TripsPage';
import PlacesSlug from './pages/PlaceSlug';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { db } from './firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { notes } from './data';

const App = () => {
	useEffect(() => {
		const docRef = collection(db, `notes`);
		let addData = async () => {
			try {
				for (let i = 0; i < notes.length; i++) {
					const ref = doc(docRef, `${i}`);

					await setDoc(ref, {
						desc: notes[i],
					});
				}
			} catch (e) {
				console.error(e);
			}
		};
		addData();
	}, []);
	return (
		<BrowserRouter>
			<Navbar />
			<div className="px-5">
				<Routes>
					<Route
						path="/"
						element={<HomePage />}
					/>
					<Route
						path="/contact"
						element={<ContactPage />}
					/>
					<Route
						path="/trips"
						element={<TripsPage />}
					/>
					<Route
						path="/place/:id"
						element={<PlacesSlug />}
					/>
				</Routes>
			</div>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
