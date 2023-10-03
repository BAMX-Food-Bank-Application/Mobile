// Core
import React from 'react';
import {useNavigation} from '@react-navigation/native';
// UI
import {Text, TouchableOpacity, SafeAreaView, View, StyleSheet} from 'react-native';

// Styles
import DefaultStyles from '../../Global/styles/Defaults';
import Colors from '../../Global/styles/Colors';

// Components
import Button from '../../Global/components/Button';
import Logo from '../../Global/components/Logo';

// Firebase
import app from '../../../config/FirebaseConnection';
import {getAuth} from 'firebase/auth';

const ProfileDetails = () => {

  const auth = getAuth(app);

  const tipoDonacion = ['Fruta', 'Verdura', 'Carne', 'Lácteos', 'Granos', 'Legumbres', 'Otros'];


  return (
    <SafeAreaView>
        <View style={styles.heroeContainer}>
            <Logo/>
            <Text style={DefaultStyles.poppinsTitle}>Juan Martínez</Text>
        </View>
        <View style={[DefaultStyles.screen, {backgroundColor: Colors.primary, flex: 1}]}>
            <View style={styles.card}>
                <Text style={DefaultStyles.poppinsTitle}>
                    {tipoDonacion[0]}
                </Text>
            </View>
            <Text style={DefaultStyles.poppinsTitle}>Patata</Text>
        </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    heroeContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderBottomLeftRadius: 56,
        borderBottomRightRadius: 56,
        backgroundColor: Colors.primary,

    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 8,
        shadowColor: Colors.black,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
  });

export default ProfileDetails;
