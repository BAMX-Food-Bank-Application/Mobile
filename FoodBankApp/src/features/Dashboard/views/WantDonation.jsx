import React from "react"
import { SafeAreaView } from "react-native-safe-area-context";

import DefaultStyles from "../../Global/styles/Defaults";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

const WantDonation = () => {
    return(
        <SafeAreaView style={[DefaultStyles.Screen, {paddingHorizontal: 16}]}>
            <Text style={[DefaultStyles.poppinsTitle, {marginTop: 32}]}>Si quieres que el Banco de Alimentos se ponga en contacto contigo para realizar una donación haz click en el botón.</Text>
            <TouchableOpacity style={styles.button}></TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button:{
        color: 'red',
        backgroundColor: 'red',
        height: '50%',
        borderRadius: 300,
    },
  });

export default WantDonation;