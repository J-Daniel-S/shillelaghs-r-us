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
import InformationModal from './components/account/information/informationModal';
import AddressModal from './components/account/information/addressModal';
import './App.css';

const app = (props) => {
	const [shillelaghs, setShillelaghs] = useState([]);
	const [customer, setCustomer] = useState(null);
	const [cartOpen, setCartOpen] = useState(false);
	const [cartContents, setCartContents] = useState([]);
	const [confirm, setConfirm] = useState(false);
	const [order, setOrder] = useState(null);
	const [price, setPrice] = useState();
	const [queryNeeded, setQueryNeeded] = useState(false);
	const [info, setInfo] = useState(false);
	const [addressModal, setAddressModal] = useState(false);

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
		let theAddress;
		let theCustomer;
		let theEmail;

		if (!customer) {
			theCustomer = -1;
			theAddress = 'implement';
			theEmail = '';
		} else {
			theCustomer = customer.id;
			theAddress = customer.address;
			theEmail = customer.email;
		}

		const theOrder = {
			contents: [...cartContents],
			address: theAddress,
			totalPrice: price,
			email: theEmail
		};

		console.log(theOrder)

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

	const setInformation = () => {
		if (info) {
			setInfo(false);
		} else {
			setInfo(true);
		}
	}

	const postInformation = (event) => {
		const form = event.currentTarget;
		event.preventDefault();

		const fName = form.first.value;
		const lName = form.last.value;
		const email = form.email.value;


		let theFirst = fName;
		let theLast = lName;
		let theEmail = email;

		if (!fName) {
			theFirst = customer.firstName;
		}

		if (!lName) {
			theLast = customer.lastName;
		}

		if (!email) {
			theEmail = customer.email;
		}

		if (!fName && !lName && !email) {
			setInformation();
		} else {

			const theCustomer = customer;

			theCustomer.firstName = theFirst;
			theCustomer.lastName = theLast;
			theCustomer.email = theEmail;

			const headers = {
				'Content-type': 'application/json',
				'Access-Control-Allow-Origin': 'localhost:3000/',
				'Access-Control-Allow-Methods': 'PUT',
				'Accept': 'application/json, text/plain, */*',
			}

			axios.put('http://localhost:8090/shillelaghs-r-us/customers/' + theCustomer.id, theCustomer, { headers }).then(res => {
				if (res.status === 202) {
					setCustomer(res.data);
				} else {
					alert('Customer update failed!  Please contact us if the problem persists');
				}
			});

			setInformation();
		}
	}

	const setAddress = () => {
		if (addressModal) {
			setAddressModal(false);
		} else {
			setAddressModal(true);
		}
	}

	const postAddress = (event) => {
		const form = event.currentTarget;
		event.preventDefault();

		const address = form.address.value;

		if (!address) {
			setAddress();
		} else {
			const theCustomer = customer;

			theCustomer.address = address;

			const headers = {
				'Content-type': 'application/json',
				'Access-Control-Allow-Origin': 'localhost:3000/',
				'Access-Control-Allow-Methods': 'PUT',
				'Accept': 'application/json, text/plain, */*',
			}

			axios.put('http://localhost:8090/shillelaghs-r-us/customers/' + theCustomer.id, theCustomer, { headers }).then(res => {
				if (res.status === 202) {
					setCustomer(res.data);
				} else {
					alert('Customer update failed!  Please contact us if the problem persists');
				}
			});

			setAddress();
		}
	}

	return (
		<main>
			<ShillelaghContext.Provider value={[...values]}>
				<BrowserRouter>
					<Header />

					{window.location.pathname === "/" || window.location.pathname === "/shillelaghs-r-us/" ? <Redirect to="/shillelaghs-r-us/home" /> : null}

					<Route exact path="/shillelaghs-r-us/home" render={() => <InStock removeFromCart={removeFromCart} />} />
					<Route path="/shillelaghs-r-us/sign-in" component={SignInUp} />
					<Route exact path="/shillelaghs-r-us/account" render={() => <Account updateInformation={setInformation} updateAddress={setAddress} />} />
					<Route exact path="/shillelaghs-r-us/contact" component={Contact} />
					<Route exact path="/shillelaghs-r-us/history" component={History} />
					<Route exact path="/shillelaghs-r-us/checkout" render={() => <Checkout confirm={setConfirm} checkoutClicked={() => checkoutClicked()} removeFromCart={removeFromCart} />} />
					{confirm && <ConfirmModal order={postOrder} refresh={setQueryNeeded} />}
					{info && <InformationModal close={setInformation} information={postInformation} info={info} />}
					{addressModal && <AddressModal close={setAddress} address={postAddress} addressModal={addressModal} />}

					<Footbar />
				</BrowserRouter>
			</ShillelaghContext.Provider>
		</main>
	);
}

export default app;