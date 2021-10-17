import React from 'react';
import Chip from '@mui/material/Chip';
import { Avatar, Card, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Pokemon, Props } from '../assets/models';
import { colors } from '../assets/color';

const Holder = styled(Card)`
	display: flex;
	flex-direction: column;
	border-radius: 1.625rem;
	padding: 0.75rem;
	height: 100%;

	> * {
		margin-bottom: 0.5rem;
	}
`;

const ImageHolder = styled('span')<Props>`
	background: url(${(props) => props.bgimage}) no-repeat center;
	background-size: contain;
	display: inline-block;
	height: 80%;
	min-height: 18.75rem;
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
							avatar={
								<Avatar
									src={`/icon/${type.type.name}.svg`}
									alt={type.type.name}
								/>
							}
							label={type.type.name}
							bgcolor={colors[type.type.name]}
						/>
					))}
				</ChipHolder>
			</CardContent>
		</Holder>
	);
}
