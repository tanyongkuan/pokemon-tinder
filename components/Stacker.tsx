import React, {
	useState,
	useRef,
	forwardRef,
	useImperativeHandle,
} from 'react';
import { styled } from '@mui/material/styles';
import { StyleCard, StyleCardRef } from './StyleCard';

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

type Props = {
	getvote: (item: JSX.Element, vote: boolean) => void;
	children: JSX.Element[];
	setmotion: (motion: number) => void;
};

export type StackerRef = {
	current: HTMLDivElement | null;
	vote: (vote: boolean) => void;
};

export const Stacker = forwardRef<StackerRef, Props>((props, ref) => {
	const [stack, setStack] = useState(props.children);
	const styleCard = useRef<StyleCardRef>(null);
	const divRef = useRef<HTMLDivElement>(null);

	// return new array with last item removed
	const pop = (array: JSX.Element[]) => {
		return array.filter((_, index) => {
			return index < array.length - 1;
		});
	};

	useImperativeHandle(ref, () => ({
		current: divRef.current,
		vote: (vote: boolean) => {
			if (styleCard.current) {
				styleCard.current.vote(vote);
			}
		},
	}));

	const handleVote = (item: JSX.Element, vote: boolean) => {
		// update the stack
		let newStack = pop(stack);
		setStack(newStack);

		// run function from onVote prop, passing the current item and value of vote
		props.getvote(item, vote);
	};

	const handleMotion = (motion: number) => {
		props.setmotion(motion);
	};

	return (
		<Frame ref={divRef}>
			{stack.map((item, index) => {
				return (
					<StyleCard
						ref={styleCard}
						draggable={index === stack.length - 1} // Only top card is draggable
						key={item.key || index}
						setmotion={handleMotion}
						setvote={(result: boolean) => handleVote(item, result)}
					>
						{item}
					</StyleCard>
				);
			})}
		</Frame>
	);
});
Stacker.displayName = 'Stacker';

export default Stacker;
