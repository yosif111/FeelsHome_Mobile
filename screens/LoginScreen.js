import React, { Component } from 'react';
import { View, Text } from 'react-native';

class LoginScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Login'
        }
    }

    componentDidMount() {
        this.props.navigation.navigate('main');
    }

    render() {
        return (
            <View>
                <Text>LoginScreen</Text>
                <Text>LoginScreen</Text>
                <Text>LoginScreen</Text>
                <Text>LoginScreen</Text>
            </View>
        );
    }
}

export default LoginScreen;