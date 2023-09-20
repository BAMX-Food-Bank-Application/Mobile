// Core
import React from 'react';
import {FlatList, Image, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native';

const colorStatus = {
    'En camino': '#4200ff',
    'Entregado': '#38b503',
    'Cancelado': 'gray',
    'Pendiente': '#f07e15',
}

const Shipment = ({shipmentId, status}) => {
    
  return (
    <View style={styles.shipmentContainer}>
        <Text style={styles.shipTitle}>Cargamento #{shipmentId}</Text>
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
        <Text style={styles.status}>{status}</Text>
      </View>
    </View>
    </View>
  );
};

const ShipmentsComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Cargamentos</Text>
      <FlatList
      showsVerticalScrollIndicator={false}
        data={[
          {
            shipmentId: '0001',
            status: 'En camino',
          },
          {
            shipmentId: '0002',
            status: 'Entregado',
          },
          {
            shipmentId: '0003',
            status: 'Pendiente',
          },
          {
            shipmentId: '0002',
            status: 'En camino',
          },
          {
            shipmentId: '0003',
            status: 'En camino',
          },
          {
            shipmentId: '0002',
            status: 'Cancelado',
          },
          {
            shipmentId: '0003',
            status: 'En camino',
          },
          {
            shipmentId: '0002',
            status: 'En camino',
          },
          {
            shipmentId: '0003',
            status: 'En camino',
          },
          {
            shipmentId: '0023',
            status: 'En camino',
          },
          {
            shipmentId: '0003',
            status: 'Cancelado',
          },
        ]}
        renderItem={({item}) => (
          <Shipment shipmentId={item.shipmentId} status={item.status} />
        )}
      />
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
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Poppins-ExtraBold',
    paddingBottom: 16,
  },
  shipment: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  shipmentContainer: {
    backgroundColor: '#fff',
    marginVertical: 8,
    borderRadius: 16,
  },
  rightSection: {
    marginLeft: 16,
  },
  image: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 56,
  },
  shipTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    paddingTop: 16,
    paddingHorizontal: 16
  },
  status: {
    fontSize: 18,
    fontWeight: 'light',
    fontFamily: 'Poppins-Regular',
  }
});
