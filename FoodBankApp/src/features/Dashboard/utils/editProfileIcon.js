import {PermissionsAndroid, Platform} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {auth} from '../../../config/FirebaseConnection';

export const checkPermissions = async () => {
    try {
        const permission = 
        Platform.Version >= 33 
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    
        const hasPermission = await PermissionsAndroid.check(permission);
    
        if (hasPermission) return true;
    
        const status = await PermissionsAndroid.request(permission);
    
        if (status === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else if (status === PermissionsAndroid.RESULTS.DENIED) {
          console.log('Permission denied');
          return false;
        } else {
          console.log('Permission permanently denied');
          return false;
        }
      } catch (error) {
        console.log(error, error.code);
        return false;
    }
}

const uploadImage = async (image) => {

    const userId = auth.currentUser.uid;
    const ref = storage().ref('/ProfilePictures/'+userId+'.jpg');

    const filePath = image.path;
    console.log("File URI: ", filePath);

    const task = ref.putFile(filePath);

    task.on('state_changed', taskSnapshot => {
        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
    });

    task.then(() => {
        console.log('Image uploaded to the bucket!');
    })
    .catch((e) => console.log('uploading image error => ', e));

}


export const openCamera = async () => {
    ImageCropPicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        showCropGuidelines: false,
        mediaType: 'photo',
        cropperCircleOverlay: true,
        }).then(image => {
            uploadImage(image.path, 'test')
        }).catch(err => {
            console.log(err);
        });
}

export const openImagePicker = async () => {
    ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        showCropGuidelines: false,
        mediaType: 'photo',
        cropperCircleOverlay: true,

        }).then(image => {
          uploadImage(image, 'test')
        }).catch(err => {
            console.log(err);
        });
}