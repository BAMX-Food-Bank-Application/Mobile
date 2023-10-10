// Core
import {React, useEffect, useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import {auth} from '../../../config/FirebaseConnection';

// UI
import {ScrollView, Text, TouchableOpacity, StyleSheet, View, Image} from 'react-native';

// Components
import DefaultAlert from '../../Global/components/DefaultAlert';
import Button from '../../Global/components/Button';
import LoadingComponent from '../../Global/components/LoadingComponent';

// Styles 
import Colors from '../../Global/styles/Colors';

// Firebase
import {SafeAreaView} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';

const RequestDetails = ({route}) => {
  const [requestDocumentData, setRequestDocumentData] = useState({});
  const [userDocumentData, setUserDocumentData] = useState({});
  const [productList, setProductList] = useState([]);

  const [alertVisible, setAlertVisible] = useState(false);  
  const [alertTitle, setAlertTitle] = useState('');
  const [alertContent, setAlertContent] = useState('');
  const [btnContent, setBtnContent] = useState(['','']);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();


  const triggerAlert = (title, message, button) => {
    setAlertTitle(title);
    setAlertContent(message);
    setBtnContent(button);
    setAlertVisible(!alertVisible);
  };

  const getDocumentsData = () => {
    setIsLoading(true);
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
        .collection('userData')
        .doc(UID)
        .collection('requestsHistory')
        .doc(docID)
        .get()
        .then((snapshot) => {
          const requestData = snapshot.data();
          setRequestDocumentData(requestData);
          
         requestData.productName.forEach((product, index) => {
          
          const newProductData = {
            Name: product,
            Type: requestData.type[index],
            Quantity: requestData.weight[index],
            MeasuringUnit: requestData.unit[index],
            ExpirationDate: requestData.expirationDates[index]
          };    
          
          setProductList((prevList) => [...prevList, newProductData]);

         });
        });      

    } catch (error) {
      console.log("Error 0x5", error);
    }
    setIsLoading(false);
  };

  const cancelRequest = () => {
    const { docID } = route.params;
    const UID = auth.currentUser.uid;
    const date = new Date();
    const formatedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    try {
      firestore()
        .collection('userData')
        .doc(UID)
        .collection('requestsHistory')
        .doc(docID)
        .update({
          status: 'Cancelado',
          cancellationDate: formatedDate,
        })
        .then(() => {
          triggerAlert('Cargamento cancelado', 'El cargamento ha sido cancelado', 'Ok');
          navigation.navigate('HomeScreen');
        });
    } catch (error) {
      console.log('Error 0x6', error);
    }
  };

  useEffect(() => {
    setProductList([]);
    getDocumentsData();
  }, []);

  if (!isLoading) return (
    <SafeAreaView>
      <LoadingComponent loading={isLoading}/>
      <View style={styles.screen}>
        <ScrollView>
          <View style={styles.flexContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={[styles.arrowbtn, styles.flexItem]}>
              <Image
                source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Farrow_left.png?alt=media&token=34784200-c05c-4ea5-a182-97adeead9a9b'}}
                style={styles.arrow}
              />
            </TouchableOpacity>
            <Text style={[styles.poppinsTitle, {flex: 4}]}>Cargamento #{requestDocumentData.requestID}</Text>
          </View>
        
        <Text style={styles.poppinsSubtitle}>Nombre: </Text>  
        <Text style={styles.poppinsregular}>{userDocumentData.name}</Text>

        <Text style={styles.poppinsSubtitle}>Email: </Text>
        <Text style={styles.poppinsregular}>{userDocumentData.email}</Text>

        <Text style={styles.poppinsSubtitle}>Dirección: </Text>
        <Text style={styles.poppinsregular}>{userDocumentData.address}</Text>
        
        <Text style={styles.poppinsSubtitle}>Nombre de empresa: </Text>
        <Text style={styles.poppinsregular}>{userDocumentData.nameCorp}</Text>

        <Text style={styles.poppinsSubtitle}>Productos: </Text>
        
        {
          productList.map((product, index) => {
            return(
              <View key={index}>
                <View style={styles.mainCardView}>
                  <View style={styles.subCardView}>
                    <Text style={styles.poppinsmedium}>{product.Type}</Text>
                  </View>


                  <View style={[styles.flexContainer]}>
          
                      <View style={[styles.flexItem, styles.sideMargin]}>
                        <Text style={[styles.poppinsregular, {fontSize: 18}]}>{product.Name}</Text>
                        <Text style={[styles.poppinsregular, {fontSize: 12}]}>{product.Quantity + ' ' + product.MeasuringUnit}</Text>
                        <Text style={[styles.poppinsmedium, {fontSize: 16}]}>Expira: </Text>
                        <Text style={[styles.poppinsregular, {fontSize: 12}]}>{product.ExpirationDate}</Text>
                      </View>

                     
                  </View>
                  
                </View>
                
              </View>
              
            )
          })
        }
        <Text style={styles.poppinsSubtitle}>Estado del cargamento: {requestDocumentData.status}</Text>
        <Text style={styles.poppinsSubtitle}>Fecha de entrega: {requestDocumentData.creationDate}</Text>
        {
          requestDocumentData.status === 'Cancelado' 
          ? <Text style={styles.poppinsSubtitle}>Fecha de cancelación: {requestDocumentData.cancellationDate}</Text> 
          : <Button content={'Cancelar cargamento'} bgColor={Colors.primary} fontColor={Colors.textSecondary} functionality={() => cancelRequest()}/>
        }
        

        </ScrollView>
      </View>  

      <DefaultAlert 
        modalVisible={alertVisible}
        alertTitle={alertTitle}
        alertContent={alertContent}
        onHide={() => triggerAlert('', '', [''])}
        btnContent = {btnContent}
      />
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
  button: {
    backgroundColor: '#E01E40',
    marginTop: 16,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    color: 'white', 
    fontWeight: 'bold',
  },
  poppinsTitle: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 30,
    lineHeight: 34,
    color: 'black'
},
  poppinsSubtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    lineHeight: 32,
    color: 'black'
  },
  poppinsregular: {
    fontFamily: 'Poppins-Regular', 
    color: 'black'
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
  mainCardView: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    borderColor: '#eeeeee',
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mini: {
    width: 30,
    height: 30,
  },
  sideMargin: {
    marginLeft: 16,
    marginRight: 16,
  },
});
