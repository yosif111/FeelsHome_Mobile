import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

import Wallpaper from '../components/login-components/Wallpaper';
import Logo from '../components/login-components/Logo';
import ButtonSubmit from '../components/login-components/ButtonSubmit';
import UserInput from '../components/login-components/UserInput';
import RegisterForm from '../components/login-components/RegisterForm';

import logoImg from '../assets/icon_bulb.png'
import emailImg from '../assets/email.png';
import usernameImg from '../assets/username.png';
import passwordImg from '../assets/password.png';
import eyeImg from '../assets/eye_black.png';

class RegisterScreen extends Component {
    state = { name: '', email: '', password: '', rePassword: '' }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Register'
        }
    }

    onInputChange = (type, input) => {
        if (type === 'email')
            this.setState({ email: input });
        else if (type === 'name')
            this.setState({ name: input });
        else if (type === 'password')
            this.setState({ password: input });
        else if (type === 're-password')
            this.setState({ rePassword: input });
    }

    render() {
        return (
            <Wallpaper>
                <Logo
                    img={logoImg}
                    title='FeelsHome'
                    size='large'
                />
                <RegisterForm onInputChange={this.onInputChange} />
                <ButtonSubmit 
                onPress={() => this.props.navigation.navigate('login')} 
                isRegister={true}
                title='REGISTER' />
            </Wallpaper>
        );
    }
}

export default RegisterScreen;