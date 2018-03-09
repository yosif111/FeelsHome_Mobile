import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
    Slider
} from 'react-native';
import axios from 'axios';
import URL from '../../config';


const previousIcon = require('../../assets/icon_previous.png');
const nextIcon = require('../../assets/icon_next.png');
const playIcon = require('../../assets/icon_play.png');
const pauseIcon= require('../../assets/icon_pause.png');


export default class CustomAudioControl extends Component {


    renderButtons = () => {
        return (
            <View style={styles.buttonsView}>
                <TouchableOpacity 
                onPress={this.onPreviousPress}
                >
                    <View style={{ flex: 1 }}>
                        <Image
                            resizeMode="contain"
                            source={previousIcon}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                 onPress={() => {this.props.isPlaying ? this.onPreviousPress : this.onPlayPress;}}
                >
                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            resizeMode="contain"
                            source={this.props.isPalying ? pauseIcon : playIcon}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                 onPress={() => this.onPlayPress}
                >

                    <View style={{ flex: 1 }}>
                        <Image
                            resizeMode="contain"
                            source={playIcon}
                        />
                    </View>

                </TouchableOpacity>


            </View>
        );
    }
    renderVolumeSlider = () => {
        return (
            <View style={{ flex: 8, flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center' }}>
                <View style={{ flex: 7, marginRight: 5 }}>
                    <Slider
                        value={this.props.volume}
                        thumbTintColor='rgb(83,45,62)'
                        onValueChange={(volume) => this.props.onVolumeChange(volume)}
                        maximumValue={100}
                        step={5}
                        trackStyle={styles.trackStyle}
                        maximumTrackTintColor='#bdc3c7'
                        minimumTrackTintColor='#B33771'
                        thumbImage={require('../../assets/sliderThumb.png')}
                    />
                </View>
                <View
                    style={styles.iconContainer}
                >
                    <Image
                        resizeMode="contain"
                        source={require('../../assets/icon_audio.png')} />
                </View>

            </View>
        );
    }
    render() {

        return (
            <View>
                {this.renderButtons()}
                {this.renderVolumeSlider()}
            </View>
        );
    }


}

const styles = StyleSheet.create({

    iconContainer: {
        flex: 1,
        marginTop: 8,
    },
    trackStyle: {
        borderRadius: 10
    },
    buttonsView: {
        flex: 5,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        marginTop: 10,
        marginRight: '10%',
        marginLeft: '10%',
        marginBottom: 10
    }
});
