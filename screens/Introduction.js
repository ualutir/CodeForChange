import React from 'react';
import { PropTypes } from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';

const Introduction = ({ navigation }) => {
    const intro = "In this game, you will have to assist the characters in each scenario to unravel the learning on Waste Management particularly in handling food waste thru Black Soldier Fly Technology. Included in the scenario are options you need to undergo to appreciate the importance and impact of doing the BSF Technology. Read carefully the scenarios and the options provided to learn more. At the end of the game, you will be given a badge as Captain BiGE!"
    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.image}
                source={require('../assets/background_vertical.png')}>
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