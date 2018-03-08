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
import axios from 'axios';
import Collapsible from 'react-native-collapsible';
import CustomSlider from './CustomSlider';
import CustomVolumeControl from './CustomVolumeControl';

const URL = 'http://192.168.1.4:8000/api';

export default class CustomCard extends Component {
    state = {
            isOn: false,
            isCollapsed: true,
            showHeader: true,
            hue: 0,
            bri: 255,
            lightOn: false
        };

    onSwitchPress = (toggle) => {
        this.setState({ isOn: toggle });
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
                    <Image
                        style={styles.icon}
                        resizeMode="contain"
                        source={this.props.icon} />
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
        console.log("Dddd");

        axios.post(`${URL}/lights/changeAll`, {
            'hue': value * 250
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        this.setState({ hue: value })
    }

    onBrightnessChange = (value, lightID) => {
        axios.post(`${URL}/lights/changeBrightness`, {
            'all': true,
            'bri': value
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        this.setState({ bri: value })
    }

    renderSlider = () => {
        if (!this.props.renderSlider || !this.state.showHeader)
            return;

        return (
            <View>
                <CustomSlider
                    maximumValue={255}
                    step={5}
                    value={this.state.hue}
                    onChange={this.onColorChange}
                />

                <Slider
                    value={this.state.bri}
                    thumbTintColor='rgb(83,45,62)'
                    onValueChange={(value) => this.onBrightnessChange(value, 1)}
                    maximumValue={255}
                    step={10}
                    trackStyle={styles.trackStyle}
                    maximumTrackTintColor='#bdc3c7'
                    minimumTrackTintColor='#B33771'
                    thumbImage={require('../../assets/sliderThumb.png')}
                />
            </View>
        );
    }

    renderVolumeControl = () => {
        if(!this.props.renderVolumeControl || ! this.state.showHeader)
            return ;
        
            return (
                <CustomVolumeControl
                />
            );
    }

    renderSwitch = () => {
        if (this.props.disableSwitch)
            return;
        return (
            <Switch
                value={this.state.isOn}
                tintColor='rgb(83,45,62)'
                thumbTintColor='rgb(83,45,62)'
                onValueChange={(toggle) => this.onSwitchPress(toggle)}
            />);
    }

    onPress = () => {
        this.setState({ isCollapsed: !this.state.isCollapsed, showHeader: !this.state.showHeader })
    }
    renderCard = () => {

        return (
            <TouchableOpacity onPress={() => this.onPress()}>
                <View>
                    <Card containerStyle={{ borderRadius: 15 }}>
                        {this.renderCardHeader()}
                        {this.renderSlider()}
                        {this.renderVolumeControl()}
                        <Collapsible
                         collapsed={this.state.isCollapsed}
                         duration={800}
                         >
                            {this.props.children}
                        </Collapsible>
                    </Card>
                </View>
            </TouchableOpacity>

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
