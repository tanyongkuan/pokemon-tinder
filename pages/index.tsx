import Layout from '../components/Layout';
import PokemonCard from '../components/PokemonCard';
import Messaging from '../components/Messaging';
import { Stacker, StackerRef } from '../components/Stacker';
import LoadingScreen from '../components/LoadingScreen';

import { Props, Pokemon } from '../assets/models';
import { useEffect, useState, useRef } from 'react';

import { Grid, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { createSvgIcon } from '@mui/material/utils';
import { Box } from '@mui/system';
import { grey } from '@mui/material/colors';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getSuggestedPokemon, castVote, getMatches } from '../features/pokemon';

const HeartIcon = createSvgIcon(
	<path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />,
	'heart'
);

const RejectIcon = createSvgIcon(
	<path d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" />,
	'reject'
);

const LeftBox = styled(Box)`
	width: 40%;
	max-width: 25rem;
`;

const LeftGrid = styled(Grid)`
	height: 100%;
`;

const RightGrid = styled(Grid)`
	height: 100%;
	background-color: ${grey[200]};
	position: relative;
`;
const RightBody = styled(Stack)`
	width: inherit;
	height: inherit;
	position: inherit;
`;

const ButtonHolder = styled(Grid)`
	position: absolute;
	bottom: 5%;

	> * {
		padding-left: 3rem;
		padding-right: 3rem;
	}
`;

const ButtonLikeIcon = styled(Button)<Props>`
	border-radius: 50%;
	width: 4.5rem;
	height: 4.5rem;
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
	width: 4.5rem;
	height: 4.5rem;
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

export default function Home() {
	const [loading, setLoading] = useState(false);
	const [motionVal, setMotionVal] = useState(0);
	const stacker = useRef<StackerRef>(null);

	const dispatch = useAppDispatch();
	const suggestedPokemon = useAppSelector(
		(state) => state.pokemon.suggestedPokemon
	);
	const matchPokemon = useAppSelector((state) => state.pokemon.matches);

	useEffect(() => {
		setLoading(true);
		dispatch(getSuggestedPokemon());
		dispatch(getMatches());
		setTimeout(() => setLoading(false), 2000);
	}, [dispatch]);

	const onVote = (item: Pokemon, vote: boolean) =>
		dispatch(castVote(item, vote));

	if (loading) {
		return (
			<Layout title="Pokemon Tinder">
				<LoadingScreen />
			</Layout>
		);
	}

	const handleMotion = (motion: number) => {
		setMotionVal(motion);
	};

	const voteLike = () => {
		if (stacker && stacker.current) {
			stacker.current.vote(true);
		}
	};

	const voteReject = () => {
		if (stacker && stacker.current) {
			stacker.current.vote(false);
		}
	};

	return (
		<Layout title="Pokemon Tinder">
			<Grid container sx={{ height: '100vh' }}>
				<LeftBox sx={{ display: { xs: 'none', md: 'block' } }}>
					<LeftGrid item xs>
						<Messaging pokemonData={matchPokemon} />
					</LeftGrid>
				</LeftBox>
				<RightGrid item xs>
					<RightBody
						direction="column"
						justifyContent="center"
						alignItems="center"
					>
						<Stacker
							setmotion={handleMotion}
							getvote={(item, vote) => onVote(item.props.pokemon, vote)}
							ref={stacker}
						>
							{suggestedPokemon.map((pokemon: Pokemon) => (
								<PokemonCard key={pokemon.id} pokemon={pokemon} />
							))}
						</Stacker>
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
					</RightBody>
				</RightGrid>
			</Grid>
		</Layout>
	);
}
