  // Base
  import {React, useEffect, useState} from 'react';
  import {useNavigation} from '@react-navigation/native';

  // UI
  import {FlatList, Image, View, StyleSheet, Text, TouchableOpacity, RefreshControl} from 'react-native';

  // Styles
  import Colors from '../../Global/styles/Colors';
  import DefaultStyles from '../../Global/styles/Defaults';

  // Firebase
  import firestore from '@react-native-firebase/firestore';
  import {auth} from '../../../config/FirebaseConnection';

  const colorStatus = {
      'En camino': '#4200ff',
      'Entregado': '#38b503',
      'Cancelado': 'gray',
      'Pendiente': '#f07e15',
  }



const getDocumentsData = async () => {
  const UID = auth.currentUser.uid;
  const shipments = firestore().collection('userData').doc(UID).collection('requestsHistory').orderBy('requestID', 'asc');

  const querySnapshot = await shipments.get();
  const data = querySnapshot.docs.map((doc) => {
    // Ignore the document with ID 'summary'
    if (doc.id === 'summary') {
      return null;
    }
    return { id: doc.id, ...doc.data() }; // Include the document ID in the data object
  }).filter(doc => doc !== null); // Filter out the ignored document

  return data;
}

onRefresh = () => {
  setRefresh(true);
  setShipments([]);

  getDocumentsData().then((data) => {
    setShipments(data);
    setRefresh(false);
  }).delay(2000);
}
    
  const Shipment = ({shipmentId, status, index}) => {
    const navigation = useNavigation();
    return (
      <TouchableOpacity onPress={() => navigation.navigate('RequestDetails', { docID: shipmentId })}>
      <View style={styles.shipmentContainer}>
          <Text style={DefaultStyles.poppinsTitle}>Cargamento #{index}</Text>
          <View style={styles.shipment}>
          <View style={[styles.image, {backgroundColor: colorStatus[status]}]}>
          <Image
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Fassets%2FDashboard%2Fcamion.png?alt=media&token=44bf84ed-3c81-47b1-ade9-83470a48d829',
            }}
            width={24}
            height={24}
          />
        </View>
        <View style={styles.rightSection}>
          <Text style={DefaultStyles.poppinsSubtitle}>{status}</Text>
        </View>
      </View>
      </View>
      </TouchableOpacity>
    );
  };

  const ShipmentsComponent = ({navigation}) => {
    const [shipments, setShipments] = useState([]);
    const [refresh, setRefresh] = useState(false);


    useEffect(() => {
      getDocumentsData().then((data) => {
        setShipments(data);
      });
    }, []);

    return (
      <View style={styles.container}>
        <Text style={[DefaultStyles.poppinsTitle, {color: Colors.textSecondary}]}>Mis Cargamentos</Text>
        
        {
          shipments.length > 0 ? (
          <FlatList
          showsVerticalScrollIndicator={false}
            data={shipments}
            renderItem={({item}) => (
              <Shipment shipmentId={item.id} index={item.requestID} status={item.status} nav={navigation} />
            )}
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={() => getDocumentsData().then((data) => {
                  setShipments(data);
                })}/>
            }
          />
          ) : 
          (<Text style={[DefaultStyles.poppinsSubtitle, {color: Colors.textSecondary}]}>No hay cargamentos</Text>)
        }
        
      </View>
    );
  };

  export default ShipmentsComponent;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#E8042C',
      padding: 24,
      marginVertical: 16,
      borderRadius: 16,
      height: 500,
      elevation: 5,
    },
    shipment: {
      display: 'flex',
      flexDirection: 'row',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 16,
      gap: 16,
    },
    shipmentContainer: {
      padding: 16,
      backgroundColor: '#fff',
      marginVertical: 8,
      borderRadius: 16,
      
    },
    rightSection: {
      alignContent: 'center',
      justifyContent: 'center',

    },
    image: {
      width: 48,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 56,
    },
  });
