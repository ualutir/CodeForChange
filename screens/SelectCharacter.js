import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../api/DataContext';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const charImages = [
    {
        "image": require("../assets/character-1.gif"),
        "avatar": require("../assets/avt-1.png")
    },
    {
        "image": require("../assets/character-2.gif"),
        "avatar": require("../assets/avt-2.png")
    },
    {
        "image": require("../assets/character-3.gif"),
        "avatar": require("../assets/avt-3.png")
    }
];


const SelectCharacter = ({ navigation, route }) => {
    const context = useContext(DataContext);
    const characters = context.state.characters;

    const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
    const [selectedAvatar, setSelectedAvatar] = useState(charImages[0].avatar);

    const handleCharacterSelect = (char) => {
        setSelectedCharacter(char);
        setSelectedAvatar(charImages[parseInt(char.id) - 1].avatar)
    }

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => handleCharacterSelect(item)}
                style={[
                    styles.carouselItem,
                    selectedCharacter.id === item.id && styles.selectedItem,
                ]}
            >
                <Image source={charImages[parseInt(item.id) - 1].image} style={styles.characterImage} />
                <Text style={styles.characterName}>{item.name}</Text>
                <Text style={styles.characterDesc}>{item.desc}</Text>
            </TouchableOpacity>
        );
    };

    const handleNextPress = () => {
        navigation.navigate('Scenario', { selectedCharacter, avatar: selectedAvatar });
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
        fontSize: 22,
        fontWeight: 'bold',
        margin: 20,
        color: '#729c00',
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