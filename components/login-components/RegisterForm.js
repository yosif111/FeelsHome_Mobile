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
import { Icon } from 'react-native-elements';

import UserInput from './UserInput';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';

import emailImg from '../../assets/email.png';
import usernameImg from '../../assets/username.png'
import passwordImg from '../../assets/password.png';
import eyeImg from '../../assets/eye_black.png';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default class Form extends Component {
    onEmailChange = (value) => {
        this.props.clearFeedback()
        this.props.onInputChange('email', value);
    }

    onPasswordChange = (value) => {
        this.props.clearFeedback()
        this.props.onInputChange('password', value);
    }

    onRePasswordChange = (value) => {
        this.props.clearFeedback()
        this.props.onInputChange('re-password', value);
    }

    onNameChange = (value) => {
        this.props.clearFeedback()
        this.props.onInputChange('name', value);
    }

    renderFeedback = (type) => {
        const { emailFB, nameFB, passwordFB, rePasswordFB } = this.props.feedback
        if (type == 'name') {
            if(nameFB)
                return (
                    <TouchableOpacity onPress={this.props.clearFeedback}>
                        <View style={styles.fbContainer}>
                            <Text style={styles.fbText}>{nameFB}</Text>
                            <Icon name='cancel' color='#fff7' />
                        </View>
                    </TouchableOpacity>
                )
        }
        else if (type == 'email') {
            if(emailFB)
                return (
                    <TouchableOpacity onPress={this.props.clearFeedback}>
                        <View style={styles.fbContainer}>
                            <Text style={styles.fbText}>{emailFB}</Text>
                            <Icon name='cancel' color='#fff7' />
                        </View>
                    </TouchableOpacity>
                )
        }
        else if (type == 'password') {
            if(passwordFB)
                return (
                    <TouchableOpacity onPress={this.props.clearFeedback}>
                        <View style={styles.fbContainer}>
                            <Text style={styles.fbText}>{passwordFB}</Text>
                            <Icon name='cancel' color='#fff7' />
                        </View>
                    </TouchableOpacity>
                )
        }
        else if (type == 'rePassword') {
            if(rePasswordFB)
                return (
                    <TouchableOpacity onPress={this.props.clearFeedback}>
                        <View style={styles.fbContainer}>
                            <Text style={styles.fbText}>{rePasswordFB}</Text>
                            <Icon name='cancel' color='#fff7' />
                        </View>
                    </TouchableOpacity>
                )
        }
    }

    render() {
        return (

            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                {this.renderFeedback('name')}
                <UserInput source={usernameImg}
                    placeholder='Name'
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    autoCorrect={false}
                    onInputChange={this.onNameChange} />
                {this.renderFeedback('email')}
                <UserInput source={emailImg}
                    placeholder='Email'
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    autoCorrect={false}
                    onInputChange={this.onEmailChange} />
                {this.renderFeedback('password')}
                <UserInput source={passwordImg}
                    placeholder='Password'
                    returnKeyType={'done'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    onInputChange={this.onPasswordChange}
                    hidePassword={true} />
                {this.renderFeedback('rePassword')}
                <UserInput source={passwordImg}
                    placeholder='Re-enter Password'
                    returnKeyType={'done'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    onInputChange={this.onRePasswordChange}
                    hidePassword={true} />

            </KeyboardAvoidingView>

        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fbContainer: {
        borderRadius: 20,
        margin: 5,
        backgroundColor: '#f555',
        width: DEVICE_WIDTH - 40,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    fbText: {
        color: '#fff',
        marginTop: 3,
        marginBottom: 3,
        marginLeft: 10,
    }
})