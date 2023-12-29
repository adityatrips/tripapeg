import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import EditTrips from './pages/EditTrips';
import PlaceSlug from './pages/PlaceSlug';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<ToastContainer
				position="top-right"
				autoClose={2500}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover={false}
				theme="dark"
			/>
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
