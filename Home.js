import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ImageBackground } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'

import styles from './styles';
const backgroundImage = require('./assets/background.png');


class Home extends Component {


    render() {
        const resizeMode = 'center';

        return (
            <View style={{ flex: 1 }}>
            <ImageBackground style={{ flex: 1 }} source={backgroundImage}>

                {/* // <ScrollView>
                //     <View>
                //         <Card title="CARD WITH DIVIDER">
                //             {
                //                 <Text>Home</Text>
                //             }
                //         </Card>
                //     </View>
                // </ScrollView> */}

                </ImageBackground>
                </View>

        );
    }
}

export default Home;
