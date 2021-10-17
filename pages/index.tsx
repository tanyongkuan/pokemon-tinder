import Layout from '../components/Layout';
import Messaging from '../components/Messaging';
import LoadingScreen from '../components/LoadingScreen';
import Suggested from '../components/Suggested';
import Matches from '../components/Matches';
import { createSvgIcon } from '@mui/material/utils';

import { useEffect, useState } from 'react';

import {
	Grid,
	AppBar,
	Typography,
	Avatar,
	BottomNavigation,
	BottomNavigationAction,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { grey } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getSuggestedPokemon, getMatches } from '../features/pokemon';

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
	display: flex;
	flex-direction: column;
`;

const Container = styled('div')`
	position: relative;
	flex-grow: 1;
`;

const ApplicationBar = styled(AppBar)`
	background: linear-gradient(#e66465, #9198e5);
	padding: 0.5rem;
	margin: 0 auto;
	display: flex;
	justify-content: center;

	${(props) => props.theme.breakpoints.up('xs')} {
		display: block;
	}

	${(props) => props.theme.breakpoints.up('md')} {
		display: none;
	}
`;

const BrandText = styled(Typography)`
	color: #fff;
	font-weight: 600;
	margin-left: 0.75rem;
`;

const HeartIcon = createSvgIcon(
	<path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />,
	'heart'
);

const MessageIcon = createSvgIcon(
	<path d="M22 7V16C22 17.1 21.1 18 20 18H6L2 22V4C2 2.9 2.9 2 4 2H14.1C14 2.3 14 2.7 14 3S14 3.7 14.1 4H4V16H20V7.9C20.7 7.8 21.4 7.4 22 7M16 3C16 4.7 17.3 6 19 6S22 4.7 22 3 20.7 0 19 0 16 1.3 16 3Z" />,
	'message'
);

export default function Home() {
	const [loading, setLoading] = useState(false);
	const [navValue, setNavValue] = useState(1);

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

	if (loading) {
		return (
			<Layout title="Pokemon Tinder">
				<LoadingScreen />
			</Layout>
		);
	}

	const NavItem = () => {
		const theme = useTheme();
		const matches = useMediaQuery(theme.breakpoints.up('md'));

		if (navValue === 0 && !matches) {
			return <Matches pokemonData={matchPokemon} />;
		} else {
			return <Suggested suggestedPokemon={suggestedPokemon} />;
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
					<ApplicationBar position="static">
						<Grid container>
							<Grid item>
								<Avatar
									alt="Pokemon Tinder"
									src="/icon/Pokeball_white.svg"
									sx={{ width: 30, height: 30 }}
								/>
							</Grid>
							<Grid item>
								<BrandText variant="h6">Pokemon Tinder</BrandText>
							</Grid>
						</Grid>
					</ApplicationBar>
					<Container>
						<NavItem />
					</Container>
					<BottomNavigation
						showLabels
						value={navValue}
						onChange={(event, newValue) => {
							setNavValue(newValue);
						}}
						sx={{ display: { xs: 'flex', md: 'none' } }}
					>
						<BottomNavigationAction
							label="Matches"
							icon={<MessageIcon sx={{ fontSize: 24 }} />}
						></BottomNavigationAction>
						<BottomNavigationAction
							label="Recommendation"
							icon={<HeartIcon sx={{ fontSize: 24 }} />}
						></BottomNavigationAction>
					</BottomNavigation>
				</RightGrid>
			</Grid>
		</Layout>
	);
}
