import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal
} from 'react-native';

// Components
import Button from '../../Global/components/Button';
import DefaultAlert from '../../Global/components/DefaultAlert';
import ConfirmDialog from '../../Global/components/ConfirmDialog';
import DatePicker, {getToday} from 'react-native-modern-datepicker';

// Styles
import Colors from '../../Global/styles/Colors';

// Utils
import {getDate} from '../../Global/utils/dataUtils';

// Others
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {auth} from '../../../config/FirebaseConnection';
import { Dropdown } from 'react-native-element-dropdown';
import DefaultStyles from '../../Global/styles/Defaults';

const CreateRequest = () => {
  const [inputs, setInputs] = useState([{ productName: '', weight: '', type: '', unit: '', expirationDate: '' }]);
  const [unitTypes, setUnitTypes] = useState([[]]);

  const [dateVisible, setDateVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertContent, setAlertContent] = useState('');
  const [btnContent, setBtnContent] = useState(['','']);

  const triggerConfirmation = () => {
    setConfirmationVisible(!confirmationVisible);
  };

  const triggerAlert = (title, message) => {
    setAlertTitle(title);
    setAlertContent(message);
    setAlertVisible(!alertVisible);
  };
  
  const triggerDateVisible = () => {
    setDateVisible(!dateVisible);
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

  // Validation
    const validateInputs = () => {

      inputs.forEach((input) => {
      if (input.productName === '' || input.weight === '' || input.type === '' || input.unit === '' || input.expirationDate === '') {
        triggerAlert('Error', 'Por favor, llena todos los campos')
        throw new Error('Validation failed');
      }
      else if (input.productName === '') {
        triggerAlert('Error', 'Ingresa el nombre del producto')
        throw new Error('Validation failed');
      } else if (input.weight === '' || Number(input.weight) <= 0) {
        triggerAlert('Error', 'Ingrese una cantidad válida')
        throw new Error('Validation failed');
      } else if (input.type === '') {
        triggerAlert('Error', 'Selecciona el tipo de producto')
        throw new Error('Validation failed');
      } else if (input.unit === '') {
        triggerAlert('Error', 'Selecciona la unidad del producto')
        throw new Error('Validation failed');
      } else if (input.expirationDate === '') {
        triggerAlert('Error', 'Ingresa la fecha de caducidad del producto')
        throw new Error('Validation failed');
      } 
    });
    return true;
  };

  // Handle everything

  const handleDate = (text, index) => {
    const updatedInputs = [...inputs];
    updatedInputs[index].expirationDate = text;
    setInputs(updatedInputs);
    triggerDateVisible();
  };

  const handleUnitTypes = (index, _typeValue) => {
    const updatedUnits = [...unitTypes]; 

    if (_typeValue === "FR" || _typeValue === "VR" || _typeValue === "GR" || _typeValue === "CA" || _typeValue === "RO" || _typeValue === "LA") {
      updatedUnits[index] = [
        { label: "Kilos", unitValue: "KG" },
        { label: "Toneladas", unitValue: "TON" },
      ];
    } else if (_typeValue === "EN" || _typeValue === "ME" || _typeValue === "HP" || _typeValue === "OT" ) {
      updatedUnits[index] = [
        { label: "Piezas", unitValue: "PZ" },
      ];
    }
  
    setUnitTypes(updatedUnits); // Update the state with the modified inputs array
  };

  const handleInputChange = (text, index, field) => { 
    const updatedInputs = [...inputs];
    if (field === 'weight') updatedInputs[index][field] = text.toString();
    else updatedInputs[index][field] = text;
    setInputs(updatedInputs);
  };  
  

  const handleAddInput = () => {
    const newInput = { productName: '', weight: '', type: '', unit: '', expirationDate: '' };
    const newUnit = [];
    setUnitTypes([...unitTypes, newUnit]);
    setInputs([...inputs, newInput]);
  };
  
  const handleRemoveInput = (index) => {
    const updatedInputs = [...inputs];
    updatedInputs.splice(index, 1);
    setInputs(updatedInputs);
  };
  
  // Final method for request creation
  const handleRequest = async () => {
    try{
      validateInputs()

      let names = [];
      let types = [];
      let weights = [];
      let units = [];
      let expirationDates = [];
  
  
      const requestSummary = {
        Fruit: 0,
        Vegetable: 0,
        Grains: 0,
        Canned: 0,
        Meat: 0,
        Dairy: 0,
        Clothing: 0,
        Medicine: 0,
        Hygiene: 0,
        Others: 0,
      };
  
      inputs.forEach((input) => {
        names.push(input.productName);
        types.push(input.type);
        weights.push(input.weight);
        units.push(input.unit);
        expirationDates.push(input.expirationDate);
  
        if(input.unit === 'KG') input.weight /= 1000;
        if(input.unit === 'TON') input.weight *= 1;
  
        switch (input.type) {
          case 'FR':
            requestSummary.Fruit += input.weight;
            break;
          case 'VR':
            requestSummary.Vegetable += input.weight;
            break;
          case 'GR':
            requestSummary.Grains += input.weight;
            break;
          case 'EN':
            requestSummary.Canned += input.weight;
            break;
          case 'CA':
            requestSummary.Meat += input.weight;
            break;
          case 'LA':
            requestSummary.Dairy += input.weight;
            break;
          case 'RO':
            requestSummary.Clothing += input.weight;
            break;
          case 'ME':
            requestSummary.Medicine += input.weight;
            break;
          case 'HP':
            requestSummary.Hygiene += input.weight;
            break;
          case 'OT':
            requestSummary.Others += input.weight;
            break;
        }
  
      });
      try{
        const UID = auth.currentUser.uid;  
  
        const docsRegistered = (await firestore().collection('userData').doc(UID).collection('requestsHistory').get()).size;
  
        const requestData = {
          supplierID: UID,
          type: types,
          productName: names,
          weight: weights,
          unit: units,
          expirationDates: expirationDates, 
          creationDate: getDate(),
          status: 'Pendiente',
          requestID: docsRegistered + 1,
          notificationChecked: false,
        };   
  
        await firestore().collection('userData').doc(UID).collection('requestsHistory').add(requestData);
          if (docsRegistered > 0){
            
            await firestore().collection('Leaderboard').doc(UID).update(
              {
                Fruit: firestore.FieldValue.increment(requestSummary.Fruit),
                Vegetable: firestore.FieldValue.increment(requestSummary.Vegetable),
                Grains: firestore.FieldValue.increment(requestSummary.Grains),
                Canned: firestore.FieldValue.increment(requestSummary.Canned),
                Meat: firestore.FieldValue.increment(requestSummary.Meat),
                Dairy: firestore.FieldValue.increment(requestSummary.Dairy),
                Clothing: firestore.FieldValue.increment(requestSummary.Clothing),
                Medicine: firestore.FieldValue.increment(requestSummary.Medicine),
                Hygiene: firestore.FieldValue.increment(requestSummary.Hygiene),
                Others: firestore.FieldValue.increment(requestSummary.Others),
              }
            );
  
          }
          else{
            const summaryRef = {
              Fruit: requestSummary.Fruit,
              Vegetable: requestSummary.Vegetable,
              Grains: requestSummary.Grains,
              Canned: requestSummary.Canned,
              Meat: requestSummary.Meat,
              Dairy: requestSummary.Dairy,
              Clothing: requestSummary.Clothing,
              Medicine: requestSummary.Medicine,
              Hygiene: requestSummary.Hygiene,
              Others: requestSummary.Others,
            };
            await firestore().collection('Leaderboard').doc(UID).set(summaryRef);
          }
          triggerAlert('Solicitud creada', 'Tu solicitud ha sido creada con éxito')
      } 
      catch (error){
        triggerAlert('Error', 'No se pudo crear la solicitud')
      }
    } 
    catch (error) {

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
              <TouchableOpacity onPress={() => handleRemoveInput(index)} style={{alignSelf:'flex-end'}}>
                <View style={[DefaultStyles.flexRow, {justifyContent: 'flex-end'}]}>
                  <Image style={{height:16, width:16}} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Ficons%2FtrashCan.png?alt=media&token=bf64a75a-ff1e-4b59-a57b-c24ff3a27b6d'}}></Image>
                  <Text style={DefaultStyles.linkedText}>Eliminar producto</Text>
                </View>
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
              value={inputs[index].productName} 
              onChangeText={(text) => handleInputChange(text, index, 'productName')}
              maxLength={100}
              style={[styles.flexItem, styles.input]}
            />
            <View style={{flexDirection: 'row'}}>
            <TextInput
              placeholder="Cantidad"
              placeholderTextColor={Colors.textDisabled}
              keyboardType="numeric"
              maxLength={32}
              value={inputs[index].weight.toString()} 
              onChangeText={(text) => handleInputChange(text, index, 'weight') }
              style={[styles.flexItem, styles.input]}
            />
            <Dropdown
              itemTextStyle={DefaultStyles.poppinsRegular}
              selectedTextStyle={[DefaultStyles.poppinsRegular, {fontSize: 13}]}
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
            <TouchableOpacity onPress={() => triggerDateVisible()}>
              <TextInput
                placeholderTextColor={Colors.textDisabled}
                placeholder="DD/MM/AAAA"
                value={inputs[index].expirationDate}
                style={[styles.flexItem, styles.input]}
                editable={false}
                selectTextOnFocus={false}
                onPressIn={() => triggerDateVisible()}
              />    
            </TouchableOpacity>
            <Modal animationType='fade' transparent={true} visible={dateVisible}>
              <View style={styles.container}>
                <View style={styles.modalContent}>
                    <DatePicker
                        mode="calendar" 
                        minimumDate={getToday()}
                        onSelectedChange={date =>{ 
                          date = date.substring(8, 10) + '/' + date.substring(5, 7) + '/' + date.substring(0, 4);
                          handleDate(date, index);
                        }}  
                    />
                </View>
              </View>   
            </Modal>
          </View>
        ))}
        <View style={[styles.flexContainer, {alignItems: 'flex-end', color: Colors.black}]}>
          <TouchableOpacity onPress={handleAddInput}>
            <Image style={[styles.arrow, {padding: 30, alignItems: 'flex-end'}]} source={{uri: "https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Fassets%2FDashboard%2Fa%C3%B1adir.png?alt=media&token=e70ed552-72c6-45e4-8cc1-9be2baaf9ff3"}}/>
          </TouchableOpacity>
        </View>
        </ScrollView>
        <View style={[styles.flexContainer, {flexDirection: 'row', columnGap: 16}]}>
          <Button content='Guardar' functionality={() => handleRequest()} bgColor={Colors.approval} fontColor={Colors.textSecondary}/>
          <Button content='Cancelar' functionality={() => triggerConfirmation()} bgColor={Colors.primary} fontColor={Colors.textSecondary}/>       
        </View>
      
      </View>
      <DefaultAlert 
        modalVisible={alertVisible}
        alertTitle={alertTitle}
        alertContent={alertContent}
        onHide={() => alertTitle === "Solicitud creada" ? navigation.goBack() : triggerAlert()}
        btnContent = {"Aceptar"}
      /> 
                        
      <ConfirmDialog 
        modalVisible={confirmationVisible} 
        alertTitle='¿Estás segur@ de cancelar tu cargamento?' 
        alertContent='Se borrarán todos los datos del cargamento actual.' 
        onDeny={() => triggerConfirmation()} 
        onAccept={() => { triggerConfirmation(); navigation.goBack(); }}
        btnContent = {['Confirmar','Volver']}
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
    color: Colors.textPrimary,
    height: 45,
    margin: 10,
  },
  button: {
    marginVertical: 16,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    color: 'white', 
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 24,
  
},
  modalContent: {
      width: '100%',
      height: '50%',
      display: 'flex',
      borderRadius: 25,
      alignItems: 'center',
      backgroundColor: Colors.white,
      elevation: 10,
      padding: 24,
  },
});

export default CreateRequest;