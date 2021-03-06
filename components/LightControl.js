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
    Slider,
    Platform
} from 'react-native';
import { Card, ListItem, Button, Divider, Icon } from 'react-native-elements';
import CustomSlider from './Common/CustomSlider';
import axios from 'axios';

import { URL } from '../config';


export default class LightControl extends Component {

    onColorChange = (value, lightID) => {
       axios.post(`${URL}/api/lights/change`, {
            'id': lightID + 1,
            'hue': value * 257
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
        this.props.state.lightsInfo[lightID].hue = value;
        this.props.changeState({ lightsInfo: this.props.state.lightsInfo })
    }

    onBrightnessChange = (value, lightID) => {
        axios.post(`${URL}/api/lights/change`, {
            'id': lightID + 1,
            'bri': value
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        this.props.state.lightsInfo[lightID].bri = value;
        this.props.changeState({ lightsInfo: this.props.state.lightsInfo })
    }

    onSwitchPress = (value, lightID) => {
        console.log('value = ' + value + '\nlightid = ' + lightID);
        axios.post(`${URL}/api/lights/change`, {
            'id': lightID + 1,
            'on': value
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        this.props.state.lightsInfo[lightID].on = value;
        this.props.changeState({ lightsInfo: this.props.state.lightsInfo });
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
                        value={bulb.on}
                        tintColor='#532d3e'
                        thumbTintColor='#532d3e'
                        onValueChange={(toggle) => this.onSwitchPress(toggle, index)}
                        tintColor={Platform.OS == 'android' ? 'rgb(200,200,200)' : '#532d3e'}
                        onTintColor={'rgb(80,200,80)'}
                    />

                </View>

            </View>
            <CustomSlider
                maximumValue={255}
                value={bulb.hue}
                onChange={this.onColorChange}
                lightID={index}
            />

            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 12 }}>
                        <Slider
                            value={bulb.bri}
                            thumbTintColor='#532d3e'
                            onSlidingComplete={(value) => this.onBrightnessChange(value, index)}
                            maximumValue={255}
                            step={5}
                            trackStyle={styles.trackStyle}
                            maximumTrackTintColor='#bdc3c7'
                            minimumTrackTintColor='#B33771'
                            thumbImage={require('../assets/sliderThumb.png')}
                        />
                </View>
                <Icon
                    name='brightness-medium'
                    type='Device'
                    size={18}
                    containerStyle={{ flex: 1 }}
                    color='#532d3e'
                />
            </View>

                
           <Divider style={{ backgroundColor: '#532d3e', marginTop: 6, marginBottom: 6, height: index == this.props.state.lightsInfo.length -1 ? 0 : 2, borderRadius: 10 }} />

            </View>
            
        );

    }

    renderLights = () => {
        // we should get his info from the backend



        let lightsInfo = this.props.state.lightsInfo;

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
        color: '#532d3e',
    },
    switchStyle: {
        padding: 13,
    }
});
