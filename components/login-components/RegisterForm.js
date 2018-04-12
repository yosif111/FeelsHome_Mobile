import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    Dimensions,
    KeyboardAvoidingView,
    Text
} from 'react-native';

import UserInput from './UserInput';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';

import emailImg from '../../assets/email.png';
import usernameImg from '../../assets/username.png'
import passwordImg from '../../assets/password.png';
import eyeImg from '../../assets/eye_black.png';

export default class Form extends Component {
    onEmailChange = (value) => {
        this.props.onInputChange('email', value);
    }

    onPasswordChange = (value) => {
        this.props.onInputChange('password', value);
    }

    onRePasswordChange = (value) => {
        this.props.onInputChange('re-password', value);
    }

    onNameChange = (value) => {
        this.props.onInputChange('name', value);
    }

    render() {
        return (

            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <UserInput source={usernameImg}
                    placeholder='Name'
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    autoCorrect={false}
                    onInputChange={this.onNameChange} />
                <UserInput source={emailImg}
                    placeholder='Email'
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    autoCorrect={false}
                    onInputChange={this.onEmailChange} />
                <UserInput source={passwordImg}
                    placeholder='Password'
                    returnKeyType={'done'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    onInputChange={this.onPasswordChange}
                    showPassword={true} />
                <UserInput source={passwordImg}
                    placeholder='Re-enter Password'
                    returnKeyType={'done'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    onInputChange={this.onRePasswordChange}
                    showPassword={true} />

            </KeyboardAvoidingView>

        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 8,
        alignItems: 'center',
        justifyContent: 'center'
    }
})