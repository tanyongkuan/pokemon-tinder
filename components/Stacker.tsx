import React, { useState, Children } from 'react';
import styled from '@emotion/styled';
import { Card } from './StyleCard';

// basic default styles for container
const Frame = styled.div`
	width: 100%;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
`;

export const Stacker = ({
	onVote,
	children,
	...props
}: {
	onVote: (item: JSX.Element, vote: boolean) => void;
	children: JSX.Element[];
}) => {
	//const [stack, setStack] = useState(Children.toArray(children));
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
				let isTop = index === stack.length - 1;
				return (
					<Card
						draggable={isTop} // Only top card is draggable
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
