import React, {useState, useEffect} from 'react';
  import {
    View,
    Text,
    StyleSheet
  } from 'react-native';

  // Components
  import Logo from '../../Global/components/Logo';
  import DefaultAlert from '../../Global/components/DefaultAlert';

  // Styles
  import DefaultStyles from '../../Global/styles/Defaults';

  // Firebase
  import { auth } from '../../../config/FirebaseConnection';
  import { sendEmailVerification } from 'firebase/auth';

  // Others
  import {useNavigation} from '@react-navigation/native';

  const Email = () => {
    const [alertVisible, setAlertVisible] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
      if(!auth.currentUser.emailVerified) sendEmailVerification(auth.currentUser)
    }, []);

    useEffect(() => {
      const interval = setInterval(() => {
        auth.currentUser.reload().then(() => {
          if (auth.currentUser.emailVerified) {
            clearInterval(interval);
            auth.signOut();
          }
        }).catch(error => {
          setAlertVisible(true);
        });
      }, 1000);
  
      return () => {
        clearInterval(interval);
      };
    }, []);
    
    return (
      <View style={DefaultStyles.screen}>
        <View style = {styles.container}>
          <Logo imageLink='https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2FsentEmail.png?alt=media&token=16517312-d681-4682-8ac0-41676115b8d0'/>
          <View style={styles.texts}>
              <Text style={DefaultStyles.poppinsTitle}>¡Ya casi!</Text>
              <Text style={DefaultStyles.poppinsSubtitle}>Se ha enviado un correo de confirmación, por favor revise su bandeja de entrada.</Text>
          </View>
        </View>
        <DefaultAlert alertTitle={"Ha ocurrido un error"} alertContent={"Intente de nuevo más tarde"} btnContent={"Aceptar"} onHide={() => {auth.signOut();}} modalVisible={alertVisible}/>
      </View>
    );
  };

const styles = StyleSheet.create({
      container: {
        alignItems: 'center',
      },
      texts: {
        marginTop: 60,
        alignItems: 'center',
      }
});

export default Email;