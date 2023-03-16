import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Introduction from './screens/Introduction';
import SelectCharacter from './screens/SelectCharacter';
import Scenario from './screens/Scenario';
import Tasks from './screens/Tasks';
import Feedback from './screens/Feedback';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    options={{ title: '', headerBackTitle: null, headerTransparent: true }}
                    component={Home} />
                <Stack.Screen
                    name="Introduction"
                    options={{
                        title: '',
                        headerBackImage: () => <Image style={{ marginLeft: 10, width: 24, height: 24 }} source={require('./assets/arrow_back.png')} />,
                        headerTransparent: true,
                        headerBackTitle: ' ',
                    }}
                    component={Introduction} />
                <Stack.Screen
                    name="Character"
                    options={{
                        title: '',
                        headerBackImage: () => <Image style={{ marginLeft: 10, width: 24, height: 24 }} source={require('./assets/arrow_back.png')} />,
                        headerTransparent: true,
                        headerBackTitle: ' ',
                    }}
                    component={SelectCharacter}
                />
                <Stack.Screen
                    name="Scenario"
                    options={{
                        title: '',
                        headerBackImage: () => <Image style={{ marginLeft: 10, width: 24, height: 24 }} source={require('./assets/arrow_back.png')} />,
                        headerTransparent: true,
                        headerBackTitle: ' ',
                    }}
                    component={Scenario}
                />
                <Stack.Screen
                    name="Tasks"
                    options={{
                        title: '',
                        headerBackImage: () => <Image style={{ marginLeft: 10, width: 24, height: 24 }} source={require('./assets/arrow_back.png')} />,
                        headerTransparent: true,
                        headerBackTitle: ' ',
                    }}
                    component={Tasks}
                />
                <Stack.Screen
                    name="Feedback"
                    options={{
                        title: '',
                        headerBackImage: () => <Image style={{ marginLeft: 10, width: 24, height: 24 }} source={require('./assets/arrow_back.png')} />,
                        headerTransparent: true,
                        headerBackTitle: ' ',
                    }}
                    component={Feedback}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}