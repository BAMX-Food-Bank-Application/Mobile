import React, { useEffect, useState } from 'react';
import userAuth from '../hooks/userAuth';

// Libs
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import Login from '../features/SignUpAndRegistration/views/Login';
import SingleDonation from '../features/SignUpAndRegistration/views/SingleDonation';
import Password from '../features/SignUpAndRegistration/views/Password';
import HomeScreen from '../features/Dashboard/views/HomeScreen';
import Email from '../features/SignUpAndRegistration/views/Email';
import CreateRequest from '../features/Dashboard/views/CreateRequest';
import RequestDetails from '../features/Dashboard/views/RequestDetails';
import ProfileDetails from '../features/Dashboard/views/ProfileDetails';
import Confirmation from '../features/SignUpAndRegistration/views/Confirmation';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const [verification, setVerification] = useState(false);

  const {user} = userAuth();

  useEffect(() => {
    user != null ? setVerification(user.emailVerified): null;
  }, [user])

  return (     
    user? 
      verification?
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Confirmation"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="CreateRequest" component={CreateRequest} />
          <Stack.Screen name='Confirmation' component={Confirmation} />
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
        </Stack.Navigator>
      </NavigationContainer>
    :      
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Password" component={Password} />
      <Stack.Screen name="SingleDonation" component={SingleDonation}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}