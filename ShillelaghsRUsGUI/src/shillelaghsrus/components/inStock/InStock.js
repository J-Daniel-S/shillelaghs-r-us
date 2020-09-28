import React, { useEffect, useContext, useState } from 'react';
import { MDBIcon } from 'mdbreact';
import { Button } from 'react-bootstrap';

import ShillelaghContext from '../../context/ShillelaghContext';
import NotCart from './variants/notCart';
import CartOpen from './variants/cartOpen';

const inStock = (props) => {
	const [ stock, setStock ] = useState([]);
	// eslint-disable-next-line
	const [ shillelaghs, setShillelaghs, customer, setCustomer, cartOpen, setCartOpen, cartContents, setCartContents ] = useContext(ShillelaghContext);


	useEffect(() => {
		const available = [];

		for (let shi of shillelaghs) {
			if (!shi.ordered) {
				available.push(shi);
			}
		}
		setStock(available);
	}, [shillelaghs, cartContents]);

	const addToCart = (s) => {
		const arr = [...cartContents];
		arr.push(s);
		setCartContents(arr);
	}

	let cartButton;
	
	if (!cartOpen) {
		cartButton = (
		<Button onClick={() => setCartOpen(true)} className="float-right" variant="dark-green" ><MDBIcon icon="angle-double-left" /> Cart</Button>)
	} else {
		cartButton = (
		<Button onClick={() => setCartOpen(false)} className="float-right" variant="dark-green" >Cart <MDBIcon icon="angle-double-right" /></Button>)
	};

	return (
		<article style={{ margin: '25vh 0 0 0' }}>
			{ (cartContents.length > 0 || cartOpen) && cartButton }
			{ !cartOpen && <NotCart stock={stock} addToCart={addToCart} /> }
			{ cartOpen && <CartOpen stock={stock} addToCart={addToCart} removeFromCart={props.removeFromCart} /> }
		</article>
	);
}

export default inStock;