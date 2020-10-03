import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBInput, MDBCard, MDBCardHeader, MDBCardBody } from 'mdbreact';
import { Button } from 'react-bootstrap';

import { Article } from './styles/Styles';

const contact = (props) => {
	return (
		<Article>
			<MDBContainer>
				<MDBCard>
					<MDBCardHeader>
						<p className="h5 text-center mb-4">Write to us</p>
					</MDBCardHeader>
					<MDBCardBody>
					<MDBRow>
						<MDBCol>
							<form>
								<section className="grey-text">
									<MDBIcon icon="user" />
									<MDBInput label="Your name" group type="text" validate error="wrong"
										success="right" />
									<MDBIcon icon="envelope" />
									<MDBInput label="Your email" group type="email" validate error="wrong"
										success="right" />
									<MDBIcon icon="tag" />
									<MDBInput label="Subject" group type="text" validate error="wrong" success="right" />
									<MDBIcon icon="pencil-alt" />
									<MDBInput type="textarea" rows="2" label="Your message" />
								</section>
								<section className="text-center">
									<Button variant="brown">
										Send
           								 <MDBIcon far icon="paper-plane" className="ml-1" />
									</Button>
								</section>
							</form>
						</MDBCol>
					</MDBRow>
					</MDBCardBody>
				</MDBCard>
			</MDBContainer>
		</Article>
	);

}

export default contact;