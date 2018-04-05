import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Wallpaper from '../components/login-components/Wallpaper';
import Logo from '../components/login-components/Logo';
import Form from '../components/login-components/Form';
import SignupSection from '../components/login-components/SignupSection';
import ButtonSubmit from '../components/login-components/ButtonSubmit';

import logoImg from '../assets/icon_bulb.png';

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

    render() {
        return (
            <Wallpaper>
                <Logo 
                    img={logoImg}
                    title='FeelsHome'
                    size='large'
                />
                <Form onInputChange={this.onInputChange} />
                <SignupSection onPress={() => this.props.navigation.navigate('register')} />
                <ButtonSubmit 
                onPress={() => this.props.navigation.navigate('main')}
                title='LOGIN' 
                />
            </Wallpaper>
        );
    }
}

export default LoginScreen;