import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {auth} from '../../../config/FirebaseConnection';
import DefaultStyles from '../../Global/styles/Defaults';
import Colors from '../../Global/styles/Colors';
import UserIcon from '../components/UserIcon';

const ProfileDrawer = ({setIsDrawerOpen, userData, userImage}) => {
  const navigation = useNavigation();

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

  const userUID = auth.currentUser.uid;

  return (
    <View style={styles.full}>
      <TouchableOpacity onPress={()=>setIsDrawerOpen(false)} style={DefaultStyles.flexItem}></TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.icon}>
          <UserIcon profile={userImage}/>
          <Text style={[DefaultStyles.poppinsSemiBold, {color:Colors.textSecondary, marginTop: '10%'}]}>{`${userData.name} \n`} </Text>
        </View>
        
        <TouchableOpacity onPress={() => setIsDrawerOpen(false)}>
          <View style={styles.option}>
            <Image
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Fassets%2FDashboard%2Ficonamoon_home.png?alt=media&token=12d268a7-544e-49b4-8f01-b7c62a8c40ff',
              }}
              style={styles.image}></Image>
            <Text style={[DefaultStyles.poppinsSemiBold, {color:Colors.textSecondary}]}>Inicio</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ProfileDetails', {user: userData})}>
          <View style={styles.option}>
            <Image
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Favatar.png?alt=media&token=bc37b5c9-ad2e-49b1-b171-7fb7dadf9cfb&_gl=1*gez6ze*_ga*OTgxMDEyMDA3LjE2OTIyMTE1NTA.*_ga_CW55HF8NVT*MTY5NzA1OTk1NC4yMy4xLjE2OTcwNTk5NzQuNDAuMC4w',
              }}
              style={styles.image}></Image>
            <Text style={[DefaultStyles.poppinsSemiBold, {color:Colors.textSecondary}]}>Mi {'\n'}perfil</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('CreateRequest')}>
          <View style={styles.option}>
            <Image
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Fassets%2FDashboard%2FNuevo.png?alt=media&token=29fe0a17-c370-4c6d-94b3-1d74f24b088d',
              }}
              style={styles.image}></Image>
            <Text style={[DefaultStyles.poppinsSemiBold, {color:Colors.textSecondary}]}>Nuevo {'\n'}cargamento</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutcon} onPress={() => signOut()}>
          <View style={styles.logout}>
            <Image
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Fassets%2FDashboard%2Flogout.png?alt=media&token=e8d6a3d6-1550-4fd6-971b-d5124d083737',
              }}
              style={styles.image}></Image>
            <Text style={[DefaultStyles.poppinsSemiBold, {color:Colors.textSecondary}]}>Cerrar Sesión</Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  full: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '106%',
    animationDuration: 1000,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    flex: 2, 
    alignSelf: 'flex-end',
    alignItems: 'center',
    height: '100%', 
    backgroundColor: '#E8042C', 
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  icon: {
    alignItems: 'center',
    padding: 16,
    marginTop: '5%',
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  option: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: '6%',
    width: 200,
    alignItems: 'center',
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutcon: {
    position: 'absolute',
    bottom: '8%',
    marginBottom: 20,
    width: 200,
    alignItems: 'center',
  },
});

export default ProfileDrawer;
