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
import passwordImg from '../../assets/password.png';

export default class Form extends Component {
    
    onEmailChange = (value) => {
        this.props.onInputChange('email', value);
    }

    onPasswordChange = (value) => {
        this.props.onInputChange('password', value);
    }

    render() {
        return (
            
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <UserInput source={emailImg}
                        placeholder='Email'
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        autoCorrect={false}
                        onInputChange={this.onEmailChange}
                        keyboardType='email-address'
                        />
                    <UserInput source={passwordImg}
                        placeholder='Password'
                        returnKeyType={'done'}
                        autoCapitalize={'none'}
                        autoCorrect={false} 
                        onInputChange={this.onPasswordChange}
                        hidePassword={true} />
                </KeyboardAvoidingView>
            
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 6,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
})