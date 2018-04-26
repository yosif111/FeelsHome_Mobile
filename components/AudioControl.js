import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    AsyncStorage
} from 'react-native';
import { Button } from 'react-native-elements';
// import Picker from 'react-native-picker';
import { Dropdown } from 'react-native-material-dropdown'
import * as Progress from 'react-native-progress';

import URL from '../config';
import APIProvider from '../APIProvider';
import CustomAudioControl from './Common/CustomAudioControl';
import { Thread } from 'react-native-threads';

const api = new APIProvider();
const DEFAULT_IMAGE = require('../assets/icon_music.jpg');


export default class AudioControl extends Component {
    progressThread = null;

    componentDidMount() {
        if (this.props.state.playerState == 'playing') {
            this.startThread();
        }
    }
    // async componentDidMount() {
    //     let playlists = await api.getPlaylists();
    //     let queue = await api.getQueue();
    //     let status = await api.getAllStatus();
    //     console.log('playlists = %O', playlists);
    //     console.log('queue = %O', queue);
    //     console.log('status = %O', status);
    //     // try {
    //     //     let value = await AsyncStorage.getItem('currentPlaylist');
    //     //     if (value !== null) {
    //     //         this.props.changeState({ currentPlaylist: value });
    //     //     }
    //     //     else {
    //     //         this.props.state.currentPlaylist = (playlists != null) && (playlists != 'undefined') ?
    //     //         playlists[0].name : 'Select Playlist';
    //     //     }
    //     // } catch (error) {
    //     //     console.log('AsyncStorage error = ' + error);
    //     // }
    //     if (status != 'undefined' && status.state == 'playing') {
    //         this.startThread();
    //     }
    //     this.props.changeState({ 
    //         playlists, 
    //         queue,
    //         currentTrack: (status.track != 'undefined') && (status.track != null) ? status.track : '',
    //         currentAlbum: (status.album != 'undefined') && (status.album != null) ? status.album : '',
    //         currentArtist: (status.artist != 'undefined') && (status.artist != null) ? status.artist : '',
    //         volume: (status.volume != 'undefined') && (status.volume != null) ? status.volume : 0,
    //         playerState: (status.state != 'undefined') && (status.state != null) ? status.state : 'stopped',
    //         index: (status.index != 'undefined') && (status.index != null) ? status.index : 0,
    //         progress: (status.progress != 'undefined') && (status.progress != null) ? status.progress : 0,
    //         currentTrackLength: (queue.length > 0) && (status.index != null) ? parseInt(queue[status.index].track_length / 1000) : 0,
    //         image: (status.image != 'undefined' && status.image != null) ?
    //         { uri: 'http:' + status.image } : DEFAULT_IMAGE
    //     });
    //     if (status.index == null || status.image == null) {
    //         let status = await api.getAllStatus();
    //         this.props.changeState({
    //             index: (status.index != 'undefined') && (status.index != null) ? status.index : 0,
    //             image: (status.image != 'undefined' && status.image != null) ?
    //             { uri: 'http:' + status.image } : DEFAULT_IMAGE,
    //             currentTrackLength: (queue.length > 0) && (status.index != null) ? parseInt(queue[status.index].track_length / 1000) : 0
    //         })
    //     }
    // }

    componentWillUnmount() {
        this.killThread();
    }

    startThread = () => {
        if (this.progressThread != null)
            return;
        console.log('thread is null')
        this.progressThread = new Thread('../progress.thread.js');
        console.log('thread created')
        this.progressThread.onmessage = (progress) => {
            progress /= 1000;
            progress = parseInt(progress);
            this.props.changeState({ progress });
        };
    }

    killThread = () => {
        if (this.progressThread == null)
            return;
        this.progressThread.terminate();
        this.progressThread = null;
    }

    loadTrack = async (index) => {
        const track = this.props.state.queue[index];
        this.props.changeState({
            currentTrack: track.track_name,
            currentAlbum: track.album_name,
            currentArtist: track.artist,
            image: DEFAULT_IMAGE,
            progress: 0
        });
        let image = await api.getImage(this.props.state.queue[this.props.state.index].track_uri);
        this.props.changeState({ image: { uri: 'http:' + image } });
    }

    onPreviousPress = async () => {
        if (this.props.state.queue.length === 0)
            return;
        this.props.state.index = (this.props.state.index - 1) < 0 ? this.props.state.queue.length -1 : this.props.state.index - 1;
        await api.play(this.props.state.queue[this.props.state.index].tlid);
        this.startThread();
        this.loadTrack(this.props.state.index);
        this.props.changeState({ playerState: 'playing' });
    }

    onNextPress = async () => {
        if (this.props.state.queue.length === 0)
            return;
        this.props.state.index = (this.props.state.index + 1) % this.props.state.queue.length;
        await api.play(this.props.state.queue[this.props.state.index].tlid);
        this.startThread();
        this.loadTrack(this.props.state.index);
        this.props.changeState({ playerState: 'playing' });
    }

    onPausePress = () => {
        this.killThread();
        if (this.props.state.queue.length == 0)
            return;
        api.pause();
        this.props.changeState({ playerState: 'paused' });
    }

    onPlayPress = () => {
        if (this.props.state.queue.length == 0)
            return;
        this.startThread();
        if (this.props.state.playerState == 'paused')
            api.resume();
        else {
            api.play(this.props.state.queue[this.props.state.index].tlid);
            this.loadTrack(this.props.state.index);
        }   
        this.props.changeState({ playerState: 'playing' });
    }

    onVolumeChange = (value) => {
        api.changeVolume(value);
        this.props.changeState({ volume: value });
    }

    renderImage = () => {
        return (
            <View style={{ width: '100%', height: 200, marginTop: 10, marginBottom: 10 }}>
                <Image
                resizeMode='center'
                    style={{ width: '100%', height: '100%' }}
                    source={this.props.state.image}
                />
            </View>
        );
    }

    onPlaylistChange = async (value) => {
        let playlist = this.props.state.playlists.find(element => {
            return element.name == value;
        });
        await api.changePlaylist(playlist.uri);
        let queue = await api.getQueue();
        this.props.changeState({
            currentPlaylist: value, 
            playerState: 'stopped',
            queue, 
            index: 0
         });
        this.loadTrack(0);
        AsyncStorage.setItem('currentPlaylist', value);
    }

    getPlaylistNames = () => {
        let result = [];
        if (this.props.state.playlists.length > 0) {
            this.props.state.playlists.map(item => {
                result.push({ value: item.name });
            });
        } else {
            result.push({ value: 'No items' });
        }
        return result;
    }

    // showPicker = () => {
    //     Picker.init({
    //         pickerData: this.getPlaylistNames(),
    //         selectedValue: [this.props.state.currentPlaylist],
    //         pickerConfirmBtnText: 'Select',
    //         pickerTitleText: 'Select Playlist',
    //         pickerCancelBtnText: 'Cancel',
    //         pickerConfirmBtnColor: [179, 55, 113, 1],
    //         pickerCancelBtnColor: [179, 55, 113, 1],
    //         onPickerConfirm: data => {
    //             console.log(data);
    //             this.onPlaylistChange(data.toString());
    //         },
    //         onPickerCancel: data => {
    //             console.log(data);
    //         },
    //         onPickerSelect: data => {
    //             console.log(data);
    //         }
    //     });
    //     Picker.show();
    // } 

    renderPicker = () => {
        return (
            <View style={{ alignItems: 'center' }}>
                <Dropdown
                    label='Select Playlist'
                    value={this.props.currentPlaylist}
                    data={this.getPlaylistNames()}
                    onChangeText={this.onPlaylistChange}
                    containerStyle={{ width: '80%' }}
                    pickerStyle={{ }}
                />
                {/* <Button
                    raised
                    icon={{ name: 'playlist', type: 'simple-line-icon' }}
                    title={this.props.state.currentPlaylist == '' ? 'Select Playlist' : this.props.state.currentPlaylist}
                    onPress={this.showPicker}
                    buttonStyle={{ backgroundColor: 'rgb(83,45,62)', height: 40 }}
                /> */}
            </View> 
        );
    }

    getTrackLength = () => {
        if (this.props.state.queue.length > 0) {
            const sec = this.props.state.queue[this.props.state.index].track_length / 1000;
            const min = parseInt(sec / 60);
            return (min % 60) + ':' + (sec % 60 < 10 ? '0' + sec % 60 : sec % 60);
        }
        return '00:00';
    }

    renderProgressBar = () => {
        return (
            <View style={{ width: '100%', height: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ marginRight: 5, fontSize: 12 }} >
                {
                    parseInt((this.props.state.progress / 60) % 60)
                }
                :
                {
                    this.props.state.progress % 60 < 10 ? '0' + this.props.state.progress % 60 : this.props.state.progress % 60
                }
                </Text>
                <Progress.Bar progress={this.props.state.progress / (this.props.state.currentTrackLength > 0 ? this.props.state.currentTrackLength : 1)} width={200} />
                <Text style={{ marginLeft: 5, fontSize: 12 }} >{this.getTrackLength()}</Text>
            </View>
        );
    }

    render() {
        return (
            <View>
                {this.renderPicker()}
                {this.renderImage()}
                {this.renderProgressBar()}
                <CustomAudioControl
                    trackName={this.props.state.currentTrack}
                    album={this.props.state.currentAlbum}
                    artist={this.props.state.currentArtist}
                    volume={this.props.state.volume}
                    playerState={this.props.state.playerState}
                    onVolumeChange={this.onVolumeChange}
                    onNextPress={this.onNextPress}
                    onPreviousPress={this.onPreviousPress}
                    onPausePress={this.onPausePress}
                    onPlayPress={this.onPlayPress}
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
    }
});
