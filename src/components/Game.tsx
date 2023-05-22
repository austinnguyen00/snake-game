import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Colors } from '../styles/colors';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Coordinate, Direction, GestureEventType } from '../types/types';
import { useState } from 'react';
import Snake from './Snake';

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
		borderWidth: 25,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		backgroundColor: Colors.background,
	},
});

export default Game;
