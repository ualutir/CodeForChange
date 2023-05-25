import React, { useState, useContext } from 'react';

import { DataContext, PLAYER_IMAGES } from '../api/DataContext';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Audio } from 'expo-av';

const SelectCharacter = ({ navigation, route }) => {
    const context = useContext(DataContext);
    const characters = context.state.characters;

    const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
    const [isScrolling, setIsScrolling] = useState(false);

    const renderItem = ({ item, index }) => {
        return (
            <View
                disabled={isScrolling}
                style={[
                    styles.carouselItem,
                    selectedCharacter.id === item.id && styles.selectedItem,
                ]}
            >
                <Image source={PLAYER_IMAGES[item.name]} style={styles.characterImage} />
                <Text style={styles.characterName}>{item.name}</Text>
                <ScrollView
                    nestedScrollEnabled={true}
                    contentContainerStyle={styles.scrollContainer}
                >
                    <Text style={styles.characterDesc}>{item.desc}</Text>
                </ScrollView>
            </View>
        );
    };

    const handleSnapToItem = async (index) => {
        const { sound } = await Audio.Sound.createAsync(require('../assets/selection.wav'));
        await sound.playAsync();
        setSelectedCharacter(characters[index]);
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
                    sliderWidth={390}
                    itemWidth={300}
                    loop={true}
                    style={styles.carousel}
                    onSnapToItem={handleSnapToItem}
                />
                <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground >
    );
};



const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10%',
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
    scrollContainer: {
        paddingHorizontal: 15, // Adjust the padding as needed
    },
    characterImage: {
        width: '70%',
        height: '55%',
        marginTop: 0,
    },
    characterName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    characterDesc: {
        fontSize: 14,
        fontWeight: 'normal',
        textAlign: 'center',
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