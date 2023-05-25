import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../api/DataContext';
import { View, Text, StyleSheet, Pressable, ImageBackground, Image, ScrollView, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { playAnswerSound, playNextSound } from '../api/Api';

const Scenario = ({ navigation, route }) => {
    const { width, height } = Dimensions.get('window');
    const context = useContext(DataContext);
    const scenarios = context.state.scenarios;
    const avatar = context.state.avatar;

    const [selectedScenario, setSelectedScenario] = useState(context.state.scenario || scenarios[0]);

    const renderItem = ({ item, index }) => {
        return (
            <View
                style={[
                    { ...styles.carouselItem, backgroundColor: item.backgroundColor },
                    selectedScenario.id === item.id && styles.selectedItem,
                ]}
            >
                <Text style={styles.scenarioName}>{item.name}</Text>
                <ScrollView
                    nestedScrollEnabled={true}
                    contentContainerStyle={styles.scrollContainer}
                >
                    <Text style={styles.scenarioDesc}>{item.desc}</Text>
                </ScrollView>
            </View>
        );
    };

    async function handleSnapToItem(index){
        await playAnswerSound();
        setSelectedScenario(scenarios[index]);
    };

    async function handleNextPress(){
        context.dispatch({ type: 'SET_SCENARIO', data: selectedScenario });
        await playNextSound();
        navigation.navigate('Task');
    }

    return (
        <ImageBackground
            style={styles.image}
            source={require('../assets/home_background.gif')}>
            <View style={styles.container}>
                <Image style={styles.tinyLogo} source={avatar} />
                <Text style={styles.title}>{context.state.captions.Scenario}</Text>
                <Carousel
                    data={scenarios}
                    renderItem={renderItem}
                    sliderWidth={width}
                    itemWidth={width - (width / 100 * 30)}
                    loop={true}
                    onSnapToItem={handleSnapToItem}
                />
                <Pressable style={styles.nextButton} android_disableSound={true} onPress={handleNextPress}>
                    <Text style={styles.nextButtonText}>{context.state.captions.Next}</Text>
                </Pressable>
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
    scrollContainer: {
        paddingHorizontal: 15, // Adjust the padding as needed
    },
    carouselItem: {
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 0,
        height: '75%',
        width: '100%',
        borderColor: '#fff',
        borderWidth: 1,
    },
    selectedItem: {
        borderColor: '#00a8ff',
        backgroundColor: 'rgba(100, 225, 255, 0.8)',
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
        textAlign: 'center',
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
        width: 60,
        height: 60,
        marginLeft: '70%',
        borderRadius: 35,
    },
});

export default Scenario;