import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Wallpaper from '../components/login-components/Wallpaper';
import Logo from '../components/login-components/Logo';
import Form from '../components/login-components/Form';
import SignupSection from '../components/login-components/SignupSection';
import ButtonSubmit from '../components/login-components/ButtonSubmit';

class LoginScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Login'
        }
    }

    // componentDidMount() {
    //     this.props.navigation.navigate('main');
    // }

    render() {
        return (
            <Wallpaper>
                <Logo />
                <Form />
                <SignupSection />
                <ButtonSubmit onPress={() => this.props.navigation.navigate('home')} />
            </Wallpaper>
        );
    }
}

export default LoginScreen;