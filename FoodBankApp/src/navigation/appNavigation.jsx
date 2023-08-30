import React from 'react';
import userAuth from '../hooks/userAuth';

// Libs
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import Login from '../features/SignUpAndRegistration/components/Login';
import Registration from '../features/SignUpAndRegistration/components/Registration';
import HomeScreen from '../features/Dashboard/views/HomeScreen';
import Confirmation from '../features/SignUpAndRegistration/components/Confirmation';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const {user} = userAuth();

  if (user && user.emailVerified) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Confirmation" component={Confirmation} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="Confirmation" component={Confirmation} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
