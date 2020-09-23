import React from 'react';
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem } from 'mdbreact';

import Register from './register/Register';

const signInUp = (props) => {

	return (
		<article style={{ margin: '25vh 0 0 0' }}>
			<MDBContainer>
				<br></br>
				<MDBBreadcrumb light color="grey lighten-2">
					<MDBBreadcrumbItem active>
						Sign in
					</MDBBreadcrumbItem>
					<MDBBreadcrumbItem active>
						Register
					</MDBBreadcrumbItem>
				</MDBBreadcrumb>
				<Register />
			</MDBContainer>
		</article>
	);
}

export default signInUp;