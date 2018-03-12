import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View
} from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import Picker from 'react-native-picker';

import URL from '../config';
import CustomAudioControl from './Common/CustomAudioControl';

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
        isPlaying: false,
        trackIsLoaded: false,
        index: 0
    }

    componentDidMount() {
        axios.get(`${URL}/api/audio/playlists`)
            .then(response => {
                this.getQueue();
                if (response.data.length > 0)
                    this.state.currentPlaylist = response.data[0].name;
                this.state.playlists = response.data;
                this.getAllStatus();
            })
            .catch(error => {
                console.log('\nerror = ' + error);
                console.log(error);
            });
    }
    onPreviousPress = () => {
        this.state.trackIsLoaded = false;
        axios.get(`${URL}/api/audio/playPrevious`)
        .then(() => {
            this.getCurrentTrackState(); 
        })
        .catch(error => {
            console.log(error);
        });
    }
    onNextPress = () => {
        // if (this.state.queue.length == 0)
        //     return;
        this.state.index = (this.state.index + 1) % this.state.queue.length;
        console.log(this.state.queue[this.state.index].tlid)
        this.state.trackIsLoaded = false;
        axios.get(`${URL}/api/audio/play/${this.state.queue[this.state.index].tlid}`)
            .then(response => {
                console.log(response.data);
                // this.getCurrentTrackState(); 
            })
        .catch(error => {
            console.log(error);
        });
    }
    onPausePress = () => {
        this.setState({ isPlaying: false });
        axios.get(`${URL}/api/audio/pause`)
            .then(() => {
                
            })
        .catch(error => {
            console.log(error);
        });
    }
    onPlayPress = () => {
        this.setState({ isPlaying: true });
        axios.get(`${URL}/api/audio/play/${this.state.queue[this.state.index].tlid}`)
            .then(() => {
                this.getCurrentTrackState(); 
            })
        .catch(error => {
            console.log(error);
        });
    }

    onVolumeChange = (value) => {
        this.setState({ volume: value });
        axios.get(`${URL}/api/audio/changeVolume/${value}`)
            .then(response => {

            })
            .catch(error => {
                console.log(error);
            });
    }

    getCurrentTrackState = () => {
        if (!this.state.trackIsLoaded)
            axios.get(`${URL}/api/audio/getCurrentTrack`)
                .then(response => {
                    this.setState({
                        currentTrack: response.data.track,
                        currentAlbum: response.data.album,
                        currentArtist: response.data.artist,
                        trackIsLoaded: true
                    });
                })
                .catch(error => {
                    console.log(error);
                })
    }

    getQueue = () => {
        axios.get(`${URL}/api/audio/getQueue`)
            .then(response => {
                console.log('queue => %O', response.data );
                this.setState({ queue: response.data });
            })
            .catch(error => {
                console.log(error);
            })
    }

    getAllStatus = () => {
        axios.get(`${URL}/api/audio/getAllStatus`)
            .then(response => {
                this.setState({
                    currentTrack: response.data.track,
                    currentAlbum: response.data.album,
                    currentArtist: response.data.artist,
                    volume: response.data.volume,
                    isPlaying: response.data.state == 'playing' ? true : false
                })
            })
            .catch(error => {
                console.log(error);
            })
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

    onPlaylistChange = (value) => {
        let playlist = this.state.playlists.find(element => {
            return element.name == value;
        });
        this.setState({ currentPlaylist: value, isPlaying: false, trackIsLoaded: false });
        axios.get(`${URL}/api/audio/InsertPlaylistToQueue/${playlist.uri}`)
            .then(response => {
                this.getAllStatus();
            })
            .catch(error => {
                console.log(error);
            })
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
        console.log(this.state.currentPlaylist);
        return(
            <View style={{ width: 180 }} >
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
                    isPlaying={this.state.isPlaying}
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
