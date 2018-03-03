import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, Switch } from 'react-native';
import { ListItem, Button } from 'react-native-elements'
import CustomCard from '../components/Common/CustomCard';
import LightControl from '../components/LightControl'
const backgroundImage = require('../assets/background.png');


class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    }

    state = { RGBvalue: 0, RGBSwitchIsOn: false };



    render() {

        return (
            <View style={{ flex: 1 }}>
                <ImageBackground style={{ flex: 1 }} source={backgroundImage}>

                    <ScrollView style={styles.mainView}>

                        <CustomCard
                            label='RGB Lights'
                            icon={require('../assets/icon_bulb.png')}
                            renderSlider
                        >
                            <LightControl
                            />

                        </CustomCard>


                        <CustomCard
                            label='Audio'
                            icon={require('../assets/icon_bulb.png')}
                            renderSlider
                            renderVolumeControl
                        >
                   
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
