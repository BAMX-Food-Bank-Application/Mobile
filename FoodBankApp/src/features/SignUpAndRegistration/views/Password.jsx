// Base
import {React, useState} from 'react';

// UI
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView
} from 'react-native';

// Components
import DefaultAlert from '../../Global/components/DefaultAlert';
import ReturnButton from '../../Global/components/ReturnButton';
import Button from '../../Global/components/Button';

// Styles
import DefaultStyles from '../../Global/styles/Defaults';
import Colors from '../../Global/styles/Colors';

// Firebase 
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../config/FirebaseConnection';

// Others
import {useNavigation} from '@react-navigation/native';


const Password = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  const alertTrigger = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message)
    setShowAlert(!showAlert);
  };


  const handleNewToken = () => {
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
                      
    if (!emailRegex.test(email)) {
      alertTrigger('Correo inválido', 'No hay un usuario registrado con ese correo')
      return false;
    }else{

    }
      sendPasswordResetEmail(auth, email).then(() => {
        alertTrigger('Correo enviado', 'Se ha enviado un correo para restablecer tu contraseña')
        navigation.navigate('Login');
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/user-not-found') {
          alertTrigger('Usuario no encontrado', 'El usuario no existe');
        } else {
          alertTrigger('Error', errorMessage)
        }
      });
    }



  return (
    <SafeAreaView style={DefaultStyles.screen}>
      <ReturnButton/>
      <View style={{display: 'flex', padding: 24, alignItems: 'center'}}>
          <Text style={[DefaultStyles.poppinsTitle, {textAlign: 'center'}]}>Restaurar contraseña</Text>
          <Text style={[DefaultStyles.poppinsSubtitle, {textAlign: 'center'}]}>Ingresa el correo con el que te registraste en la app</Text>
        
        <View style={DefaultStyles.flexRow}>
          <TextInput
            placeholder="Correo"
            placeholderTextColor={Colors.textDisabled}
            style={DefaultStyles.input}
            onChangeText={setEmail}
            autoCapitalize={'words'}>
          </TextInput>
        </View>
        <View>
          <Button content='Continuar' functionality={() => handleNewToken()} bgColor={Colors.textSecondary} fontColor={Colors.textPrimary}/>
        </View>
      </View>


      <DefaultAlert
          alertTitle={alertTitle}
          alertContent={alertMessage}
          btnContent={'Aceptar'}
          modalVisible={showAlert}
          onHide={() => setShowAlert(false)}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
      container: {
        flex: 1, 
        alignItems: 'center', 
        display: 'flex', 
        marginHorizontal: 32, 
        rowGap: 16,
        justifyContent:'center'
      },
      input: {
        width: '100%',
        margin: 12,
        padding: 10,
        backgroundColor: '#EFEFEF',
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#EFEFEF',
        paddingHorizontal: 24,
        elevation: 15,
      }

});

export default Password;