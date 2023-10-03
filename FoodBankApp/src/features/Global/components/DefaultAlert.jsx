// Base
import {React} from 'react';

// UI
import { StyleSheet, Text, View, Modal} from 'react-native';

// Styles
import DefaultStyles from '../styles/Defaults';
import Colors from '../styles/Colors';

// Components
import Button from './Button';




// USAGE INSTRUCTIONS

// 1. Import the component
// import DefaultAlert from '../../Global/components/DefaultAlert';

// 2. Declare the states
/*
 const [showAlert, setShowAlert] = useState(false);
 const [alertMessage, setAlertMessage] = useState('');
 const [alertTitle, setAlertTitle] = useState('');
*/

// 3. Call the component somewhere inside the return
/*
<DefaultAlert
   alertTitle={alertTitle}
   alertContent={alertMessage}
   btnContent={'Aceptar'}
   modalVisible={showAlert}
   onHide={() => setShowAlert(false)}
/>
*/

// 4. Set a trigger function
/*
const alertTrigger = (title, message) => {
  setAlertTitle(title);
  setAlertMessage(message)
  setShowAlert(!showAlert);
};
*/

// 5. Call the trigger function either with or without title
// alertTrigger('Error', 'El correo ingresado no es válido');
// alertTrigger('El correo ingresado no es válido');

const DefaultAlert = ({alertTitle, alertContent, btnContent, modalVisible, onHide}) => {


  if (!modalVisible) return null;

  return (
    <Modal animationType='fade' transparent={true} visible={modalVisible}>
      <View style={styles.container}>
        <View style={styles.modalContent}>
            {alertTitle != null && (<Text style={[DefaultStyles.poppinsTitle, {textAlign: 'center'}]}>{alertTitle}</Text>)}
            <Text style={[alertTitle != null ? DefaultStyles.poppinsRegular : DefaultStyles.poppinsSubtitle, {textAlign: 'center'}]}>{alertContent}</Text>
            <Button
                bgColor={Colors.blueAccent}
                content={btnContent}
                fontColor={Colors.white}
                functionality={() => onHide()}
            />
        </View>
      </View>   
    </Modal>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 24,
      
    },
    modalContent: {
        display: 'flex',
        borderRadius: 25,
        alignItems: 'center',
        backgroundColor: Colors.white,
        elevation: 10,
        padding: 24,
        rowGap: 16,        
    },
  });

export default DefaultAlert;