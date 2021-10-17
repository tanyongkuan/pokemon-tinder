import React from 'react';
import MatchesCard from './MatchesCard';
import { styled } from '@mui/material/styles';
import { Grid, Tab, Tabs, Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Pokemon } from '../assets/models';

const Content = styled('div')`
	display: flex;
	flex-direction: column;
	padding: 0.5rem;
	padding-right: 0.25rem;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
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
	flex-grow: 1;
	overflow: auto;
	margin-top: 8px;

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
			{value === index && <Box>{children}</Box>}
		</PanelHolder>
	);
}

export default function Matches(props: { pokemonData: Pokemon[] }) {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		//setValue(newValue);
	};

	return (
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
	);
}
