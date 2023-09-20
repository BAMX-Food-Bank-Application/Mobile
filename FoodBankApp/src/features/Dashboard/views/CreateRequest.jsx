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

  const regexDate = /^[0-9]$/;

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

  // Force date input to be date format dd/mm/yyyy, if not, it will be deleted
  const handleDate = (text, index) => {
    if (text.length == 2 || text.length == 5) handleInputChange(text + '/', index, 'expirationDate');
    else if (text.length == 3 || text.length == 6) handleInputChange(text.substring(0, text.length - 1), index, 'expirationDate');
    else if (text.length == 1 && text > 3) handleInputChange('', index, 'expirationDate');
    else handleInputChange(text, index, 'expirationDate');
  };

  // Validation
    const validateInputs = () => {
    let isValid = true;
    inputs.forEach((input) => {
      if (input.productName === '' || input.weight === '' || input.type === '' || input.unit === '' || input.expirationDate === '') {
        Alert.alert('Error', 'Por favor, llena todos los campos');
        isValid = false;
      }
      else if (input.productName === '') {
        Alert.alert('Error', 'Ingresa el nombre del producto');
        isValid = false;
      } else if (input.weight === '') {
        Alert.alert('Error', 'Ingresa la cantidad del producto');
        isValid = false;
      } else if (input.type === '') {
        Alert.alert('Error', 'Selecciona el tipo de producto');
        isValid = false;
      } else if (input.unit === '') {
        Alert.alert('Error', 'Selecciona la unidad del producto');
        isValid = false;
      } else if (input.expirationDate === '') {
        Alert.alert('Error', 'Ingresa la fecha de caducidad del producto');
        isValid = false;
      } 
    });
    return isValid;
  };

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

  const handleExit = () => {
    Alert.alert(
      '¿Estás seguro?',
      'Si sales ahora, tu solicitud no será guardada',
      [
        {
          text: 'Cancelar cargamento',
          onPress: () => navigation.navigate('HomeScreen'),
          style: 'destructive',
        },
        {
          text: 'Volver',
          onPress: () => console.log('Cancel pressed'),
          style: 'cancel',
        },
        
      ],
      {cancelable: false},
    ); 
  };

  
  // Final method for request creation
  const handleRequest = async () => {
    let nameArray = [];
    let typeArray = [];
    let weightArray = [];
    let unitArray = [];
    let expirationDateArray = [];

    if (!validateInputs()) {
      return;
    }

    inputs.forEach((input) => {
      nameArray.push(input.productName);
      typeArray.push(input.type);
      weightArray.push(input.weight);
      unitArray.push(input.unit);
      expirationDateArray.push(input.expirationDate);
    });

    try{
    const UID = auth.currentUser.uid;  
      const requestData = {
        supplierID: UID,
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
                maxLength={10}
                keyboardType='numeric'
                onChangeText={(text) => handleDate(text, index)}
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
        <TouchableOpacity onPress={() => handleExit()}>
            <Text style={[styles.button, {backgroundColor: '#E8042C'}]}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRequest()}>
            <Text style={[styles.button, {backgroundColor: '#38B503'}]}>Guardar</Text>
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