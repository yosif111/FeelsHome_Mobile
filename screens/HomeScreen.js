import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, Switch, TouchableOpacity } from 'react-native';
import { ListItem, Button, Icon } from 'react-native-elements'
import CustomCard from '../components/Common/CustomCard';
import LightControl from '../components/LightControl'
import AudioControl from '../components/AudioControl'
import CustomVolumeControl from '../components/Common/CustomVolumeControl';
const backgroundImage = require('../assets/background.png');


class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTransparent: true,
            headerRight: (
                <TouchableOpacity onPress={() => navigation.navigate('settings')} >
                    <Image
                        source={require('../assets/icon_settings.png')}
                        style={styles.settingsIcon} />
                </TouchableOpacity>
                
            ),
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.navigate('modes')} >
                    <Image
                        source={require('../assets/icon_mode.png')}
                        style={styles.modeIcon} />
                 </TouchableOpacity>
            )
        }
    }

    state = { RGBvalue: 0, RGBSwitchIsOn: false };



    render() {

        return (
            <View style={{ flex: 1 }}>
                <ImageBackground style={{ flex: 1 }} source={backgroundImage}>

                    <ScrollView style={styles.mainView}>

                        <CustomCard
                            label='Light Control'
                            icon={require('../assets/icon_bulb.png')}
                            renderSlider
                        >
                            <LightControl
                            />

                        </CustomCard>


                        <CustomCard
                            label='Audio Control'
                            icon={require('../assets/icon_audio.png')}
                            renderVolumeControl
                            disableSwitch
                        >
                            <AudioControl
                            />
                        </CustomCard>

                        <CustomCard
                        label='TV'
                        icon={require('../assets/icon_tv.png')}
                        >

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

    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgb(83,45,62)',
    },
    trackStyle: {
        borderRadius: 10
    },
    settingsIcon: {
        marginRight: 10,
        marginTop: 10,
        width: 40,
        height: 40
    },
    modeIcon: {
        marginLeft: 10,
        marginTop: 10,
        width: 40,
        height: 40
    }

});

export default HomeScreen;
