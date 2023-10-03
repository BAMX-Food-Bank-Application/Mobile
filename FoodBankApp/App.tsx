import React from 'react';
import AppNavigation from './src/navigation/appNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  
  // <AppNavigation></AppNavigation>
AsyncStorage.clear();
return(
  <AppNavigation></AppNavigation>
  ); 
};

export default App;
