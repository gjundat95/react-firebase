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

  constructor(props){
    super(props);
  };

  componentWillMount () {
    this.checkLogin();
  };

  checkLogin=()=>{
    get('Key_Login').then(value => {
      if (value === 'false') {
        this.props.navigation.navigate('Login', {});
      }
    });
  };

  _btnLogout=()=>{
      Alert.alert('hello world');
      firebase.logout().then(function(res){
          firebase.logout();
      });
      save('Key_Login', 'false');
      
  };
  
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
          onPress = {this._btnLogout}
        >
          <View>
            <Text>Logout</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <Text>Add Image</Text>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

