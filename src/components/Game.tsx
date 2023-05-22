import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../styles/colors';

const Game = () => {
	return (
		<SafeAreaView>
			<Text>Game</Text>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.primary,
	},
});

export default Game;
