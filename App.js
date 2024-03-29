import React, { useEffect } from 'react';
import { Image, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DataProvider } from './api/DataContext';
import Home from './screens/Home';
import Introduction from './screens/Introduction';
import SelectCharacter from './screens/SelectCharacter';
import Scenario from './screens/Scenario';
import Task from './screens/Task';
import Feedback from './screens/Feedback';
import Summary from './screens/Summary';
import Congratulation from './screens/Congratulation';
import { playBackgroundMusic } from './api/Api';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const Stack = createStackNavigator();

export default function App() {
    useEffect(() => {
        playAppBgMusic();
    }, []);


    const playAppBgMusic = async () => {
        await playBackgroundMusic();
    }

    return (
        <DataProvider>
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
                        name="Task"
                        options={{
                            title: '',
                            headerBackImage: () => <Image style={{ marginLeft: 10, width: 24, height: 24 }} source={require('./assets/arrow_back.png')} />,
                            headerTransparent: true,
                            headerBackTitle: ' ',
                        }}
                        component={Task}
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
                    <Stack.Screen
                        name="Summary"
                        options={{
                            title: '',
                            headerBackImage: () => <Image style={{ marginLeft: 10, width: 24, height: 24 }} source={require('./assets/arrow_back.png')} />,
                            headerTransparent: true,
                            headerBackTitle: ' ',
                        }}
                        component={Summary}
                    />
                    <Stack.Screen
                        name="Congratulation"
                        options={{
                            title: '',
                            headerBackImage: () => <Image style={{ marginLeft: 10, width: 24, height: 24 }} source={require('./assets/arrow_back.png')} />,
                            headerTransparent: true,
                            headerBackTitle: ' ',
                        }}
                        component={Congratulation}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </DataProvider>
    );
}