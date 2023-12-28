import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import TripsPage from './pages/TripsPage';
import PlacesSlug from './pages/PlaceSlug';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import axios from 'axios';

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
