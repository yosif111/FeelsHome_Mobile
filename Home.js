import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'

import styles from './styles';
const backgroundImage = require('./assets/background.png');


class Home extends Component {


    render() {
        return (
         
                <ScrollView>
                    <View>
                        <Card title="CARD WITH DIVIDER">
                            {
                                <Text>Home</Text>
                            }
                        </Card>
                    </View>
                </ScrollView>

        );
    }
}

export default Home;
