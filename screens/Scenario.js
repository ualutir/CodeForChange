import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../api/DataContext';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const Scenario = ({ navigation, route }) => {
    const context = useContext(DataContext);
    const scenarios = context.state.scenarios;
    const avatar = context.state.avatar;

    const [selectedScenario, setSelectedScenario] = useState(context.state.scenario || scenarios[0]);

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => setSelectedScenario(item)}
                style={[
                    { ...styles.carouselItem, backgroundColor: item.backgroundColor },
                    selectedScenario.id === item.id && styles.selectedItem,
                ]}
            >
                <Text style={styles.scenarioName}>{item.name}</Text>
                <Text style={styles.scenarioDesc}>{item.desc}</Text>
            </TouchableOpacity>
        );
    };

    const handleNextPress = () => {
        context.dispatch({ type: 'SET_SCENARIO', data: selectedScenario });
        navigation.navigate('Task');
    };

    return (
        <ImageBackground
            style={styles.image}
            source={require('../assets/home_background.gif')}>
            <View style={styles.container}>
                <Image style={styles.tinyLogo} source={avatar} />
                <Text style={styles.title}>Select Scenario</Text>
                <Carousel
                    data={scenarios}
                    renderItem={renderItem}
                    sliderWidth={390}
                    itemWidth={300}
                    loop={true}
                />
                <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
                    <Text style={styles.nextButtonText}>Next</Text>
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
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 0,
        height: '75%',
        width: '98%',
        borderColor: '#fff',
        borderWidth: 1,
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
        textAlign: 'justify',
        paddingTop: 10,
    },
    nextButton: {
        backgroundColor: '#00a8ff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: '-20%',
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 18,
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
});

export default Scenario;