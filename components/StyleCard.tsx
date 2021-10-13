import React, {
	useRef,
	useEffect,
	useState,
	useImperativeHandle,
	forwardRef,
} from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Typography, Button } from '@mui/material';
import { Props } from '../assets/models';

const StyledCard = styled(motion.div)`
	position: absolute;
	max-width: 26.25rem;
	min-height: 450px;
	width: 90%;
	height: 70%;
	margin-bottom: 3.125rem;
`;

const AcceptLabel = styled('div')<Props>`
	position: absolute;
	transform: rotate(-20deg);
	border: 0.25rem solid green;
	border-radius: 0.25rem;
	color: green;
	padding: 0.375rem;
	top: 10%;
	left: 3%;
	opacity: ${(props) =>
		props.opacity ? (props.reset ? 0 : props.opacity * 0.003) : 0};
`;

const RejectLabel = styled('div')<Props>`
	position: absolute;
	transform: rotate(20deg);
	border: 0.25rem solid red;
	border-radius: 0.25rem;
	color: red;
	padding: 0.375rem;
	top: 10%;
	right: 3%;
	opacity: ${(props) =>
		props.opacity ? (props.reset ? 0 : props.opacity * -0.003) : 0};
`;

type CardProps = {
	children: JSX.Element;
	draggable: boolean;
	setvote: (vote: boolean) => void;
	setmotion: (motion: number) => void;
};

export type StyleCardRef = {
	current: HTMLDivElement | null;
	vote: (vote: boolean) => void;
};

/*export const StyleCard = ({
	children,
	draggable,
	setVote,
	setmotion,
	...props
}: {
	children: JSX.Element;
	draggable: boolean;
	setVote: (vote: boolean) => void;
	setmotion: (motion: number) => void;
}) => {*/
export const StyleCard = forwardRef<StyleCardRef, CardProps>((props, ref) => {
	// motion stuff
	const cardElem = useRef<HTMLDivElement>(null);

	const x = useMotionValue(0);
	const controls = useAnimation();

	const [constrained, setConstrained] = useState(true);

	const [reset, setReset] = useState(1);

	const [direction, setDirection] = useState('center');

	const [velocity, setVelocity] = useState(0);

	useImperativeHandle(ref, () => ({
		current: cardElem.current,
		vote: (vote: boolean) => {
			setConstrained(false);
			if (vote) {
				controls.start({
					x: flyAwayDistance('right'),
				});
			} else {
				controls.start({
					x: flyAwayDistance('left'),
				});
			}
		},
	}));

	const getVote = (childNode: HTMLDivElement, parentNode: HTMLDivElement) => {
		const childRect = childNode.getBoundingClientRect();
		const parentRect = parentNode.getBoundingClientRect();
		let result =
			parentRect.left >= childRect.right
				? false
				: parentRect.right <= childRect.left
				? true
				: undefined;
		return result;
	};

	// determine direction of swipe based on velocity
	const getDirection = () => {
		return velocity >= 0.6 ? 'right' : velocity <= -0.6 ? 'left' : 'center';
	};

	const getTrajectory = () => {
		setReset(0);
		props.setmotion(x.get());
		setVelocity(x.getVelocity());
		setDirection(getDirection());
	};

	const flyAwayDistance = (direction: string) => {
		if (cardElem.current) {
			const parentWidth = (
				cardElem.current.parentNode as HTMLDivElement
			).getBoundingClientRect().width;
			const childWidth = cardElem.current.getBoundingClientRect().width;
			return direction === 'left'
				? -parentWidth / 2 - childWidth / 2
				: parentWidth / 2 + childWidth / 2;
		}

		return 0;
	};

	const flyAway = (min: number) => {
		if (direction && Math.abs(velocity) > min) {
			setConstrained(false);
			controls.start({
				x: flyAwayDistance(direction),
			});
			props.setmotion(0);
		} else {
			setReset(1);
			props.setmotion(0);
		}
	};

	const fly = () => {
		setDirection('left');
		setVelocity(100);
		flyAway(0);
	};

	useEffect(() => {
		const unsubscribeX = x.onChange(() => {
			if (cardElem.current) {
				const childNode = cardElem.current;
				const parentNode = cardElem.current.parentNode as HTMLDivElement;
				const result = getVote(childNode, parentNode);
				return result !== undefined && props.setvote(result);
			}

			return false;
		});

		return () => unsubscribeX();
	});

	return (
		<StyledCard
			drag={props.draggable}
			animate={controls}
			dragConstraints={constrained && { left: 0, right: 0, top: 0, bottom: 0 }}
			dragElastic={1}
			ref={cardElem}
			style={{ x }}
			onDrag={getTrajectory}
			onDragEnd={() => flyAway(500)}
			whileTap={{ scale: 1.1 }}
		>
			<RejectLabel opacity={x.get()} reset={reset}>
				<Typography variant="h4">NOPE</Typography>
			</RejectLabel>
			<AcceptLabel opacity={x.get()} reset={reset}>
				<Typography variant="h4">LIKE</Typography>
			</AcceptLabel>
			{props.children}
		</StyledCard>
	);
});

StyleCard.displayName = 'StyleCard';
export default StyleCard;
