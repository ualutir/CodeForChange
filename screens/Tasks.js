import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Task = ({ navigation }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleNext = () => {
        if (selectedOption) {
            navigation.navigate('Feedback');
        } else {
            // show error message
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Task</Text>
            <Text style={styles.description}>Select the best option:</Text>
            <TouchableOpacity
                style={[styles.option, selectedOption === 'option1' && styles.selectedOption]}
                onPress={() => handleOptionSelect('option1')}>
                <Text style={styles.optionText}>Option 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.option, selectedOption === 'option2' && styles.selectedOption]}
                onPress={() => handleOptionSelect('option2')}>
                <Text style={styles.optionText}>Option 2</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.option, selectedOption === 'option3' && styles.selectedOption]}
                onPress={() => handleOptionSelect('option3')}>
                <Text style={styles.optionText}>Option 3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
});

export default Introduction;
