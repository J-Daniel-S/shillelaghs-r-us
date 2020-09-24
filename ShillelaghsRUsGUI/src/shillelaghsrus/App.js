import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Header from './header/Header';
import Footbar from './navigation/Footbar';
import InStock from './components/inStock/InStock';
import SignInUp from './components/signInRegister/signInUp';
import Account from './components/Account';
import Contact from './components/Contact';
import History from './components/History';
import ShillelaghContext from './context/ShillelaghContext';
import './App.css';

const app = (props) => {
	const [ shillelaghs, setShillelaghs ] = useState([]);
	const [ customer, setCustomer ] = useState(null);
	const [ cartOpen, setCartOpen ] = useState(false);
	const [ cartContents, setCartContents ] = useState([]);

	const values = [ shillelaghs, setShillelaghs, customer, setCustomer, cartOpen, setCartOpen, cartContents, setCartContents ];

	useEffect(() => {
		axios.get('http://localhost:8090/shillelaghs-r-us/shillelaghs/').then(res => {
			setShillelaghs(res.data)
		}
		);
	}, []);

	return (
		<main>
			<ShillelaghContext.Provider value={[...values]}>
				<BrowserRouter>
					<Header />

					{window.location.pathname === "/" ? <Redirect to="/shillelaghs-r-us/home" /> : null}

					<Route exact path="/shillelaghs-r-us/home" component={InStock} />
					<Route path="/shillelaghs-r-us/sign-in" component={SignInUp} />
					<Route exact path="/shillelaghs-r-us/account" component={Account} />
					<Route exact path="/shillelaghs-r-us/contact" component={Contact} />
					<Route exact path="/shillelaghs-r-us/history" component={History} />

					<Footbar />
				</BrowserRouter>
			</ShillelaghContext.Provider>
		</main>
	);
}

export default app;