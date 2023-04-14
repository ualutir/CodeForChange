import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const scenarios = [
    {
        id: '1',
        name: 'Scenario 1',
        desc: 'Food is listed as basic need of every living thing. Gelo consumes food  3 times a day, at an average of 855 grams per day. He produces 300 grams of food waste per day. Annually, Gelo and the rest of the population accumulates food waste up to 9,300 tons. This food waste contributes to environment degradation. What will Gelo do to minimize Mother Earths degradation due to food waste?',
        backgroundColor: 'rgba(255, 255, 0, 0.5);',
    },
    {
        id: '2',
        name: 'Scenario 2',
        desc: 'Learning from school about food waste management, Ethel decides to dispose or treat food wastes in their household. Especially, she wants to give her son clean air and good environment. Since she is a young mom, she wanted also to earn income while doing school so she can support her child. Help Ethel pick an activity that can both mitigate environment degradation and earning additional income?',
        backgroundColor: 'rgba(225, 225, 255, 0.5);',
    },
    {
        id: '3',
        name: 'Scenario 3',
        desc: 'Benjie learned from their community about efficient handling of food waste using black soldier fly. Since he is currently off-school, he manages to raise free-range chicken and backyard catfish at home in order to help his family to cover daily household expenses, he decides to join the Youth Organization and be trained with technical procedures of doing Black Soldier Fly (BSF).  Can you help Benjie decide on how to proceed?',
        backgroundColor: 'rgba(0, 255, 255, 0.5);',
    },
    {
        id: '4',
        name: 'Scenario 4',
        desc: 'One important practice that is being taught in the Youth Organization, on top of handling food waste, is the Efficient and Effective Waste Segregation. Benjie, Gelo and Ethel, living in the same community, has witnessed this best practice in the households - segregating waste that has positive impact, environmentally and economically. To help Benjie, Gelo and Ethel appreciate more on the relationship of volume and time needed to collect in order to achieve earning.',
        backgroundColor: 'rgba(0, 255, 150, 0.5);',
    },
    {
        id: '5',
        name: 'Scenario 5',
        desc: 'Benjie’s new role in the youth organization, is their Program Information Officer. Benjie is very active in communicating the best practices from their youth organization to inspire other youth organizations in nearby communities. Benjie is creating a presentation for other youth to appreciate the BSF project. Which earning is more exciting to highlight?',
        backgroundColor: 'rgba(0, 100, 200, 0.5);',
    },
];

const Scenario = ({ navigation }) => {
    const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);

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
        navigation.navigate('Tasks', { selectedScenario });
    };

    return (
        <ImageBackground
            style={styles.image}
            source={require('../assets/background_vertical.png')}>
            <View style={styles.container}>
                <Image style={styles.tinyLogo} source={require('../assets/Ethel_Profile.png')}/>
                <Text style={styles.title}>Select Scenario</Text>
                <Carousel
                    data={scenarios}
                    renderItem={renderItem}
                    sliderWidth={300}
                    itemWidth={200}
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
        fontSize: 18,
        fontWeight: 'bold',
        margin: 20,
        color: '#044774'
    },
    carouselItem: {
        alignItems: 'center',
        justifyContent: 'top',
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 0,
        height: '85%',
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
        textAlign: 'left',
        paddingTop: 10
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