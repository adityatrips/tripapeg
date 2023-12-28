import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

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
				</Routes>
			</div>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
