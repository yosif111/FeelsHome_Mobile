import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ImageBackground } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'

const backgroundImage = require('./assets/background.png');


class Home extends Component {

    renderLightsCard = () => {
        return (
            <View>
                <Card title="CARD WITH DIVIDER">
                    {
                        <Text>Lights</Text>
                    }
                </Card>
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

  });

export default Home;
