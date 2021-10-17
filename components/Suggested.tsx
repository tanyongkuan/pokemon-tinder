import React from 'react';
import { createSvgIcon } from '@mui/material/utils';
import { Props, Pokemon } from '../assets/models';
import { Grid, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { StyleCard, StyleCardRef } from '../components/StyleCard';
import PokemonCard from '../components/PokemonCard';
import { useState, useRef } from 'react';
import { useAppDispatch } from '../app/hooks';
import { castVote } from '../features/pokemon';

const SuggestedContainer = styled(Stack)`
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	margin-top: 0.5rem;
`;

const HeartIcon = createSvgIcon(
	<path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />,
	'heart'
);

const RejectIcon = createSvgIcon(
	<path d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" />,
	'reject'
);

const Frame = styled('div')`
	overflow: hidden;
	height: 100%;
	display: flex;
	justify-content: center;
	position: relative;

	${(props) => props.theme.breakpoints.up('sm')} {
		margin-top: 0rem;
		margin-bottom: 3rem;
		align-items: center;
	}
`;

const ButtonHolder = styled(Grid)`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;

	> * {
		${(props) => props.theme.breakpoints.up('xs')} {
			padding: 1rem 2rem;
		}

		${(props) => props.theme.breakpoints.up('sm')} {
			padding: 2rem 3rem;
		}
	}
`;

const ButtonLikeIcon = styled(Button)<Props>`
	border-radius: 50%;
	padding: 1rem;
	background: rgba(
		33,
		208,
		124,
		${(props) => (props.opacity ? props.opacity * 0.003 : 0)}
	);
	border-color: #21d07c;
	color: rgba(
		${(props) =>
			props.opacity
				? props.opacity <= 0
					? '33,208,124,1'
					: '255, 255, 255, 1'
				: '33,208,124,1'}
	);
`;

const ButtonRejectIcon = styled(Button)<Props>`
	border-radius: 50%;
	padding: 1rem;
	background: rgba(
		255,
		68,
		88,
		${(props) => (props.opacity ? props.opacity * -0.003 : 0)}
	);
	border-color: #ff4458;
	color: rgba(
		${(props) =>
			props.opacity
				? props.opacity >= 0
					? '255,68,88,1'
					: '255, 255, 255, 1'
				: '255,68,88,1'}
	);
`;

export default function Suggested(props: { suggestedPokemon: Pokemon[] }) {
	const [motionVal, setMotionVal] = useState(0);
	const styleCardRef = useRef<StyleCardRef>(null);
	const dispatch = useAppDispatch();

	const handleMotion = (motion: number) => {
		setMotionVal(motion);
	};

	const onVote = (item: Pokemon, vote: boolean) =>
		dispatch(castVote(item, vote));

	const voteLike = () => {
		if (styleCardRef && styleCardRef.current) {
			styleCardRef.current.vote(true);
		}
	};

	const voteReject = () => {
		if (styleCardRef && styleCardRef.current) {
			styleCardRef.current.vote(false);
		}
	};

	return (
		<SuggestedContainer>
			<Frame>
				{props.suggestedPokemon.map((pokemon: Pokemon, idx: number) => (
					<StyleCard
						ref={styleCardRef}
						draggable={idx === props.suggestedPokemon.length - 1} // Only top card is draggable
						key={pokemon.id}
						setmotion={handleMotion}
						setvote={(result: boolean) => onVote(pokemon, result)}
					>
						<PokemonCard key={pokemon.id} pokemon={pokemon} />
					</StyleCard>
				))}
				<ButtonHolder container justifyContent="center" alignItems="center">
					<Grid item>
						<ButtonLikeIcon
							aria-label="like"
							variant="outlined"
							opacity={motionVal}
							onClick={voteLike}
						>
							<HeartIcon sx={{ fontSize: 40 }} />
						</ButtonLikeIcon>
					</Grid>
					<Grid item>
						<ButtonRejectIcon
							aria-label="reject"
							variant="outlined"
							opacity={motionVal}
							onClick={voteReject}
						>
							<RejectIcon sx={{ fontSize: 40 }} />
						</ButtonRejectIcon>
					</Grid>
				</ButtonHolder>
			</Frame>
		</SuggestedContainer>
	);
}
