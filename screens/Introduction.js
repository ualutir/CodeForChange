import React from 'react';
import { PropTypes } from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';

const Introduction = ({ navigation }) => {
    const intro = "Agriculture is the practice of cultivating crops, raising livestock, and producing food, fiber, and other products to sustain human life. It is a fundamental part of human civilization and has been practiced for thousands of years, with advances in technology and scientific knowledge transforming the way we grow and produce our food. Agriculture plays a vital role in the economy, providing employment and income for millions of people around the world. With a rapidly growing global population, sustainable agriculture practices are essential to meet the increasing demand for food and reduce the impact on the environment."
    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.image}
                source={require('../assets/home_background.png')}>
                <View style={styles.overlay}>
                    <Text style={styles.heading}>Introduction</Text>
                    <Text style={styles.intro}>{intro}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Character')}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

Introduction.propTypes = {
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
        fontSize: 25,
        fontWeight: 'bold',
        color: '#729c00',
        textAlign: 'center',
        marginBottom: 20,
    },
    intro: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#105b9c',
        textAlign: 'left',
        marginBottom: 20,
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

export default Introduction;