import React, { useContext } from 'react';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBRow, MDBCol, MDBNavbar } from 'mdbreact';
import { Button } from 'react-bootstrap';
import useReactRouter from 'use-react-router';

import ShillelaghContext from '../../../../context/ShillelaghContext';
import { AButton, Info } from '../../../styles/Styles';

const cartPanel = (props) => {
	// eslint-disable-next-line
	const [ shillelaghs, setShillelaghs, customer, setCustomer, cartOpen, setCartOpen, cartContents, setCartContents ] = useContext(ShillelaghContext);
	const { history } = useReactRouter();

	let Buttons;

	if (customer) {
		Buttons = (
			<Button variant="dark-green" className="float-right" onClick={() => checkout()}>Checkout</Button>
		);
	} else {
		Buttons = (
			<React.Fragment>
				<Button variant="dark-green" className="float-right" onClick={() => checkout()}>Checkout as guest</Button>
				<Button variant="grey" className="float-right" onClick={() => signIn()}>Sign in</Button>
			</React.Fragment>
		);
	}

	const signIn = () => {
		history.push('/shillelaghs-r-us/sign-in');
	}
	
	const checkout = () => {
		history.push('/shillelaghs-r-us/checkout');
	}

	return (
		<MDBCard>
			<MDBCardHeader color="light-green darken-4" />
			<MDBCardBody>
				<p>In cart</p>
				<br></br>
				<ul>
					{cartContents.length === 0 && <li className="list-unstyled">You haven't added anything yet</li>}
					{cartContents && cartContents.map((s, index) => (
						<React.Fragment>
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
				{Buttons}
			</MDBCardBody>
		</MDBCard>
	);
}

export default cartPanel;