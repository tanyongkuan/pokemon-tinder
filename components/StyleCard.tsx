import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { Props } from '../assets/models';

const StyledCard = styled(motion.div)`
	position: absolute;
`;

const AcceptLabel = styled('div')<Props>`
	position: absolute;
	transform: rotate(-20deg);
	font-family: ProximaNova;
	border: 4px solid green;
	border-radius: 4px;
	color: green;
	padding: 5px;
	top: 15%;
	left: 4%;
	opacity: ${(props) =>
		props.opacity ? (props.reset ? 0 : props.opacity * 0.003) : 0};
`;

const RejectLabel = styled('div')<Props>`
	position: absolute;
	transform: rotate(20deg);
	font-family: ProximaNova;
	border: 4px solid red;
	border-radius: 4px;
	color: red;
	padding: 5px;
	top: 15%;
	right: 3%;
	opacity: ${(props) =>
		props.opacity ? (props.reset ? 0 : props.opacity * -0.003) : 0};
`;

export const Card = ({
	children,
	draggable,
	setVote,
	...props
}: {
	children: JSX.Element;
	draggable: boolean;
	setVote: (vote: boolean) => void;
}) => {
	// motion stuff
	const cardElem = useRef<HTMLDivElement>(null);

	const x = useMotionValue(0);
	const controls = useAnimation();

	const [constrained, setConstrained] = useState(true);

	const [reset, setReset] = useState(1);

	const [direction, setDirection] = useState('center');

	const [velocity, setVelocity] = useState(0);

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
		return velocity >= 1 ? 'right' : velocity <= -1 ? 'left' : 'center';
	};

	const getTrajectory = () => {
		setReset(0);
		setVelocity(x.getVelocity());
		setDirection(getDirection());
	};

	const flyAway = (min: number) => {
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

		if (direction && Math.abs(velocity) > min) {
			setConstrained(false);
			controls.start({
				x: flyAwayDistance(direction),
			});
		} else {
			setReset(1);
		}
	};

	useEffect(() => {
		const unsubscribeX = x.onChange(() => {
			if (cardElem.current) {
				const childNode = cardElem.current;
				const parentNode = cardElem.current.parentNode as HTMLDivElement;
				const result = getVote(childNode, parentNode);
				result !== undefined && setVote(result);
			}

			return false;
		});

		return () => unsubscribeX();
	});

	return (
		<StyledCard
			drag={draggable}
			animate={controls}
			dragConstraints={constrained && { left: 0, right: 0, top: 0, bottom: 0 }}
			dragElastic={1}
			ref={cardElem}
			style={{ x }}
			onDrag={getTrajectory}
			onDragEnd={() => flyAway(500)}
			whileTap={{ scale: 1.1 }}
			{...props}
		>
			<RejectLabel opacity={x.get()} reset={reset}>
				<Typography variant="h4">NOPE</Typography>
			</RejectLabel>
			<AcceptLabel opacity={x.get()} reset={reset}>
				<Typography variant="h4">LIKE</Typography>
			</AcceptLabel>
			{children}
		</StyledCard>
	);
};
