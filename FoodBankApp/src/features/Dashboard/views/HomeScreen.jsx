// Core
import React, { useState, useEffect } from 'react';
// UI
import {SafeAreaView} from 'react-native';

// Components
import ShipmentsComponent from '../components/ShipmentsComponent';
import ProfileDrawer from '../components/ProfileDrawer';

const HomeScreen = () => {
  const [userData, setUserData] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const credentials = auth.currentUser;

  const getUserData = async () => {
    const userQuery = await firestore().collection('userData').doc(credentials.uid).get();
    setUserData(userQuery.data());
  }

  useEffect(() => {
    getUserData();    
  }, []);

  return (
    <>
    {isDrawerOpen && <ProfileDrawer setIsDrawerOpen={setIsDrawerOpen}/> }
    <SafeAreaView style={{paddingHorizontal: 16}}>
      <ShipmentsComponent user={userData}/>
      <NewRequest/>
    </SafeAreaView>
    </>
  );
};

export default HomeScreen;
