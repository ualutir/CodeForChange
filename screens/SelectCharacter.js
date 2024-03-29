import React, { useState, useContext } from 'react';

import { DataContext, PLAYER_IMAGES } from '../api/DataContext';
import { View, Text, Image, StyleSheet, Pressable, ImageBackground, ScrollView, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { playSelectionSound, playNextSound } from '../api/Api';

const SelectCharacter = ({ navigation, route }) => {
    const { width, height } = Dimensions.get('window');
    const context = useContext(DataContext);
    const characters = context.state.characters;

    const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
    const [isScrolling, setIsScrolling] = useState(false);

    async function handleSelectCharacter(item){
        await playSelectionSound();
        setSelectedCharacter(item);
    }

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
        await playSelectionSound();
        setSelectedCharacter(characters[index]);
    };

    async function handleNextPress(){
        context.dispatch({ type: 'SET_CHARACTER', data: selectedCharacter.name });
        await playNextSound();
        navigation.navigate('Scenario');
    };

    return (
        <ImageBackground
            style={styles.image}
            source={require('../assets/home_background.gif')}>
            <View style={styles.container}>
                <Text style={styles.title}>{context.state.captions.Character}</Text>
                <Carousel
                    data={characters}
                    renderItem={renderItem}
                    sliderWidth={width}
                    itemWidth={width - (width / 100 * 30)}
                    loop={true}
                    style={styles.carousel}
                    onSnapToItem={handleSnapToItem}
                />
                <Pressable style={styles.nextButton} android_disableSound={true} onPress={handleNextPress}>
                    <Text style={styles.nextButtonText}>{context.state.captions.Next}</Text>
                </Pressable>
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