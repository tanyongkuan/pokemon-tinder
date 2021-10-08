import React from 'react';
import Head from 'next/head';
import { styled } from '@mui/material/styles';

const MainContainer = styled('div')`
	min-height: 100vh;
	//padding: 0 0.5rem;
	display: flex;
	/*flex-direction: column;
	justify-content: center;
	align-items: center;*/
	height: 100vh;
`;

const BodyContainer = styled('main')`
	min-height: 100vh;
	height: 100vh;
	width: 100%;
`;

export default function Layout(prop: {
	title: string;
	children: JSX.Element | JSX.Element[];
}) {
	return (
		<MainContainer>
			<Head>
				<title>{prop.title}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<BodyContainer className="container min-h-screen">
				{prop.children}
			</BodyContainer>
		</MainContainer>
	);
}
