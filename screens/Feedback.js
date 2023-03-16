import React from 'react';
import { PropTypes } from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';

const Feedback = ({ navigation }) => {
    const intro = "Agriculture is the practice of cultivating crops, raising livestock, and producing food, fiber, and other products to sustain human life. It is a fundamental part of human civilization and has been practiced for thousands of years, with advances in technology and scientific knowledge transforming the way we grow and produce our food. Agriculture plays a vital role in the economy, providing employment and income for millions of people around the world. With a rapidly growing global population, sustainable agriculture practices are essential to meet the increasing demand for food and reduce the impact on the environment."
    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.image}
                source={require('../assets/home_background.png')}>
                <View style={styles.overlay}>
                    <Text style={styles.heading}>Feedback</Text>
                    <Text style={styles.description}>You have selected the best option!</Text>
                    <Text style={styles.feedback}>Water is a critical resource in agriculture, but it can also be a source of pollution if not managed properly. In this scenario, a farmer is faced with a water management challenge. They must decide how to prevent water pollution on their farm, while also ensuring that their crops receive enough water to grow. They can choose to apply chemical fertilizers and pesticides, which can easily runoff and pollute nearby water sources. Alternatively, they can opt for sustainable water management practices, such as rainwater harvesting.</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Scenario')}>
                        <Text style={styles.buttonText}>Play Again</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

Feedback.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        marginVertical: 120,
        marginHorizontal: 50,
        alignItems: 'center',
        justifyContent: 'top',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
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
    button: {
        backgroundColor: '#00a8ff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: '10%'
    },
    buttonText: {
        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});


export default Feedback;