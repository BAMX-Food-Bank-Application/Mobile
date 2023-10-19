import React, {useState} from 'react';
import {View, Text, TextInput, SafeAreaView} from 'react-native';

// Components
import Button from '../../Global/components/Button';
import ReturnButton from '../../Global/components/ReturnButton';
import DefaultAlert from '../../Global/components/DefaultAlert';

// Styles
import DefaultStyles from '../../Global/styles/Defaults';
import Colors from '../../Global/styles/Colors';

// Firebase
import firestore from '@react-native-firebase/firestore';

// Others
import { validateEmail, validateNumbers } from '../../Global/utils/regexValidation';
import { useNavigation } from '@react-navigation/native';

export default function SingleDonation() {

    navigation = useNavigation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);

    triggerAlert = (title, message) => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertVisible(!alertVisible);
    }

    const validation = () => {
        if(name === '' || email === '' || phone === ''){
            triggerAlert("Error", "Por favor llena todos los campos");
            return false;
        }
        if(validateEmail(email)){
            setError("Correo inválido");
            return false;
        }
        if(validateNumbers(phone)){
            setError("Número inválido");
            return false;
        }
        return true;
    }

    const newGuest = () => {
        if (validation()){

        firestore()
        .collection("firstContact")
        .add({
            name: name,
            email: email,
            phone: phone,
            notificationChecked: Boolean(false),
        })
        .then(() => {
            triggerAlert("¡Éxito!", "Se ha registrado tu solicitud, un administrador se pondrá en contacto contigo");
        })
        .catch((error) => {
            triggerAlert("Error", "Ha ocurrido un error, por favor intenta más tarde");
        });
    };
        }
    
    return ( 
        <SafeAreaView style={[DefaultStyles.screen, {marginHorizontal: 16}]}>
            <ReturnButton/>
            <View style={DefaultStyles.flexColumn}>
                <Text style={DefaultStyles.poppinsTitle}>¿Cómo donar?</Text>
                <Text style={DefaultStyles.poppinsSubtitle}>Pasos para donar:</Text>
                
                <View style={{justifyContent: 'flex-start'}}>
                    <Text style={DefaultStyles.poppinsRegular}>• Llena tu información de contacto.</Text>
                    <Text style={DefaultStyles.poppinsRegular}>• Haz click en continuar.</Text>
                    <Text style={DefaultStyles.poppinsRegular}>• Espera a que un administrador del banco de alimentos te contacte.</Text>
                    <Text style={DefaultStyles.poppinsRegular}>• ¡Listo! Podrás donar con las credenciales proporcionadas por el administrador. </Text>
                </View>
                
            </View>
            <View style={[DefaultStyles.flexColumn]}>
                <TextInput 
                    placeholder="Nombre:" 
                    placeholderTextColor={Colors.textDisabled} 
                    style={[DefaultStyles.input, DefaultStyles.poppinsRegular]}
                    value={name} onChangeText={setName}
                    maxLength={100}
                />
                <TextInput 
                    placeholder="Correo:" 
                    placeholderTextColor={Colors.textDisabled} 
                    style={[DefaultStyles.input, DefaultStyles.poppinsRegular, {borderColor: error === "Correo inválido" ? Colors.primary : Colors.textPrimary}]}
                    value={email} onChangeText={setEmail}
                    maxLength={100}
                />
                <TextInput 
                    placeholder="Teléfono:" 
                    placeholderTextColor={Colors.textDisabled} 
                    style={[DefaultStyles.input, DefaultStyles.poppinsRegular, {borderColor: error === "Número inválido" ? Colors.primary : Colors.textPrimary}]}
                    value={phone} onChangeText={setPhone}
                    maxLength={10}
                />             
            </View>
            <Button content={"Continuar"} functionality={() => newGuest()} bgColor={Colors.primary} fontColor={Colors.textSecondary}/>
            <DefaultAlert 
                alertTitle={alertTitle} 
                alertContent={alertMessage} 
                btnContent={"Aceptar"} 
                bgColor={Colors.defaultBG} 
                fontColor={Colors.textPrimary} 
                modalVisible={alertVisible} 
                onHide={() => alertTitle === "¡Éxito!" ? navigation.goBack() : triggerAlert()} 
            />
        </SafeAreaView>
    );
}