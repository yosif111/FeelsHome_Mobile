import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const playlists = [
    {
        name: 'Piano',
        uri: 'idofhdifjif'
    },
    {
        name: 'Pop',
        uri: 'lslskfodifododoooo'
    }
]

const lightsInfo = [
    {
        name: 'test 1',
        bri: 100,
        hue: 0,
        sat: 255,
        isOn: true
    },
    {
        name: 'test 2',
        bri: 0,
        hue: 126,
        sat: 255,
        isOn: false
    },
    {
        name: 'test 3',
        bri: 200,
        hue: 255,
        sat: 255,
        isOn: true
    }
]

const mode = {
    playlist: 'Piano',
    lightsInfo,
    name: 'Reading'
}

class ModesScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Modes'
        }
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('manageModes', { mode, playlists })}>
                    <Text style={{ fontSize: 20 }}>ModesScreen</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default ModesScreen;