import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, Slider, Switch } from 'react-native';
import { ListItem, Button } from 'react-native-elements'
import CustomCard from '../components/Common/CustomCard';
const backgroundImage = require('../assets/background.png');
const lightIcon = require('../assets/icon_bulb.png');


class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    }

    state = { RGBvalue: 0, RGBSwitchIsOn: false };

    renderLightsSlider = () => {
        return (
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                <Slider
                    //style={{height: 4 }}
                    value={this.state.RGBValue}
                    thumbTintColor='rgb(83,45,62)'
                    onValueChange={(RGBValue) => this.setState({ RGBValue })}
                    maximumValue={255}
                    step={5}
                    trackStyle={styles.trackStyle}
                    trackImage={require('../assets/color_picker.png')}
                    thumbImage={require('../assets/sliderThumb.png')}
                />

                {/* <Text>Value: {this.state.RGBValue}</Text> */}
            </View>
        );
    }


    render() {

        return (
            <View style={{ flex: 1 }}>
                <ImageBackground style={{ flex: 1 }} source={backgroundImage}>

                    <ScrollView style={styles.mainView}>

                        <CustomCard
                            label='RGB Lights'
                            icon={require('../assets/icon_bulb.png')}>
                            {this.renderLightsSlider()}
                        </CustomCard>

                        <CustomCard
                            label='RGB Lights'
                            icon={require('../assets/icon_bulb.png')}>
                            {this.renderLightsSlider()}
                        </CustomCard>

                    </ScrollView>

                </ImageBackground>
            </View >

        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        marginTop: '20%'
    },
    cardLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgb(83,45,62)',
    },
    container: {
        padding: 0,
        flexDirection: 'row',
        flex: 1,
    },

    iconContainer: {
        flex: 5,
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
    trackStyle: {
        borderRadius: 10
    }

});

export default HomeScreen;
