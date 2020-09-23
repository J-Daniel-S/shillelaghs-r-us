import React from 'react';
import styled from 'styled-components';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem } from 'mdbreact';
import useReactRouter from 'use-react-router';

const navbar = (props) => {
	const { history, location, match} = useReactRouter();

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

	return (
		<MDBNavbar color="light-green darken-4" expand="lg" className="white-text">
			<MDBNavbarBrand>
				<Span onClick={() => home()}><strong> Shillelaghs R Us: a handcrafted shillelagh emporium </strong></Span>
			</MDBNavbarBrand>
			<MDBNavbarNav right>
				<MDBNavItem>
					<h5>Welcome!</h5>
				</MDBNavItem>
				<MDBNavItem>
					<Span onClick={() => signIn()}>Sign in / register</Span>
				</MDBNavItem>
			</MDBNavbarNav>
		</MDBNavbar>

	);
}

export default navbar;