import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView} from 'react-native';

// Components
import Button from '../../Global/components/Button';
import ReturnButton from '../../Global/components/ReturnButton';

// Styles
import DefaultStyles from '../../Global/styles/Defaults';
import Colors from '../../Global/styles/Colors';

// Firebase
import firestore from '@react-native-firebase/firestore';

// Others
import { validateEmail, validateNumbers } from '../../Global/utils/regexValidation';

export default function SingleDonation() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const validation = () => {
        if(validateEmail(email)) return false;
        return true;
    }

    const newGuest = () => {
        firestore()
        .collection("Guests")
        .add({
            Name: name,
            Email: email,
            Phone: phone,
        })
    };


    
    return ( 
        <SafeAreaView style={DefaultStyles.screen}>
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
            <View style={DefaultStyles.flexColumn}>
                <TextInput 
                placeholder="Nombre:" 
                placeholderTextColor={Colors.textDisabled} 
                style={[DefaultStyles.input, DefaultStyles.poppinsRegular, {color: Colors.textPrimary}]}
                value={name} onChangeText={setName}
                maxLength={100}
                />
                <TextInput 
                placeholder="Correo:" 
                placeholderTextColor={Colors.textDisabled} 
                style={[DefaultStyles.input, DefaultStyles.poppinsRegular, {color: Colors.textPrimary}]}
                value={email} onChangeText={setEmail}
                maxLength={100}
                />
                <TextInput 
                placeholder="Teléfono:" 
                placeholderTextColor={Colors.textDisabled} 
                style={[DefaultStyles.input, DefaultStyles.poppinsRegular, {color: Colors.textPrimary}]}
                value={phone} onChangeText={setPhone}
                maxLength={10}
                />                
            </View>
            <View >
                <Button content={"Continuar"} functionality={() => newGuest()} bgColor={Colors.primary} fontColor={Colors.textSecondary}/>
            </View>
        </SafeAreaView>
    );
}