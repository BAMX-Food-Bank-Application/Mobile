// git commit -m "Products data visualized inside cards, full details view done, added key index to request creation view. [Check for bugs]"


import React, {useState} from 'react';
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
// Components
import Button from '../../Global/components/Button';
import DefaultAlert from '../../Global/components/DefaultAlert';
import ConfirmDialog from '../../Global/components/ConfirmDialog';

// Styles
import Colors from '../../Global/styles/Colors';

// Others
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {auth} from '../../../config/FirebaseConnection';
import { Dropdown } from 'react-native-element-dropdown';
import DefaultStyles from '../../Global/styles/Defaults';

const CreateRequest = () => {
  const [inputs, setInputs] = useState([{ productName: '', weight: '', type: '', unit: '', expirationDate: '' }]);
  const [unitTypes, setUnitTypes] = useState([[{label: 'Selecciona un tipo de producto', unitValue: ''}]]);

  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const [alertTitle, setAlertTitle] = useState('');
  const [alertContent, setAlertContent] = useState('');
  const [btnContent, setBtnContent] = useState(['','']);




  const triggerConfirmation = () => {
    setConfirmationVisible(!confirmationVisible);
  };
  const triggerAlert = (title, message, button) => {
    setAlertTitle(title);
    setAlertContent(message);
    setBtnContent(button);
    setAlertVisible(!alertVisible);
  };
  

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
        triggerAlert('Error', 'Por favor, llena todos los campos', 'Aceptar')
        isValid = false;
      }
      else if (input.productName === '') {
        triggerAlert('Error', 'Ingresa el nombre del producto', 'Aceptar')
        isValid = false;
      } else if (input.weight === '') {
        triggerAlert('Error', 'Ingresa la cantidad del producto', 'Aceptar')
        isValid = false;
      } else if (input.type === '') {
        triggerAlert('Error', 'Selecciona el tipo de producto', 'Aceptar')
        isValid = false;
      } else if (input.unit === '') {
        triggerAlert('Error', 'Selecciona la unidad del producto', 'Aceptar')
        isValid = false;
      } else if (input.expirationDate === '') {
        triggerAlert('Error', 'Ingresa la fecha de caducidad del producto', 'Aceptar')
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
    let names = [];
    let types = [];
    let weights = [];
    let units = [];
    let expirationDates = [];

    if (!validateInputs()) return;

    inputs.forEach((input) => {
      names.push(input.productName);
      types.push(input.type);
      weights.push(input.weight);
      units.push(input.unit);
      expirationDates.push(input.expirationDate);
    });

    try{
      const UID = auth.currentUser.uid;  
      const count = firestore().collection('Requests').where("supplierID", "==", UID).get().then((snapshot) => { return snapshot.size; }); 
      const requestData = {
        supplierID: UID,
        type: types,
        productName: names,
        weight: weights,
        unit: units,
        expirationDates: expirationDates, 
        creationDate: new Date().toLocaleDateString(),
        status: 'Pendiente',
        requestNumber: count,
      }; 
      console.log('Request: ', requestData);
      await firestore().collection('Requests').add(requestData);
      Alert.alert('Solicitud creada', 'Tu solicitud ha sido creada con éxito');
      navigation.goBack();
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
            <Text style={DefaultStyles.poppinsMedium}>Tipo de producto</Text>
            <Dropdown
                itemTextStyle={DefaultStyles.poppinsRegular}
                selectedTextStyle={DefaultStyles.poppinsRegular}
                style={styles.dropdown}
                placeholder="Escoge el tipo de producto"
                placeholderStyle={{color: Colors.textDisabled}}
                data={productTypes}
                labelField="label"
                valueField="typeValue"
                value={inputs[index].type}
                onChange={item => {
                  handleUnitTypes(index, item.typeValue);
                  handleInputChange(item.typeValue, index, 'type');                  
                }}
              />
            <Text style={DefaultStyles.poppinsMedium}>Producto</Text>
            <TextInput
              placeholder="Nombre del producto"
              placeholderTextColor={Colors.textDisabled}
              value={inputs[index].productName} // Use the value from the inputs state array
              onChangeText={(text) => handleInputChange(text, index, 'productName')}
              style={[styles.flexItem, styles.input]}
            />
            <View style={{flexDirection: 'row'}}>
              <TextInput
                placeholder="Cantidad"
                placeholderTextColor={Colors.textDisabled}
                value={inputs[index].weight}
                onChangeText={(text) => handleInputChange(text, index, 'weight') }
                style={[styles.flexItem, styles.input]}
              />
              <Dropdown
                itemTextStyle={DefaultStyles.poppinsRegular}
                selectedTextStyle={DefaultStyles.poppinsRegular}
                style={styles.dropdown}
                placeholder="Unidad"
                
                placeholderStyle={{color: Colors.textDisabled}}

                data={unitTypes[index]}
                labelField="label"
                valueField="unitValue"
                value={inputs[index].unit}
                onChange={item => {
                  handleInputChange(item.unitValue, index, 'unit');
                }}
              />
            </View>
            <Text style={DefaultStyles.poppinsMedium}>Fecha de caducidad</Text>
            <TextInput
              placeholderTextColor={Colors.textDisabled}

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
        <View style={[styles.flexContainer, {alignItems: 'flex-end', color: Colors.black}]}>
          <TouchableOpacity onPress={handleAddInput}>
            <Image style={[styles.arrow, {padding: 30, alignItems: 'flex-end'}]} source={{uri: "https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Fassets%2FDashboard%2Fa%C3%B1adir.png?alt=media&token=e70ed552-72c6-45e4-8cc1-9be2baaf9ff3"}}/>
          </TouchableOpacity>
        </View>
        </ScrollView>
        <View style={[styles.flexContainer, {flexDirection: 'row', columnGap: 16}]}>
          <Button content='Guardar' functionality={() => handleRequest()} bgColor={Colors.approval} fontColor={Colors.white}/>
          <Button content='Cancelar' functionality={() => triggerConfirmation()} bgColor={Colors.primary} fontColor={Colors.white}/>       
      </View>
      </View>
      <ConfirmDialog 
        modalVisible={confirmationVisible} 
        alertTitle='¿Estás segur@ de cancelar tu cargamento?' 
        alertContent='Se borrarán todos los datos del cargamento actual.' 
        onDeny={() => triggerConfirmation()} 
        onAccept={() => { triggerConfirmation(); navigation.goBack(); }}
        btnContent = {['Confirmar','Volver']}
      />
      <DefaultAlert 
        modalVisible={alertVisible}
        alertTitle={alertTitle}
        alertContent={alertContent}
        onHide={() => triggerAlert('', '', [''])}
        btnContent = {btnContent}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  flexContainer: {
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
    color: Colors.textPrimary,
  },
  cardScreen: {
    margin: 10,
    padding: 25,
    borderRadius: 20,
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    padding: 10,
    fontFamily: 'Poppins-Regular',
    color: Colors.black,
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