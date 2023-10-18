// Core
import React, { useState, useEffect } from 'react';

// UI
import {SafeAreaView} from 'react-native';

// Styles
import DefaultStyles from '../../Global/styles/Defaults';

// Components
import ShipmentsComponent from '../components/ShipmentsComponent';
import ProfileDrawer from '../components/ProfileDrawer';
import NewRequest from '../components/NewRequest';

// Firebase 
import { auth } from '../../../config/FirebaseConnection';
import Header from '../components/Header';
import firestore from '@react-native-firebase/firestore';

// Hooks
import userFetch from '../../../hooks/userFetch';


const HomeScreen = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {userDoc, userImage} = userFetch();

  return (
    <>
    {isDrawerOpen && <ProfileDrawer setIsDrawerOpen={setIsDrawerOpen} userData={userDoc} userImage={userImage}/> }
    <SafeAreaView style={[DefaultStyles.screen]}>
      <Header setIsDrawerOpen={setIsDrawerOpen}/>
      <ShipmentsComponent user={userDoc}/>
      <NewRequest/>
    </SafeAreaView>
    </>
  );
};

export default HomeScreen;
