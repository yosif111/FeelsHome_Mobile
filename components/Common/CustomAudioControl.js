import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
    Slider,
    Text
} from 'react-native';
import axios from 'axios';
import URL from '../../config';


const previousIcon = require('../../assets/icon_previous.png');
const nextIcon = require('../../assets/icon_next.png');
const playIcon = require('../../assets/icon_play.png');
const pauseIcon = require('../../assets/icon_pause.png');


export default class CustomAudioControl extends Component {


    renderButtons = () => {
        return (
            <View style={styles.buttonsView}>
                <TouchableOpacity 
                onPress={this.props.onPreviousPress}
                >
                    <View style={{ flex: 1 }}>
                        <Image
                            resizeMode="contain"
                            source={previousIcon}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.props.playerState == 'playing' ? this.props.onPausePress : this.props.onPlayPress}
                >
                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            resizeMode="contain"
                            source={this.props.playerState == 'playing' ? pauseIcon : playIcon}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                 onPress={this.props.onNextPress}
                >

                    <View style={{ flex: 1 }}>
                        <Image
                            resizeMode="contain"
                            source={nextIcon}
                        />
                    </View>

                </TouchableOpacity>

            </View>
        );
    }
    renderVolumeSlider = () => {
        return (
            <View style={styles.volumeSliderContainer}>
                <View style={styles.volumeSlider}>
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
                        source={require('../../assets/icon_audio.png')} 
                    />
                </View>

            </View>
        );
    }

    renderTrackInfo() {
        if (this.props.trackName == '')
            return(
                <View style={styles.trackInfoContainer}>
                    <Text style={styles.trackName}>No Track is Loaded</Text>
                </View>
            );
        
        if (this.props.home) {
            return (
                <View style={styles.homeTrackInfoContainer} >
                    <Text style={styles.trackName} >{this.props.trackName}  </Text>
                    <Text style={styles.album} >{this.props.artist} - {this.props.album}</Text>
                </View>
            ); 
        }

        return (
            <View style={styles.trackInfoContainer} >
                <Text style={styles.trackName} >{this.props.trackName}</Text>
                <Text style={styles.album} >{this.props.artist} - {this.props.album}</Text>
            </View>
        );  
    }

    render() {

        return (
            <View>
                {this.renderTrackInfo()}
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
    },
    trackInfoContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    trackName: {
        color: '#222'
    },
    album: {
        color: '#666'
    },
    homeTrackInfoContainer: {
        flexDirection: 'row'
    },
    volumeSliderContainer: {
         flex: 8, 
         flexDirection: 'row', 
         alignItems: 'center', 
         justifyContent: 'center' 
    },
    volumeSlider: {
        flex: 7, 
        marginRight: 5, 
        marginTop: 8 
    }
});
