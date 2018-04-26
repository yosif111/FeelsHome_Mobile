import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Slider,
    Platform,
    ImageBackground
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
                {
                    Platform.OS == 'android' ?
                        <ImageBackground 
                            resizeMode='contain' source={require('../../assets/color_picker.png')} 
                            style={{ borderRadius: 10, overflow: 'hidden', marginRight: 10, marginLeft: 10 }}
                        >
                            <Slider
                                style={{ height: 30, borderRadius: 10, marginLeft: -10, marginRight: -10 }}
                                value={this.state.hue}
                                thumbTintColor='rgb(83,45,62)'
                                onValueChange={(value) => this.onChange(value)}
                                maximumValue={this.props.maximumValue}
                                step={10}
                                maximumTrackTintColor='transparent'
                                minimumTrackTintColor='transparent'
                            />

                        </ImageBackground>
                    :
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
                }
            </View>
        );
    }


}

const styles = StyleSheet.create({
    trackStyle: {
        borderRadius: 10
    }
});
