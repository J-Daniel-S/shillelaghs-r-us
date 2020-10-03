import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';

import ShillelaghContext from '../context/ShillelaghContext';

const deleteModal = (props) => {
	// eslint-disable-next-line
	const [shillelaghs, setShillelaghs, customer, setCustomer, cartOpen, setCartOpen, cartContents,
		// eslint-disable-next-line
		setCartContents, confirm, setConfirm, order, setOrder, price, setPrice, deleteConfirm, setDeleteConfirm, paymentMethod, setPaymentMethod] = useContext(ShillelaghContext);

	const lastFour = (num) => {
		let theNum = num.toString();
		theNum = '****-' + theNum.substring(theNum.length - 4, theNum.length);
		return theNum;
	}

	let type;

	if (paymentMethod.card) {
		type = paymentMethod.card;
	} else {
		type = 'Account number: '
	}

	return (
		<Modal show={deleteConfirm} onHide={() => setDeleteConfirm(false)}>
			<Modal.Header closeButton>
				<Modal.Title>Really delete payment method?</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p key={paymentMethod.id}>{type}    --    {lastFour(paymentMethod.number)}</p>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="grey" onClick={() => setDeleteConfirm(false)}>Close</Button>
				<Button variant="brown" onClick={() => props.delete()}>Confirm delete</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default deleteModal;