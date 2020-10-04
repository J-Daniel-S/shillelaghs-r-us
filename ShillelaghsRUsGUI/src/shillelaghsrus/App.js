import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Header from './header/Header';
import AdminNavbar from './navigation/AdminNavbar';
import Footbar from './navigation/Footbar';
import InStock from './components/inStock/InStock';
import SignInUp from './components/signInRegister/signInUp';
import Account from './components/account/Account';
import Contact from './components/Contact';
import History from './components/History';
import CustomerPage from './components/admin/CustomerPage';
import AdminStock from './components/admin/adminStock';
import AdminCustomers from './components/admin/AdminCustomers';
import ShillelaghContext from './context/ShillelaghContext';
import Checkout from './components/checkout/Checkout';
import ConfirmModal from './components/ConfirmModal';
import InformationModal from './components/account/information/informationModal';
import AddressModal from './components/account/information/addressModal';
import PaymentModal from './components/account/information/paymentModal';
import DeleteModal from './components/deleteModal';
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
	const [paymentModal, setPaymentModal] = useState(false);
	const [deleteConfirm, setDeleteConfirm] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState(null);
	const [address, setAddress] = useState(null);
	const [admin, setAdmin] = useState(null);

	const values = [shillelaghs, setShillelaghs, customer, setCustomer, cartOpen, setCartOpen, cartContents, setCartContents,
		 confirm, setConfirm, order, setOrder, price, setPrice, deleteConfirm, setDeleteConfirm, paymentMethod, setPaymentMethod, address, setAddress, admin, setAdmin];

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

		if (address) {
			theAddress = address;
		} else {
			theAddress = customer.address;
		}

		const theOrder = {
			contents: [...cartContents],
			address: theAddress,
			totalPrice: price,
			email: customer.email
		};

		setOrder(theOrder);

		const headers = {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin': 'localhost:3000/',
			'Access-Control-Allow-Methods': 'POST',
			'Accept': 'application/json, text/plain, */*',
		}

		axios.post('http://localhost:8090/shillelaghs-r-us/orders/' + customer.id, theOrder, { headers })
			.then(res => {
				if (res.status === 201) {
					alert('order placed!');
					setOrder(null);
					setCartContents([]);
					setAddress(null)
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

	const toggleAddress = () => {
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
			toggleAddress();
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

			toggleAddress();
		}
	}

	const togglePaymentMethod = () => {
		if (paymentModal) {
			setPaymentModal(false);
		} else {
			setPaymentModal(true);
		}
	}

	const postPaymentMethod = (event) => {
		event.preventDefault();

		const form = event.currentTarget;
		togglePaymentMethod();

		const number = form.number.value;
		let body;
		let card;

		if (form.cardSelect) {

			if (form.cardSelect.value === 'American express') {
				card = 'AMERICANEXPRESS'
			} else {
				card = form.cardSelect.value;
			}

			body = {
				type: 'CREDIT',
				card: card.toUpperCase(),
				number: number,
				confirmationNumber: form.confirmation.value,
				expirationDate: form.expiry.value
			}

		} else {
			body = {
				type: 'BANKACCOUNT',
				number: number,
				routingNumber: form.routing.value
			}
		}

		const headers = {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin': 'localhost:3000/',
			'Access-Control-Allow-Methods': 'POST',
			'Accept': 'application/json, text/plain, */*',
		}

		axios.post('http://localhost:8090/shillelaghs-r-us/payment/' + customer.id, body, { headers }).then(res => {
			if (res.status === 202) {
				setCustomer(res.data);
			} else {
				alert('Payment method not added!  Please contact us if the problem persists');
			}
		});
	}

	const toggleDelete = () => {
		if (deleteConfirm) {
			setDeleteConfirm(false);
		} else {
			setDeleteConfirm(true);
		}
	}

	const deletePaymentMethod = () => {
		toggleDelete();

		axios.delete('http://localhost:8090/shillelaghs-r-us/payment/' + customer.id + '/' + paymentMethod.id).then(res => {
			if (res.status === 202) {
				setCustomer(res.data);
			} else {
				alert('Payment method not deleted!  Please contact us if the problem persists');
			}
		})
	}

	const ship = (o) => {

		const headers = {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin': 'localhost:3000/',
			'Access-Control-Allow-Methods': 'PUT',
			'Accept': 'application/json, text/plain, */*'
		}

		fetch(
			'http://localhost:8090/shillelaghs-r-us/orders/' + customer.id + '/' + o.orderId,
			{
				method: 'PUT',
				headers: headers
			}
		).then(res => {
			if (res.status === 302) {
				res.json().then(res => setCustomer(res));
			} else {
				alert('Shipping failed');
			}
		})

	}

	const deleteOrder = (o) => {
		const headers = {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin': 'localhost:3000/',
			'Access-Control-Allow-Methods': 'PUT',
			'Accept': 'application/json, text/plain, */*'
		}

		fetch(
			'http://localhost:8090/shillelaghs-r-us/orders/' + customer.id + '/' + o.orderId,
			{
				method: 'DELETE',
				headers: headers
			}
		).then(res => {
			if (res.status === 202) {
				res.json().then(res => setCustomer(res));
			} else {
				alert('Delete order failed');
			}
		})
	}

	return (
		<main>
			<ShillelaghContext.Provider value={[...values]}>
				<BrowserRouter>
					<Route path="/shillelaghs-r-us" component={Header} />
					<Route path="/admin" component={AdminNavbar} />

					{window.location.pathname === "/" || window.location.pathname === "/shillelaghs-r-us/" ? <Redirect to="/shillelaghs-r-us/home" /> : null}
					{window.location.pathname === "/shillelaghs-r-us/admin" ? <Redirect to="/admin" /> : null}

					<Route exact path="/shillelaghs-r-us/home" render={() => <InStock removeFromCart={removeFromCart} />} />
					<Route path="/shillelaghs-r-us/sign-in" component={SignInUp} />
					<Route exact path="/shillelaghs-r-us/account" render={() =>
						<Account
							updateInformation={setInformation}
							updateAddress={toggleAddress}
							addPaymentMethod={togglePaymentMethod}
							deletePaymentMethod={deletePaymentMethod}
							toggleDelete={toggleDelete} />}
					/>
					<Route exact path="/shillelaghs-r-us/contact" component={Contact} />
					<Route exact path="/shillelaghs-r-us/history" component={History} />
					<Route exact path="/shillelaghs-r-us/checkout" render={() => <Checkout confirm={setConfirm} checkoutClicked={checkoutClicked} removeFromCart={removeFromCart} />} />
					<Route exact path="/admin/customers" render={() => <AdminCustomers />} />
					<Route exact path="/admin/stock" render={() => <AdminStock />} />
					<Route exact path="/admin/customer" render={() =>
						<CustomerPage
							updateInformation={setInformation}
							updateAddress={toggleAddress}
							addPaymentMethod={togglePaymentMethod}
							deletePaymentMethod={deletePaymentMethod}
							toggleDelete={toggleDelete}
							ship={ship}
							deleteOrder={deleteOrder} />}
					/>
					{confirm && <ConfirmModal order={postOrder} refresh={setQueryNeeded} />}
					{info && <InformationModal close={setInformation} information={postInformation} info={info} />}
					{addressModal && <AddressModal close={toggleAddress} address={postAddress} addressModal={addressModal} />}
					{paymentModal && <PaymentModal close={togglePaymentMethod} payment={postPaymentMethod} paymentModal={paymentModal} />}
					{deleteConfirm && <DeleteModal close={toggleDelete} delete={deletePaymentMethod} />}

					<Route path="/shillelaghs-r-us" component={Footbar} />
				</BrowserRouter>
			</ShillelaghContext.Provider>
		</main>
	);
}

export default app;