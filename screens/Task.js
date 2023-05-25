import React, { useState, useContext, useEffect } from 'react';
import { DataContext } from '../api/DataContext';
import Carousel from 'react-native-snap-carousel';
import { PropTypes } from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, ScrollView, Dimensions } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const Tasks = ({ navigation, route }) => {
    const { width, height } = Dimensions.get('window');
    const isFocused = useIsFocused();
    const context = useContext(DataContext);
    const scenarioImage = context.state.scenarioImage;
    const task = context.state.task;
    const avatar = context.state.avatar;

    const [selectedOption, setSelectedOption] = useState(task.options[0]);

    useEffect(() => {
        if (isFocused) {
            setSelectedOption(task.options[0])
        }
    }, [isFocused]);

    const handleNext = () => {
        context.dispatch({ type: 'SET_OPTION', data: selectedOption });
        navigation.navigate('Feedback');
    };

    const handleSnapToItem = (index) => {
        setSelectedOption(task.options[index]);
    };

    const renderItem = ({ item, index }) => {
        return (
            <View
                style={[
                    { ...styles.carouselItem },
                    selectedOption.id === item.id && styles.selectedOption,
                ]}
            >
                <Text style={styles.optionHeader2}>{item.title}</Text>
                <ScrollView
                    nestedScrollEnabled={true}
                    contentContainerStyle={styles.scrollContainer}
                >
                    <Text style={styles.optionText}>{item.desc}</Text>
                </ScrollView>
            </View>
        );
    };

    return (
        <ImageBackground
            style={styles.image}
            source={scenarioImage}
            imageStyle={{ opacity: 0.6 }}
        >
            <View style={styles.container} key={isFocused.toString()}>
                <View style={styles.header}>
                    <Text style={styles.heading}>{`Task ${task.id}`}</Text>
                    <Image style={styles.tinyLogo} source={avatar} />
                </View>

                <View style={styles.overlay}>
                    <ScrollView
                        nestedScrollEnabled={true}
                        contentContainerStyle={styles.scrollContainer}
                    >
                        <Text style={styles.description}>{task.desc}</Text>
                        <Text style={styles.instruction}>Select the best option below and proceed Next.</Text>
                    </ScrollView>
                </View>
                <Carousel
                    data={task.options}
                    renderItem={renderItem}
                    sliderWidth={width}
                    itemWidth={width - (width / 100 * 30)}
                    loop={true}
                    onSnapToItem={handleSnapToItem}
                />
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

Tasks.propTypes = {
    navigation: PropTypes.object.isRequired,
};


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '15%',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        justifyContent: 'center',
        color: 'black',
    },
    description: {
        fontSize: 15,
        marginBottom: 10,
        textAlign: 'justify'
    },
    instruction: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
    },
    selectedOption: {
        backgroundColor: 'rgba(100, 225, 255, 0.9)',
        borderColor: '#00a8ff',
    },
    optionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    optionHeader2: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    optionText: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#333',
        paddingTop: 10,
        textAlign: 'justify'
    },
    button: {
        backgroundColor: '#00a8ff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: -140
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
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
        marginLeft: '50%',
        borderRadius: 35,
    },
    carouselItem: {
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        marginHorizontal: 0,
        height: '55%',
        width: '98%',
        borderColor: '#fff',
        borderWidth: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#00a8ff',
    },
    overlay: {
        margin: 20,
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 10,
        height: 250
    },
    scrollContainer: {
        paddingHorizontal: 15, // Adjust the padding as needed
    },
});

export default Tasks;
