import React, { useContext } from 'react';

import { DataContext } from '../api/DataContext';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';

const Introduction = ({ navigation }) => {
    const context = useContext(DataContext);
    const intro = context.state.introduction;
    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.image}
                source={require('../assets/home_background.gif')}>
                <View style={styles.overlay}>
                    <Text style={styles.heading}>Introduction</Text>
                    <ScrollView
                        nestedScrollEnabled={true}
                        contentContainerStyle={styles.scrollContainer}
                    >
                        <Text style={styles.intro}>{intro}</Text>
                    </ScrollView>
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
        marginVertical: 80,
        marginHorizontal: 50,
        alignItems: 'center',
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

export default Introduction;