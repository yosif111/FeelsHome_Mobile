import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Image,
    Dimensions,
    Platform,
    TouchableOpacity
} from 'react-native';

import eyeImg from '../../assets/eye_black.png';

export default class UserInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPass: true,
            press: false
        };
        this.showPass = this.showPass.bind(this);
    }

    showPass() {
        this.state.press === false ? this.setState({ showPass: false, press: true }) : this.setState({ showPass: true, press: false });
    }

    renderShowPassword () {
        if (this.props.showPassword) {
            return (
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.btnEye}
                    onPress={this.showPass}
                >
                    <Image source={eyeImg} style={styles.iconEye} />
                </TouchableOpacity>
            );
        }
    }

    render() {
        return (
            <View style={styles.inputWrapper}>
                <Image source={this.props.source}
                    style={styles.inlineImg} />
                <TextInput style={styles.input}
                    placeholder={this.props.placeholder}
                    secureTextEntry={this.props.showPassword ? this.state.showPass : false}
                    autoCorrect={this.props.autoCorrect}
                    autoCapitalize={this.props.autoCapitalize}
                    returnKeyType={this.props.returnKeyType}
                    placeholderTextColor='white'
                    underlineColorAndroid='transparent'
                    onChangeText={value => this.props.onInputChange(value)} />
                    {this.renderShowPassword()}
            </View>
        );
    }
}

// UserInput.propTypes = {
//     source: PropTypes.number.isRequired,
//     placeholder: PropTypes.string.isRequired,
//     secureTextEntry: PropTypes.bool,
//     autoCorrect: PropTypes.bool,
//     autoCapitalize: PropTypes.string,
//     returnKeyType: PropTypes.string,
// };

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: DEVICE_WIDTH - 40,
        height: 40,
        marginHorizontal: 20,
        paddingLeft: 45,
        borderRadius: 20,
        color: '#ffffff'
    },
    inlineImg: {
        position: 'absolute',
        zIndex: 99,
        width: 22,
        height: 22,
        left: 35,
        top: 9,
    },
    btnEye: {
        position: 'absolute',
        zIndex: 99,
        width: 25,
        height: 22,
        left: DEVICE_WIDTH - 60,
        top: 9,
    },
    iconEye: {
        width: 25,
        height: 25,
        tintColor: 'rgba(0,0,0,0.2)',
    },
    inputWrapper: {
        marginBottom: 10
    }
});