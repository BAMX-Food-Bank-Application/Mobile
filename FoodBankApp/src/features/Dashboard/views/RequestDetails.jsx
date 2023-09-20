// Core
import {React, useEffect, useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import {auth} from '../../../config/FirebaseConnection';

// UI
import {ScrollView, Text, TouchableOpacity, StyleSheet, View, Image, SkeletonPlaceholder} from 'react-native';

// Firebase
import {SafeAreaView} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';

const RequestDetails = ({route}) => {
  const [requestDocumentData, setRequestDocumentData] = useState({});
  const [userDocumentData, setUserDocumentData] = useState({});

  const productData = ({Name: '', Type: '', Quantity: '', MeasuringUnit: '', ExpirationDate: ''});

  const navigation = useNavigation();

  const getDocumentsData = () => {
    const { docID } = route.params;
    const UID = auth.currentUser.uid;
    const userEmail = auth.currentUser.email;

    try {
      firestore()
        .collection('userData')
        .doc(UID)
        .get()
        .then((snapshot) => {
          const userData = snapshot.data();
          setUserDocumentData(userData);
          userData.email = userEmail;
        });
      firestore()
        .collection('Requests')
        .doc(docID)
        .get()
        .then((snapshot) => {
          const requestData = snapshot.data();
          setRequestDocumentData(requestData);
          
          /*
          Object.keys(requestData).forEach((key) => {
            for (const value of requestData[key]) {
              if(key === 'expirationDate'){
                console.log('Expiration date: ', value);
              }
            }
            console.log('------------------')
          });
          */
         requestData.productName.forEach((product, index) => {
          // {Name: '', Type: '', Quantity: '', MeasuringUnit: '', ExpirationDate: ''}
          productData.Name = product;
          productData.Type = requestData.type[index];
          productData.Quantity = requestData.weight[index];
          
         });
         console.log(productData);
        });

        

    } catch (error) {
      console.log("Error 0x5", error);
    }
  };


  useEffect(() => {
    getDocumentsData();
    
  }, []);


  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <ScrollView>

          <View style={styles.flexContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={[styles.arrowbtn, styles.flexItem]}>
              <Image
                source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Farrow_left.png?alt=media&token=34784200-c05c-4ea5-a182-97adeead9a9b'}}
                style={styles.arrow}
              />
            </TouchableOpacity>
            <Text style={[styles.poppinsTitle, {flex: 4}]}>Cargamento #</Text>
          </View>
        
        <Text style={styles.poppinsmedium}>Nombre: </Text>  
        <Text style={styles.poppinsregular}>{userDocumentData.name}</Text>

        <Text style={styles.poppinsmedium}>Email: </Text>
        <Text style={styles.poppinsregular}>{userDocumentData.email}</Text>

        <Text style={styles.poppinsmedium}>Dirección: </Text>
        <Text style={styles.poppinsregular}>{userDocumentData.address}</Text>
        
        <Text style={styles.poppinsmedium}>Nombre de empresa: </Text>
        <Text style={styles.poppinsregular}>{userDocumentData.nameCorp}</Text>

        <Text style={styles.poppinsmedium}>Productos: </Text>



        <Text style={styles.poppinsmedium}>Fecha de expiración: </Text>
        <Text style={styles.poppinsregular}>{requestDocumentData.expirationDate}</Text>

        <Text style={styles.poppinsmedium}>Fecha de solicitud: </Text>
        <Text style={styles.poppinsregular}>{requestDocumentData.expirationDate}</Text>

        <Text style={styles.poppinsmedium}>Estado: </Text>
        <Text style={styles.poppinsregular}>{requestDocumentData.status}</Text>
        </ScrollView>
      </View>  
    </SafeAreaView>

  );
};

export default RequestDetails;

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    background:
      'linear-gradient(0deg, rgba(243,178,70,.8) 0%, rgba(224,30,64,.8) 100%)',
    padding: 24,
  },
  poppinsTitle: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 24,
    lineHeight: 25,
    color: 'black'
},
  poppinsregular: {
    fontFamily: 'Poppins-Regular', 
  },
  poppinsmedium: {
    fontFamily: 'Poppins-Medium', 
    color: 'black'
  },
  flexContainer: {
    alignSelf: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    textAlign: 'center',
    margin: 24,
  },
  flexItem: {
    flex: 1,
  },
  arrow: {
    width: 24,
    height: 24,
  },
  arrowbtn: {
    width: 24,
    height: 24,
    marginRight: 12 ,
  },
});
