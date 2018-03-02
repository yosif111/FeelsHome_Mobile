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


export default class LightControl extends Component {

    state = {
        lightsInfo: []
    };
    constructor() {
        super();

        this.state = {
            lightsInfo: []
        };

    }

    componentDidMount() {
        // we should get the lights info and state here
        this.setState({
            lightsInfo: [
                {
                    'name': 'Living Room Bulb',
                    'isOn': true,
                    'RGBValue': 100
                },
                {
                    'name': 'Bedroom Bulb',
                    'isOn': true,
                    'RGBValue': 200
                },
                {
                    'name': 'Kitchen Bulb',
                    'isOn': false,
                    'RGBValue': 0
                }
            ]
        });
    }

    onSwitchPress = (value, index) => {
        this.state.lightsInfo[index].isOn = value;
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
                value={bulb.RGBValue}
            />
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
