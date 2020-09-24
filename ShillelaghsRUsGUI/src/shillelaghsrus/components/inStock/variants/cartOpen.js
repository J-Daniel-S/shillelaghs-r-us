import React, { useEffect } from 'react';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBCardFooter, MDBRow, MDBCol, MDBIcon, MDBNavbar } from 'mdbreact';
import { CardColumns, Button } from 'react-bootstrap';

const notCart = (props) => {
	useEffect(() => {

	}, [props.cart]);

	return (
		<React.Fragment>
			<MDBRow>
				<MDBCol size="8">
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
										<MDBCol size="3"><MDBIcon icon="user" /></MDBCol>
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
				</MDBCol>
				<MDBCol size="4">
					<MDBCard>
						<MDBCardHeader color="light-green darken-4" />
						<MDBCardBody>
							<p>In cart</p>
							<br></br>
							<ul>
								{props.cart.length === 0 && <li className="list-unstyled">You haven't added anything yet</li>}
								{props.cart && props.cart.map(s => (
									<li className="list-unstyled" key={s.shillelaghId}>
										<MDBRow>
											<MDBCol size="9">
												<MDBNavbar color="light-green darken-4 text-white" >
													<MDBRow>
														{s.name}
														{s.price}
													</MDBRow>
												</MDBNavbar>
											</MDBCol>
											<MDBCol size="3">
												<i className="fa fa-times fa-lg" aria-hidden="true" onClick={() => props.removeFromCart(s)}></i>
											</MDBCol>
										</MDBRow>
									</li>
								))
								}
							</ul>
							<Button variant="dark-green" className="float-right">Checkout</Button>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
		</React.Fragment>
	);
}

export default notCart;