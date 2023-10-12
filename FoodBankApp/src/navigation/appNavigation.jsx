import React from 'react';
import userAuth from '../hooks/userAuth';

// Libs
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import Login from '../features/SignUpAndRegistration/views/Login';
import Registration from '../features/SignUpAndRegistration/views/Registration';
import Password from '../features/SignUpAndRegistration/views/Password';
import HomeScreen from '../features/Dashboard/views/HomeScreen';
import Email from '../features/SignUpAndRegistration/views/Email';
import CreateRequest from '../features/Dashboard/views/CreateRequest';
import RequestDetails from '../features/Dashboard/views/RequestDetails';
import ProfileDetails from '../features/Dashboard/views/ProfileDetails';
import wantDonation from '../features/Dashboard/views/WantDonation';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {

  const {user} = userAuth();

  return (     
    user? 
      user.emailVerified?
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{headerShown: false}}
          >
          <Stack.Screen name="Email" component={Email} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="CreateRequest" component={CreateRequest} />
          <Stack.Screen name = "RequestDetails" component = {RequestDetails}/>
          <Stack.Screen name = "ProfileDetails" component = {ProfileDetails}/>
        </Stack.Navigator>
      </NavigationContainer>
      :
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Email"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Email" component={Email} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    :      
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={wantDonation} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="Password" component={Password} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}