import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native';

export default class SignupSection extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onPress} >
                    <Text style={styles.text}>Create Account</Text>
                </TouchableOpacity>
                <Text style={styles.text}>Forgot Password?</Text>
            </View>
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 2,
        width: DEVICE_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 5
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
    },
});