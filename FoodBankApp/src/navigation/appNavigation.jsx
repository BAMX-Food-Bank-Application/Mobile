import React from 'react';
import userAuth from '../hooks/userAuth';

// Libs
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import Login from '../features/SignUpAndRegistration/components/Login';
import Registration from '../features/SignUpAndRegistration/components/Registration';
import Confirmation from '../features/SignUpAndRegistration/components/Confirmation';
import Wait from '../features/SignUpAndRegistration/components/Wait';
import Password from '../features/SignUpAndRegistration/components/Password';
import HomeScreen from '../features/Dashboard/views/HomeScreen';
import Email from '../features/SignUpAndRegistration/components/Email';
import { counterEvent } from 'react-native/Libraries/Performance/Systrace';

const Stack = createNativeStackNavigator();

const _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('SignUpRequest');
    if (value !== null) return true;
    else return false;
    
  } catch (error) {
    console.log('Error with async storage: ', error)
  }
};

export default function AppNavigation() {
  const {user} = userAuth();
  if(_retrieveData() === true){
    console.log('Waiting for verification');
    return (      
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Wait"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Wait" component={Wait} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else if (user == null) {
    console.log('No user logged in');
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="Confirmation" component={Confirmation} />
          <Stack.Screen name="Wait" component={Wait} />
          <Stack.Screen name="Password" component={Password} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } 
  else if(user && user.emailVerified === false){
    console.log('Email not verified');
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Wait"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Wait" component={Wait} />
          <Stack.Screen name="Email" component={Email} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  else if (user && user.emailVerified === true) {
    console.log('User logged in');
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
