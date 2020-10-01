import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { MDBInput, MDBBreadcrumb, MDBBreadcrumbItem } from 'mdbreact';
import { Toggle } from '../../styles/Styles';

const paymentModal = (props) => {
	const [number, setNumber] = useState();
	const [routingNumber, setRoutingNumber] = useState();
	const [confirmationNumber, setConfNumber] = useState();
	const [expDate, setExpDate] = useState();
	const [bankAccount, setBankAccount] = useState(false);

	useEffect(() => {

	}, []);

	const changed = input => event => {
		switch (input) {
			case 'number':
				setNumber(event.target.value);
				break;
			case 'routing':
				setRoutingNumber(event.target.value);
				break;
			case 'confirmation':
				setConfNumber(event.target.value);
				break;
			case 'expiry':
				setExpDate(event.target.value);
				break;
			default:
				break;
		}
	}

	let theForm;

	if (bankAccount) {
		theForm =
			<div className="grey-text">
				<MDBInput
					label="Bank account number"
					group
					type="number"
					validate
					error="wrong"
					success="right"
					value={number}
					onChange={() => changed("number")}
					id="number"
					required
				/>
				<MDBInput
					label="Routing number"
					group
					type="number"
					validate
					value={routingNumber}
					onChange={() => changed("routing")}
					id="routing"
					required
				/>
			</div>
	} else {
		theForm =
			<div className="grey-text">
				<Form.Group controlId="cardSelect">
					<Form.Label>Card type</Form.Label>
					<Form.Control as="select">
						<option>Mastercard</option>
						<option>Visa</option>
						<option>American express</option>
						<option>Discover</option>
					</Form.Control>
				</Form.Group>
				<MDBInput
					label="Credit card number"
					group
					type="number"
					validate
					error="wrong"
					success="right"
					value={number}
					onChange={() => changed("number")}
					id="number"
					required
				/>
				<MDBInput
					label="3 - 4 digit confirmation"
					group
					type="number"
					validate
					value={confirmationNumber}
					onChange={() => changed("confirmation")}
					id="confirmation"
					max="9999"
					required
				/>
				<MDBInput
					label="Expiration date"
					group
					type="date"
					validate
					value={expDate}
					onChange={() => changed("expiry")}
					id="expiry"
					required
				/>
			</div >
	}

	return (
		<Modal show={props.paymentModal} onHide={props.payment}>
			<Modal.Header>
				<Modal.Title>
					Add payment method:
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<MDBBreadcrumb light color="grey lighten-1">
					<MDBBreadcrumbItem onClick={() => setBankAccount(false)}>
						<Toggle>Credit card</Toggle>
					</MDBBreadcrumbItem>
					<MDBBreadcrumbItem onClick={() => setBankAccount(true)}>
						<Toggle>Bank account</Toggle>
					</MDBBreadcrumbItem>
				</MDBBreadcrumb>
				<form onSubmit={props.payment}>
					{theForm}
					<div className="text-center py-4 mt-3">
						<Button variant="grey" onClick={props.close}>
							Cancel
                 					</Button>
						<Button variant="brown" type="submit">
							Submit
                 					</Button>
					</div>
				</form>
			</Modal.Body>
		</Modal>
	);
}

export default paymentModal;