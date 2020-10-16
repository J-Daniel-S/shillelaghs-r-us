import React, { useContext, useState, useEffect } from 'react';
import { MDBInput, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';
import { Button } from 'react-bootstrap';
import useReactRouter from 'use-react-router';

import ShillelaghContext from '../../../context/ShillelaghContext';
import { useAuth } from '../../../context/AuthContext';

const signIn = (props) => {
	// eslint-disable-next-line
	const [shillelaghs, setShillelaghs, customer, setCustomer, cartOpen, setCartOpen, cartContents, setCartContents, confirm, setConfirm, order, setOrder, price, setPrice,
		// eslint-disable-next-line
		deleteConfirm, setDeleteConfirm, paymentMethod, setPaymentMethod, address, setAddress, admin, setAdmin] = useContext(ShillelaghContext);
	const { setAuthTokens } = useAuth();
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const { history } = useReactRouter();

	useEffect(() => {
		document.getElementById('focus').focus();
	}, []);

	const changed = input => event => {
		switch (input) {
			case "username":
				setUsername(event.target.value);
				break;
			case "password":
				setPassword(event.target.value);
				break;
			default:
				break;
		}
	}

	const login = (event) => {
		event.preventDefault();

		const login = {
			username: username,
			password: password
		}

		const headers = {
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin': 'localhost:3000/',
			'Access-Control-Allow-Methods': 'POST',
			'Accept': 'application/json, text/plain, */*',
		}

		fetch(
			'http://localhost:8090/shillelaghs-r-us/login',
			{
				method: 'POST',
				headers: headers,
				body: JSON.stringify(login)
			}
		).then(res => {
			if (res.status === 302) {
				res.json().then(res => {
					setCustomer(res.customer);
					setAuthTokens(res.token);
					if (window.location.pathname === "/shillelaghs-r-us/sign-in") {
						history.push("/shillelaghs-r-us/home");
					} else if (window.location.pathname === "/shillelaghs-r-us/sign-in/checkout") {
						history.push("/shillelaghs-r-us/checkout");
					}
				})
			} else if (res.status === 202) {
				res.json().then(res => {
					setAdmin(res.customer);
					setAuthTokens(res.token);
					history.push('/admin');
				})
			} else if (res.status === 409) {
				setPassword('');
				alert('The password entered does not match the password on file');
			} else {
				setUsername('');
				setPassword('');
				alert('Customer not found!  Is your username correct?');
			}
		});
	}

	return (
		<MDBCard>
			<MDBCardBody>
				<form onSubmit={login}>
					<p className="h4 text-center py-4">Welcome back!</p>
					<div className="grey-text">
						<MDBIcon icon="user" />
						<MDBInput
							label="Your username"
							group
							type="text"
							validate
							error="wrong"
							success="right"
							value={username}
							onChange={changed("username")}
							required
							id="focus"
						/>
						<MDBIcon icon="lock" />
						<MDBInput
							label="Your password"
							group
							type="password"
							validate
							value={password}
							onChange={changed("password")}
							required
						/>
					</div>
					<div className="text-center py-4 mt-3">
						<Button variant="brown" type="submit">
							Sign in
                 						</Button>
					</div>
				</form>
			</MDBCardBody>
		</MDBCard>
	);
}

export default signIn;