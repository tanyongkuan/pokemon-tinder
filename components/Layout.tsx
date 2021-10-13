import React from 'react';
import Head from 'next/head';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const MainContainer = styled('div')`
	display: flex;
	min-height: 100vh;
`;

const BodyContainer = styled('main')`
	width: 100%;
`;

export default function Layout(prop: {
	title: string;
	children: JSX.Element | JSX.Element[];
}) {
	return (
		<MainContainer>
			<CssBaseline />
			<Head>
				<title>{prop.title}</title>
				<meta name="description" content="Tinder for Pokemon Lovers" />
				<link rel="icon" href="/icon/pokeball.svg" />
			</Head>
			<BodyContainer className="container min-h-screen">
				{prop.children}
			</BodyContainer>
		</MainContainer>
	);
}
