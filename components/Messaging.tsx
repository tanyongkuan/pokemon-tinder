import React from 'react';
import { Grid, Avatar, Stack, Typography, Tab, Tabs, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Pokemon } from '../assets/models';
import MatchesCard from './MatchesCard';
import { grey } from '@mui/material/colors';

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

const Content = styled('div')`
	height: 90%;
	flex-grow: 1;
	padding: 0.5rem;
`;

const TabHolder = styled(Tabs)`
	min-height: 1.75rem !important;
	height: 100%;

	& .MuiTabs-indicator {
		background-color: #e66465;
	}
`;

const CustomTab = styled(Tab)`
	color: black !important;
	font-size: 1rem;
	font-weight: bold;
	text-transform: none;
	padding: 0px;
	min-height: 1.75rem !important;
`;

const PanelHolder = styled('div')`
	height: 83%;
	overflow: auto;

	::-webkit-scrollbar {
		width: 0.375rem;
		border-left: 1px solid #e6ecf8;
	}
	::-webkit-scrollbar-thumb {
		background-color: ${grey[300]};
	}
`;

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<PanelHolder role="tabpanel" hidden={value !== index} {...other}>
			{value === index && <Box sx={{ pt: 1 }}>{children}</Box>}
		</PanelHolder>
	);
}

export default function Messaging(props: { pokemonData: Pokemon[] }) {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

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
			<Content>
				<Box sx={{ borderBottom: 0, borderColor: '#fff' }}>
					<TabHolder value={value} onChange={handleChange}>
						<CustomTab label="Matches" />
					</TabHolder>
				</Box>
				<TabPanel value={value} index={0}>
					<Grid container spacing={1}>
						{props.pokemonData.map((pokemon, idx) => (
							<Grid key={idx} item xs={4}>
								<MatchesCard key={idx} pokemon={pokemon}></MatchesCard>
							</Grid>
						))}
					</Grid>
				</TabPanel>
			</Content>
		</StackContainer>
	);
}
