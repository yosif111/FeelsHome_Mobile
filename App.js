import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';

import dbKey from './dbKey';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import SettingsScreen from './screens/SettingsScreen';
import ModesScreen from './screens/ModesScreen';
import ManageModesScreen from './screens/ManageModesScreen';

export default class App extends React.Component {

  componentDidMount() {
    firebase.initializeApp(dbKey);
    firebase.auth().signInWithEmailAndPassword('t@t.com', 'password')
      .then(user => console.log('(' + user.uid + ') logged in'))
      .catch(error => console.log(error))
  }

  render() {
    const MainNavigator = StackNavigator({
      auth: { screen: StackNavigator({
        login: { screen: LoginScreen },
        register: { screen: RegisterScreen }
      }) },
      main: { screen: StackNavigator({
        home: { screen: HomeScreen },
        settings: { screen: SettingsScreen },
        modes: { screen: StackNavigator({
          modes: { screen: ModesScreen },
          manageModes: { screen: ManageModesScreen }
        }, {
          headerMode: 'none'
        }) }
      })}
      
    }, {
        navigationOptions: {
          header: null
        }
    });
    return (
      <MainNavigator />
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
