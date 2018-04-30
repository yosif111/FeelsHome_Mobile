import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Slider,
    Platform,
    ImageBackground
} from 'react-native';
import { Icon } from 'react-native-elements';


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
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', flexDirection: 'row' }}>
                {
                    Platform.OS == 'android' ?
                        <ImageBackground 
                            resizeMode='contain' source={require('../../assets/color_picker.png')} 
                            style={{ borderRadius: 10, overflow: 'hidden', marginRight: 10, marginLeft: 10, flex: 12 }}
                        >
                            <Slider
                                style={{ height: 30, borderRadius: 10, marginLeft: -10, marginRight: -10 }}
                                value={this.state.hue}
                                thumbTintColor='rgb(83,45,62)'
                                onSlidingComplete={(value) => this.onChange(value)}
                                maximumValue={this.props.maximumValue}
                                step={10}
                                maximumTrackTintColor='transparent'
                                minimumTrackTintColor='transparent'
                            />

                        </ImageBackground>
                    :
                    <View style={{ flex: 12 }}>
                            <Slider
                                value={this.state.hue}
                                thumbTintColor='rgb(83,45,62)'
                                onSlidingComplete={(value) => this.onChange(value)}
                                maximumValue={this.props.maximumValue}
                                step={10}
                                trackStyle={styles.trackStyle}
                                trackImage={require('../../assets/color_picker.png')}
                                thumbImage={require('../../assets/sliderThumb.png')}
                            />
                    </View>
                }
                <Icon
                    name='color-lens'
                    type='Image'
                    size={18}
                    containerStyle={{ flex: 1 }}
                    color='#532d3e'
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
