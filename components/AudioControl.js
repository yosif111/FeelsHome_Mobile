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
import CustomAudioControl from './Common/CustomAudioControl';
import axios from 'axios';

export default class AudioControl extends Component {
  
state = {
      image: require('../assets/icon_music.jpg'),
      progress: 0,
      startTime: 0,
      endTime: 0,
      currentTrack: null,
      
};

    renderImage = (image) => {
        return (
            <View style={{width: '100%', height:200, marginBottom: 10}}>
                <Image
                resizeMode='center'
                    style={{width: '100%', height: '100%'}}
                    source={{uri: this.state.image}}
                    />
            </View>
        );
    }

    renderControls = () => {
        return (
            <CustomAudioControl

            />
        );
    }

    render() {
       
        return (
            <View>
                {this.renderImage(this.state.image)}
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
