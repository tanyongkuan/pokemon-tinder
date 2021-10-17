import React from 'react';
import { Grid, Avatar, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Pokemon } from '../assets/models';
import Matches from './Matches';

const StackContainer = styled(Stack)`
	height: inherit;
`;

const HeaderContainer = styled(Grid)`
	background: linear-gradient(#e66465, #9198e5);
	padding: 1.5rem 1rem;
	align-items: center;
`;

const BrandText = styled(Typography)`
	color: #fff;
	font-weight: 600;
	margin-left: 0.75rem;
`;

const ContentContainer = styled('div')`
	flex-grow: 1;
	position: relative;
`;

export default function Messaging(props: { pokemonData: Pokemon[] }) {
	return (
		<StackContainer>
			<HeaderContainer container>
				<Grid item>
					<Avatar
						alt="Pokemon Tinder"
						src="/icon/Pokeball_white.svg"
						sx={{ width: 30, height: 30 }}
					/>
				</Grid>
				<Grid item xs>
					<BrandText variant="subtitle1">Pokemon Tinder</BrandText>
				</Grid>
			</HeaderContainer>
			<ContentContainer>
				<Matches pokemonData={props.pokemonData} />
			</ContentContainer>
		</StackContainer>
	);
}
