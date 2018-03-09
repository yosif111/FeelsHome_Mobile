import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Slider
} from 'react-native';
//import { Card, ListItem, Button } from 'react-native-elements';


export default class CustomSlider extends Component {
    state = { hue: 0 }

    componentWillMount() {
        this.state.hue = this.props.value;
    }

    onChange = (value) => {
        this.props.onChange(value, this.props.lightID);
        this.setState({ hue: value });
    } 

    render() {

        return (
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                <Slider
                    value={this.state.hue}
                    thumbTintColor='rgb(83,45,62)'
                    onValueChange={(value) => this.onChange(value)}
                    maximumValue={this.props.maximumValue}
                    step={10}
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
