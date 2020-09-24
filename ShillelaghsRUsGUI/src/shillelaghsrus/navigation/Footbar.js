import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import styled from 'styled-components';
import useReactRouter from 'use-react-router';

const footbar = (props) => {
	const { history } = useReactRouter();
	

	const Li = styled.li`
	
		cursor: pointer;

		&:hover {
			color: #d0d6e2;
		}

	`;

	const homeClicked = () => {
		history.push("/shillelaghs-r-us/home");
	}

	const historyClicked = () => {
		history.push("/shillelaghs-r-us/history");
	}

	const contactClicked = () => {
		history.push("/shillelaghs-r-us/contact");
	}

	return (
		<MDBFooter color="light-green darken-4" className="font-small pt-4 mt-4">
			<MDBContainer fluid>
				<MDBRow>
					<MDBCol size="6">
						<h5 className="title">Hand crafted by our very own octogenarian Irishmen</h5>
						<p>Check back daily to see new stock</p>
					</MDBCol>
					<MDBCol size="6">
						<h5 className="title">Links</h5>
						<ul>
							<Li className="list-unstyled">
								<span onClick={() => homeClicked()}>Storefront</span>
							</Li>
							<Li className="list-unstyled">
								<span>Your account</span>
							</Li>
							<Li className="list-unstyled">
								<span onClick={() => contactClicked()}>Contact us</span>
							</Li>
							<Li className="list-unstyled">
								<span onClick={() => historyClicked()}>History</span>
							</Li>
						</ul>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		</MDBFooter>
	);
}

export default footbar;