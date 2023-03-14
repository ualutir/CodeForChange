import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const scenarios = [
    {
        id: '1',
        name: 'Scenario 1',
        desc: 'Pests are a common problem in agriculture, and can have devastating effects on crops. Farmers must be vigilant in monitoring their fields for signs of infestation, and take prompt action to control the spread of pests. In this scenario, a farmer notices signs of pest damage in their crop, and must decide what course of action to take. They can choose to use chemical pesticides to control the infestation, but this comes with risks to human health and the environment.',
        backgroundColor: 'rgba(255, 255, 0, 0.3);',
    },
    {
        id: '2',
        name: 'Scenario 2',
        desc: 'Healthy soil is essential for successful agriculture, but many factors can impact soil health, such as erosion, nutrient depletion, and pollution. In this scenario, a farmer notices that their soil is becoming depleted, and must take action to restore its health. They can choose to apply chemical fertilizers to provide the necessary nutrients, but this can harm the soil microbiome and reduce soil fertility in the long run.',
        backgroundColor: 'rgba(225, 225, 255, 0.5);',
    },
    {
        id: '3',
        name: 'Scenario 3',
        desc: 'Water is a critical resource in agriculture, but it can also be a source of pollution if not managed properly. In this scenario, a farmer is faced with a water management challenge. They must decide how to prevent water pollution on their farm, while also ensuring that their crops receive enough water to grow. They can choose to apply chemical fertilizers and pesticides, which can easily runoff and pollute nearby water sources. Alternatively, they can opt for sustainable water management practices, such as rainwater harvesting.',
        backgroundColor: 'rgba(0, 255, 255, 0.3);',
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
        navigation.navigate('Scenario', { selectedScenario });
    };

    return (
        <ImageBackground
            style={styles.image}
            source={require('../assets/home_background.png')}>
            <View style={styles.container}>
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
        </ImageBackground >
    );
};

Scenario.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '20%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10,
        color: '#044774'
    },
    carouselItem: {
        alignItems: 'center',
        justifyContent: 'top',
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 0,
        height: '85%',
    },
    selectedItem: {
        borderColor: '#000',
        borderWidth: 2,
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
        marginTop: -20,
        backgroundColor: '#019305',
        padding: 10,
        borderRadius: 5,
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
});

export default Scenario;