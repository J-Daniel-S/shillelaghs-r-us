import React, { useEffect, useState, useContext } from 'react';
import { MDBContainer, MDBListGroup, MDBListGroupItem, MDBRow } from 'mdbreact';
import { Button, Form } from 'react-bootstrap';
import useReactRouter from 'use-react-router';

import ShillelaghContext from '../../context/ShillelaghContext';

const adminCustomers = (props) => {
	// eslint-disable-next-line
	const [shillelaghs, setShillelaghs, customer, setCustomer, cartOpen, setCartOpen, cartContents, setCartContents, confirm, setConfirm, order, setOrder, price, setPrice, deleteConfirm,
		// eslint-disable-next-line
		 setDeleteConfirm, paymentMethod, setPaymentMethod, address, setAddress, loggedAdmin, setLoggedAdmin] = useContext(ShillelaghContext);
	const [customers, setCustomers] = useState([]);
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [administrator, setAdministrator] = useState(false);
	const { history } = useReactRouter();

	useEffect(() => {
		if (!loggedAdmin) {
			history.push('/shillelaghs-r-us/home');
		}
		getCustomers();
	}, []);

	const changed = input => event => {
		switch (input) {
			case 'name':
				setName(event.target.value);
				break;
			case 'email':
				setEmail(event.target.value);
				break;
			default:
				break;
		}
	}

	const getCustomers = () => {
		fetch('http://localhost:8090/shillelaghs-r-us/customers')
			.then(res => {
				if (res.status === 302) {
					res.json().then(res => setCustomers(res));
				} else {
					alert('Cannot reach server');
				}
			});
	}


	const goToCustomer = (customer) => {
		setCustomer(customer);
		document.getElementById("adminPage").style.cursor = "wait";
		setTimeout(() => history.push('/admin/customer'), 1000);
	}

	const add = (event) => {
		event.preventDefault();

		const form = event.currentTarget;

		const uName = form.name.value;
		const theEmail = form.email.value;

		const newCustomer = {
			username: uName,
			firstName: uName,
			email: theEmail,
			admin: form.admin.value,
			password: 'welcome!'
		}

		const headers = {
			'Access-Control-Allow-Origin': 'localhost:3000',
			'Content-Type': 'Application/json; charset=utf-8',
			method: 'POST'
		}

		fetch("http://localhost:8090/shillelaghs-r-us/customers", 
			{
				method: 'POST',
				headers: headers,
				body: JSON.stringify(newCustomer)
			}).then(res => {
				if (res.status === 201) {
					getCustomers();
				} else {
					alert("There was a problem creating the account.  If the problem persists please contact us");
				}
			});

	}

	const toggleAdmin = () => {
		if (administrator) {
			setAdministrator(false);
		} else {
			setAdministrator(true);
		}
	}

	return (
		<article id="adminPage">
			<MDBContainer>
				<h4>Add customer</h4>
				<Form onSubmit={add}>
					<Form.Group controlId="name">
						<Form.Label>Username</Form.Label>
						<Form.Control required type="text" value={name} onChange={() => changed("name")} />
					</Form.Group>
					<Form.Group controlId="email">
						<Form.Label>Email</Form.Label>
						<Form.Control required type="email" value={email} onChange={() => changed("email")} />
					</Form.Group>
					<Form.Group controlId="admin">
						<Form.Check type='switch' id="admin" label='Administrator' value={administrator} onChange={toggleAdmin} />
					</Form.Group>
					<Form.Label>The customer's default password will be 'welcome!'</Form.Label>
					<MDBRow>
						<Button variant="grey" type="submit">Add</Button>
					</MDBRow>
				</Form>
			</MDBContainer>
			<hr></hr>
			<MDBContainer fluid>
				<MDBRow>
					<h3>Customers:</h3>
				</MDBRow>
				<MDBListGroup>
					{customers && customers.map(c => ( !c.admin ?
						<MDBListGroupItem key={c.id}>
							User Id: {c.id} | username: {c.username} | Name: {c.firstName} {c.lastName} | Email: {c.email} <Button className="float-right" onClick={() => goToCustomer(c)} variant="grey">View</Button>
						</MDBListGroupItem>: null
					))}
				</MDBListGroup>
				<MDBRow>
					<h3>admins</h3>
				</MDBRow>
				<MDBListGroup>
						{customers && customers.map(c => ( c.admin ?
						<MDBListGroupItem key={c.id}>
							User Id: {c.id} | username: {c.username} | Name: {c.firstName} {c.lastName} | Email: {c.email} <Button className="float-right" onClick={() => goToCustomer(c)} variant="grey">View</Button>
						</MDBListGroupItem>: null
					))}
				</MDBListGroup>
			</MDBContainer>
		</article>
	);
}

export default adminCustomers;