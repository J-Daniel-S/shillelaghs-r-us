import React, { useContext, useState } from 'react';
import { MDBCol, MDBRow, MDBIcon } from 'mdbreact';
import { Button, Form } from 'react-bootstrap';

import ShillelaghContext from '../../../context/ShillelaghContext';
import { Clickable } from '../../styles/Styles';

const customerCheckout = (props) => {
	// eslint-disable-next-line
	const [shillelaghs, setShillelaghs, customer, setCustomer, cartOpen, setCartOpen, cartContents, setCartContents, confirm, 
			// eslint-disable-next-line
		setConfirm, order, setOrder, price, setPrice, deleteConfirm, setDeleteConfirm, paymentMethod, setPaymentMethod, theAddress, setTheAddress] = useContext(ShillelaghContext);
	const [address, setAddress] = useState();
	const [paymentNum, setPaymentNum] = useState();
	const [paymentDate, setPaymentDate] = useState();
	const [paymentConf, setPaymentConf] = useState();
	const [active, setActive] = useState('');
	const [customAddress, setCustomAddress] = useState(false);

	const checkoutClicked = (event) => {
		event.preventDefault();

		if (customAddress) {
			setTheAddress(event.currentTarget.customAddress.value);
		}

		if (!paymentMethod) {
			alert('Please select a payment method');
		} else {
			props.checkoutClicked();
		}
	}

	const changed = input => event => {
		switch (input) {
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

	let icon;

	if (active === 'paypal') {
		icon = <MDBIcon fab icon="paypal" />
	} else if (active === 'amazon') {
		icon = <MDBIcon fab icon="amazon-pay" />
	}

	let tempEmail;
	let tempAddress;
	let toggleMessage;

	if (!customer.email) {
		tempEmail = customer.username;
	} else {
		tempEmail = customer.email;
	}

	if (!customer.address) {
		tempAddress = customer.username;
	} else {
		tempAddress = customer.address;
	}

	if (customAddress) {
		toggleMessage = "Use saved address"
	} else {
		toggleMessage = "Enter alternate address"
	}

	const toggleCustomAddress = () => {
		if (customAddress) {
			setCustomAddress(false);
		} else {
			setCustomAddress(true);
		}
	}

	const lastFour = (num) => {
		let theNum = num.toString();
		theNum = '****-' + theNum.substring(theNum.length - 4, theNum.length);
		return theNum;
	}

	const customerMethods = customer.methods.map((m, index) => m.card ?
			<p key={index}><Button size="sm" variant="grey" onClick={() => {
						setPaymentMethod(m);
					}}>Select</Button>{m.card}    --    {lastFour(m.number)}</p>
		:
			<p key={index}><Button size="sm" variant="grey" onClick={() => {
						setPaymentMethod(m);
					}}>Select</Button>Account number: {lastFour(m.number)}</p>
		

	);

	let method;
	
	if (paymentMethod) {
		method = paymentMethod.card ? <p>Payment method: {paymentMethod.card}    --    {lastFour(paymentMethod.number)}</p> : <p>Payment method: Account number   --   {lastFour(paymentMethod.number)}</p>;
	}

	return (
		<React.Fragment>
			<MDBRow>
				<MDBCol md="6">
					<MDBIcon far icon="envelope" />
					<span><p>Your email: {tempEmail} </p></span>
					<MDBIcon far icon="address-card" />
					<span><p>Your address: {tempAddress} </p>
						<p><Button size="sm" variant="grey" onClick={() => toggleCustomAddress()}>{toggleMessage}</Button></p></span>
					<br></br>
					<Form id="theForm" onSubmit={checkoutClicked}>
						{customAddress &&
							<React.Fragment>
								<Form.Label>
									Ship to
										</Form.Label>
								<Form.Group controlId="customAddress">
									<Form.Control required type="text" value={address} onChange={() => changed("address")} />
								</Form.Group>
								<br></br>
							</React.Fragment>}
						<p><MDBIcon icon="file-invoice-dollar" /></p>
						{!paymentMethod && customerMethods}
						{paymentMethod && method}
						{!paymentMethod && <Form.Label>
							<span>Alternate payment method  </span>{'   '}
							<Clickable onClick={() => setActive('card')}><MDBIcon far icon="credit-card" /></Clickable>{'  '}
							<Clickable onClick={() => setActive('paypal')}><MDBIcon fab icon="paypal" /></Clickable>{'  '}
							<Clickable onClick={() => setActive('amazon')}><MDBIcon fab icon="amazon-pay" /></Clickable>{'  '}
							<span>: {active}</span>
							<hr></hr>
						</Form.Label>}
						{active === "card" && !paymentMethod && (
							<React.Fragment>
								<Form.Group>
									<Form.Label>Card number</Form.Label>
									<Form.Control required type="number" value={paymentNum} onChange={() => changed("paymentNum")} />
								</Form.Group>
								<Form.Group>
									<Form.Label>Expiration date</Form.Label>
									<Form.Control required type="date" value={paymentDate} onChange={() => changed("paymentDate")} />
								</Form.Group>
								<Form.Group>
									<Form.Label>Confirmation number</Form.Label>
									<Form.Control required type="number" max="9999" value={paymentConf} onChange={() => changed("paymentConf")} />
								</Form.Group>
							</React.Fragment>)}
						{active !== "card" && active !== "" && active !== "customer" && <p><Button variant="brown" onClick={() => {
							alert('logged in to ' + active);
							props.checkoutClicked();
						}
						}>Log in to {icon}</Button></p>}
						<br></br>
						<section>
							<Button variant="brown" type="submit" >Checkout</Button>
						</section>
					</Form>
				</MDBCol>
			</MDBRow>
		</React.Fragment>
	);
}

export default customerCheckout;