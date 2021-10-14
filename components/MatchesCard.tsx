import React from 'react';
import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Pokemon, Props } from '../assets/models';
import { grey } from '@mui/material/colors';

const Holder = styled(Card)`
	border-radius: 0.375rem;
	background-color: ${grey[100]};
	width: 100%;
	height: auto;
	padding: 0.5rem;
	position: relative;
`;

const ImageHolder = styled('span')<Props>`
	background: url(${(props) => props.bgimage}) no-repeat center;
	background-size: contain;
	display: inline-block;
	width: 100%;
	height: 7rem;
`;

const PokemonName = styled('span')`
	text-transform: capitalize;
	font-weight: bold;
	color: black;
	font-size: 0.825rem;
	position: absolute;
	bottom: 0.375rem;
	left: 0.5rem;
`;

export default function MatchesCard(props: { pokemon: Pokemon }) {
	return (
		<Holder>
			<ImageHolder bgimage={props.pokemon.image}></ImageHolder>
			<PokemonName>{props.pokemon.name}</PokemonName>
		</Holder>
	);
}
