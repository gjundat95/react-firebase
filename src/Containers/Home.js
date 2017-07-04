/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,

} from 'react-native';

import * as firebase from '../Firebase';
import { save, get } from '../Util/AsyncStore';


export default class Home extends Component {

  constructor(props) {
    super(props);
  };

  componentWillMount() {
    this.checkLogin();
  };

  componentWillReceiveProps() {
    this.checkLogin();
  }

  checkLogin = () => {
    get('Key_Login').then(value => {
      if (value === 'false') {
        this.props.navigation.navigate('Login', {});
      }
    });
  };

  _btnLogout = () => {
    Alert.alert('Logout success');
    firebase.logout().then(function (res) {
      firebase.logout();
    });
    save('Key_Login', 'false');
    this.componentWillReceiveProps();
  };

  _btnUploadImage = () => {
    // Alert.alert('load image');
    firebase.getImage((res)=>{
      Alert.alert(res);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this._btnLogout}
        >
          <View style={styles.button}>
            <Text style={styles.textInButton}>Logout</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this._btnUploadImage}
        >
          <View style={styles.button}>
            <Text style={styles.textInButton}>Add Image</Text>
          </View>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    backgroundColor: '#467ac9',
    minWidth: 300,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 5,
  },
  textInButton: {
    color: 'white',
    fontWeight: 'bold'
  },
});

