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
  
  const images ={
    'En camino' : 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Fcamion.png?alt=media&token=36e60c65-f444-4e3b-be63-7f8d86f4ebb8&_gl=1*13a7sag*_ga*MjQ1OTk0NTYzLjE2OTIxOTcxOTI.*_ga_CW55HF8NVT*MTY5NzU1MTA2Ny4xNjAuMS4xNjk3NTUyMTI0LjMuMC4w',
    'Entregado' : 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Fcheck.png?alt=media&token=a33b145d-ee7f-40f6-b7c0-4803a882235b&_gl=1*1ie9eho*_ga*MjQ1OTk0NTYzLjE2OTIxOTcxOTI.*_ga_CW55HF8NVT*MTY5NzU2MTU5Mi4xNjIuMS4xNjk3NTY4MDU1LjUxLjAuMA..',
    'Cancelado' : 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Fcancelado.png?alt=media&token=83d60d6f-7601-4abd-aa18-08796baf593c&_gl=1*1b17px4*_ga*MjQ1OTk0NTYzLjE2OTIxOTcxOTI.*_ga_CW55HF8NVT*MTY5NzU1MTA2Ny4xNjAuMS4xNjk3NTUyMzgzLjQxLjAuMA..',
    'Pendiente' : 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Fpendiente.png?alt=media&token=d6e6c8ec-ff1b-4086-b95f-81bba6ccf5e0&_gl=1*a7776s*_ga*MjQ1OTk0NTYzLjE2OTIxOTcxOTI.*_ga_CW55HF8NVT*MTY5NzU1MTA2Ny4xNjAuMS4xNjk3NTUyNDEyLjEyLjAuMA..',
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
              uri: images[status],
            }}
            width={28}
            height={28}
          />
        </View>
        <View style={styles.rightSection}>
        <View style={{borderRadius: 12, height: 10, backgroundColor: '#CBD5E0'}}>
          <View style={{backgroundColor: colorStatus[status], borderRadius: 12, height: 10, width: colorStatusText[status]}}></View>
        </View>
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
