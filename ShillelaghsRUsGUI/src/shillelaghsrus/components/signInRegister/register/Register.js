import React, { useState, useContext, useEffect } from 'react';
import { MDBInput, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';
import { Button } from 'react-bootstrap';
import useReactRouter from 'use-react-router';

import ShillelaghContext from '../../../context/ShillelaghContext';

const register = (props) => {
	// eslint-disable-next-line
	const [shillelaghs, setShillelaghs, customer, setCustomer] = useContext(ShillelaghContext);
	const [uName, setUName] = useState("");
	const [fName, setFName] = useState("");
	const [lName, setLName] = useState("");
	const [email, setEmail] = useState("");
	const [cEmail, setCEmail] = useState("");
	const [address, setAddress] = useState("");
	const [password, setPassword] = useState("");
	const [cPassword, setCPassword] = useState("");
	const { history } = useReactRouter();

	useEffect(() => {
		document.getElementById('focus').focus();
	}, []);

	const changed = input => event => {
		switch (input) {
			case "uName":
				setUName(event.target.value);
				break;
			case "fName":
				setFName(event.target.value);
				break;
			case "lName":
				setLName(event.target.value);
				break;
			case "email":
				setEmail(event.target.value);
				break;
			case "cEmail":
				setCEmail(event.target.value);
				break;
			case "address":
				setAddress(event.target.value);
				break;
			case "password":
				setPassword(event.target.value);
				break;
			case "cPassword":
				setCPassword(event.target.value);
				break;
			default:
				break;
		}
	}

	const submitted = (event) => {
		event.preventDefault();

		if (cEmail !== email) {
			alert("The emails provided don't match");
			setEmail("");
			setCEmail("");
		} else if (cPassword !== password) {
			alert("The passwords provided don't match");
			setCPassword("");
			setPassword("");
		} else {

		const customer = {
			username: uName,
			firstName: fName,
			lastName: lName,
			address: address,
			email: email,
			password: password
		}

		const headers = {
			'Access-Control-Allow-Origin': 'localhost:3000',
			'Content-Type': 'Application/json',
			method: 'POST'
		}

		fetch("http://localhost:8090/shillelaghs-r-us/customers", 
			{
				method: 'POST',
				headers: headers,
				body: JSON.stringify(customer)
			}).then(res => {
				if (res.status === 201) {
					res.json().then(res => {
						setCustomer(res);
						history.push("/shillelaghs-r-us/home");
					});
				} else {
					alert("There was a problem creating your account.  If the problem persists please contact us");
				}
			});
		}
	}

	return (
		<MDBCard>
			<MDBCardBody>
				<form onSubmit={submitted}>
					<p className="h4 text-center py-4">Sign up</p>
					<section className="grey-text">
						<MDBIcon icon="user" />
						<MDBInput
							label="Your username"
							group
							type="text"
							validate
							error="wrong"
							success="right"
							value={uName}
							onChange={changed("uName")}
							required
							id="focus"
						/>
						<MDBInput
							label="Your first name"
							group
							type="text"
							validate
							error="wrong"
							success="right"
							value={fName}
							onChange={changed("fName")}
							required
						/>
						<MDBInput
							label="Your last name"
							group
							type="text"
							validate
							error="wrong"
							success="right"
							value={lName}
							onChange={changed("lName")}
							required
						/>
						<MDBIcon icon="envelope" />
						<MDBInput
							label="Your email"
							group
							type="email"
							validate
							error="wrong"
							success="right"
							value={email}
							onChange={changed("email")}
							required
						/>
						<MDBInput
							label="Confirm your email"
							group
							type="text"
							validate
							error="wrong"
							success="right"
							value={cEmail}
							onChange={changed("cEmail")}
							required
						/>
						<MDBIcon icon="address-card" />
						<MDBInput
							label="Your address"
							group
							type="text"
							validate
							error="wrong"
							success="right"
							value={address}
							onChange={changed("address")}
							required
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
						<MDBInput
							label="Confirm your password"
							group
							type="password"
							validate
							value={cPassword}
							onChange={changed("cPassword")}
							required
						/>
					</section>
					<section className="text-center py-4 mt-3">
						<Button variant="brown" type="submit">
							Register
                 						</Button>
					</section>
				</form>
			</MDBCardBody>
		</MDBCard>
	);
}

export default register;