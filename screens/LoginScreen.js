import React, { Component } from 'react';
import { View, Text, ScrollView, AsyncStorage } from 'react-native';

import APIProvider from '../APIProvider'

const api = new APIProvider();

import Wallpaper from '../components/login-components/Wallpaper';
import Logo from '../components/login-components/Logo';
import Form from '../components/login-components/Form';
import SignupSection from '../components/login-components/SignupSection';
import ButtonSubmit from '../components/login-components/ButtonSubmit';

import logoImg from '../assets/feelshome_logo.png';

class LoginScreen extends Component {
    state = { email: '', password: '' };

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Login'
        };
    }

    // componentDidMount() {
    //     this.props.navigation.navigate('main');
    // }

    onInputChange = (type, input) => {
        if (type === 'email')
            this.setState({ email: input });
        else if (type === 'password')
            this.setState({ password: input });
    }

    login = () => {
        api.login(this.state.email, this.state.password)
            .then(token => {
                console.log('Token = ' + token)
                AsyncStorage.setItem('token', token)
                    .then(() => this.state.navigation.navigate('main'))
                    .catch(e => console.log(e))
            })
            .catch(e => console.log(e))
    }

    render() {
        return (
            <ScrollView>
                <Wallpaper>
                    <Logo
                        img={logoImg}
                        title='FeelsHome'
                        size='large'
                    />
                    <Form onInputChange={this.onInputChange} />
                    <ButtonSubmit
                        onPress={this.login}
                        title='LOGIN'
                    />
                    <SignupSection onPress={() => this.props.navigation.navigate('register')} />
                </Wallpaper>
            </ScrollView>
        );
    }
}

export default LoginScreen;