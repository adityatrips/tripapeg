import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import EditTrips from './pages/EditTrips';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import PlaceSlug from './pages/PlaceSlug';

const App = () => {
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
						path="/edit-trips"
						element={<EditTrips />}
					/>
					<Route
						path="/place/:id"
						element={<PlaceSlug />}
					/>
				</Routes>
			</div>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
