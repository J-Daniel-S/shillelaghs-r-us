import React, { useContext, useState, useEffect } from 'react';
import { MDBContainer, MDBCardHeader, MDBCardBody, MDBCardFooter, MDBCard, MDBNavbar, MDBCol, MDBRow, MDBIcon } from 'mdbreact';
import { Button, Form } from 'react-bootstrap';
import useReactRouter from 'use-react-router';
import { Redirect } from 'react-router-dom';

import ShillelaghContext from '../context/ShillelaghContext';
import { AButton, Info, Clickable } from './styles/Styles';

const checkout = (props) => {
	// eslint-disable-next-line
	const [shillelaghs, setShillelaghs, customer, setCustomer, cartOpen, setCartOpen, cartContents, setCartContents] = useContext(ShillelaghContext);
	const { history } = useReactRouter();
	const [address, setAddress] = useState();
	const [email, setEmail] = useState();
	const [paymentNum, setPaymentNum] = useState('');
	const [paymentDate, setPaymentDate] = useState('');
	const [paymentConf, setPaymentConf] = useState('');
	const [active, setActive] = useState('');

	useEffect(() => {
		document.getElementById('email').focus();
		console.log('renders');
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
		history.push("/shillelaghs-r-us/sign-in");
	}

	const changed = input => event => {
		switch (input) {
			case 'email':
				setEmail(event.target.value);
				break;
			case 'address':
				setAddress(event.target.value);
				break;
			case 'paymentNum':
				setPaymentNum(event.target.value);
				break;
			case 'paymentDate':
				setPaymentDate(event.target.value);
				break;
			case 'paymentConf':
				setPaymentConf(event.target.value);
				break;
			default:
				break;
		}
	}

	let Subtotal = 0;
	let Shipping = 0;
	let theTotal = 0;

	for (let s of cartContents) {
		Subtotal += Number.parseFloat(s.price);
	}

	if (cartContents.length < 3) {
		Shipping = (6.99 * cartContents.length).toFixed(2);
		theTotal = Number.parseFloat((Subtotal * 1.085) + Shipping).toFixed(2);
		console.log(Shipping);
	} else {
		Shipping = "Free!"
		theTotal = Number.parseFloat(Subtotal * 1.085).toFixed(2);
	}

	return (
		<article style={{ margin: '26vh 0 0 0' }}>
			<MDBContainer>
				<MDBCard>
					<MDBCardHeader>
						<p className="h6 display-6">Checkout</p>
					</MDBCardHeader>
					<MDBCardBody>
						{cartContents.length === 0 && <Redirect to="/shillelaghs-r-us/home" />}
						<ul>
							{cartContents && cartContents.map((s, index) => (
								<React.Fragment key="index">
									<li className="list-unstyled" key={s.shillelaghId}>
										<MDBRow>
											<MDBCol size="9">
												<MDBNavbar color="light-green darken-4 text-white" >
													<MDBRow>
														<Info>{s.name}</Info>
														<Info>${s.price}</Info>
													</MDBRow>
												</MDBNavbar>
											</MDBCol>
											<MDBCol size="3">
												<AButton className="fa fa-times fa-lg" aria-hidden="true" onClick={() => props.removeFromCart(index)}></AButton>
											</MDBCol>
										</MDBRow>
									</li>
									<br></br>
								</React.Fragment>
							))
							}
						</ul>
						<hr></hr>
						<MDBRow>
							<MDBCol>
								<p>Subtotal: ${Subtotal.toFixed(2)}</p>
							</MDBCol>
							<MDBCol>
								<p>Taxes: ${(Subtotal * 0.085).toFixed(2)}</p>
							</MDBCol>
							<MDBCol>
								<p>Shipping: ${Shipping}</p>
							</MDBCol>
							<MDBCol>
								<strong>Total: ${theTotal}</strong>
							</MDBCol>
						</MDBRow>
						<hr></hr>
						<MDBRow>
							<MDBCol md="6">
								<Form id="theForm" onSubmit={checkoutClicked}>
									<MDBIcon far icon="envelope" />
									<Form.Label>
										Your email
										</Form.Label>
									<Form.Group>
										<Form.Control id="email" required type="email" value={email} onChange={() => changed("email")} />
									</Form.Group>
									<br></br>
									<MDBIcon far icon="address-card" />
									<Form.Label>
										Your address
										</Form.Label>
									<Form.Group>
										<Form.Control required type="text" value={address} onChange={() => changed("address")} />
									</Form.Group>
									<br></br>
									<MDBIcon icon="file-invoice-dollar" />
									<Form.Label>
										<span>Payment method  </span>{'   '}
										<Clickable onClick={() => setActive('card')}><MDBIcon far icon="credit-card" /></Clickable>{'  '}
										<Clickable onClick={() => setActive('paypal')}><MDBIcon fab icon="paypal" /></Clickable>{'  '}
										<Clickable onClick={() => setActive('amazon')}><MDBIcon fab icon="amazon-pay" /></Clickable>{'  '}
										<span>: {active}</span>
									</Form.Label>
									{active === "card" && (
										<React.Fragment>
											<Form.Group>
												<Form.Control required type="text" value={paymentNum} onChange={() => changed("paymentNum")} />
											</Form.Group>
											<Form.Group>
												<Form.Control required type="text" value={paymentDate} onChange={() => changed("paymentDate")} />
											</Form.Group>
											<Form.Group>
												<Form.Control required type="text" value={paymentConf} onChange={() => changed("paymentConf")} />
											</Form.Group>
										</React.Fragment>)}
									{active !== "card" && active !== "" && <p><Button variant="brown" onClick={() => {
										alert('logged in to ' + active);
										props.checkoutClicked();
									}
									}>Log in to {active}</Button></p>}
									<br></br>
									<section>
										{!customer && <Button variant="grey" onClick={() => login()}>Sign in</Button>}
										<Button variant="brown" type="submit" >Checkout</Button>
									</section>
								</Form>
							</MDBCol>
						</MDBRow>
					</MDBCardBody>
					<MDBCardFooter>
					</MDBCardFooter>
				</MDBCard>
			</MDBContainer>
		</article >
	);
}

export default checkout;