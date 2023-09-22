// Base
import React from 'react';

// UI
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView
} from 'react-native';

// Components
import Logo from '../../Global/components/Logo';

// Styles
import DefaultStyles from '../../Global/styles/Defaults';

// Fireabase
import  firestore  from '@react-native-firebase/firestore';
import { auth } from '../../../config/FirebaseConnection';

// Others
import {useNavigation} from '@react-navigation/native';



const Wait = () => {
  const navigation = useNavigation();
    const checkVerification = async () => {
        try{
          const UID = auth.currentUser.uid;
          const verification = (await firestore().collection('userData').doc(UID).get()).data().status;
          if (verification) {
            navigation.navigate('Email');
          } else {
            setTimeout(() => {
              console.log('Waiting for verification');
              checkVerification();
            }, 10000);
          }
        }
        catch (error){
          console.log('Error (0x2): ', error);
        }    
      
    };
  

  checkVerification();

  return (
    <SafeAreaView style={DefaultStyles.screen}>
      <View style = {styles.container}>
        <Logo imageLink='https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Fprocessing.png?alt=media&token=7cb7b032-ccef-463b-96c8-ce7d0a2a6446'/>
        <View style={styles.texts}>
            <Text style={DefaultStyles.poppinsTitle}>Espere</Text>
            <Text style={DefaultStyles.poppinsSubtitle}>El Banco de Alimentos está revisando tu solicitud de registro.</Text>
        </View>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#EFEFEF',
    },
      container: {
        alignItems: 'center',
      },
      texts: {
        marginTop: 60,
        alignItems: 'center',
      }
});

export default Wait;