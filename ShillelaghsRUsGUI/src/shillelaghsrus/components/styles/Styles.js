import styled from 'styled-components';

export const AButton = styled.i`
	cursor: pointer;

	&:hover {
		color: grey;
	}
`;

export const Info = styled.span`
	margin: 0.5vh 1vw;
`;

export const Clickable = styled.span`
	cursor: pointer;

	&:hover {
		color: grey;
	}

	&:active {
		color: orange;
		font-size: 1.3rem;
	}
`;