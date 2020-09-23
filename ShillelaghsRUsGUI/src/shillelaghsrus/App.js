import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Header from './header/Header';
import Footbar from './navigation/Footbar';
import InStock from './components/InStock';
import SignInUp from './components/signInRegister/signInUp';
import Account from './components/Account';
import ShillelaghContext from './context/ShillelaghContext';
import './App.css';

const app = (props) => {
	const [shillelaghs, setShillelaghs] = useState([]);

	const values = [shillelaghs, setShillelaghs];

	useEffect(() => {
		axios.get('http://localhost:8090/shillelaghs-r-us/shillelaghs/').then(res => {
			setShillelaghs(res.data)
		}
		);
	}, []);

	return (
		<React.Fragment>
			<ShillelaghContext.Provider value={[...values]}>
				<BrowserRouter>
					<Header />

					{window.location.pathname === "/" ? <Redirect to="/shillelaghs-r-us/home" /> : null}

					<Route exact path="/shillelaghs-r-us/home" component={InStock} />
					<Route exact path="/shillelaghs-r-us/sign-in" component={SignInUp} />
					<Route exact path="/shillelaghs-r-us/account" component={Account}/>

					<Footbar />
				</BrowserRouter>
			</ShillelaghContext.Provider>
		</React.Fragment>
	);
}

export default app;