import React, { Platform } from 'react-native';
import * as firebase from 'firebase';

import RNFetchBlob from 'react-native-fetch-blob';
var ImagePicker = require('react-native-image-picker');

const config = {
    apiKey: "AIzaSyAyogbiekXjNRbtS3cYGSyOhN5rtdvbm94",
    authDomain: " mytimesheet-b0a7e.firebaseapp.com",
    databaseURL: "https://mytimesheet-b0a7e.firebaseio.com",
    storageBucket: "mytimesheet-b0a7e.appspot.com/",
};

firebase.initializeApp(config);

export const register = async (email, password, callback) => {
    let res = {
        isSuccess: true,
        message: 'success'
    }
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function () {
                callback(res);
            })
            .catch(function (error) {
                callback({ isSuccess: false, message: '' + error.message });
            });
    } catch (error) {
        callback({ isSuccess: false, message: '' + error });
    }
};

export const login = async (email, password, callback) => {
    let res = {
        isSuccess: true,
        message: 'success'
    }
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function () {
                callback(res);
            })
            .catch(function (error) {
                callback({ isSuccess: false, message: '' + error.message });
            });

    } catch (error) {
        callback({ isSuccess: false, message: '' + error });
    }
};

export const logout = async () => {
    try {
        await firebase.auth().signOut();
    } catch (error) {
        console.log(error);
    }
};

// Upload Image

// More info on all the options is below in the README...just some common use cases shown here
var options = {
    title: 'Select Avatar',
    customButtons: [
        { name: 'fb', title: 'Choose Photo from Facebook' },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export const uploadImage = (uri, mime = 'application/octet-stream') => {
    return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        let uploadBlob = null;

        const sessionId = new Date().getTime();

        const imageRef = firebase.storage().ref('images').child(`${sessionId}.jpg`);

        fs.readFile(uploadUri, 'base64')
            .then((data) => {
                return Blob.build(data, { type: `${mime};BASE64` })
            })
            .then((blob) => {
                uploadBlob = blob
                return imageRef.put(blob, { contentType: mime })
            })
            .then(() => {
                uploadBlob.close()
                return imageRef.getDownloadURL()
            })
            .then((url) => {
                resolve(url)
            })
            .catch((error) => {
                reject(error)
            })
    })
};

export const getImage = (callback) => {

    ImagePicker.showImagePicker(options, (response) => {
        callback('Response = ', response);

        if (response.didCancel) {
           callback('User cancelled image picker');
        }
        else if (response.error) {
            callback('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            callback('User tapped custom button: ', response.customButton);
        }
        else {
            // let source = { uri: response.uri };
            // this.setState({image_uri: response.uri})

            // You can also display the image using data:
            // let image_uri = { uri: 'data:image/jpeg;base64,' + response.data };

            uploadImage(response.uri)
                .then(url => callback('Upload compelte '+url) )
                .catch(error => callback('Upload error '+error) );

        }
    });

}


