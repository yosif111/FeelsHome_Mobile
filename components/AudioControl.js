import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View
} from 'react-native';
import { Button } from 'react-native-elements';
import Picker from 'react-native-picker';

import URL from '../config';
import APIProvider from '../APIProvider';
import CustomAudioControl from './Common/CustomAudioControl';

const api = new APIProvider();

export default class AudioControl extends Component {
    state = { 
        image: require('../assets/icon_music.jpg'),
        playlists: [],
        queue: [],
        currentPlaylist: '',
        currentTrack: '',
        currentArtist: '',
        currentAlbum: '',
        progress: 0,
        volume: 0,
        playerState: 'stopped',
        trackIsLoaded: false,
        index: 0
    }

    async componentDidMount() {
        let playlists = await api.getPlaylists();
        let queue = await api.getQueue();
        let status = await api.getAllStatus();
        this.setState({ 
            playlists, 
            queue,
            currentTrack: status.track,
            currentAlbum: status.album,
            currentArtist: status.artist,
            volume: status.volume,
            playerState: status.state,
            currentPlaylist: queue.length > 0 ? queue[0].name : ''
        })
    }

    onPreviousPress = async () => {
        if (this.state.queue.length == 0)
            return;
        this.state.index = (this.state.index - 1) < 0 ? this.state.queue.length -1 : this.state.index - 1;
        this.state.trackIsLoaded = false;
        await api.play(this.state.queue[this.state.index].tlid);
        api.getCurrentTrack();
    }

    onNextPress = async () => {
        if (this.state.queue.length == 0)
            return;
        this.state.index = (this.state.index + 1) % this.state.queue.length;
        this.state.trackIsLoaded = false;
        const track = this.state.queue[this.state.index];
        await api.play(track.tlid);
        this.setState({ 
            currentTrack: track.track_name,
            currentAlbum: track.album_name,
            currentArtist: track.artist
        });
    }

    onPausePress = () => {
        if (this.state.queue.length == 0)
            return;
        api.pause();
        this.setState({ playerState: 'paused' });
    }

    onPlayPress = () => {
        if (this.state.queue.length == 0)
            return;
        if (this.state.playerState == 'paused')
            api.resume();
        else
            api.play(this.state.queue[this.state.index].tlid);
        this.setState({ playerState: 'playing' });
    }

    onVolumeChange = (value) => {
        api.changeVolume(value);
        this.setState({ volume: value });
    }

    renderImage = () => {
        return (
            <View style={{ width: '100%', height:200 }}>
                <Image
                resizeMode='center'
                    style={{ width: '100%', height: '100%' }}
                    source={this.state.image}
                />
            </View>
        );
    }

    onPlaylistChange = async (value) => {
        let playlist = this.state.playlists.find(element => {
            return element.name == value;
        });
        await api.changePlaylist(playlist.uri);
        let queue = await api.getQueue();
        this.setState({ 
            currentPlaylist: value, 
            playerState: 'stopped', 
            trackIsLoaded: false, 
            queue, 
            index: 0,
            currentTrack: queue[0].track_name,
            currentAlbum: queue[0].album_name,
            currentArtist: queue[0].artist
         });
    }

    getPlaylistNames = () => {
        let result = [];
        if (this.state.playlists.length > 0) {
            this.state.playlists.map(item => {
                result.push(item.name);
            });
        }else {
            result.push('No items');
        }
        return result;
    }

    showPicker = () => {
        Picker.init({
            pickerData: this.getPlaylistNames(),
            selectedValue: [this.state.currentPlaylist],
            pickerConfirmBtnText: 'Select',
            pickerTitleText: 'Select Playlist',
            pickerCancelBtnText: 'Cancel',
            pickerConfirmBtnColor: [179, 55, 113, 1],
            pickerCancelBtnColor: [179, 55, 113, 1],
            onPickerConfirm: data => {
                console.log(data);
                this.onPlaylistChange(data.toString());
            },
            onPickerCancel: data => {
                console.log(data);
            },
            onPickerSelect: data => {
                console.log(data);
            }
        });
        Picker.show();
    } 

    renderPicker = () =>{
        return(
            <View style={{  }} >
                <Button
                    raised
                    icon={{ name: 'playlist', type: 'simple-line-icon' }}
                    title={this.state.currentPlaylist == '' ? 'No Playlist': this.state.currentPlaylist}
                    onPress={this.showPicker}
                    buttonStyle={{ backgroundColor: 'rgb(83,45,62)', height: 40 }}
                />
            </View> 
        );
    }

    render() {
        return (
            <View>
                {this.renderPicker()}
                {this.renderImage()}
                <CustomAudioControl
                    trackName={this.state.currentTrack}
                    album={this.state.currentAlbum}
                    artist={this.state.currentArtist}
                    volume={this.state.volume}
                    playerState={this.state.playerState}
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
    },
    dropdownTextstyle: {
        marginVertical: 10,
        marginHorizontal: 6,
        fontSize: 10,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
      },
    dropdownStyle: {
        backgroundColor: '#fff',
        opacity:0.7

    },
    dropdownSelectStyle: {
        width: 80,
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 5,
        //alignSelf: 'flex-end',
       marginBottom: 10,
        backgroundColor: 'rgb(83,45,62)',
        opacity:0.8
        },
    dropdownTextStyle: {
        backgroundColor: '#fff',
       // color: '#fff',
        marginHorizontal: 4,
        fontSize: 12,
        color: 'rgb(83,45,62)',
        textAlignVertical: 'center',
        borderRadius: 5,
        },
    dropdownTextHighlightStyle: {
        backgroundColor: 'rgb(83,45,62)',
        color: '#fff',
        
        }
});
