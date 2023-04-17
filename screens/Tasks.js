import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';

const Tasks = ({ navigation }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleNext = () => {
        navigation.navigate('Feedback');
    };

    return (
        <ImageBackground
            style={styles.image}
            source={require('../assets/background_vertical.png')}>
            <View style={styles.container}>
                <Text style={styles.heading}>Task</Text>
                <Text style={styles.description}>Select the best option:</Text>
                <TouchableOpacity
                    style={[styles.option, selectedOption === 'option1' && styles.selectedOption]}
                    onPress={() => handleOptionSelect('option1')}>
                    <Text style={styles.optionHeader}>Option 1</Text>
                    <Text style={styles.optionText}>Pests are a common problem in agriculture, and can have devastating effects on crops. Farmers must be vigilant in monitoring their fields for signs of infestation</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.option, selectedOption === 'option2' && styles.selectedOption]}
                    onPress={() => handleOptionSelect('option2')}>
                    <Text style={styles.optionHeader}>Option 2</Text>
                    <Text style={styles.optionText}>Healthy soil is essential for successful agriculture, but many factors can impact soil health, such as erosion, nutrient depletion, and pollution.</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.option, selectedOption === 'option3' && styles.selectedOption]}
                    onPress={() => handleOptionSelect('option3')}>
                    <Text style={styles.optionHeader}>Option 3</Text>
                    <Text style={styles.optionText}>Water is a critical resource in agriculture, but it can also be a source of pollution if not managed properly. In this scenario, a farmer is faced with a water management challenge. </Text>
                </TouchableOpacity>
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
        paddingTop: '40%',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
    },
    option: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        width: '90%'
    },
    selectedOption: {
        backgroundColor: 'rgba(100, 225, 255, 0.5)',
        borderColor: '#00a8ff',
    },
    optionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
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
        marginTop: 20,
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
});

export default Tasks;
