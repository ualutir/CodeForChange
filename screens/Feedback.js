import React, { useContext } from 'react';
import { DataContext } from '../api/DataContext';
import { PropTypes } from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';

const Feedback = ({ navigation, route }) => {
    const context = useContext(DataContext);
    const scenario = context.state.scenario;
    const scenarioImage = context.state.scenarioImage;
    const task = context.state.task;
    const avatar = context.state.avatar;
    const nextTaskId = parseInt(task.id) < scenario.tasks.length ? parseInt(task.id) + 1 : 0;

    const handleNextTaskClick = () => {
        context.dispatch({ type: 'SET_TASK', data: scenario.tasks[nextTaskId - 1] });
        navigation.navigate('Task', {});
    }

    const handleSummaryClick = () => {
        navigation.navigate('Summary', {});
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.image}
                source={scenarioImage}
                imageStyle={{ opacity: 0.6 }}
            >
                < View style={styles.overlay} >
                    <Image style={styles.tinyLogo} source={avatar} />
                    <Text style={styles.heading}>Feedback</Text>
                    <ScrollView
                        nestedScrollEnabled={true}
                        contentContainerStyle={styles.scrollContainer}
                    >
                        <Text style={styles.feedback}>{context.state.option && context.state.option.feedback}</Text>
                    </ScrollView>
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
        marginVertical: 80,
        marginHorizontal: 50,
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 10,
    },
    scrollContainer: {
        paddingHorizontal: 15, // Adjust the padding as needed
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    feedback: {
        fontSize: 15,
        textAlign: 'center'
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
        width: 60,
        height: 60,
        marginLeft: '70%',
        borderRadius: 35,
    }
});


export default Feedback;