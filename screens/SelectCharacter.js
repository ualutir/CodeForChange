import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext, PLAYER_IMAGES } from '../api/DataContext';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Audio } from 'expo-av';

const SelectCharacter = ({ navigation, route }) => {
    const context = useContext(DataContext);
    const characters = context.state.characters;

    const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);

    async function handleSelectCharacter(item){
        const { sound } = await Audio.Sound.createAsync( require('../assets/selection.wav') );
        await sound.playAsync();
        setSelectedCharacter(item);
    }

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => handleSelectCharacter(item)}
                style={[
                    styles.carouselItem,
                    selectedCharacter.id === item.id && styles.selectedItem,
                ]}
            >
                <Image source={PLAYER_IMAGES[item.name]} style={styles.characterImage} />
                <Text style={styles.characterName}>{item.name}</Text>
                <Text style={styles.characterDesc}>{item.desc}</Text>
            </TouchableOpacity>
        );
    };

    const handleNextPress = () => {
        context.dispatch({ type: 'SET_CHARACTER', data: selectedCharacter.name });
        navigation.navigate('Scenario');
    };

    return (
        <ImageBackground
            style={styles.image}
            source={require('../assets/home_background.gif')}>
            <View style={styles.container}>
                <Text style={styles.title}>Select Character</Text>
                <Carousel
                    data={characters}
                    renderItem={renderItem}
                    sliderWidth={350}
                    itemWidth={250}
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
        fontSize: 22,
        fontWeight: 'bold',
        margin: 20,
        color: '#729c00',
    },
    carouselItem: {
        alignItems: 'center',
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
        height: '60%',
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
        textAlign: 'justify',
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