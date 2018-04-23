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
    state = { email: '', password: '', feedback: '' };

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Login'
        };
    }

    async componentDidMount () {
        let token = await AsyncStorage.getItem('token')
        console.log('token = '+token)
        if(token)
            this.props.navigation.navigate('main')
    }

    onInputChange = (type, input) => {
        if (type === 'email')
            this.setState({ email: input });
        else if (type === 'password')
            this.setState({ password: input });
    }

    login = async() => {
        try{
            let token = await api.login(this.state.email, this.state.password)
            console.log('Token = ' + token)
            if (token) {
                await AsyncStorage.setItem('token', token)
                this.props.navigation.navigate('main')
                return new Promise((resolve, reject) => {
                    resolve('success')
                }) 
            }else{
                this.setState({ feedback: 'Wrong email or password' })
                return new Promise((resolve, reject) => {
                    resolve('fail')
                }) 
            }
        }
        catch(e){
            console.log(e)
        }
        
    }

    clearFeedback = () => {
        this.setState({ feedback: '' })
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
                    <Form 
                        onInputChange={this.onInputChange}
                        clearFeedback={this.clearFeedback}
                        feedback={this.state.feedback}
                    />
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