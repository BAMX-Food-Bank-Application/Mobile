import React from 'react';
import userAuth from '../hooks/userAuth';

// Libs
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';

// Screens
import Login from '../features/SignUpAndRegistration/views/Login';
import Registration from '../features/SignUpAndRegistration/views/Registration';
import Wait from '../features/SignUpAndRegistration/views/Wait';
import Password from '../features/SignUpAndRegistration/views/Password';
import HomeScreen from '../features/Dashboard/views/HomeScreen';
import Email from '../features/SignUpAndRegistration/views/Email';
import CreateRequest from '../features/Dashboard/views/CreateRequest';
import { auth } from '../config/FirebaseConnection';

const Stack = createNativeStackNavigator();

const _retrieveData = async () => {
  try {
    const user = auth.currentUser;
    const check1 = (await firestore().collection('userData').doc(user.uid).get()).data().status;
    const check2 = user.emailVerified;
    if (check1 == true) {
      if(check2 == true) return 2;
      return 1;
    }
    
    else return 0;
    
  } catch (error) {
    console.log('Error (0x1): ', error)
  }
};



export default function AppNavigation() {

  const {user} = userAuth();

  if(user != null){
    if(_retrieveData()==1){
      console.log('Waiting for verification');
      return (      
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Wait"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Wait" component={Wait} />
            <Stack.Screen name="Email" component={Email} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    else if(_retrieveData()==2){
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="CreateRequest" component={CreateRequest} />
          <Stack.Screen name = "RequestDetails" component={RequestDetails}/>
          
        </Stack.Navigator>
      </NavigationContainer>
    }
    else{
      console.log('User logged: '+ user.uid)
      return (      
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="CreateRequest" component={CreateRequest} />
            <Stack.Screen name = "RequestDetails" component={RequestDetails}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    } 
  }
  else if(user == null){
    console.log('No access token');
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Wait" component={Wait} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="Email" component={Email} />
          <Stack.Screen name="Password" component={Password} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}