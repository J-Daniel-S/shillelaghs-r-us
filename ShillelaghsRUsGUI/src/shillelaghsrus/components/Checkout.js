import React, { useContext } from 'react';
import { MDBContainer, MDBCardHeader, MDBCardBody, MDBCardFooter, MDBCard, MDBNavbar, MDBCol, MDBRow } from 'mdbreact';
import { Button } from 'react-bootstrap';
import useReactRouter from 'use-react-router';
import { Redirect } from 'react-router-dom';

import ShillelaghContext from '../context/ShillelaghContext';
import { AButton, Info } from './styles/Styles';

const checkout = (props) => {
	// eslint-disable-next-line
	const [shillelaghs, setShillelaghs, customer, setCustomer, cartOpen, setCartOpen, cartContents, setCartContents] = useContext(ShillelaghContext);
	const { history } = useReactRouter();

	const checkoutClicked = () => {
		props.checkoutClicked();
	}

	const login = () => {
		history.push("/shillelaghs-r-us/sign-in");
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
					</MDBCardBody>
					<MDBCardFooter>
						<section className="float-right">
							{!customer && <Button variant="grey" onClick={() => login()}>Sign in</Button>}
							<Button variant="brown" onClick={() => checkoutClicked()}>Checkout</Button>
						</section>
					</MDBCardFooter>
				</MDBCard>
			</MDBContainer>
		</article>
	);
}

export default checkout;