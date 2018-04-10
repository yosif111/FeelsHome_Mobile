import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import SettingsScreen from './screens/SettingsScreen';
import ModesScreen from './screens/ModesScreen';
import ManageModesScreen from './screens/ManageModesScreen';

export default class App extends React.Component {

  // componentDidMount() {
  //   AsyncStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly8xMC4xMzEuMTkyLjgwOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNTIzMjg5MDQ2LCJleHAiOjYwMDAwMTUyMzI4ODk4NiwibmJmIjoxNTIzMjg5MDQ2LCJqdGkiOiJ4bENlSVJnYWx5bnNONjI1In0.Hd9_p9D4Dpo-JIwD6AJcbGdpoDfvaCv90-VY2UqjcAU').then(() => console.log('set'))
  // }

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
