// BASE
import React, {useRef, useState, useEffect} from 'react';

// UI
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// COMPONENTS
import DefaultAlert from '../../Global/components/DefaultAlert';
import Button from '../../Global/components/Button';

// STYLES
import Colors from '../../Global/styles/Colors';

// FIREBASE
import {auth} from '../../../config/FirebaseConnection';
import firestore from '@react-native-firebase/firestore';

// OTHERS
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

var isaac = require( 'isaac' );
var verificationCode;


const Confirmation = ( {route} ) => {
  const [user_phoneNumber, setPhoneNumber] = useState("");
  const navigation = useNavigation();
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const [otp, setOtp] = useState({1: '', 2: '', 3: '', 4: ''});
  const UID = auth.currentUser.uid;

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  const alertTrigger = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setShowAlert(!showAlert);
  };

  const clearCode = (
    setInterval(() => {
      verificationCode = ""
    }, 60000)
  )

  clearCode

  const handleOTP = (otp, verificationCode) => {
    const input_otp = otp[1] + otp[2] + otp[3] + otp[4] 
    if(input_otp == verificationCode){
      navigation.navigate("HomeScreen")
    }
    else if(verificationCode == ""){
      alertTrigger('Codigo expirado', 'Por favor intenta de nuevo');
    }
    else{
      alertTrigger('Codigo incorrecto', 'Por favor intenta de nuevo');
    }
  }

  const sendCode = () => {
      try {
        firestore()
          .collection('userData')
          .doc(UID)
          .get()
          .then((snapshot) => {
            const data = snapshot.data().phoneNumber
            setPhoneNumber(data)
            
            const random_number = isaac.random( ) * 100000000;
            
            verificationCode = (random_number.toString());
            verificationCode = verificationCode.substring(0,4);

            const json = JSON.stringify({
              "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": "+52"+user_phoneNumber,
                "type": "text",
                "text": {
                  "preview_url": false,
                  "body": "HOLA TU CODIGO ES ESTE: " + verificationCode
                  }
            });
          
            axios({
              method: "post",
              url: "https://graph.facebook.com/v17.0/147364981785470/messages",
              data: json,
              headers: { "Content-Type": "application/json", "Authorization": "Bearer EAACOAQDhfd4BOZBKJtHR5i3Rx54hK6MND2KNQK40UKpCF6UEc2p2tmJHN6nHRvTjVEDCZAVkBWSDy3cU8pjzctBNiqbGDzvxhuXZCGfJTezsDQqpXUntvVmA8ayhjaVVm7jsjMxKJZCnM4iYaab3GYyZBCKDFTCItVSmZArtBQnkdoPIQZAWcW5Lwrl1p9rhGvWXqot0cayB7eHKZCLKk9YvJZBRf2QZA5z0A5XCsZD" },
            })
          }); 
      } catch (error) {
        alertTrigger('Error en envío', error);
      }
  };

  useEffect(() => {
    setPhoneNumber("")
    sendCode();
  }, []);

  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={() => navigation.navigate('Registration')} style={styles.arrowbtn}>
        <Image
              source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Farrow_left.png?alt=media&token=34784200-c05c-4ea5-a182-97adeead9a9b'}}
              style={styles.arrow}
              />
      </TouchableOpacity>
      <Image
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Flock.png?alt=media&token=217ac8fd-7d81-4625-9059-ee323a20c838',
          }}
          style={styles.logo}
      />
      <Text style={styles.poppinssemibold}>Verificación OTP</Text>
      <Text style={styles.codeText}>
        Ingresa el código que se ha enviado por Whatsapp a {''} {''}
        <Text style={styles.phoneNumberText}>+52{user_phoneNumber}</Text>
      </Text>
      <View style={styles.otpContainer}>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={firstInput}
            onChangeText={text => {
              setOtp({...otp, 1: text});
              text && secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={secondInput}
            onChangeText={text => {
              setOtp({...otp, 2: text});
              text ? thirdInput.current.focus() : firstInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={thirdInput}
            onChangeText={text => {
              setOtp({...otp, 3: text});
              text ? fourthInput.current.focus() : secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={fourthInput}
            onChangeText={text => {
              setOtp({...otp, 4: text});
              !text && thirdInput.current.focus();
            }}
          />
        </View>
      </View>
        <Button
                content="Verificar"
                bgColor={Colors.textSecondary}
                fontColor={Colors.textPrimary}
                functionality={() => handleOTP(otp, verificationCode)}
        />
      <View style={[styles.flexRow]}>
          <Text style={[styles.flex]}>¿No recibiste un mensaje? </Text>
          <TouchableOpacity
            style={[styles.flex]}
            onPress={() => sendCode()}>
            <Text style={[styles.linkedText]}>Reenviar</Text>
          </TouchableOpacity>
        </View>
        <DefaultAlert
          alertTitle={alertTitle}
          alertContent={alertMessage}
          btnContent={'Aceptar'}
          modalVisible={showAlert}
          onHide={() => setShowAlert(false)}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#EFEFEF',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 16,
    alignSelf: 'center',
    marginTop: 32
  },
  arrow: {
    width: 24,
    height: 24,
  },
  arrowbtn: {
    width: 24,
    height: 24,
    marginHorizontal: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    lineHeight: 20 * 1.4,
    textAlign: 'center',
  },
  content: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  codeText:{
    fontFamily: 'Poppins-Medium', 
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginTop: 24,
  },
  phoneNumberText: {
    fontFamily: 'Poppins-SemiBold', 
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  otpContainer: {
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  otpBox: {
    borderRadius: 5,
    borderWidth: 1,
  },
  otpText: {
    fontSize: 32,
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  button: {
    marginTop: 16,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginHorizontal: 64,
    fontFamily: 'Poppins-Medium', 
  },
  poppinsmedium: {
    fontFamily: 'Poppins-Medium', 
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  poppinssemibold: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 32,
    color: 'black',
    textAlign: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32
  },
  rowItem: {
    flex: 1,
  },
  linkedText: {
    color: '#E8042C',
    fontFamily: 'Poppins-Medium', 
  },
});

export default Confirmation;