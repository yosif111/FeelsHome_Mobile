import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
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
    Slider
} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';




export default class CustomVolumeControl extends Component {

    
    constructor() {
        super();
        this.state = {
            volumeLevel: 0,
            isPalying: false,
            progress: 0,
           // image: 
        };
    }

    componentWillMount() {
        this.state.volumeLevel = 50;
    }
    renderButtons = () => {
        return (
            <View style={styles.buttonsView}>
                <TouchableOpacity 
                //onPress={() => mopidy.playback.previous()}
                >
                    <View style={{ flex: 1 }}>
                        <Image
                            resizeMode="contain"
                            source={require('../../assets/icon_previous.png')}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                //  onPress={() => {
                   
                //     if(this.state.isPalying) {
                //         mopidy.playback.pause();
                //         this.setState({isPalying: false});
                //     } 
                //       else {
                //           mopidy.playback.play();
                //           this.setState({isPalying: true});
                //     }
                // }}
                >
                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            resizeMode="contain"
                            //source={this.state.isPalying ? require('../../assets/icon_pause.png') : require('../../assets/icon_play.png')}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                // onPress={() => mopidy.playback.next()}
                >

                    <View style={{ flex: 1 }}>
                        <Image
                            resizeMode="contain"
                            source={require('../../assets/icon_next.png')}
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
                        value={this.state.volumeLevel}
                        thumbTintColor='rgb(83,45,62)'
                        onValueChange={(volumeLevel) => this.setState({ volumeLevel })}
                        maximumValue={100}
                        step={5}
                        trackStyle={styles.trackStyle}
                        maximumTrackTintColor='#bdc3c7'
                        minimumTrackTintColor='#B33771'
                        thumbImage={require('../../assets/sliderThumb.png')}
                    />
                </View>
                <View
                    style={styles.iconContainer}>
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

    trackStyle: {
        borderRadius: 10
    },
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
