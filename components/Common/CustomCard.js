import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    TouchableWithoutFeedback,
    Text,
    Animated,
    Easing,
    Image,
    Alert,
    View,
    ScrollView,
    ImageBackground,
    Switch,
    Dimensions,
    Slider,
    Platform
} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import axios from 'axios';
import Collapsible from 'react-native-collapsible';

import APIProvider from '../../APIProvider';
const api = new APIProvider();

import URL from '../../config';
import CustomSlider from './CustomSlider';
import CustomAudioControl from './CustomAudioControl';
const DEFAULT_IMAGE = require('../../assets/icon_music.jpg');


export default class CustomCard extends Component {
    state = {
            isCollapsed: true,
            showHeader: true,
            isOn: false
        };

    onSwitchPress = (toggle) => {
        axios.post(`${URL}/api/lights/changeAll`, {
            'on': toggle
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        this.props.changeState({ AllLightsState: { ...this.props.state.AllLightsState, isOn: toggle} })
        this.setState({ isOn: toggle })
    }

    toggleHeader = () => {
        this.setState({showHeader: !this.state.showHeader});
    }

    renderCardHeader = () => {
        if(!this.state.showHeader)
            return;

        return (
            <View style={styles.container}>
                <View
                    style={styles.iconContainer}>
                      <Icon 
                        name={this.props.iconName}
                        type={this.props.iconType}
                        size={30}
                        color='#532d3e'
                       />   
                </View>

                <View
                    style={styles.labelContainer}>
                    <Text
                        style={styles.label}>
                        {this.props.label}
                    </Text>
                </View>

                <View style={styles.switchStyle}>
                    {this.renderSwitch()}
                </View>

            </View>
        );
    }


    onColorChange = (value, lightID) => {
        axios.post(`${URL}/api/lights/changeAll`, {
            'hue': value * 250
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        this.props.changeState({ AllLightsState: { ...this.props.state.AllLightsState, hue: value} })
    }

    onBrightnessChange = (value, lightID) => {
        axios.post(`${URL}/api/lights/changeAll`, {
            'all': true,
            'bri': value
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        this.props.changeState({ AllLightsState: { ...this.props.state.AllLightsState, bri: value} })
    }

    onPreviousPress = async () => {
        if (this.props.state.queue.length == 0)
            return;
        this.props.state.index = (this.props.state.index - 1) < 0 ? this.props.state.queue.length - 1 : this.props.state.index - 1;
        await api.play(this.props.state.queue[this.props.state.index].tlid);
        this.loadTrack(this.props.state.index);
        this.props.changeState({ playerState: 'playing' });
    }

    onNextPress = async () => {
        if (this.props.state.queue.length == 0)
            return;
        this.props.state.index = (this.props.state.index + 1) % this.props.state.queue.length;
        await api.play(this.props.state.queue[this.props.state.index].tlid);
        this.loadTrack(this.props.state.index);
        this.props.changeState({ playerState: 'playing' });
    }

    onPausePress = () => {
        if (this.props.state.queue.length == 0)
            return;
        api.pause();
        this.props.changeState({ playerState: 'paused' });
    }

    onPlayPress = () => {
        if (this.props.state.queue.length == 0)
            return;
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

    renderSlider = () => {
        if (!this.props.renderSlider || !this.state.showHeader)
            return;

        return (
            <View>
                <View style={{ marginBottom: 10 }} >
                    <CustomSlider
                        maximumValue={255}
                        step={5}
                        value={this.props.state.hue}
                        onChange={this.onColorChange}
                    />
                </View>
                

                <Slider
                    value={this.props.state.bri}
                    thumbTintColor='#532d3e'
                    onValueChange={(value) => this.onBrightnessChange(value, 1)}
                    maximumValue={255}
                    step={10}
                    trackStyle={styles.trackStyle}
                    maximumTrackTintColor='#bdc3c7'
                    minimumTrackTintColor='#93C9F5'
                    thumbImage={require('../../assets/sliderThumb.png')}
                />
            </View>
        );
    }

    renderAudioControl = () => {
        if(!this.props.renderAudioControl || !this.state.showHeader)
            return ;
        
            return (
                <CustomAudioControl
                    home
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
            );
    }

    renderSwitch = () => {
        if (!this.props.renderSwitch)
            return;
        return (
            <Switch
                value={this.state.isOn}
                tintColor={Platform.OS == 'android' ? 'rgb(200,200,200)' : '#532d3e'}
                onTintColor={Platform.OS == 'android' ? 'rgb(80,200,80)' : '#532d3e'}
                thumbTintColor='#532d3e'
                onValueChange={(toggle) => this.onSwitchPress(toggle)}
            />);
    }
    renderACControl() {
        if (!this.props.renderACControl || !this.state.showHeader) {
        return;
        }
        return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <View 
                style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
            >
                <Icon
                    containerStyle={{ margin: 3 }}
                    name='fan'
                    type='material-community'
                    color='#532d3e'
                    size={24}
                />
                <Text style={{ margin: 3, fontSize: 18, fontWeight: 'bold' }}>{this.props.state.fanSpeed}</Text>
            </View>
            
            {/* <View 
                style={{ height: '100%', width: 2, backgroundColor: '#532d3e', borderRadius: 4 }}
            /> */}
            <View 
                style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
            >
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>AC: </Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: this.props.state.isOn ? '#18A826' : '#D41717' }}>{this.props.state.isOn ? 'On' : 'Off' }</Text>
            </View>

            {/* <View 
                style={{  height: '100%', width: 2, backgroundColor: '#532d3e', borderRadius: 4 }}
            /> */}

            <View 
                style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
            >
                <Text style={{ margin: 3, fontSize: 18, fontWeight: 'bold' }}>{this.props.state.temperature}°</Text>
                <Icon
                    containerStyle={{ margin: 3 }}
                    name='snowflake'
                    type='material-community'
                    color='#532d3e'
                    size={24}
                />    
            </View>
        </View>
        );

    }
    onPress = () => {
        this.setState({ isCollapsed: !this.state.isCollapsed, showHeader: !this.state.showHeader })
    }
    renderCard = () => {
        return (
            <TouchableWithoutFeedback onPress={() => this.onPress()}>
                <View>
                    <Card containerStyle={{ borderRadius: 15 }}>
                        {this.renderCardHeader()}
                        {this.renderSlider()}
                        {this.renderAudioControl()}
                        {this.renderACControl()}
                        <Collapsible
                         collapsed={this.state.isCollapsed}
                         duration={800}
                        >
                            {this.props.children}
                        </Collapsible>
                    </Card>
                </View>
            </TouchableWithoutFeedback>

        );
    }

    render() {
        return (
            this.renderCard()
        );
    }


}

const styles = StyleSheet.create({

    container: {
        padding: 0,
        flexDirection: 'row',
        flex: 1,
        marginBottom: 10
    },

    iconContainer: {
        flex: 8,
        marginTop: 5,
        marginBottom: 5
    },

    labelContainer: {
        marginTop: 5,
        marginBottom: 5,
        flex: 32,
    },

    icon: {
        height: 25,
        width: 25
    },

    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#532d3e',
    },
    switchStyle: {
        marginTop: 5
    }
});
