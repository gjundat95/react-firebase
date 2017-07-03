import * as firebase from 'firebase';

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
        .then(function(){
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
        .then(function(){
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
}


