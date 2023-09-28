import React from 'react';
import userAuth from '../hooks/userAuth';

// Libs
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import Login from '../features/SignUpAndRegistration/views/Login';
import Registration from '../features/SignUpAndRegistration/views/Registration';
import Wait from '../features/SignUpAndRegistration/views/Wait';
import Password from '../features/SignUpAndRegistration/views/Password';
import HomeScreen from '../features/Dashboard/views/HomeScreen';
import Email from '../features/SignUpAndRegistration/views/Email';
import CreateRequest from '../features/Dashboard/views/CreateRequest';
import Confirmation from '../features/SignUpAndRegistration/views/Confirmation';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {

  const {user} = userAuth();

  return (     
    user? 
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Wait"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Wait" component={Wait} />
        <Stack.Screen name="Email" component={Email} />
        <Stack.Screen name="Confirmation" component={Confirmation} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CreateRequest" component={CreateRequest} />
      </Stack.Navigator>
    </NavigationContainer>
    :      
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="Password" component={Password} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}