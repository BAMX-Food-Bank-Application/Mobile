// Core
import React, { useEffect, useState } from 'react';

// UI
import {SafeAreaView, Text, View} from 'react-native';

// Styles
import DefaultStyles from '../../Global/styles/Defaults';
import Colors from '../../Global/styles/Colors';

// Components
import ShipmentsComponent from '../components/ShipmentsComponent';
import ProfileDrawer from '../components/ProfileDrawer';
import NewRequest from '../components/NewRequest';

// Firebase 
import Header from '../components/Header';

// Hooks
import userFetch from '../../../hooks/userFetch';


const HomeScreen = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {userDoc, userImage} = userFetch();
  const [name, setName] = useState('');

  useEffect(() => {
    userDoc.name ? setName(userDoc.name.split(' ', 1)) : null
  }, [userDoc.name]);

  return (
    <>
    {isDrawerOpen && <ProfileDrawer setIsDrawerOpen={setIsDrawerOpen} userData={userDoc} userImage={userImage}/> }
    <SafeAreaView style={[DefaultStyles.screen]}>
      <Header setIsDrawerOpen={setIsDrawerOpen}/>
      <View style={{display:'flex', flexDirection: 'row', columnGap: 16}}>
        <Text style={[DefaultStyles.poppinsSubtitle, {color: Colors.textPrimary}]}>Hola,</Text>
        <Text style={DefaultStyles.poppinsTitle}>{name}</Text>
      </View>
      <Text style={DefaultStyles.poppinsTitle}>Bienvenido! 👋</Text>
      <ShipmentsComponent user={userDoc}/>
      <NewRequest/>
    </SafeAreaView>
    </>
  );
};

export default HomeScreen;
