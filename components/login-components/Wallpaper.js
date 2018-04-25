import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    ImageBackground,
    Dimensions
} from 'react-native';

import bgSrc from '../../assets/wallpaper.jpg';

export default class Wallpaper extends Component {
    render() {
        return (
                <ImageBackground style={styles.picture} source={bgSrc}>
                    {this.props.children}
                </ImageBackground>
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    picture: {
        flex: 1,
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT * 0.9
    },
});