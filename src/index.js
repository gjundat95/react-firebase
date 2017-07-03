import React, { Component } from 'react';
import Login from '../src/Containers/Login';
import { HomeStack } from './Router';

export default class App extends Component {
  render() {
    return (
        <HomeStack />
    );
  }
}

