import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {auth} from '../../../config/FirebaseConnection';
import { Dropdown } from 'react-native-element-dropdown';

const CreateRequest = () => {
  const [inputs, setInputs] = useState([{ productName: '', weight: '', type: '', unit: '', expirationDate: '' }]);
  const [unitTypes, setUnitTypes] = useState([[{label: 'Selecciona un tipo de producto', unitValue: ''}]]);

  const navigation = useNavigation();

  const regexDate = /^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/;

  // Labels data for dropdown
  const productTypes = [
    { label: "Frutas",           typeValue: "FR" },
    { label: "Verduras",         typeValue: "VR" },
    { label: "Granos",           typeValue: "GR" }, 
    { label: "Enlatados",        typeValue: "EN" },
    { label: "Carnes",           typeValue: "CA" },
    { label: "Lácteos",          typeValue: "LA" },
    { label: "Ropa",             typeValue: "RO" },
    { label: "Medicamentos",     typeValue: "ME" },
    { label: "Higiene personal", typeValue: "HP" },
    { label: "Otros",            typeValue: "OT" },
  ];

  // Handle everything

  const handleUnitTypes = (index, _typeValue) => {
    const updatedUnits = [...unitTypes]; 

    if (_typeValue === "FR" || _typeValue === "VR" || _typeValue === "GR" || _typeValue === "CA") {
      updatedUnits[index] = [
        { label: "Kilos", unitValue: "KG" },
        { label: "Toneladas", unitValue: "TON" },
      ];
    } else if (_typeValue === "EN" || _typeValue === "ME" || _typeValue === "HP" || _typeValue === "OT" || _typeValue === "RO") {
      updatedUnits[index] = [
        { label: "Piezas", unitValue: "PZ" },
        { label: "Cajas", unitValue: "CA" },
      ];
    } else if (_typeValue === "LA") {
      updatedUnits[index] = [
        { label: "Litros", unitValue: "LT" },
        { label: "Galones", unitValue: "GL" },
        { label: "Kilos", unitValue: "KG" },
        { label: "Piezas", unitValue: "PZ" },
      ];
    }
  
    setUnitTypes(updatedUnits); // Update the state with the modified inputs array
  };
  const handleInputChange = (text, index, field) => { 
    const updatedInputs = [...inputs];
    updatedInputs[index][field] = text;
    setInputs(updatedInputs);
  };  

  const handleAddInput = () => {
    const newInput = { productName: '', weight: '', type: '', unit: '', expirationDate: '' };
    const newUnit = [{label: 'Selecciona un tipo de producto', unitValue: ''}];
    setUnitTypes([...unitTypes, newUnit]);
    setInputs([...inputs, newInput]);
  };
  
  const handleRemoveInput = (index) => {
    const updatedInputs = [...inputs];
    updatedInputs.splice(index, 1);
    setInputs(updatedInputs);
  };

  
  // Final method for request creation
  const createRequest = async () => {
    let nameArray = [];
    let typeArray = [];
    let weightArray = [];
    let unitArray = [];
    let expirationDateArray = [];

    inputs.forEach((input) => {
      nameArray.push(input.productName);
      typeArray.push(input.type);
      weightArray.push(input.weight);
      unitArray.push(input.unit);
      expirationDateArray.push(input.expirationDate);
    });

    try{
    const UID = auth.currentUser.uid;
      const userData = (await firestore().collection('userData').doc(UID).get()).data();
  
      const requestData = {
        supplierID: UID,
        supplierName: userData.name,
        supplierEmail: auth.currentUser.email,
        nameCorp: userData.nameCorp,
        address: userData.address,
        phone: userData.phoneNumber,
        type: typeArray,
        productName: nameArray,
        weight: weightArray,
        unit: unitArray,
        expirationDate: expirationDateArray, 
        status: 'Pendiente',
      }; 
      console.log('Request: ', requestData);
      await firestore().collection('Requests').add(requestData);
      Alert.alert('Solicitud creada', 'Tu solicitud ha sido creada con éxito');
    } 
    catch (error){
      Alert.alert('Error', 'No se pudo crear la solicitud');
      console.log('Error (0x4): ', error);
    }
    
  }

  // Showing things
 
  return (

    <View style={styles.screen}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.arrowbtn}>
        <Image
              source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2Farrow_left.png?alt=media&token=34784200-c05c-4ea5-a182-97adeead9a9b'}}
              style={styles.arrow}
              />
      </TouchableOpacity>
      <View style={[styles.flexContainer, styles.cardScreen]}>
        <ScrollView contentContainerStyle={{flexGrow:0}}>
        {inputs.map((input, index) => (
          <View key={index}>
            {index !== 0 && (
              <TouchableOpacity onPress={() => handleRemoveInput(index)}>
                <Text>X</Text>
              </TouchableOpacity>
            )}
            <Text style={styles.poppinsmedium}>Tipo de producto</Text>
            <Dropdown
                style={styles.dropdown}
                placeholder="Escoge el tipo de producto"
                data={productTypes}
                labelField="label"
                valueField="typeValue"
                value={inputs[index].type}
                onChange={item => {
                  handleUnitTypes(index, item.typeValue);
                  handleInputChange(item.typeValue, index, 'type');
                  
                  //console.log('Type value: ', inputs[index].type, ' Unit value: ', inputs[index].unit);
                }}
              />
            <Text style={styles.poppinsmedium}>Producto</Text>
            <TextInput
              placeholder="Nombre del producto"
              value={inputs[index].productName} // Use the value from the inputs state array
              onChangeText={(text) => handleInputChange(text, index, 'productName')}
              style={[styles.flexItem, styles.input]}
            />
            <View style={{flexDirection: 'row'}}>
              <TextInput
                placeholder="Cantidad"
                value={inputs[index].weight}
                onChangeText={(text) => handleInputChange(text, index, 'weight') }
                style={[styles.flexItem, styles.input]}
              />
              <Dropdown
                style={styles.dropdown}
                placeholder="Unidad"
                data={unitTypes[index]}
                labelField="label"
                valueField="unitValue"
                value={inputs[index].unit}
                onChange={item => {
                  handleInputChange(item.unitValue, index, 'unit');
                }}
              />
            </View>
            <Text style={styles.poppinsmedium}>Fecha de caducidad</Text>
            <TextInput
                placeholder="DD/MM/AAAA"
                value={inputs[index].expirationDate}
                type="date"
                onChangeText={(text) => handleInputChange(text, index, 'expirationDate')}
                style={[styles.flexItem, styles.input]}
              />
          </View>
        ))}
        <View style={[styles.flexContainer, {alignItems: 'flex-end'}]}>
          <TouchableOpacity onPress={handleAddInput}>
            <Image style={[styles.arrow, {padding: 30, alignItems: 'flex-end'}]} source={{uri: "https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Fassets%2FDashboard%2Fa%C3%B1adir.png?alt=media&token=e70ed552-72c6-45e4-8cc1-9be2baaf9ff3"}}/>
          </TouchableOpacity>
        </View>
        </ScrollView>
        <View style={[styles.flexContainer, {flexDirection: 'row'}]}>
          <TouchableOpacity onPress={() => createRequest()}>
            <Text style={[styles.button, {backgroundColor: '#38B503'}]}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[styles.button, {backgroundColor: '#E8042C'}]}>Cancelar</Text>
          </TouchableOpacity>
          
      </View>
      </View>
      
    </View>
  );
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  flexContainer: {
    //backgroundColor: 'orange',
    alignSelf: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    textAlign: 'center',
    marginHorizontal: 8,
  },
  flexItem: {
    flex: 1,
  },
  dropdown: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 24,
    elevation: 10,
    height: 45,
  },
  cardScreen: {
    margin: 10,
    padding: 25,
    borderRadius: 20,
    justifyContent: 'center',
    //backgroundColor: 'rgb(224,30,64)',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    padding: 10,
    fontFamily: 'Poppins-Regular',
    height: 45,
    margin: 10,
  },
  arrow: {
    width: 24,
    height: 24,
  },
  arrowbtn: {
    width: 24,
    height: 24,
    marginHorizontal: 24,
  },
  button: {
    marginTop: 16,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    color: 'white', 
    fontWeight: 'bold',
  },
  poppinsregular: {
    fontFamily: 'Poppins-Regular', 
  },
  poppinsmedium: {
    fontFamily: 'Poppins-Medium', 
    fontSize: 16,
    color: 'black',
  },
});

export default CreateRequest;