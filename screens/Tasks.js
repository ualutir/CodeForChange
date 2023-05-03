import React, { useState, useContext, useEffect } from 'react';
import Carousel from 'react-native-snap-carousel';
import { PropTypes } from 'prop-types';
import { DataContext } from '../api/DataContext';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';

const Tasks = ({ navigation, route }) => {
    const tasks = route.params.tasks;
    const avatar = route.params.avatar;
    const taskId = route.params.taskId || 0;

    const [selectedTask, setSelectedTask] = useState(tasks[taskId - 1]);
    const [selectedOption, setSelectedOption] = useState(1);

    useEffect(() => {
        setSelectedTask(tasks[taskId - 1]);
    }, [taskId])

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleNext = () => {
        navigation.navigate('Feedback', { tasks, avatar, 'taskDone': selectedTask });
    };

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => handleOptionSelect(item)}
                style={[
                    { ...styles.carouselItem },
                    selectedOption.id === item.id && styles.selectedOption,
                ]}
            >
                <Text style={styles.optionHeader2}>{item.title}</Text>
                <Text style={styles.optionText}>{item.desc}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <ImageBackground
            style={styles.image}
            source={require('../assets/home_background.gif')}>
            <View style={styles.container}>
                <Image style={styles.tinyLogo} source={avatar} />
                <Text style={styles.heading}>{`Task ${selectedTask.id}`}</Text>

                <View style={styles.overlay}>
                    <Text style={styles.description}>{selectedTask.desc}</Text>
                </View>
                <Text style={styles.instruction}>Select the best option below and click Next.</Text>
                <Carousel
                    data={selectedTask.options}
                    renderItem={renderItem}
                    sliderWidth={390}
                    itemWidth={300}
                    loop={true}
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
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#729c00',
    },
    description: {
        fontSize: 15,
        marginBottom: 10,
    },
    instruction: {
        fontSize: 15,
        marginBottom: 20,
        color: '#0071C5',
        fontWeight: 'bold',
    },
    selectedOption: {
        backgroundColor: 'rgba(100, 225, 255, 0.5)',
        borderColor: '#00a8ff',
    },
    optionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#729c00',
    },
    optionHeader2: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    optionText: {
        fontSize: 15,
        fontWeight: 'normal',
        color: '#333',
        paddingTop: 10
    },
    button: {
        backgroundColor: '#00a8ff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: -150
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
        width: 70,
        height: 70,
        marginLeft: '70%',
        borderRadius: 35,
    },
    carouselItem: {
        alignItems: 'center',
        justifyContent: 'top',
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
        marginHorizontal: 0,
        height: '57%',
        width: '98%',
        borderColor: '#fff',
        borderWidth: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderColor: '#00a8ff',
    },
    overlay: {
        margin: 20,
        padding: 20,
        backgroundColor: 'rgba(200, 255, 255, 0.5)',
        borderRadius: 10,
    },
});

export default Tasks;
