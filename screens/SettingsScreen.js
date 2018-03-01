import React, { Component } from 'react';
import { View, Text } from 'react-native';

class SettingsScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Settings'
        }
    }

    render() {
        return (
            <View>
                <Text>SettingsScreen</Text>
                <Text>SettingsScreen</Text>
                <Text>SettingsScreen</Text>
                <Text>SettingsScreen</Text>
            </View>
        );
    }
}

export default SettingsScreen;