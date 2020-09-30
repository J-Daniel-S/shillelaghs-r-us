import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { MDBIcon, MDBInput } from 'mdbreact';

const addressModal = (props) => {
	const [address, setAddress] = useState();

	useEffect(() => {

	}, []);

	const changed = input => event => {
		switch (input) {
			case 'address':
				setAddress(event.target.value);
				break;
			default:
				break;
		}
	}

	return (
		<Modal show={props.addressModal} onHide={props.address}>
			<Modal.Header>
				<Modal.Title>
					Update information:
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<MDBIcon icon="pencil-alt" />
				<form onSubmit={props.address}>
					<div className="grey-text">
						<MDBInput
							label="Your new address"
							group
							type="text"
							validate
							error="wrong"
							success="right"
							value={address}
							onChange={() => changed("address")}
							id="address"
						/>
					</div>
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

export default addressModal;