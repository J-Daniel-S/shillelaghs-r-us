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

export const Article = styled.article`
	margin: 26vh 0 0 0;
`;

export const Toggle = styled.span`
	cursor: pointer;

	&:hover {
		color: #d0d6e2;
	}

`;

export const Span = styled.span`
	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}
`;

export const ProductPicture = styled.section`
	height: inherit;
	width: inherit;
	margin: 0;
	padding: 0;
`;