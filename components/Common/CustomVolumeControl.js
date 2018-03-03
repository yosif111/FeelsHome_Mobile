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



export default class CustomVolumeControl extends Component {


    constructor() {
        super();

        this.state = {
            volumeLevel: 0,
            isPalying: false,
            progress: 0
        };
    }

    componentWillMount() {
        this.state.volumeLevel = 50;
    }
    render() {
        
        return (
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                <Slider
                    value={this.state.volumeLevel}
                    thumbTintColor='rgb(83,45,62)'
                    onValueChange={(volumeLevel) => this.setState({ volumeLevel })}
                    maximumValue={100}
                    step={5}
                    trackStyle={styles.trackStyle}
                    maximumTrackTintColor='rgb(83,45,62)'
                    minimumTrackTintColor='rgb(83,45,62)'
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
