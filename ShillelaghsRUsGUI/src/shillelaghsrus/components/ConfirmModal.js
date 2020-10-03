import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import useReactRouter from 'use-react-router';

import ShillelaghContext from '../context/ShillelaghContext';

const confirmModal = (props) => {
	const { history } = useReactRouter();
	// eslint-disable-next-line
	const [ shillelaghs, setShillelaghs, customer, setCustomer, cartOpen, setCartOpen, cartContents, setCartContents, confirm, setConfirm ] = useContext(ShillelaghContext);

	const confirmed = () => {
		props.refresh(true);
		setConfirm(false);
		setCartOpen(false);
		props.order();
		setTimeout(() => history.push('/shillelaghs-r-us/account'), 1000);
	}

	return (
		<Modal show={confirm} onHide={() => setConfirm(false)}>
			<Modal.Header closeButton>
				<Modal.Title>Confirm order</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Does your order look right?</p>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="grey" onClick={() => setConfirm(false)}>Close</Button>
				<Button variant="brown" onClick={() => confirmed()}>Confirm checkout</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default confirmModal;