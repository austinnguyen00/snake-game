import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Colors } from '../styles/colors';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Coordinate, Direction, GestureEventType } from '../types/types';
import { useState, useEffect } from 'react';
import Snake from './Snake';
import { checkGameOver } from '../utils/checkGameOver';
import Food from './Food';
import { checkEatFood } from '../utils/checkEatFood';
import { randomFoodPosition } from '../utils/randomFoodPosition';

// Constant variables for the game
const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 63 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

const Game = () => {
	const [direction, setDirection] = useState<Direction>(Direction.Right);
	// Keep track of each part of the snake
	const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
	const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
	const [score, setScore] = useState<number>(0);
	const [isGameOver, setIsGameOver] = useState<boolean>(false);
	const [isPaused, setIsPaused] = useState<boolean>(false);

	// Update snake position with useEffect
	useEffect(() => {
		if (!isGameOver) {
			// `setInterval` schedules repeated execution every delay miliseconds
			const intervalID = setInterval(() => {
				!isPaused && moveSnake();
			}, MOVE_INTERVAL);

			// Cancels the `Timeout` object created by `setInterval`
			return () => clearInterval(intervalID);
		}
	}, [snake, isGameOver, isPaused]);

	// Update snake position in the game
	const moveSnake = () => {
		const snakeHead = snake[0];
		const newHead = { ...snakeHead }; // create a copy object of snake head
		// Check if game over
		if (checkGameOver(snakeHead, GAME_BOUNDS)) {
			// As moveSnake is run every few seconds inside `useEffect`
			// `setIsGameOver` will be continuously updated
			// and we want it gameOver to newGame
			// and we can do it with prev - previous state of isGameOver
			setIsGameOver((prev) => !prev);
			return;
		}
		switch (direction) {
			case Direction.Up:
				newHead.y += 1;
				break;
			case Direction.Down:
				newHead.y -= 1;
				break;
			case Direction.Left:
				newHead.x -= 1;
				break;
			case Direction.Right:
				newHead.x += 1;
				break;
			default:
				break;
		}
		// Check if eat food then snake grows up
		if (checkEatFood(newHead, food, 2)) {
			setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
			setSnake([newHead, ...snake]);
			setScore(score + SCORE_INCREMENT);
		} else {
			// Use slice to remove the last part of the snake when move to new position
			setSnake([newHead, ...snake.slice(0, -1)]);
		}
	};

	// Function to handle snake movement in the game
	const handleGesutre = (event: GestureEventType) => {
		const { translationX, translationY } = event.nativeEvent;
		if (Math.abs(translationX) > Math.abs(translationY)) {
			// Moving right
			if (translationX > 0) {
				setDirection(Direction.Right);
			}
			// Moving left
			else {
				setDirection(Direction.Left);
			}
		} else {
			// Moving up
			if (translationY > 0) {
				setDirection(Direction.Up);
			}
			// Moving down
			else {
				setDirection(Direction.Down);
			}
		}
	};

	return (
		<PanGestureHandler onGestureEvent={handleGesutre}>
			<SafeAreaView style={styles.container}>
				<View style={styles.boundaries}>
					<Snake snake={snake} />
					<Food
						x={food.x}
						y={food.y}
					/>
				</View>
			</SafeAreaView>
		</PanGestureHandler>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.primary,
	},
	boundaries: {
		flex: 1,
		borderColor: Colors.primary,
		borderWidth: 12,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		backgroundColor: Colors.background,
	},
});

export default Game;
