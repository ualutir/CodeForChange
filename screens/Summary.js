import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../api/DataContext';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const Scenario = ({ navigation, route }) => {
    const context = useContext(DataContext);
    const tasks = route.params.tasks;
    const avatar = route.params.avatar;

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={[
                    { ...styles.carouselItem }
                ]}
            >
                <Text style={styles.scenarioName}>{`Task ${item.id}`}</Text>
                <Text style={styles.scenarioDesc}>{item.desc}</Text>
                <Text style={styles.ansName}>Your Answer</Text>
                <Text style={styles.ansDesc}>{item.options[0].desc}</Text>
            </TouchableOpacity>
        );
    };

    const handleScenarioPress = () => {
        navigation.navigate('Scenario', { avatar });
    };

    const handleNextPress = () => {
        navigation.navigate('Home');
    };

    return (
        <ImageBackground
            style={styles.image}
            source={require('../assets/home_background.gif')}>
            <View style={styles.container}>
                <Image style={styles.tinyLogo} source={avatar} />
                <Text style={styles.title}>Summary</Text>
                <Carousel
                    data={tasks}
                    renderItem={renderItem}
                    sliderWidth={390}
                    itemWidth={300}
                    loop={true}
                />
                <TouchableOpacity
                    style={{ ...styles.button, marginTop: -130 }}
                    onPress={handleScenarioPress}>
                    <Text style={styles.buttonText}>Try Another Scenario</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleNextPress}>
                    <Text style={styles.buttonText}>Exit</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

Scenario.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '15%',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        margin: 20,
        color: '#729c00',
    },
    carouselItem: {
        alignItems: 'center',
        justifyContent: 'top',
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 0,
        height: '77%',
        width: '98%',
        borderColor: '#fff',
        borderWidth: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    selectedItem: {
        borderColor: '#00c8c2',
        borderWidth: 3,
    },
    scenarioImage: {
        width: '100%',
        height: '70%',
        marginBottom: 10,
    },
    scenarioName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    scenarioDesc: {
        fontSize: 15,
        fontWeight: 'normal',
        textAlign: 'left',
        paddingTop: 10
    },
    ansName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#006400',
        paddingTop: 20,
    },
    ansDesc: {
        fontSize: 15,
        fontWeight: 'normal',
        textAlign: 'left',
        paddingTop: 10,
        color: '#006400',
    },
    button: {
        backgroundColor: '#00a8ff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
        width: 200
    },
    buttonText: {
        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    tinyLogo: {
        width: 70,
        height: 70,
        marginLeft: '70%',
        borderRadius: 35,
    },
    inyLogo: {
        width: 70,
        height: 70,
        marginLeft: '70%',
        borderRadius: 35,
    }
});

export default Scenario;