import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const FeedbackScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={require('path_to_feedback_image')} style={styles.image} />
            <Text style={styles.heading}>Feedback</Text>
            <Text style={styles.description}>You have selected the best option!</Text>
            <Text style={styles.feedback}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    feedback: {
        fontSize: 16,
    },
});

export default FeedbackScreen;
