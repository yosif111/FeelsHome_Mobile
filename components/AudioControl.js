import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View
} from 'react-native';
import axios from 'axios';
import URL from '../config';
import CustomAudioControl from './Common/CustomAudioControl';
import ModalDropdown from 'react-native-modal-dropdown';

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
    onPreviousPress = () => {
        console.log('\nprevious')
        axios.get(`${URL}/api/audio/previous`)
        .then(() => {
            
        })
        .catch(error => {
            console.log(error);
        });
    }
    onNextPress = () => {
        console.log('\nnext')
        axios.get(`${URL}/api/audio/next`)
            .then(() => {
                
            })
        .catch(error => {
            console.log(error);
        });
    }
    onPausePress = () => {
        console.log('\npause')
        axios.get(`${URL}/api/audio/pause`)
            .then(() => {
                
            })
        .catch(error => {
            console.log(error);
        });
    }
    onPlayPress = () => {
        console.log('\nplay')
        axios.get(`${URL}/api/audio/play`)
            .then(() => {
                
            })
        .catch(error => {
            console.log(error);
        });
    }

    onVolumeChange = (value) => {
        this.setState({ volume: value });
    }

    onPlaylistChange = (index) => {
        console.log('\nrequest = ' + this.state.playlists[index].uri);
        axios.get(`${URL}/api/audio/InsertPlaylistToQueue/${this.state.playlists[index].uri}`)
            .then(response => {

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

    getPlaylists = () => {
        let result = [];
        this.state.playlists.map(value => {
            result.push(value.name);
        });
        console.log('\nresult = ' + result);
        return result;
    }

    renderDropDownList = () =>{
        return (
        <View >
             <ModalDropdown 
                ref={el => this._dropdown_3 = el}
                textStyle={styles.dropdownTextstyle}
                style={styles.dropdownSelectStyle}
                options={this.getPlaylists}
                adjustFrame={style => this._dropdown_3_adjustFrame(style)}
                dropdownTextStyle={styles.dropdownTextStyle}
                dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
                dropdownStyle={styles.dropdownStyle}
                onSelect={(index) => this.onPlaylistChange(index)}
            />
        </View>
        );
     }

    _dropdown_3_adjustFrame(style) {
        style.top -= 15;
        style.left = 38;
        return style;
    }


    render() {
        return (
            <View>
                {this.renderDropDownList()}
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
