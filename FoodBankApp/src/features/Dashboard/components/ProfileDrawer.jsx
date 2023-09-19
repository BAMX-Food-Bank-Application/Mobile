import React from 'react';
import { StyleSheet, Text, View, Image, Touchable, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import app from '../../../config/FirebaseConnection';
import {getAuth} from 'firebase/auth';

const ProfileDrawer = () => {
    const navigation = useNavigation();
    const auth = getAuth(app);
    const signOut = async () => {
        try {
          await auth.signOut();
          navigation.navigate('Login');
          return true;
        } catch (error) {
          Alert.alert('No pudimos cerrar tu sesion');
          return false;
        }
      };

    return(
        <View style={styles.full}>
            <View style={styles.icon}>
                <Image
                source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Fassets%2Fsign_up%2Fbamx_logo.png?alt=media&token=bb2f494f-d3dc-41bc-87f7-b677e0e966d7'}}
                style={styles.image}
                ></Image>
                <Text style={styles.text}>Nombre {"\n"} Usuario</Text>
            </View>
            <TouchableOpacity>
                <View style={styles.option}>
                    <Image
                        source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Fassets%2FDashboard%2Ficonamoon_home.png?alt=media&token=12d268a7-544e-49b4-8f01-b7c62a8c40ff'}}
                        style={styles.image2}
                    ></Image>
                    <Text style={styles.text}>Inicio</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.option}>
                    <Image
                        source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Fassets%2FDashboard%2Fcamion.png?alt=media&token=44bf84ed-3c81-47b1-ade9-83470a48d829'}}
                        style={styles.image2}
                    ></Image>
                    <Text style={styles.text}>Mis {"\n"}cargamentos</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Request')}>
                <View style={styles.option}>
                    <Image
                        source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Fassets%2FDashboard%2FNuevo.png?alt=media&token=29fe0a17-c370-4c6d-94b3-1d74f24b088d'}}
                        style={styles.image2}
                    ></Image>
                    <Text style={styles.text}>Nuevo {"\n"}cargamento</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutcon} onPress={() => signOut()}>
                <View style={styles.logout}>
                    <Image
                        source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Fassets%2FDashboard%2Flogout.png?alt=media&token=e8d6a3d6-1550-4fd6-971b-d5124d083737'}}
                        style={styles.image2}
                    ></Image>
                    <Text style={styles.text}>Cerrar Sesión</Text>
                </View>
            </TouchableOpacity>
        </View>    
    )
}

const styles = StyleSheet.create({
    full:{
        backgroundColor: '#E8042C',
        width: 250,
        height: '100%',
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    icon:{
        alignItems: 'center',
        padding: 16,
        marginTop: '5%',
    },
    image:{
        width: 100,
        height: 100,
        borderRadius: 200,
    },
    image2:{
        width: 40,
        height: 40,
        marginRight: 20,
    },
    text:{
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        color: '#FFFFFF'
    },
    option:{
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: '6%',
        width: 200,
        alignItems: 'center',
    },
    logout:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoutcon:{
        position: 'absolute',
        bottom: 0,
        marginBottom: 20,
        width: 200,
        alignItems: 'center',
    },
})

export default ProfileDrawer;