import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import {
    StackNavigator,
    TabNavigator,
    DrawerNavigator,
} from 'react-navigation';

import LoginScreen from './Containers/Login';
import HomeScreen from './Containers/Home';

export const HomeStack = StackNavigator({

    Home: {
        screen: HomeScreen,
        navigationOptions: {
            title: 'Home'
        }
    },
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            title: 'Login'
        }
    },
});

