  // Base
  import {React, useEffect, useState} from 'react';
  import {useNavigation} from '@react-navigation/native';

  // UI
  import {FlatList, Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';

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

  const colorStatusText = {
      'En camino': '66%',
      'Entregado': '100%',
      'Cancelado': '0%',
      'Pendiente': '33%',
  }
  

const Tag = ({text, selected, activeColor, _onPress}) => {
  const [isSelected, setIsSelected] = useState(selected);
  
  const handlePress = () => {
    _onPress();
    setIsSelected(!isSelected);
  };

  return (
    <View style={[styles.tag, {backgroundColor: isSelected ? activeColor : Colors.textSecondary}]}>
      <TouchableOpacity onPress={() => handlePress()} activeOpacity={1}>
        <Text style={[DefaultStyles.poppinsMedium, {color: isSelected ? Colors.textSecondary : Colors.textPrimary, fontSize: 10}]}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  )
};

const ShipmentsComponent = ({navigation, user}) => {
  const [shipments, setShipments] = useState([]);
  const [delivered, setDelivered] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [inTransit, setInTransit] = useState(false);
  const [pending, setPending] = useState(false);
  const [snapshot, setSnapshot] = useState([]);
  const [pageSize, setPageSize] = useState(25);

  let unsubscribe = null;

    
  const Shipment = ({status, index}) => {
    const navigation = useNavigation();
    return (
      <TouchableOpacity onPress={() => navigation.navigate('RequestDetails', { docData: shipments.filter(doc => doc.requestID == index), userData: user})}>
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

  const getDocumentsData = () => {
    const UID = auth.currentUser.uid;
    const shipments = firestore().collection('userData').doc(UID).collection('requestsHistory').orderBy('requestID', 'asc').limit(pageSize);
    
    unsubscribe = shipments.onSnapshot((querySnapshot) => {
      let data = querySnapshot.docs.map((doc) => {
        if (doc.id === 'summary') {
          return null;
        }
        return { id: doc.id, ...doc.data() };
      }).filter(doc => doc !== null);
      setSnapshot(data);

      setShipments(data);
    });
  };

  const filterData = () => {
    const filter = [];
      
    if(pending) filter.push("Pendiente");
    if(delivered) filter.push("Entregado");
    if(cancelled) filter.push("Cancelado");
    if(inTransit) filter.push("En camino");    

    if(filter.length === 0) {
      // If none of the tags are selected, return all documents
      setShipments(snapshot);
    } else {
      // If any of the tags are selected, filter the documents based on the status
      data = snapshot.filter(doc => filter.includes(doc.status));
      setShipments(data);
    }
  }
    useEffect(() => {
      getDocumentsData();
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };  
    }, []);

    useEffect(() => {
      filterData();
    }, [pending, inTransit, delivered, cancelled]);
  

  return (
    <View style={styles.container}>
      <Text style={[DefaultStyles.poppinsTitle, {color: Colors.textSecondary}]}>Mis Cargamentos</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Tag text="Pendiente" selected={inTransit} activeColor={colorStatus['Pendiente']} _onPress={() => setPending(!pending)}/>
        <Tag text="En camino" selected={inTransit} activeColor={colorStatus['En camino']} _onPress={() => setInTransit(!inTransit)}/>
        <Tag text="Entregados" selected={delivered} activeColor={colorStatus['Entregado']} _onPress={() => setDelivered(!delivered)}/>
        <Tag text="Cancelados" selected={cancelled} activeColor={colorStatus['Cancelado']} _onPress={() => setCancelled(!cancelled)}/>
      </View>
      
        {
          shipments.length > 0 ?
          (
            <FlatList
            showsVerticalScrollIndicator={false}
              data={shipments}
              renderItem={({item}) => (
                <Shipment shipmentId={item.id} index={String(item.requestID).padStart(5, '0')} status={item.status} nav={navigation} />
              )}
            />
          )
          :(<Text style={[DefaultStyles.poppinsSubtitle, {color: Colors.textSecondary}]}>No hay cargamentos</Text>)
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
    flex: 1
  },
  image: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 56,
  },
  tag: {
    flex: 1,
    paddingVertical: 8,
    marginVertical: 8,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: Colors.textDisabled,
  }
});
