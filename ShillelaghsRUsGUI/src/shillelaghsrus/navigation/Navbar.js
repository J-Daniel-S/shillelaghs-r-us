import React, { useContext } from 'react';
import styled from 'styled-components';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem } from 'mdbreact';
import useReactRouter from 'use-react-router';

import ShillelaghContext from '../context/ShillelaghContext';

const navbar = (props) => {
	// eslint-disable-next-line
	const [shillelaghs, setShillelaghs, customer, setCustomer] = useContext(ShillelaghContext);
	const { history } = useReactRouter();

	const Span = styled.span`
		cursor: pointer;
		margin: 0 1vw;

		&:hover {
			color: #d0d6e2;
		}
	`;

	const home = () => {
		history.push("/shillelaghs-r-us/home");
	}

	const signIn = () => {
		history.push("/shillelaghs-r-us/sign-in");
	}

	const goToAccount = () => {
		history.push("/shillelaghs-r-us/account");
	}

	let theCustomer;

	if (customer) {
		theCustomer = "Welcome back " + customer.firstName + "!";
	}

	return (
		<MDBNavbar color="light-green darken-4" expand="lg" className="white-text">
			<MDBNavbarBrand>
				<Span onClick={() => home()}><strong> Shillelaghs R Us: a handcrafted shillelagh emporium </strong></Span>
			</MDBNavbarBrand>
			<MDBNavbarNav right>
				<MDBNavItem>
					{!customer && <h5>Welcome!</h5>}
					{customer &&
						<Span onClick={() => goToAccount()}>
							{theCustomer}
						</Span>}
				</MDBNavItem>
			<MDBNavItem>
				{customer && <Span onClick={() => setCustomer(null)} >Logout</Span>}
				{!customer && <Span onClick={() => signIn()}>Sign in / register</Span>}
			</MDBNavItem>
			</MDBNavbarNav>
		</MDBNavbar >

	);
}

export default navbar;