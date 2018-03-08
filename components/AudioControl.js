import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    View,
    Slider
} from 'react-native';
import { Card, Button, } from 'react-native-elements';
import CustomVolumeControl from './Common/CustomVolumeControl';
import Mopidy from 'mopidy';



const mopidy = new Mopidy({
    webSocketUrl: "ws://192.168.1.7:6680/mopidy/ws/"
});

export default class AudioControl extends Component {
  state = {};

    renderImage = () => {
        return (
            <View style={{width: '100%', height:200, marginBottom: 10}}>
                <Image
                resizeMode='center'
                    style={{width: '100%', height: '100%'}}
                    source={require('../assets/icon_music.jpg')}
                    />
            </View>
        );
    }

    renderControls = () => {
        return (
            <CustomVolumeControl

            />
        );
    }

    render() {
       
        return (
            <View>
                {this.renderImage()}
                {this.renderControls()}
            </View>

        );
    }
}
const styles = StyleSheet.create({

    trackStyle: {
        borderRadius: 10
    },

    container: {
        padding: 0,
        flexDirection: 'row',
        flex: 1,
        marginTop: 5,
        marginBottom: 5
    },

    iconContainer: {
        flex: 6,
        marginTop: 14,
    },

    labelContainer: {
        padding: 13,
        flex: 32,
    },

    icon: {
        height: 21,
    },

    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgb(83,45,62)',
    },
    switchStyle: {
        padding: 13,
    }
});
