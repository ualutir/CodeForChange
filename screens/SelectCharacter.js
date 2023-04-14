import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const characters = [
    {
        id: '1',
        name: 'Ethel',
        desc: '20 years old female mother of 3 month baby student.',
        image: require('../assets/Ethel.png'),
    },
    {
        id: '2',
        name: 'Benjie',
        desc: '16-years old male off-school.',
        image: require('../assets/Benjie.png'),
    },
    {
        id: '3',
        name: 'Gelo',
        desc: '24 years old male call center agent single.',
        image: require('../assets/Gelo.png'),
    },
];

const SelectCharacter = ({ navigation }) => {
    const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => setSelectedCharacter(item)}
                style={[
                    styles.carouselItem,
                    selectedCharacter.id === item.id && styles.selectedItem,
                ]}
            >
                <Image source={item.image} style={styles.characterImage} />
                <Text style={styles.characterName}>{item.name}</Text>
                <Text style={styles.characterDesc}>{item.desc}</Text>
            </TouchableOpacity>
        );
    };

    const handleNextPress = () => {
        navigation.navigate('Scenario', { selectedCharacter });
    };

    return (
        <ImageBackground
            style={styles.image}
            source={require('../assets/background_vertical.png')}>
            <View style={styles.container}>
                <Text style={styles.title}>Select Character</Text>
                <Carousel
                    data={characters}
                    renderItem={renderItem}
                    sliderWidth={300}
                    itemWidth={200}
                    loop={true}
                    style={styles.carousel}
                />
                <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground >
    );
};

SelectCharacter.propTypes = {
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
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 0,
        height: '85%',
    },
    selectedItem: {
        borderColor: '#00c8c2',
        borderWidth: 3,
    },
    characterImage: {
        width: '100%',
        height: '70%',
        marginBottom: 10,
    },
    characterName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    characterDesc: {
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
        marginTop: '-15%',
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

export default SelectCharacter;