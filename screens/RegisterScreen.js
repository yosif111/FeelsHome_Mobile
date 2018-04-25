import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';

import Wallpaper from '../components/login-components/Wallpaper';
import Logo from '../components/login-components/Logo';
import ButtonSubmit from '../components/login-components/ButtonSubmit';
import UserInput from '../components/login-components/UserInput';
import RegisterForm from '../components/login-components/RegisterForm';

import logoImg from '../assets/feelshome_logo.png'
import emailImg from '../assets/email.png';
import usernameImg from '../assets/username.png';
import passwordImg from '../assets/password.png';
import eyeImg from '../assets/eye_black.png';

import APIProvider from '../APIProvider';

const api = new APIProvider();

class RegisterScreen extends Component {
    state = { 
        name: '',
        email: '',
        password: '',
        rePassword: '',
        feedback: {
            nameFB: '',
            emailFB: '',
            passwordFB: '',
            rePasswordFB: ''
        }
    }

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

    onPress = async() => {
        console.log('Email: '+this.state.email)
        console.log('Name: '+this.state.name)
        console.log('Password: '+this.state.password)
        console.log('Re-Password: '+this.state.rePassword)
        const { email, name, password, rePassword } = this.state;
        let { emailFB, nameFB, passwordFB, rePasswordFB } = this.state.feedback;
        var re;
        if(!name)
            nameFB = 'Name can\'t be empty'
        
        
        if(!email)
            emailFB = 'Email can\'t be empty'
        else{
            re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(email))
                emailFB = 'Please enter correct email'
        }
        
        if(!password)
            passwordFB = 'Password can\'t be empty'
        
        if(rePassword != password)
            rePasswordFB = 'Doesn\'t match password' 

        this.setState({ feedback: { emailFB, nameFB, passwordFB, rePasswordFB }})
        this.forceUpdate()
        
        if(emailFB == '' && nameFB == '' && passwordFB == '' && rePasswordFB == ''){
            console.log('all good')
            let res = await api.register(email, password, name)
            console.log('res = %O', res)
            if (res && res.Messeage == 'the user has been added'){
                this.props.navigation.goBack()
                return new Promise((resolve, reject) => {
                    resolve('success')
                })
            }
            else{
                return new Promise((resolve, reject) => {
                    resolve('email taken')
                })
            }
            
        }else{
            console.log('input error')
            return new Promise((resolve, reject) => {
                resolve('fail')
            })
        }
    }

    clearFeedback = () => {
        this.setState({
            feedback: {
                nameFB: '',
                emailFB: '',
                passwordFB: '',
                rePasswordFB: ''
            }
        })
    }

    render() {
        return (
            <ScrollView>
                <Wallpaper>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Create New Account</Text>
                    </View>
                    <RegisterForm 
                        onInputChange={this.onInputChange} 
                        feedback={this.state.feedback}  
                        clearFeedback={this.clearFeedback}  
                    />
                    <View style={{ marginBottom: 50}}>
                        <ButtonSubmit
                            onPress={this.onPress}
                            isRegister={true}
                            title='REGISTER' />
                    </View>
                </Wallpaper>
            </ScrollView>
        );
    }
}

const styles = {
    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    text: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    }
}

export default RegisterScreen;