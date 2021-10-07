import React from 'react';
//import Chip from './Chip';
import Chip from '@mui/material/Chip';
import { Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Pokemon, Props } from '../assets/models';
import { colors } from '../assets/color';

const CustomizedChip = styled(Chip)<Props>`
	background-color: ${(props) => props.bgcolor};
	color: white;
`;

export default function Card(props: { pokemon: Pokemon }) {
	return (
		<div className="max-w-3xl max-h-7xl rounded-3xl bg-white absolute">
			<div className="p-10">
				<img src={props.pokemon.image} alt={props.pokemon.name} />
				<span className="capitalize font-bold text-3xl">
					{props.pokemon.name}
				</span>

				<div className="flex flex-row">
					{props.pokemon.types.map((type, idx) => (
						/*<Chip key={idx} text={type.type.name} />*/
						<CustomizedChip
							key={idx}
							avatar={<Avatar src={`/icon/${type.type.name}.svg`} />}
							label={type.type.name}
							bgcolor={colors[type.type.name]}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
