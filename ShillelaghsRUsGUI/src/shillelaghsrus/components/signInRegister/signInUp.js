import React, { useState } from 'react';
import { MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, MDBIcon } from 'mdbreact';
import useReactRouter from 'use-react-router';

import Register from './register/Register';
import SignIn from './signIn/signIn';
import Forgot from './forgot/Forgot';
import { Article, Toggle, Span } from '../styles/Styles';

const signInUp = (props) => {
	const [register, setRegister] = useState(false);
	const [username, setUsername] = useState(false);
	const { history } = useReactRouter();

	let theForm;

	if (window.location.pathname === "/shillelaghs-r-us/sign-in" || window.location.pathname === "/shillelaghs-r-us/sign-in/checkout") {
		theForm = register ? <Register /> : <SignIn forgotClicked={() => forgot()} />
	} else if (window.location.pathname === "/shillelaghs-r-us/sign-in/forgot") {
		theForm = <Forgot username={username} />
	}

	const forgot = (value) => {
		setUsername(value);
		history.push("/shillelaghs-r-us/sign-in/forgot");
	}

	const goBack = () => {
		history.push("/shillelaghs-r-us/sign-in");
	}

	let theBreadcrumb;

	if (window.location.pathname === "/shillelaghs-r-us/sign-in/forgot") {
		theBreadcrumb = (<MDBBreadcrumbItem onClick={() => goBack()}><Toggle><MDBIcon icon="angle-left" />Back</Toggle></MDBBreadcrumbItem>);
	} else {
		theBreadcrumb = (
			<React.Fragment>
				<MDBBreadcrumbItem onClick={() => setRegister(false)}>
					<Toggle>Sign in</Toggle>
				</MDBBreadcrumbItem>
				<MDBBreadcrumbItem onClick={() => setRegister(true)}>
					<Toggle>Register</Toggle>
				</MDBBreadcrumbItem>
			</React.Fragment>
		);
	}

	return (
		<Article>
			<MDBContainer>
				<br></br>
				<MDBBreadcrumb light color="grey lighten-1">
					{theBreadcrumb}
				</MDBBreadcrumb>
				{theForm}
				<br></br>
				<p className="float-right">Forgot <Span onClick={() => forgot(true)}> username </Span> / <Span onClick={() => forgot(false)}> password </Span></p>
				<br></br>
			</MDBContainer>
		</Article>
	);
}

export default signInUp;