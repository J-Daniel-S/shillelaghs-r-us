import React, { useContext, useState, useEffect } from 'react';
import { MDBInput, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';
import { Button } from 'react-bootstrap';
import useReactRouter from 'use-react-router';

import ShillelaghContext from '../../../context/ShillelaghContext';

const forgotUsername = (props) => {
	// eslint-disable-next-line
	const [shillelaghs, setShillelaghs, customer, setCustomer] = useContext(ShillelaghContext);
	const [email, setEmail] = useState();
	const { history } = useReactRouter();

	useEffect(() => {
		document.getElementById('focus').focus();
	}, []);

	const changed = input => event => {
		setEmail(event.target.value);
	}

	const submitted = (event) => {
		event.preventDefault();
		alert("You will receive an email with your username shortly");
		history.push("/shillelaghs-r-us/sign-in");
	}

	return (
		<MDBCard>
			<MDBCardBody>
				<form onSubmit={submitted}>
					<p className="h4 text-center py-4">Forgot username</p>
					<div className="grey-text">
						<MDBIcon icon="email" />
						<MDBInput
							label="Your email"
							group
							type="email"
							validate
							error="wrong"
							success="right"
							value={email}
							onChange={changed()}
							required
							id="focus"
						/>
					</div>
					<div className="text-center py-4 mt-3">
						<Button variant="brown" type="submit">
							Submit
                 						</Button>
					</div>
				</form>
			</MDBCardBody>
		</MDBCard>
	);
}

export default forgotUsername;