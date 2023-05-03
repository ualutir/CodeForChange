import React, { useState, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';

const Feedback = ({ navigation, route }) => {
    const tasks = route.params.tasks;
    const preTask = route.params.taskDone;
    const avatar = route.params.avatar;
    const nextTaskId = parseInt(preTask.id) < tasks.length ? parseInt(preTask.id) + 1 : 0;

    const handleNextTaskClick = () => {
        navigation.navigate('Tasks', { tasks: tasks, avatar, taskId: nextTaskId });
    }

    const handleSummaryClick = () => {
        navigation.navigate('Summary', { tasks, avatar });
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.image}
                source={require('../assets/home_background.gif')}>
                < View style={styles.overlay} >
                    <Image style={styles.tinyLogo} source={avatar} />
                    <Text style={styles.heading}>Feedback</Text>
                    <Text style={styles.feedback}>Water is a critical resource in agriculture, but it can also be a source of pollution if not managed properly. In this scenario, a farmer is faced with a water management challenge. They must decide how to prevent water pollution on their farm, while also ensuring that their crops receive enough water to grow. They can choose to apply chemical fertilizers and pesticides, which can easily runoff and pollute nearby water sources. Alternatively, they can opt for sustainable water management practices, such as rainwater harvesting.</Text>
                    {
                        nextTaskId == 0 ?
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleSummaryClick}>
                                <Text style={styles.buttonText}>Summary</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleNextTaskClick}>
                                <Text style={styles.buttonText}>Next Task</Text>
                            </TouchableOpacity>
                    }

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Scenario')}>
                        <Text style={styles.buttonText}>Exit</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground >
        </View >
    );
};

Feedback.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        marginVertical: 120,
        marginHorizontal: 50,
        alignItems: 'center',
        justifyContent: 'top',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    feedback: {
        fontSize: 16,
    },
    button: {
        backgroundColor: '#00a8ff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: '10%',
        width: 150
    },
    buttonText: {
        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tinyLogo: {
        width: 70,
        height: 70,
        marginLeft: '70%',
        borderRadius: 35,
    }
});


export default Feedback;