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
import passwordImg from '../../assets/password.png';

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

    renderFeedback = () => {
        if(this.props.feedback)
            return (
                <TouchableOpacity onPress={this.props.clearFeedback}>
                    <View style={styles.fbContainer}>
                        <Text style={styles.fbText}>{this.props.feedback}</Text>
                        <Icon name='cancel' color='#fff7' />
                    </View>
                </TouchableOpacity> 
            )
    }

    render() {
        return (
            
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                {this.renderFeedback()}
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