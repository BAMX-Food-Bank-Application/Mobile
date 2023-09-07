// Core
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';

// UI
import {Text, TouchableOpacity, Alert} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import ProfileDrawer from '../components/ProfileDrawer';

const HomeScreen = () => {

  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ProfileDrawer></ProfileDrawer>
    </SafeAreaView>
  );
};

export default HomeScreen;