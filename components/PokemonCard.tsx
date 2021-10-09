import React from 'react';
import Chip from '@mui/material/Chip';
import { Avatar, Card, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Pokemon, Props } from '../assets/models';
import { colors } from '../assets/color';

const Holder = styled(Card)`
	border-radius: 25px;
	background-color: white;
	width: 100%;
	height: 100%;
	padding: 12px;
	display: flex;
	flex-direction: column;

	> * {
		margin-bottom: 0.5rem;
	}
`;

const ImageHolder = styled('span')<Props>`
	background: url(${(props) => props.bgimage}) no-repeat center;
	background-size: contain;
	display: inline-block;
	height: 100%;
	min-height: 300px;
`;

const PokemonName = styled(Typography)`
	text-transform: capitalize;
	font-weight: bold;
`;

const ChipHolder = styled('div')`
	display: flex;
	flex-direction: row;
`;

const CustomizedChip = styled(Chip)<Props>`
	background-color: ${(props) => props.bgcolor};
	color: white;
	margin-right: 0.5rem;
	text-transform: capitalize;
	font-weight: 500;
`;

export default function PokemonCard(props: { pokemon: Pokemon }) {
	return (
		<Holder>
			<ImageHolder bgimage={props.pokemon.image} />
			<CardContent>
				<PokemonName variant="h4" gutterBottom>
					{props.pokemon.name}
				</PokemonName>

				<ChipHolder>
					{props.pokemon.types.map((type, idx) => (
						<CustomizedChip
							key={idx}
							className="mr-1 capitalized"
							avatar={<Avatar src={`/icon/${type.type.name}.svg`} />}
							label={type.type.name}
							bgcolor={colors[type.type.name]}
						/>
					))}
				</ChipHolder>
			</CardContent>
		</Holder>
	);
}
