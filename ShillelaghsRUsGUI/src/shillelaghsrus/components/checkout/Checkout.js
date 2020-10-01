import React, { useContext } from 'react';
import { MDBContainer, MDBCardHeader, MDBCardBody, MDBCardFooter, MDBCard, MDBNavbar, MDBCol, MDBRow } from 'mdbreact';
import { Redirect } from 'react-router-dom';

import ShillelaghContext from '../../context/ShillelaghContext';
import CustomerCheckout from './variants/CustomerCheckout';
import { AButton, Info, Article } from '../styles/Styles';

const checkout = (props) => {
	// eslint-disable-next-line
	const [shillelaghs, setShillelaghs, customer, setCustomer, cartOpen, setCartOpen, cartContents, setCartContents, confirm, setConfirm, order, setOrder, price, setPrice] = useContext(ShillelaghContext);

	let Subtotal = 0;
	let Shipping = 0;
	let theTotal = 0;

	for (let s of cartContents) {
		Subtotal += Number.parseFloat(s.price);
	}

	if (cartContents.length < 3) {
		Shipping = 6.99;
		theTotal = Number.parseFloat((Subtotal * 1.085) + Number.parseFloat(Shipping)).toFixed(2);
		setPrice(theTotal);
	} else {
		Shipping = "Free!"
		theTotal = Number.parseFloat(Subtotal * 1.085).toFixed(2);
		setPrice(theTotal);
	}

	return (
		<Article>
			<MDBContainer>
				<MDBCard>
					<MDBCardHeader>
						<p className="h6 display-6">Checkout</p>
					</MDBCardHeader>
					<MDBCardBody>
						{cartContents.length === 0 && <Redirect to="/shillelaghs-r-us/home" />}
						<ul>
							{cartContents && cartContents.map((s, index) => (
								<React.Fragment key={index}>
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
						{!customer && <Redirect to="/shillelaghs-r-us/sign-in" />}
						{customer && <CustomerCheckout checkoutClicked={props.checkoutClicked} />}
					</MDBCardBody>
					<MDBCardFooter>
					</MDBCardFooter>
				</MDBCard>
			</MDBContainer>
		</Article >
	);
}

export default checkout;