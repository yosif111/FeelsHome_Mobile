import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ImageBackground } from 'react-native';
import { Card, ListItem, Button, Slider } from 'react-native-elements'

const backgroundImage = require('../assets/background.png');
const lightIcon = require('../assets/icon_bulb.png');


class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Home'
        }
    }

    state = { RGBvalue: 0 };

    renderLightsSlider = () => {
        return (
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                <Slider
                    //style={{height: 10 }}
                    value={this.state.RGBValue}
                    thumbTintColor={'rgb(83,45,62)'}
                    onValueChange={(RGBValue) => this.setState({ RGBValue })}
                    maximumValue={255}
                    step={5}
<<<<<<< HEAD:screens/HomeScreen.js
                    trackImage={require('../assets/color_picker.png')}
=======
                    trackStyle={{backgroundImage: require('./assets/color_picker.png') }}
                    //trackImage={require('./assets/color_picker.png')}
>>>>>>> 6ba6e9bfb6bf396639fbf50227c2945415ae4377:Home.js
                />
                
                <Text>Value: {this.state.RGBValue}</Text>
            </View>
        );
    }
    renderLightsCard = () => {
        return (
            <View>
                <Card >
                    {this.renderCardHeader(lightIcon,'RGB Light')}
                    {this.renderLightsSlider()}
                </Card>
            </View>
        );
    }

    renderCardHeader = (icon,label) => {
        return (
            <View style={styles.container}>
            <View
                style={styles.iconContainer}>
                <Image
                    style={styles.icon}
                    resizeMode="contain"
                    source={icon} />
            </View>

            <View
                style={styles.labelContainer}>
                <Text
                    style={styles.label}>
                    {label}
                </Text>
            </View>
            </View>
        );
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <ImageBackground style={{ flex: 1 }} source={backgroundImage}>

                    <ScrollView style={styles.mainView}>
                        {this.renderLightsCard()}
                        {/* {this.renderTVCard()}
                        {this.renderAudioCard()}
                        {this.renderModesCard()} */}
                    </ScrollView>

                </ImageBackground>
            </View>

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
        padding : 0,
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

});

export default HomeScreen;
