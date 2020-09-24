import React from 'react';

import ForgotUsername from './forgotUsername';
import ForgotPassword from './forgotPassword';

const forgot = (props) => {

	let theForm;

	if (props.username) {
		theForm = <ForgotUsername />
	} else {
		theForm = <ForgotPassword />
	}

	return (
		<React.Fragment>
			{theForm}
		</React.Fragment>
	);
}

export default forgot;