import { keyframes } from '@mui/styled-engine';
import React from 'react';
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

const LoadingContainer = styled(Grid)`
	background: linear-gradient(#e66465, #9198e5);
	height: 100vh;
`;

const heartbeat = keyframes`
    to {
		transform: scale(1.2);
    }
`;

const LoadingIcon = styled('span')`
	background: url('/icon/Pokeball_white.svg');
	background-size: contain;
	display: inline-block;
	width: 4.5rem;
	aspect-ratio: 1;
	animation: ${heartbeat} 0.25s infinite alternate;
`;

export default function LoadingScreen() {
	return (
		<LoadingContainer
			container
			direction="row"
			justifyContent="center"
			alignItems="center"
		>
			<LoadingIcon />
		</LoadingContainer>
	);
}
