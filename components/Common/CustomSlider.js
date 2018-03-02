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

    componentWillMount() {
        this.state.RGBValue = this.props.value;
    }
    render() {
        
        return (
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                <Slider
                    value={this.state.RGBValue}
                    thumbTintColor='rgb(83,45,62)'
                    onValueChange={(RGBValue) => this.setState({ RGBValue })}
                    maximumValue={this.props.maximumValue}
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
