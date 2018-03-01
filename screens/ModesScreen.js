import React, { Component } from 'react';
import { View, Text } from 'react-native';

class ModesScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Modes'
        }
    }

    render() {
        return (
            <View>
                <Text>ModesScreen</Text>
                <Text>ModesScreen</Text>
                <Text>ModesScreen</Text>
                <Text>ModesScreen</Text>
            </View>
        );
    }
}

export default ModesScreen;