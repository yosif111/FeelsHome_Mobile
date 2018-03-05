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
import { Card, ListItem, Button } from 'react-native-elements'


export default class CustomSlider extends Component {


    constructor() {
        super();
        this.state = {
            RGBValue: 0
        };
    }

    onChange = (RGBValue) => {
        const intToRGB = require('int-to-rgb');
        var rgb = intToRGB(RGBValue * 65793);
        console.log(rgb);
        this.setState({ RGBValue })
    }

    componentWillMount() {
        this.state.RGBValue = this.props.value;
    }
    render() {

        return (
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                <Slider
                    value={this.state.RGBValue}
                    thumbTintColor='rgb(83,45,62)'
                    onValueChange={(RGBValue) => this.onChange(RGBValue)}
                    maximumValue={255}
                    step={this.props.step}
                    trackStyle={styles.trackStyle}
                    trackImage={require('../../assets/color_picker.png')}
                    thumbImage={require('../../assets/sliderThumb.png')}
                />
            </View>
        );
    }


}

const styles = StyleSheet.create({

    trackStyle: {
        borderRadius: 10
    }
});
