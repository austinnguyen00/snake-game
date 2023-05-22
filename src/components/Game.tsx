import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../styles/colors';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { GestureEventType } from '../types/types';

const handleGesutre = (event: GestureEventType) => {
	const { translationX, translationY } = event.nativeEvent;
	if (Math.abs(translationX) > Math.abs(translationY)) {
		// Moving right
		if (translationX > 0) {
		}
		// Moving left
		else {
		}
	} else {
		// Moving up
		if (translationY > 0) {
		}
		// Moving down
		else {
		}
	}
};

const Game = () => {
	return (
		<PanGestureHandler onGestureEvent={handleGesutre}>
			<SafeAreaView style={styles.container}>
				<Text>Game</Text>
			</SafeAreaView>
		</PanGestureHandler>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.primary,
	},
});

export default Game;
