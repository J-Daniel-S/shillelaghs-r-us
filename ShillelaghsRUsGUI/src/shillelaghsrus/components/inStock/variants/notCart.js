import React from 'react';
import { MDBContainer, MDBCard, MDBCardHeader, MDBCardBody, MDBCardFooter, MDBRow, MDBCol } from 'mdbreact';
import { CardColumns, Button } from 'react-bootstrap';

const notCart = (props) => {

	return(
		<MDBContainer>
				<CardColumns>
					{props.stock && props.stock.map(s => (
						<MDBCard key={s.shillelaghId}>
							<MDBCardHeader>
								<MDBRow>
									<MDBCol size="6">
										{s.name}
									</MDBCol>
									<MDBCol size="3"></MDBCol>
									<MDBCol size="3">
										${s.price}
									</MDBCol>
								</MDBRow>
							</MDBCardHeader>
							<MDBCardBody>
								<p>picture</p>
							</MDBCardBody>
							<MDBCardFooter>
								<MDBRow>
									<MDBCol size="2">
									</MDBCol>
									<MDBCol>
										<Button variant="brown" onClick={() => props.addToCart(s)} >Add to cart</Button>
									</MDBCol>
									<MDBCol size="2">
									</MDBCol>
								</MDBRow>
							</MDBCardFooter>
						</MDBCard>
					))}
				</CardColumns>
			</MDBContainer>
	);
}

export default notCart;