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
import axios from 'axios';

import URL from '../config';
import CustomAudioControl from './Common/CustomAudioControl';
import axios from 'axios';

export default class AudioControl extends Component {
    state = { 
        image: require('../assets/icon_music.jpg'),
        playlists: [],
        currentPlaylist: '',
        currentTrack: '',
        currentArtist: '',
        currentAlbum: '',
        progress: 0,
        volume: 0,
        isPlaying: false
    }

    componentDidMount() {
        axios.get(`${URL}/api/audio/playlists`)
            .then(response => {
                this.setState({ playlists: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    renderImage = (image) => {
        return (
            <View style={{width: '100%', height:200}}>
                <Image
                resizeMode='center'
                    style={{width: '100%', height: '100%'}}
                    source={this.state.image}
                    />
            </View>
        );
    }

    onVolumeChange = (value) => {
        this.setState({ volume: value });
    }

    render() {
       
        return (
            <View>
                {this.renderImage()}
                <CustomAudioControl
                    trackName={this.state.currentTrack}
                    album={this.state.currentAlbum}
                    artist={this.state.currentArtist}
                    volume={this.state.volume}
                    isPlaying={this.state.isPlaying}
                    onVolumeChange={this.onVolumeChange}
                />
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
