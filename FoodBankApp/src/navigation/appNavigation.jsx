import React from 'react';
import userAuth from '../hooks/userAuth';

// Libs
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import Login from '../features/SignUpAndRegistration/components/Login';
import Registration from '../features/SignUpAndRegistration/components/Registration';
import Confirmation from '../features/SignUpAndRegistration/components/Confirmation';
import Wait from '../features/SignUpAndRegistration/components/Wait';
import Password from '../features/SignUpAndRegistration/components/Password';
import HomeScreen from '../features/Dashboard/views/HomeScreen';
import Request from '../features/Dashboard/views/Request';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const {user} = userAuth();

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
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
          <Stack.Screen name="Login" component={HomeScreen} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="Confirmation" component={Confirmation} />
          <Stack.Screen name="Wait" component={Wait} />
          <Stack.Screen name="Password" component={Password} />
          <Stack.Screen name="Request" component={Request} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
