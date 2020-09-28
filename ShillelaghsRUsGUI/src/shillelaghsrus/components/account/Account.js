import React, { useContext, useState, useEffect } from 'react';
import { MDBContainer, MDBCard, MDBCardHeader, MDBCardBody, MDBCardFooter, MDBJumbotron, MDBIcon, MDBRow, MDBCol } from 'mdbreact';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import ShillelaghContext from '../../context/ShillelaghContext';
import { Article } from '../styles/Styles';


const account = (props) => {
	// eslint-disable-next-line
	const [shillelaghs, setShillelaghs, customer, setCustomer, cartOpen, setCartOpen, cartContents, setCartContents] = useContext(ShillelaghContext);
	const [orders, setOrders] = useState([]);

	useEffect(() => {

		if (customer) {

			fetch(
				'http://localhost:8090/shillelaghs-r-us/orders/customer/' + customer.id,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json, text/plain, */*'
					}
				}
			).then(res => {
				if (res.status === 302) {
					res.json().then(res => setOrders(res));
				} else {
					setOrders([]);
				}
			});
		}

	}, [customer])

	return (
		<Article>
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
						{customer && orders.length === 0 && <p>No orders yet.  Buy yourself a shillelagh!</p>}
						{orders.length > 0 && <hr></hr>}
						{customer && orders.length > 0 && orders.map(o => (
							<React.Fragment key={o.orderId}>
								<MDBRow>
									<MDBCol size="2">
										Order number: <p>{o.orderId}</p>
									</MDBCol>
									<MDBCol size="4">
										Shipped to: <p>{o.address}</p>
									</MDBCol>
									<MDBCol size="3">
										Total: <p>${o.totalPrice}</p>
									</MDBCol>
									<MDBCol size="3">
										Shillelaghs:
									{o.contents.map(s => <p key={s.shillelaghId}>{s.name}</p>)}
									</MDBCol>
								</MDBRow>
								<MDBRow>
									<MDBCol>
										Payment method: add payment method
									</MDBCol>
								</MDBRow>
								<hr></hr>
							</React.Fragment>
						))}
					</MDBCardBody>
					<MDBCardFooter>
					</MDBCardFooter>
				</MDBCard>
			</MDBContainer>
		</Article>
	);
}

export default account;