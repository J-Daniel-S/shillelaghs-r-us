import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { MDBIcon, MDBInput } from 'mdbreact';

const informationModal = (props) => {
	const [first, setFirst] = useState();
	const [last, setLast] = useState();
	const [email, setEmail] = useState();

	useEffect(() => {

	}, []);

	const changed = input => event => {
		switch (input) {
			case 'first':
				setFirst(event.target.value);
				break;
			case 'last':
				setLast(event.target.value);
				break;
			case 'email':
				setEmail(event.target.value);
				break;
			default:
				break;
		}
	}

	return (
		<Modal show={props.info} onHide={props.information}>
			<Modal.Header>
				<Modal.Title>
					Update information:
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Values not entered will remain unchanged</p>
				<MDBIcon icon="pencil-alt" />
				<form onSubmit={props.information}>
					<div className="grey-text">
						<MDBInput
							label="Your first name"
							group
							type="text"
							validate
							error="wrong"
							success="right"
							value={first}
							onChange={() => changed("first")}
							id="first"
						/>
						<MDBInput
							label="Your last name"
							group
							type="text"
							validate
							value={last}
							onChange={() => changed("last")}
							id="last"
						/>
						<MDBInput
							label="Your email"
							group
							type="email"
							validate
							value={email}
							onChange={() => changed("email")}
							id="email"
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

export default informationModal;