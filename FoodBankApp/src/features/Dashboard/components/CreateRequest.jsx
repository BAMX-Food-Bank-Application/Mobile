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
import DefaultAlert from '../../Global/components/DefaultAlert';

const CreateRequest = () => {
  const [inputs, setInputs] = useState([{ productName: '', weight: '', type: '', unit: '', expirationDate: '' }]);
  const [unitTypes, setUnitTypes] = useState([[{label: 'Selecciona un tipo de producto', unitValue: ''}]]);
  const [alertTitle, setAlertTitle] = useState[''];
  const [alertContent, setAlertContent] = useState[''];
  const [showAlert, setShowAlert] = useState(false);

  const alertTrigger = (_alertTitle, _alertContent)  => {
    setShowAlert(!showAlert);
    setAlertTitle(alertTitle);
    setAlertContent(alertContent);
  };

  const navigation = useNavigation();

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

    if (_typeValue === "FR" || _typeValue === "VR" || _typeValue === "GR" || _typeValue === "CA" || _typeValue === "LA") {
      updatedUnits[index] = [
        { label: "Kilos", unitValue: "KG" },
        { label: "Toneladas", unitValue: "TON" },
      ];
    } else if (_typeValue === "EN" || _typeValue === "ME" || _typeValue === "HP" || _typeValue === "OT" || _typeValue === "RO") {
      updatedUnits[index] = [
        { label: "Piezas", unitValue: "PZ" },
        { label: "Cajas", unitValue: "CA" },
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
      const count = (await firestore().collection('userData').doc(UID).collection('requestsHistory').count()).size;
  
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
        requestNumber: count + 1,
      }; 
      await firestore().collection('userData').doc(UID).collection('requestsHistory').add(requestData);
        alertTrigger("Solicitud Creada", "Su solicitud se ha generado satsifactoriamente.");
        console.log("A");
      } 
    catch (error){
      alertTrigger("Error", "No se ha podido guardar su solicitud.")
      console.log('Error (0x4): ', error);
    }
    
  }

  // Showing things
 
  return (

    <View style={styles.screen}>
      <DefaultAlert alertTitle={alertTitle} alertContent={alertContent} modalVisible={showAlert} onHide={() => 
        alertTitle === "Solicitud creada" ? navigation.goBack() : alertTrigger()
      } btnContent={"Continuar"}/>
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
                }}
              />
            <Text style={styles.poppinsmedium}>Producto</Text>
            <TextInput
              placeholder="Nombre del producto"
              value={inputs[index].productName} // Use the value from the inputs state array
              onChangeText={(text) => handleInputChange(text, index, 'productName')}
              style={[styles.flexItem, styles.input]}
              accessibilityLabel='Producto'
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