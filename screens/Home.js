import React, { useContext, useEffect, useState } from 'react';

import { DataContext, loadData } from '../api/DataContext';
import { LANGUAGES } from '../util/Constants';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const Home = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    context = useContext(DataContext);
    const [language, setLanguage] = useState('');

    useEffect(() => {
        if (language) {
            loadData(language, context.dispatch);
            navigation.navigate('Introduction');
        }
    }, [language]);

    useEffect(() => {
        setLanguage('')
    }, [isFocused]);

    handleLanguageSelect = (language) => {
        context.dispatch({ type: 'SET_LANGUAGE', data: language });
        setLanguage(language);
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.image}
                source={require('../assets/home_background.gif')}>
                <View style={styles.overlay}>
                    <Text style={styles.heading}>Welcome</Text>
                    <Text style={styles.subHeading}>Please select a language</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleLanguageSelect(LANGUAGES.EN)}>
                        <Text style={styles.buttonText}>English</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleLanguageSelect(LANGUAGES.ID)}>
                        <Text style={styles.buttonText}>Bahasa Indonesia</Text>
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
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20%',
        padding: 20,
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#729c00',
        textAlign: 'center',
        marginBottom: 20,
    },
    subHeading: {
        fontSize: 17,
        fontWeight: 'normal',
        color: '#000',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#02709a',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 5,
        width: 200
    },
    buttonText: {
        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Home;