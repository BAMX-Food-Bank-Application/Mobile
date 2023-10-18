import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import AppNavigation from './src/navigation/appNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

const App = () => {

const hideSplashScreen = () => {
  SplashScreen.hide();
}


useEffect (() => {
  hideSplashScreen();
});

return(
  <AppNavigation></AppNavigation>
  ); 
};

export default App;
