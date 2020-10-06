import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const errorModal = (props) => {
	return(
		<Modal show={props.error} onHide={props.clear}>
			<Modal.Header closeButton>
				<Modal.Title>
					Oops!  Something went wrong =\
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Try again.  If this keeps up please contact us.
			</Modal.Body>
			<Modal.Footer>
				<Button variant="grey" onClick={props.clear}>Dismiss</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default errorModal;