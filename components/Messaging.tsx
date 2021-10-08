import React from 'react';
import { Grid, Avatar, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Pokemon } from '../assets/models';
import MatchesCard from './MatchesCard';

const StackContainer = styled(Stack)`
	height: inherit;
`;

const Header = styled('div')`
	height: 70px;
	background: linear-gradient(#e66465, #9198e5);
`;

const HeaderContainer = styled(Grid)`
	padding: 1rem;
	align-items: center;
`;

const BrandText = styled(Typography)`
	color: white;
	font-weight: 600;
`;

const TinderAvatar = styled(Avatar)`
	background-color: red;
`;

const Content = styled('div')`
	min-height: 60vh;
	flex-grow: 1;
	padding: 1rem;
`;

export default function Messaging(props: { pokemonData: Pokemon[] }) {
	return (
		<StackContainer>
			<Header>
				<HeaderContainer container>
					<Grid item xs={2}>
						<TinderAvatar aria-label="recipe">PT</TinderAvatar>
					</Grid>
					<Grid item xs={10}>
						<BrandText variant="subtitle1">Pokemon Tinder</BrandText>
					</Grid>
				</HeaderContainer>
			</Header>
			<Content>
				<Grid container spacing={1}>
					{props.pokemonData.map((pokemon, idx) => (
						<Grid key={idx} item xs={4}>
							<MatchesCard key={idx} pokemon={pokemon}></MatchesCard>
						</Grid>
					))}
				</Grid>
			</Content>
		</StackContainer>
	);
}
