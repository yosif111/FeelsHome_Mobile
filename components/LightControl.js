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
import { Card, ListItem, Button, Divider } from 'react-native-elements';
import CustomSlider from './Common/CustomSlider';
import axios from 'axios';

const URL = 'http://192.168.1.4:8000/api';


export default class LightControl extends Component {

    state = {
        lightsInfo: []
    };

    componentDidMount() {
        // we should get the lights info and state here
        this.setState({
            lightsInfo: [
                {
                    'name': 'Living Room Bulb',
                    'isOn': false,
                    'hue': 100,
                    'bri': 255,
                    'id': 1
                },
                {
                    'name': 'Bedroom Bulb',
                    'isOn': false,
                    'hue': 200,
                    'bri': 255,
                    'id': 2
                },
                {
                    'name': 'Kitchen Bulb',
                    'isOn': false,
                    'hue': 0,
                    'bri': 255,
                    'id': 3
                }
            ]
        });
    }

    // rgbToHsl(r, g, b) {
    //     r /= 255, g /= 255, b /= 255;

    //     var max = Math.max(r, g, b), min = Math.min(r, g, b);
    //     var h, s, l = (max + min) / 2;

    //     if (max == min) {
    //         h = s = 0; // achromatic
    //     } else {
    //         var d = max - min;
    //         s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    //         switch (max) {
    //             case r: h = (g - b) / d + (g < b ? 6 : 0); break;
    //             case g: h = (b - r) / d + 2; break;
    //             case b: h = (r - g) / d + 4; break;
    //         }

    //         h /= 6;
    //     }

    //     return [h, s, l];
    // }

    onColorChange = (value, lightID) => {
       axios.post(`${URL}/lights/change`, {
            'id': lightID + 1,
            'hue': value * 257
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
        this.state.lightsInfo[lightID].hue = value;
        this.setState({ lightsInfo: this.state.lightsInfo })
    }

    onBrightnessChange = (value, lightID) => {
        axios.post(`${URL}/lights/change`, {
            'id': lightID + 1,
            'bri': value
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        this.state.lightsInfo[lightID].bri = value;
        this.setState({ lightsInfo: this.state.lightsInfo })
    }

    onSwitchPress = (value, lightID) => {
        axios.post(`${URL}/lights/change`, {
            'id': lightID + 1,
            'on': value
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        this.state.lightsInfo[lightID].isOn = value;
        this.setState({ lightsInfo: this.state.lightsInfo });
    }
    renderBulb = (bulb, index) => {
        return (
            <View key={index + 'MainView'}>
            <View style={styles.container} key={index + 'SecoundView'}>
                <View
                    style={styles.iconContainer}>
                    <Image
                        style={styles.icon}
                        resizeMode="contain"
                        source={require('../assets/icon_bulb.png')} />
                </View>

                <View
                    style={styles.labelContainer}>
                    <Text
                        style={styles.label}>
                        {bulb.name}
                    </Text>
                </View>

                <View style={styles.switchStyle}>

                    <Switch
                        value={bulb.isOn}
                        tintColor='rgb(83,45,62)'
                        thumbTintColor='rgb(83,45,62)'
                        onValueChange={(toggle) => this.onSwitchPress(toggle, index)}
                    />

                </View>

            </View>
            <CustomSlider
                maximumValue={255}
                value={bulb.hue}
                onChange={this.onColorChange}
                lightID={index}
            />

            <View>
                <Slider
                    value={bulb.bri}
                    thumbTintColor='rgb(83,45,62)'
                    onValueChange={(value) => this.onBrightnessChange(value, index)}
                    maximumValue={255}
                    step={5}
                    trackStyle={styles.trackStyle}
                    maximumTrackTintColor='#bdc3c7'
                    minimumTrackTintColor='#B33771'
                    thumbImage={require('../assets/sliderThumb.png')}
                />
            </View>

                
           <Divider style={{ backgroundColor: 'rgb(83,45,62)', marginTop: 6, marginBottom: 6, height: index == this.state.lightsInfo.length -1 ? 0 : 2, borderRadius: 10 }} />

            </View>
            
        );

    }

    renderLights = () => {
        // we should get his info from the backend



        let lightsInfo = this.state.lightsInfo;

        if (lightsInfo.length == 0)
            return (<Text>Empty</Text>);

        return lightsInfo.map((bulb, index) => {
            return this.renderBulb(bulb, index)
        });


    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                {this.renderLights()}
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
