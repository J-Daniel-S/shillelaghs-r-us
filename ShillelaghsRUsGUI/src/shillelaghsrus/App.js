import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Header from './header/Header';
import Footbar from './navigation/Footbar';
import InStock from './components/inStock/InStock';
import SignInUp from './components/signInRegister/signInUp';
import Account from './components/account/Account';
import Contact from './components/Contact';
import History from './components/History';
import ShillelaghContext from './context/ShillelaghContext';
import Checkout from './components/checkout/Checkout';
import ConfirmModal from './components/ConfirmModal';
import './App.css';

const app = (props) => {
	const [shillelaghs, setShillelaghs] = useState([]);
	const [customer, setCustomer] = useState(null);
	const [cartOpen, setCartOpen] = useState(false);
	const [cartContents, setCartContents] = useState([]);
	const [confirm, setConfirm] = useState(false);
	const [order, setOrder] = useState(null);
	const [ price, setPrice] = useState();
	const [queryNeeded, setQueryNeeded] = useState(false);

	const values = [shillelaghs, setShillelaghs, customer, setCustomer, cartOpen, setCartOpen, cartContents, setCartContents, confirm, setConfirm, order, setOrder, price, setPrice];

	useEffect(() => {
		axios.get('http://localhost:8090/shillelaghs-r-us/shillelaghs/').then(res => {
			setShillelaghs(res.data)
		}
		);
		if (queryNeeded) {
			setQueryNeeded(false)
		}
	}, [queryNeeded]);

	const postOrder = () => {
		let address;
		let theCustomer;

		if (!customer) {
			theCustomer = -1;
		} else {
			theCustomer = customer.id;
		}

		if (!customer) {
			address = "set address";
		} else {
			address = customer.address;
		}

		const theOrder = {
			contents: [...cartContents],
			address: address,
			totalPrice: price
		};

		setOrder(theOrder);

		const headers = {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin': 'localhost:3000/',
			'Access-Control-Allow-Methods': 'POST',
			'Accept': 'application/json, text/plain, */*',
		}

		axios.post('http://localhost:8090/shillelaghs-r-us/orders/' + theCustomer, theOrder, { headers })
			.then(res => {
				if (res.status === 201) {
					alert('order placed!');
					setOrder(null);
					setCartContents([]);
				} else {
					alert('There was a problem.  If the problem persists please contact us');
				}
			});
	}

	const checkoutClicked = () => {
		setConfirm(true);
	}

	const removeFromCart = (index) => {
		const arr = [...cartContents];
		arr.splice(index, 1);
		setCartContents(arr);
	}

	return (
		<main>
			<ShillelaghContext.Provider value={[...values]}>
				<BrowserRouter>
					<Header />

					{window.location.pathname === "/" || window.location.pathname === "/shillelaghs-r-us/" ? <Redirect to="/shillelaghs-r-us/home" /> : null}

					<Route exact path="/shillelaghs-r-us/home" render={() => <InStock removeFromCart={removeFromCart} />} />
					<Route path="/shillelaghs-r-us/sign-in" component={SignInUp} />
					<Route exact path="/shillelaghs-r-us/account" component={Account} />
					<Route exact path="/shillelaghs-r-us/contact" component={Contact} />
					<Route exact path="/shillelaghs-r-us/history" component={History} />
					<Route exact path="/shillelaghs-r-us/checkout" render={() => <Checkout confirm={setConfirm} checkoutClicked={() => checkoutClicked()} removeFromCart={removeFromCart} />} />
					{confirm && <ConfirmModal order={postOrder} refresh={setQueryNeeded} />}

					<Footbar />
				</BrowserRouter>
			</ShillelaghContext.Provider>
		</main>
	);
}

export default app;