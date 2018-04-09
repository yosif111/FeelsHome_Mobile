import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, Switch, TouchableOpacity, AsyncStorage } from 'react-native';
import { ListItem, Button, Icon } from 'react-native-elements'
import firebase from 'firebase';

import CustomCard from '../components/Common/CustomCard';
import LightControl from '../components/LightControl'
import AudioControl from '../components/AudioControl'
import CustomAudioControl from '../components/Common/CustomAudioControl';

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
        modes: []
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
        let playlists = await api.getPlaylists();
        let queue = await api.getQueue();
        let status = await api.getAllStatus();
        let lightsInfo = await api.getLights();
        console.log('lightsInfo = %O', lightsInfo);
        console.log('playlists = %O', playlists);
        console.log('queue = %O', queue);
        console.log('status = %O', status);

        AsyncStorage.getItem('currentPlaylist')
            .then(value => {
                if (value) {
                    this.setState({ currentPlaylist: value });
                }
                else {
                    this.state.currentPlaylist = playlists ? playlists[0].name : 'Select Playlist';
                }
            })
            .catch(error => console.log(error));

        this.setState({
            playlists,
            queue,
            lightsInfo,
            currentTrack: status.track ? status.track : '',
            currentAlbum: status.album ? status.album : '',
            currentArtist: status.artist ? status.artist : '',
            volume: status.volume ? status.volume : 0,
            playerState: status.state ? status.state : 'stopped',
            index: status.index ? status.index : 0,
            progress: status.progress ? status.progress : 0,
            currentTrackLength: queue.length ? parseInt(queue[status.index].track_length / 1000) : 0,
            image: status.image ? { uri: 'http:' + status.image } : DEFAULT_IMAGE
        });
        if (status.index == null || status.image == null) {
            let status = await api.getAllStatus();
            this.setState({
                index: status.index ? status.index : 0,
                image: status.image ? { uri: 'http:' + status.image } : DEFAULT_IMAGE,
                currentTrackLength: queue.length ? parseInt(queue[status.index].track_length / 1000) : 0
            })
        }

        params = { playlists };
        let modes = [];
        firebase.auth().onAuthStateChanged(user => {
            firebase.database().ref(`/Users/${user.uid}/Modes`).once('value').then(data => {
                console.log('data.val() = %O', data.val())
                console.log('data.val() array = %O', Object.values(data.val()))
                for (var element in data.val()) {
                    if (data.val().hasOwnProperty(element)) {
                        var obj = data.val()[element]
                        obj = {...obj, id: element}
                        modes.push(obj)
                    }
                }
                console.log('modes ====>>> %O', modes)
                params = { ...params, modes };
            })
            .catch(error => console.log(error))
        })

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
                            icon={require('../assets/icon_bulb.png')}
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
                            icon={require('../assets/icon_audio.png')}
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
                        label='TV'
                        icon={require('../assets/icon_tv.png')}
                        >

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
        color: 'rgb(83,45,62)',
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
