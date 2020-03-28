import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import Details from './pages/Details';
import Incidents from './pages/Incidents';

const AppStack = createStackNavigator()

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen component={Incidents} name="Incidents" />
                <AppStack.Screen component={Details} name="Details" />
            </AppStack.Navigator>
        </NavigationContainer>
    )

}