import React, { Component } from 'react';
import { View, Text } from 'react-native';

class RegisterScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Register'
        }
    }

    render() {
        return (
            <View>
                <Text>RegisterScreen</Text>
                <Text>RegisterScreen</Text>
                <Text>RegisterScreen</Text>
                <Text>RegisterScreen</Text>
            </View>
        );
    }
}

export default RegisterScreen;