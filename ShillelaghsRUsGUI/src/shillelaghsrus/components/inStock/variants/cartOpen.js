import React, { useEffect } from 'react';
import { MDBRow, MDBCol } from 'mdbreact';

import Stock from './stock/Stock';
import CartPanel from './cartPanel/CartPanel';


const notCart = (props) => {
	useEffect(() => {

	}, [props.cart]);

	return (
		<React.Fragment>
			<MDBRow>
				<MDBCol size="8">
					<Stock addToCart={props.addToCart} stock={props.stock} />
				</MDBCol>
				<MDBCol size="4">
					<CartPanel removeFromCart={props.removeFromCart} />
				</MDBCol>
			</MDBRow>
		</React.Fragment>
	);
}

export default notCart;