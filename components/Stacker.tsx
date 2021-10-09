import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Card } from './StyleCard';

// basic default styles for container
const Frame = styled('div')`
	width: 100%;
	height: 100%;
	position: inherit;
	overflow: hidden;
	display: flex;
	justify-content: center;

	${(props) => props.theme.breakpoints.up('xs')} {
		padding: 2rem;
	}
	${(props) => props.theme.breakpoints.up('md')} {
		align-items: center;
	}
`;

export const Stacker = ({
	onVote,
	children,
	...props
}: {
	onVote: (item: JSX.Element, vote: boolean) => void;
	children: JSX.Element[];
}) => {
	const [stack, setStack] = useState(children);

	// return new array with last item removed
	const pop = (array: JSX.Element[]) => {
		return array.filter((_, index) => {
			return index < array.length - 1;
		});
	};

	const handleVote = (item: JSX.Element, vote: boolean) => {
		// update the stack
		let newStack = pop(stack);
		setStack(newStack);

		// run function from onVote prop, passing the current item and value of vote
		onVote(item, vote);
	};

	return (
		<Frame {...props}>
			{stack.map((item, index) => {
				return (
					<Card
						draggable={index === stack.length - 1} // Only top card is draggable
						key={item.key || index}
						setVote={(result: boolean) => handleVote(item, result)}
					>
						{item}
					</Card>
				);
			})}
		</Frame>
	);
};
