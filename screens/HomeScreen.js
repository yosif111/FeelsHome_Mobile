import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ImageBackground } from 'react-native';
import { Card, ListItem, Button, Slider } from 'react-native-elements'

const backgroundImage = require('../assets/background.png');
const lightIcon = require('../assets/icon_bulb.png');
/* const audioIcon = require('../assets/icon_audio.png');
const nextTrackIcon = require('../assets/icon_next.png');
const previousTrackIcon = require('../assets/icon_previous.png');
const pauseIcon = require('../assets/icon_pause.png'); */




class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Home'
        }
    }

    state = { 
        RGBvalue: 0,
        //audioValue: 0
     };

    /*renderAudioCard(){

       return (
        <Card>
           <View style={{ flex: 1,  flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center'}}>
                    <Image 
                    source={previousTrackIcon}
                    />
                    
                    <Image 
                    source={pauseIcon}
                    />

                    <Image 
                    source={nextTrackIcon}
                    />                                  
           </View>
           
           <View style={{ flex: 1,  flexDirection: 'row', justifyContent: 'center'}}>
                <View style={{ flex: 1, justifyContent: 'center'}}>
                    <Image 
                    source={audioIcon}
                    />
                </View>
           
                <View style={{ flex: 9, justifyContent: 'center'}}>
                    <Slider
                    //style={{height: 10 }}
                    value={this.state.audioValue}
                    thumbTintColor={'rgb(83,45,62)'}
                    onValueChange={(audioValue) => this.setState({ audioValue })}
                    maximumValue={100}
                    //step={5}
                    />
                 </View>
            </View>       
        </Card>
        );
    } */

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
                    trackStyle={{backgroundImage: require('../assets/color_picker.png') }}
                    //trackImage={require('./assets/color_picker.png')}
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
                        {this.renderAudioCard()}
                        {/* {this.renderTVCard()}
                        
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
