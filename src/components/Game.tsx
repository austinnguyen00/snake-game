import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../styles/colors';

const Game = () => {
	return (
		<SafeAreaView style={styles.container}>
			<Text>Game</Text>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.primary,
	},
});

export default Game;
