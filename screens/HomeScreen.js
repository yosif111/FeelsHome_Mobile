import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, Switch, TouchableOpacity, AsyncStorage } from 'react-native';
import { ListItem, Button, Icon } from 'react-native-elements'

import CustomCard from '../components/Common/CustomCard';
import LightControl from '../components/LightControl';
import AudioControl from '../components/AudioControl';
import CustomAudioControl from '../components/Common/CustomAudioControl';
import ACControl from '../components/ACControl';

import APIProvider from '../APIProvider';

const api = new APIProvider();
const backgroundImage = require('../assets/background.png');
const DEFAULT_IMAGE = require('../assets/icon_music.jpg');

let params = {};

class HomeScreen extends Component {
    state = {
        // Light State
        lightsInfo: [],
        AllLightsState: {
            isOn: false,
            hue: 0,
            bri: 255,
            sat: 255
        },

        // Audio State
        image: DEFAULT_IMAGE,
        playlists: [],
        queue: [],
        currentPlaylist: '',
        currentTrack: '',
        currentArtist: '',
        currentAlbum: '',
        progress: 0,
        volume: 0,
        playerState: 'stopped',
        index: 0,
        currentTrackLength: 0,

        // Modes State
        modes: [],

        //AC State
        isOn: false,
        fanSpeed: 3,
        temperature: 22
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTransparent: true,
            headerRight: (
                <TouchableOpacity onPress={() => navigation.navigate('settings')} >
                    <Image
                        source={require('../assets/icon_settings.png')}
                        style={styles.settingsIcon} />
                </TouchableOpacity>
                
            ),
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.navigate('modes', params)} >
                    <Image
                        source={require('../assets/icon_mode.png')}
                        style={styles.modeIcon} />
                 </TouchableOpacity>
            )
        }
    }

    async componentDidMount() {
        api.getPlaylists().then(res => {
            console.log('Playlists = %O', res);
            if(res) {
                this.setState({ playlists: res });
                params = { playlists: this.state.playlists };
            }    
        })
        .catch(e => console.log(e));

        api.getQueue().then(res => {
            console.log('Queue = %O', res);
            if(res) {
                this.setState({ queue: res });
            }    
        })
        .catch(e => console.log(e));

        api.getAllStatus().then(res => {
            console.log('Status = %O', res);
            if (res) {
                this.setState({ 
                    currentTrack: res.track ? res.track : '',
                    currentAlbum: res.album ? res.album : '',
                    currentArtist: res.artist ? res.artist : '',
                    volume: res.volume ? res.volume : 0,
                    playerState: res.state ? res.state : 'stopped',
                    index: res.index ? res.index : 0,
                    progress: res.progress ? res.progress : 0,
                    currentTrackLength: this.state.queue.length > 0 ? parseInt(this.state.queue[res.index].track_length / 1000) : 0,
                    image: res.image ? { uri: 'http:' + res.image } : DEFAULT_IMAGE
                });
            }    
        })
        .catch(e => console.log(e));

        api.getLights().then(res => {
            console.log('Lights = %O', res);
            if (res) {
                this.setState({ lightsInfo: res });
            }
        })
            .catch(e => console.log(e));

        AsyncStorage.getItem('currentPlaylist')
            .then(value => {
                if (value) {
                    this.setState({ currentPlaylist: value });
                }
                else {
                    this.state.currentPlaylist = this.state.playlists.length > 0 ?
                        this.state.playlists[0].name : 'Select Playlist';
                }
            })
            .catch(error => console.log(error));

        // Get modes from database
        api.getModes().then(res => {
            console.log('Modes = %O', res)
            if(res) {
                this.state.modes = res
                params = {...params, modes: res}
            }
        })
        .catch(e => console.log(e))

    }
    changeState = (newState) => {
        this.setState(newState);
    }

    
    render() {
        console.log('Home state => %O', this.state);
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground style={{ flex: 1 }} source={backgroundImage}>

                    <ScrollView style={styles.mainView}>

                        <CustomCard
                            label='Light Control'
                            iconName={'lightbulb-on-outline'}
                            iconType={'material-community'}
                            renderSlider
                            renderSwitch
                            changeState={this.changeState}
                            state={this.state}
                        >
                            <LightControl
                                changeState={this.changeState}
                                state={this.state}
                            />

                        </CustomCard>


                        <CustomCard
                            label='Audio Control'
                            iconName={'music'}
                            iconType={'material-community'}
                            renderAudioControl
                            changeState={this.changeState}
                            state={this.state}
                        >
                            <AudioControl
                                changeState={this.changeState}
                                state={this.state}
                            />
                        </CustomCard>

                    
                        <CustomCard
                            label='AC Control'
                            iconName={'air-conditioner'}
                            iconType={'material-community'}
                            renderACControl
                            changeState={this.changeState}
                            state={this.state}
                        >
                            <ACControl
                                changeState={this.changeState}
                                isOn={this.state.isOn}
                                fanSpeed={this.state.fanSpeed}
                                temperature={this.state.temperature}
                            />
                            
                        </CustomCard>
                        
                    </ScrollView>

                </ImageBackground>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        marginTop: '20%'
    },
    cardLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#532d3e',
    },
    container: {
        padding: 0,
        flexDirection: 'row',
        flex: 1,
    },

    iconContainer: {
        flex: 5,
        marginTop: 14,
    },

    labelContainer: {
        padding: 13,
        flex: 32,
    },

    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgb(83,45,62)',
    },
    trackStyle: {
        borderRadius: 10
    },
    settingsIcon: {
        marginRight: 10,
        marginTop: 10,
        width: 40,
        height: 40
    },
    modeIcon: {
        marginLeft: 10,
        marginTop: 10,
        width: 40,
        height: 40
    },

});

export default HomeScreen;
