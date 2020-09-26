import React from 'react';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBRow, MDBCol, MDBCardFooter } from 'mdbreact';
import { Button, CardColumns } from 'react-bootstrap';

const stock = (props) => {

	return (
		<CardColumns>
			{props.stock && props.stock.map(s => (
				<MDBCard key={s.shillelaghId}>
					<MDBCardHeader>
						<MDBRow>
							<MDBCol size="6">
								{s.name}
							</MDBCol>
							<MDBCol size="3">
								${s.price}
							</MDBCol>
						</MDBRow>
					</MDBCardHeader>
					<MDBCardBody>
						<p>Picture of the shillelagh</p>
						{/* <img src='../../../../resources/shillelaghpic.jpg' alt='shillelagh pic' /> */}
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
	);
}

export default stock;