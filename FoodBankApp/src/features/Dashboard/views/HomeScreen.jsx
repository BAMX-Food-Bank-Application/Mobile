// Core
import React, {useState} from 'react';

// UI
import {SafeAreaView} from 'react-native';

// Firebase
import NewRequest from '../components/NewRequest';
import ShipmentsComponent from '../components/ShipmentsComponent';
import ProfileDrawer from '../components/ProfileDrawer';
import Header from '../components/Header';

const HomeScreen = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (<>
    {isDrawerOpen && <ProfileDrawer setIsDrawerOpen={setIsDrawerOpen}/> }
    <SafeAreaView style={{ marginHorizontal: 16}}>
        <Header setIsDrawerOpen={setIsDrawerOpen}/>
        <ShipmentsComponent/>
        <NewRequest/>
    </SafeAreaView>
  </>
  );
};

export default HomeScreen;
