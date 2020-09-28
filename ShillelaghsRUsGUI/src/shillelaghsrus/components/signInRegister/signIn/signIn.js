import React, { useContext, useState, useEffect } from 'react';
import { MDBInput, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';
import { Button } from 'react-bootstrap';
import useReactRouter from 'use-react-router';

import ShillelaghContext from '../../../context/ShillelaghContext';

const signIn = (props) => {
	// eslint-disable-next-line
	const [shillelaghs, setShillelaghs, customer, setCustomer] = useContext(ShillelaghContext);
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

		// const credentials = {
		// 	username: username,
		// 	password: password
		// }

		// axios.get('http://localhost:8090/shillelaghs-r-us/customers/name/' + username).then(res => {
		// 	console.log(res)
		// 	if (res.status === 302) {
		// 		setCustomer(res.data);
		// 		if (window.location.pathname === "/shillelaghs-r-us/sign-in") {
		// 			history.push("/shillelaghs-r-us/home");
		// 		} else if (window.location.pathname === "/shillelaghs-r-us/sign-in/checkout") {
		// 			history.push("/shillelaghs-r-us/checkout");
		// 		}
		// 	} else {
		// 		setUsername('');
		// 		setPassword('');
		// 		alert('Customer not found!  Is your username correct?');
		// 	}
		// }
		// );

		fetch(
			'http://localhost:8090/shillelaghs-r-us/customers/name/' + username,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json, text/plain, */*'
				}
			}
		).then(res => {
			if (res.status === 302) {
				res.json().then(res => {
					setCustomer(res);
					if (window.location.pathname === "/shillelaghs-r-us/sign-in") {
						history.push("/shillelaghs-r-us/home");
					} else if (window.location.pathname === "/shillelaghs-r-us/sign-in/checkout") {
						history.push("/shillelaghs-r-us/checkout");
					}
				})
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