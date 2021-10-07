import React from 'react';
import Head from 'next/head';
import { styled } from '@mui/material/styles';

const MainContainer = styled('div')`
	background-color: gray;
`;

const BodyContainer = styled('main')`
	min-height: 100vh;
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
			<BodyContainer>{prop.children}</BodyContainer>
		</MainContainer>
	);
}
