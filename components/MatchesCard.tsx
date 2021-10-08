import React from 'react';
import { Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Pokemon, Props } from '../assets/models';

const Holder = styled(Card)`
	border-radius: 5px;
	background-color: white;
	width: 100%;
	height: auto;
	padding: 0.5rem;
	display: flex;
	flex-direction: column;
	position: relative;
`;

const ImageHolder = styled('span')<Props>`
	background: url(${(props) => props.bgimage}) no-repeat center;
	background-size: contain;
	display: inline-block;
	height: 110px;
`;

const PokemonName = styled('span')`
	text-transform: capitalize;
	font-weight: bold;
	color: black;
	font-size: 13px;
	position: absolute;
	bottom: 5px;
`;

export default function MatchesCard(props: { pokemon: Pokemon }) {
	return (
		<Holder>
			<ImageHolder bgimage={props.pokemon.image}></ImageHolder>
			<PokemonName>{props.pokemon.name}</PokemonName>
		</Holder>
	);
}
