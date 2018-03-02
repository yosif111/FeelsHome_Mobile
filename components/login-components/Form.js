import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import UserInput from './UserInput';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';

import usernameImg from '../../assets/username.png';
import passwordImg from '../../assets/password.png';
import eyeImg from '../../assets/eye_black.png';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPass: true,
            press: false,
        };
        this.showPass = this.showPass.bind(this);
    }

    showPass() {
        this.state.press === false ? this.setState({ showPass: false, press: true }) : this.setState({ showPass: true, press: false });
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView>
                    <UserInput source={usernameImg}
                        placeholder='Username'
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        autoCorrect={false} />
                    <UserInput source={passwordImg}
                        secureTextEntry={this.state.showPass}
                        placeholder='Password'
                        returnKeyType={'done'}
                        autoCapitalize={'none'}
                        autoCorrect={false} />
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.btnEye}
                        onPress={this.showPass}
                    >
                        <Image source={eyeImg} style={styles.iconEye} />
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnEye: {
        position: 'absolute',
        top: 55,
        right: 28,
    },
    iconEye: {
        width: 25,
        height: 25,
        tintColor: 'rgba(0,0,0,0.2)',
    },
})