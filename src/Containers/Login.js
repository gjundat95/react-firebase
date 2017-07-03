import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { login, register } from '../Firebase';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'tinhngo@gmail.com',
      password: '123456',
    }
  };

  _changeUsername = username => {
    this.setState({ username })
  };

  _changePassword = password => {
    this.setState({ password });
  };

  _btnRegister = () => {
      register(this.state.username, this.state.password, (res) => {
          if(!res.isSuccess){
            Alert.alert("Error: "+ res.message);
          }else{
            Alert.alert("Success: "+ res.message);
          } 
      });
  };

  _btnLogin = () => {
    login(this.state.username, this.state.password, (res)=>{
      if(!res.isSuccess){
        Alert.alert('Error: '+res.message);
      }else{
        Alert.alert('Success: '+res.message);
        this.props.navigation.navigate('Home',{});
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textLogin}>MyTimeSheet</Text>
        <View style={styles.login}>
          <TextInput
            value={this.state.username}
            onChangeText={this._changeUsername}
            style={styles.textInput}
          />
          <TextInput
            value={this.state.password}
            onChangeText={this._changePassword}
            style={styles.textInput}
          />

          <TouchableOpacity
            onPress={this._btnRegister}
          >
            <View style={styles.button}>
              <Text style={styles.textInButton}>Register</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this._btnLogin}
          >
            <View style={styles.button}>
              <Text style={styles.textInButton}>Login</Text>
            </View>
          </TouchableOpacity>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login:{
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLogin: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  textInput: {
    minWidth: 300,
    minHeight: 50,
    padding: 8,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
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
  }

});