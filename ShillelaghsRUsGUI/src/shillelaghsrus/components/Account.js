import React, { useContext } from 'react';
import { MDBContainer, MDBCard, MDBCardHeader, MDBCardBody, MDBCardFooter, MDBJumbotron, MDBIcon } from 'mdbreact';
import { Redirect } from 'react-router-dom';

import ShillelaghContext from '../context/ShillelaghContext';
import { Button } from 'react-bootstrap';

const account = (props) => {
	// eslint-disable-next-line
	const [shillelaghs, setShillelaghs, customer, setCustomer, cartOpen, setCartOpen, cartContents, setCartContents] = useContext(ShillelaghContext);

	return (
		<article style={{ margin: '25vh 0 0 0' }}>
			{!customer && <Redirect to="/shillelaghs-r-us/sign-in" />}
			<MDBContainer>
				<MDBJumbotron>
					<p className="h4 display-4">{customer && customer.username}'s account</p>
				</MDBJumbotron>
				<MDBCard>
					<MDBCardHeader>
						<p><MDBIcon icon="book" /> Information</p>
					</MDBCardHeader>
					<MDBCardBody>{customer &&
						<section>
							<p>Username: {customer.username}</p>
							<p>First name: {customer.firstName}</p>
							<p>Last name: {customer.lastName}</p>
						</section>}
					</MDBCardBody>
					<MDBCardFooter>
						<Button variant="brown" className="float-right" onClick={() => alert("Information updated!")}>Update</Button>
					</MDBCardFooter>
				</MDBCard>
				<br></br>
				<MDBCard>
					<MDBCardHeader>
						<p><MDBIcon icon="address-card" /> Address</p>
					</MDBCardHeader>
					<MDBCardBody>
						<p>{customer && customer.address}</p>
					</MDBCardBody>
					<MDBCardFooter>
						<Button variant="brown" className="float-right" onClick={() => alert("Address updated")}>Update address</Button>
					</MDBCardFooter>
				</MDBCard>
				<br></br>
				<MDBCard>
					<MDBCardHeader>
						<p><MDBIcon icon="dollar-sign" /> Payment information</p>
					</MDBCardHeader>
					<MDBCardBody>
						<MDBIcon fab icon="paypal" />{'  '}
						<MDBIcon fab icon="cc-amazon-pay" />{'  '}
						<MDBIcon fab icon="cc-amex" />{'  '}
						<MDBIcon fab icon="cc-discover" />{'  '}
						<MDBIcon fab icon="cc-visa" />{'  '}
						<MDBIcon fab icon="cc-mastercard" />
						<br></br>
						<br></br>
						<p><MDBIcon far icon="credit-card" /> Credit Cards</p>
						<MDBContainer>
							<section>
								<p><MDBIcon fab icon="cc-amex" /> American Express *****-5697</p>
							</section>
						</MDBContainer>
						<br></br>
						<p><MDBIcon icon="money-check-alt" /> Bank accounts</p>
						<MDBContainer>
							<section>
								<span>Account number: ****-3497 </span> <span className="float-center">Bank: American Bank</span>
							</section>
						</MDBContainer>
						<br></br>
					</MDBCardBody>
					<MDBCardFooter>
						<Button variant="brown" className="float-right" onClick={() => alert("Payment method added!")}>Add payment method</Button>
					</MDBCardFooter>
				</MDBCard>
				<br></br>
				<MDBCard>
					<MDBCardHeader>
						<p><MDBIcon icon="scroll" /> Orders</p>
					</MDBCardHeader>
					<MDBCardBody>
						<p>body</p>
					</MDBCardBody>
					<MDBCardFooter>
						<p className="float-right">footer</p>
					</MDBCardFooter>
				</MDBCard>
			</MDBContainer>
		</article>
	);
}

export default account;