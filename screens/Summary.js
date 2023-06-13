import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DataContext } from '../api/DataContext';
import { View, Text, StyleSheet, Pressable, ImageBackground, Image, ScrollView, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const Scenario = ({ navigation, route }) => {
    const { width, height } = Dimensions.get('window');
    const context = useContext(DataContext);
    const scenario = context.state.scenario;
    const scenarioImage = context.state.scenarioImage;
    const captions = context.state.captions;
    const avatar = context.state.avatar;

    const renderItem = ({ item, index }) => {
        return (
            <View
                style={[
                    { ...styles.carouselItem }
                ]}>
                <ScrollView
                    nestedScrollEnabled={true}
                    contentContainerStyle={styles.scrollContainer}
                >
                    <Text style={styles.scenarioName}>{`${captions.Task} ${item.id}`}</Text>
                    <Text style={styles.scenarioDesc}>{item.desc}</Text>
                    <Text style={styles.ansName}>{captions.YourAnswer}</Text>
                    <Text style={styles.ansDesc}>{item.options[context.state.options[scenario.id][item.id] - 1].desc}</Text>
                </ScrollView>
            </View >
        );
    };

    const handleScenarioPress = () => {
        navigation.navigate('Scenario');
    };

    const handleNextPress = () => {
        navigation.navigate('Home');
    };

    return (
        <ImageBackground
            style={styles.image}
            source={scenarioImage}
            imageStyle={{ opacity: 0.6 }}
        >
            <View style={styles.container}>
                <Image style={styles.tinyLogo} source={avatar} />
                <Text style={styles.title}>{captions.Summary}</Text>
                <Carousel
                    data={scenario.tasks}
                    renderItem={renderItem}
                    sliderWidth={width}
                    itemWidth={width - (width / 100 * 30)}
                    loop={true}
                />
                <Pressable
                    style={{ ...styles.button, marginTop: -100 }}
                    android_disableSound={true}
                    onPress={handleScenarioPress}>
                    <Text style={styles.buttonText}>{captions.NextScenario}</Text>
                </Pressable>
                <Pressable
                    style={styles.button}
                    android_disableSound={true}
                    onPress={handleNextPress}>
                    <Text style={styles.buttonText}>{captions.Exit}</Text>
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
        paddingTop: 40,
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
        width: '98%',
        borderColor: '#fff',
        borderWidth: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
        textAlign: 'center',
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
        textAlign: 'center',
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
        width: 60,
        height: 60,
        marginLeft: '70%',
        borderRadius: 35,
    }
});

export default Scenario;