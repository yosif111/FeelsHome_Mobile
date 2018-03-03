import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    ImageBackground,
    ScrollView,
    Dimensions
} from 'react-native';

import bgSrc from '../../assets/background.png';

export default class Wallpaper extends Component {
    render() {
        return (
            <ScrollView>
                <ImageBackground style={styles.picture} source={bgSrc}>
                    {this.props.children}
                </ImageBackground>
            </ScrollView>
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    picture: {
        flex: 1,
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT
    },
});