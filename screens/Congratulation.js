import React, { useContext } from 'react';

import { DataContext } from '../api/DataContext';
import { StyleSheet, Text, View, Pressable, ImageBackground, ScrollView } from 'react-native';

const Congratulation = ({ navigation }) => {
    const context = useContext(DataContext);
    const scenarioImage = context.state.scenarioImage;
    const congratulationMessage = context.state.scenario.congratulationMessage;
    const captions = context.state.captions;
    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.image}
                source={require('../assets/Congratulations.gif')}>
                <View style={styles.overlay}>
                    <ScrollView
                        nestedScrollEnabled={true}
                        contentContainerStyle={styles.scrollContainer}
                    >
                        <Text style={styles.intro}>{congratulationMessage}</Text>
                    </ScrollView>
                    <Pressable
                        style={styles.button}
                        onPress={() => navigation.navigate('Summary')}>
                        <Text style={styles.buttonText}>{captions.Continue}</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    );
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
        marginVertical: '70%',
        marginHorizontal: 50,
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        height: '45%'
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#729c00',
        textAlign: 'center',
        marginBottom: 20,
    },
    intro: {
        fontSize: 15,
        fontWeight: 'normal',
        color: '#105b9c',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#00a8ff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    scrollContainer: {
        paddingHorizontal: 15, // Adjust the padding as needed
    },
});

export default Congratulation;