import React, { useContext, useState, useEffect } from 'react';
import { MDBCol, MDBRow, MDBIcon } from 'mdbreact';
import { Button, Form } from 'react-bootstrap';
import useReactRouter from 'use-react-router';

import ShillelaghContext from '../../../context/ShillelaghContext';
import { Clickable } from '../../styles/Styles';

const guestCheckout = (props) => {
	// eslint-disable-next-line
	const [shillelaghs, setShillelaghs, customer, setCustomer, cartOpen, setCartOpen, cartContents, setCartContents] = useContext(ShillelaghContext);
	const { history } = useReactRouter();
	const [address, setAddress] = useState();
	const [email, setEmail] = useState();
	const [paymentNum, setPaymentNum] = useState();
	const [paymentDate, setPaymentDate] = useState();
	const [paymentConf, setPaymentConf] = useState();
	const [active, setActive] = useState('');

	useEffect(() => {
		document.getElementById('email').focus();
	}, []);

	const checkoutClicked = (event) => {
		event.preventDefault();

		if (active === '') {
			alert('Please select a payment method');
		} else {
			props.checkoutClicked();
		}
	}

	const login = () => {
		history.push("/shillelaghs-r-us/sign-in/checkout");
	}

	const changed = input => event => {
		switch (input) {
			case 'email':
				setEmail(event.target.value);
				break;
			case 'address':
				setAddress(event.target.value);
				break;
			case 'num':
				setPaymentNum(event.target.value);
				break;
			case 'date':
				setPaymentDate(event.target.value);
				break;
			case 'conf':
				setPaymentConf(event.target.value);
				break;
			default:
				break;
		}
	}

	let icon;

	if (active === 'paypal') {
		icon = <MDBIcon fab icon="paypal" />
	} else if (active === 'amazon') {
		icon = <MDBIcon fab icon="amazon-pay" />
	}

	return (
		<React.Fragment>

			<MDBRow>
				<MDBCol md="6">
					<Form id="theForm" onSubmit={checkoutClicked}>
						<p><MDBIcon far icon="envelope" /></p>
						<Form.Label>
							Your email
										</Form.Label>
						<Form.Group>
							<Form.Control id="email" required type="email" value={email} onChange={() => changed("email")} />
						</Form.Group>
						<br></br>
						<p><MDBIcon far icon="address-card" /></p>
						<Form.Label>
							Your address
										</Form.Label>
						<Form.Group>
							<Form.Control required type="text" value={address} onChange={() => changed("address")} />
						</Form.Group>
						<br></br>
						<p><MDBIcon icon="file-invoice-dollar" /></p>
						<Form.Label>
							<span>Payment method  </span>{'   '}
							<Clickable onClick={() => setActive('card')}><MDBIcon far icon="credit-card" /></Clickable>{'  '}
							<Clickable onClick={() => setActive('paypal')}><MDBIcon fab icon="paypal" /></Clickable>{'  '}
							<Clickable onClick={() => setActive('amazon')}><MDBIcon fab icon="amazon-pay" /></Clickable>{'  '}
							<span>: {active}</span>
						</Form.Label>
						{active === "card" &&
							<React.Fragment>
								<Form.Group>
									<Form.Control required type="number" value={paymentNum} onChange={() => changed("num")} />
								</Form.Group>
								<Form.Group>
									<Form.Control required type="date" value={paymentDate} onChange={() => changed("date")} />
								</Form.Group>
								<Form.Group>
									<Form.Control required type="number" value={paymentConf} onChange={() => changed("conf")} />
								</Form.Group>
							</React.Fragment>
						}
						{active !== "card" && active !== "" && <p><Button variant="brown" onClick={() => {
							alert('logged in to ' + active);
							props.checkoutClicked();
						}
						}>Log in to {icon}</Button></p>}
						<br></br>
						<section>
							{!customer && <Button variant="grey" onClick={() => login()}>Sign in</Button>}
							<Button variant="brown" type="submit" >Checkout</Button>
						</section>
					</Form>
				</MDBCol>
			</MDBRow>
		</React.Fragment>
	);
}

export default guestCheckout;