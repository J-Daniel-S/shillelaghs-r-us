import React, { useEffect, useContext, useState } from 'react';
import { MDBContainer, MDBCard, MDBCardHeader, MDBCardBody, MDBCardFooter, MDBRow, MDBCol } from 'mdbreact';
import { CardColumns, Button } from 'react-bootstrap';

import ShillelaghContext from '../context/ShillelaghContext';

const inStock = (props) => {
	const [stock, setStock] = useState([]);
	const [shillelaghs, setShillelaghs] = useContext(ShillelaghContext);


	useEffect(() => {
		const available = [];

		for (let shi of shillelaghs) {
			if (!shi.ordered) {
				available.push(shi);
			}
		}
		
		setStock(available);
	}, [shillelaghs]);

	return (
		<article style={{ margin: '25vh 0 0 0' }}>
			<MDBContainer>
				<CardColumns>
					{stock && stock.map(s => (
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
										<Button variant="brown" onClick={() => console.log('cart button clicked')} >Add to cart</Button>
									</MDBCol>
									<MDBCol size="2">
									</MDBCol>
								</MDBRow>
							</MDBCardFooter>
						</MDBCard>
					))}
				</CardColumns>
			</MDBContainer>
		</article>
	);
}

export default inStock;