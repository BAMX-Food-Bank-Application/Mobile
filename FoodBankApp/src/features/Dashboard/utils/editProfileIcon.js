import {PermissionsAndroid, Platform} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {auth} from '../../../config/FirebaseConnection';

export const checkPermissions = () => {
  return new Promise(async (resolve, reject) => {
    try {
        const permission = 
        Platform.Version >= 33 
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    
        const hasPermission = await PermissionsAndroid.check(permission);
    
        if (hasPermission) resolve();
    
        const status = await PermissionsAndroid.request(permission);
    
        if (status === PermissionsAndroid.RESULTS.GRANTED) {
          resolve();
        } else if (status === PermissionsAndroid.RESULTS.DENIED) {
          reject("Denegado")
        } else {
          reject("Denegado")
        }
      } catch (error) {
        reject(error);
    }
  });
    
}

const uploadImage = async (image) => {
  return new Promise((resolve, reject) => {
    const userId = auth.currentUser.uid;
    const ref = storage().ref('/ProfilePictures/'+userId+'.jpg');

    const filePath = image.path;

    const task = ref.putFile(filePath);

    task.then(() => {
      resolve();
    })
    .catch((error) => {
      reject(error);
    });
  });

}

export const openImagePicker = async () => {
  return new Promise((resolve, reject) => {
    
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      showCropGuidelines: false,
      mediaType: 'photo',
      cropperCircleOverlay: true,

      }).then(image => {
        uploadImage(image, 'test')
        .then(() => 
        resolve()
        )
        .catch(err => reject(err));
      }).catch(err => {
        ImageCropPicker.clean();
      });
  });
}