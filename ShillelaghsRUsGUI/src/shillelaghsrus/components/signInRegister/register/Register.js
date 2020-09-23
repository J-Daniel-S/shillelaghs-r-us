import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBBreadcrumb, MDBBreadcrumbItem } from 'mdbreact';
import { Button } from 'react-bootstrap';

const register = (props) => {
	return (
		<MDBCard>
			<MDBCardBody>
				<form>
					<p className="h4 text-center py-4">Sign up</p>
					<div className="grey-text">
						<MDBInput
							label="Your name"
							icon="user"
							group
							type="text"
							validate
							error="wrong"
							success="right"
						/>
						<MDBInput
							label="Your email"
							icon="envelope"
							group
							type="email"
							validate
							error="wrong"
							success="right"
						/>
						<MDBInput
							label="Confirm your email"
							icon="exclamation-triangle"
							group
							type="text"
							validate
							error="wrong"
							success="right"
						/>
						<MDBInput
							label="Your password"
							icon="lock"
							group
							type="password"
							validate
						/>
					</div>
					<div className="text-center py-4 mt-3">
						<Button variant="brown" type="submit">
							Register
                 						</Button>
					</div>
				</form>
			</MDBCardBody>
		</MDBCard>
	);
}

export default register;