import React, { useContext, useState, useEffect } from 'react';
import { MDBContainer, MDBCard, MDBCardHeader, MDBCardBody, MDBCardFooter, MDBJumbotron, MDBIcon, MDBRow, MDBCol } from 'mdbreact';
import { Button } from 'react-bootstrap';
import useReactRouter from 'use-react-router';

import ShillelaghContext from '../../context/ShillelaghContext';
import { AButton } from '../styles/Styles';


const customerPage = (props) => {
	// eslint-disable-next-line
	const [shillelaghs, setShillelaghs, customer, setCustomer, cartOpen, setCartOpen, cartContents, setCartContents,
		// eslint-disable-next-line
		confirm, setConfirm, order, setOrder, price, setPrice, deleteConfirm, setDeleteConfirm, paymentMethod, setPaymentMethod] = useContext(ShillelaghContext);
	const [orders, setOrders] = useState([]);
	const { history } = useReactRouter()

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
		} else {
			history.push('/shillelaghs-r-us/admin');
		}

	}, [customer])

	const lastFour = (num) => {
		let theNum = num.toString();
		theNum = '****-' + theNum.substring(theNum.length - 4, theNum.length);
		return theNum;
	}

	const deleteAdmin = () => {
		alert('delete admin');
	}

	return (
		<MDBContainer>
			<MDBJumbotron>
				<p className="h4 display-4">{customer && customer.firstName}'s account</p>
			</MDBJumbotron>
			<MDBCard>
				<MDBCardHeader>
					<p><MDBIcon icon="book" /> Information</p>
				</MDBCardHeader>
				<MDBCardBody>{customer &&
					<section>
						{customer.admin && <h2 className="float-center"><strong>Administrator</strong></h2>}
						<p>Username: {customer.username}</p>
						<p>First name: {customer.firstName}</p>
						<p>Last name: {customer.lastName}</p>
						<p>Email: {customer.email}</p>
					</section>}
				</MDBCardBody>
				<MDBCardFooter>
					<Button variant="brown" onClick={() => props.updateInformation()}>Update</Button>
					{customer && customer.admin && <Button variant="grey" onClick={() => deleteAdmin()}>Delete administrator account</Button>}
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
					<Button variant="brown" className="float-right" onClick={() => props.updateAddress()}>Update address</Button>
				</MDBCardFooter>
			</MDBCard>
			<br></br>
			{customer && !customer.admin && <MDBCard>
				<MDBCardHeader>
					<p>Payment methods</p>
				</MDBCardHeader>
				<MDBCardBody>
					<br></br>
					<MDBContainer>
						<section>
							{customer && customer.methods.length > 0 && customer.methods.map((m, index) =>
								m.card ?

									<p key={index}>{m.card}    --    {lastFour(m.number)}
										<span className="float-right">
											<AButton className="fa fa-times fa-lg" aria-hidden="true" onClick={() => {
												setPaymentMethod(m);
												props.toggleDelete();
											}}></AButton></span></p>
									:
									<p key={index}>Account number: {lastFour(m.number)}    |    Routing number: {lastFour(m.routingNumber)}<span className="float-right">
										<AButton className="fa fa-times fa-lg" aria-hidden="true" onClick={() => {
											setPaymentMethod(m);
											props.toggleDelete();
										}}></AButton></span></p>
							)}
						</section>
					</MDBContainer>
					<br></br>
				</MDBCardBody>
				<MDBCardFooter>
					<Button variant="brown" className="float-right" onClick={() => props.addPaymentMethod()}>Add payment method</Button>
				</MDBCardFooter>
			</MDBCard>}
			<br></br>
			{customer && !customer.admin &&
			<MDBCard>
				<MDBCardHeader>
					<p>Orders</p>
				</MDBCardHeader>
				<MDBCardBody>
					{customer && orders.length === 0 && <p>No orders placed yet</p>}
					{orders.length > 0 && <hr></hr>}
					{customer && orders.length > 0 && orders.map((o, index) => (
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
									Shipped: {o.shipped ? 'Shipped' : <Button variant="brown" onClick={() => props.ship(o)}>Ship</Button>}
								</MDBCol>
								<MDBCol>
									{!o.shipped && <Button variant="grey" onClick={() => props.deleteOrder(o)}>Cancel order</Button>}
								</MDBCol>
							</MDBRow>
							<hr></hr>
						</React.Fragment>
					))}
				</MDBCardBody>
				<MDBCardFooter>
				</MDBCardFooter>
			</MDBCard>}
		</MDBContainer>
	);
}

export default customerPage;