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
import Button from '../../Global/components/Button';
import Header from '../components/Header';
import DefaultAlert from '../../Global/components/DefaultAlert';

// Firebase 
import firestore from '@react-native-firebase/firestore';
import {auth} from '../../../config/FirebaseConnection';

// Hooks
import userFetch from '../../../hooks/userFetch';

// Others
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
  const navigation = useNavigation();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {userDoc, userImage} = userFetch();
  const [name, setName] = useState('');

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const triggerAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  }

  const sendNotification = async () => {
    const email = auth.currentUser.email;
    const querySnapshot = await firestore().collection('firstContact').where('email', '==', email).get();
  
    if (querySnapshot.empty) {
      await firestore().collection('firstContact').add({
        email: email,
        name: userDoc.name,
        phoneNumber: userDoc.phoneNumber,
        notificationChecked: false
      })
      .then(() => {
        triggerAlert('¡Listo!', 'El banco de alimentos se pondrá en contacto contigo en breve.')
      })
      .catch(() => {
        triggerAlert('¡Ups!', 'Hubo un error al enviar la notificación. Inténtalo más tarde.')
      });
    } 

    else {
      querySnapshot.forEach((doc) => {
        doc.ref.update({notificationChecked: false})
          .then(() => {
            triggerAlert('¡Listo!', 'El banco de alimentos se pondrá en contacto contigo en breve.')
          })
          .catch(() => {
            triggerAlert('¡Ups!', 'Hubo un error al enviar la notificación. Inténtalo más tarde.')
          });
      });
    }
  };

  useEffect(() => {
    userDoc.name ? setName(userDoc.name.split(' ', 1)) : null
    userDoc.role === "Admin" ? triggerAlert("Usuario no autorizado", "El usuario no tiene permisos para acceder a esta aplicación.") : null;
  }, [userDoc.name, userDoc.role]);

  return (
    <>
    {isDrawerOpen && <ProfileDrawer setIsDrawerOpen={setIsDrawerOpen} userData={userDoc} userImage={userImage}/>}
    <SafeAreaView style={[DefaultStyles.screen, {marginHorizontal: 16}]}>
      {
        userDoc.role === "Ally" ? 
        (
          <>
            <Header setIsDrawerOpen={setIsDrawerOpen}/>
            <View style={{display:'flex', flexDirection: 'row', columnGap: 16}}>
              <Text style={[DefaultStyles.poppinsSubtitle, {color: Colors.textPrimary}]}>Hola,</Text>
              <Text style={DefaultStyles.poppinsTitle}>{name}</Text>
            </View>
            <Text style={DefaultStyles.poppinsTitle}>Bienvenido! 👋</Text>
            <ShipmentsComponent user={userDoc}/>
            <NewRequest/>
          </>
        ) 
        : 
        (
          <View style={{display:'flex', gap:16, justifyContent:'center'}}>
            <View style={{display:'flex', flexDirection: 'row', columnGap: 16}}>
              <Text style={[DefaultStyles.poppinsSubtitle, {color: Colors.textPrimary}]}>Hola,</Text>
              <Text style={DefaultStyles.poppinsTitle}>{name}</Text>
            </View>
            <Text style={DefaultStyles.poppinsTitle}>Bienvenido! 👋</Text>
            <View style={{backgroundColor: 'rgba(189, 189, 189, .5)', borderRadius: 32, padding: 16, marginVertical:64, borderWidth: 4}}>
              <Text style={[DefaultStyles.poppinsSemiBold, {color: Colors.textPrimary, textAlign: 'center'}]}>Si quieres que el banco de alimentos se contacte contigo para realizar una donación, presiona el botón.</Text>
            </View>
            <Button content={"¡Quiero donar!"} bgColor={Colors.primary} fontColor={Colors.textSecondary} functionality={() => sendNotification()}/>
            <Button content={"Cerrar sesión"} bgColor={Colors.secondary} fontColor={Colors.textSecondary} functionality={() => auth.signOut()}/>
          </View>
          
          )
        }
      <DefaultAlert modalVisible={alertVisible} 
      alertTitle={alertTitle} 
      alertContent={alertMessage} 
      btnContent={"Aceptar"} 
      onHide={() => alertTitle === "Usuario no autorizado" ? auth.signOut() : setAlertVisible(false)}/>
    </SafeAreaView>
    </>
  );
};

export default HomeScreen;
