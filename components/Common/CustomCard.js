import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Animated,
    Easing,
    Image,
    Alert,
    View,
    ScrollView,
    ImageBackground,
    Switch,
    Dimensions
} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'



export default class CustomCard extends Component {


    constructor() {
        super();


        this.state = {
            isOn: false,
        };

    }


    onSwitchPress = (toggle) => {
        this.setState({ isOn: toggle });
    }
    renderCardHeader = () => {

        return (
            <View style={styles.container}>
                <View
                    style={styles.iconContainer}>
                    <Image
                        style={styles.icon}
                        resizeMode="contain"
                        source={this.props.icon} />
                </View>

                <View
                    style={styles.labelContainer}>
                    <Text
                        style={styles.label}>
                        {this.props.label}
                    </Text>
                </View>

                <View style={styles.switchStyle}>
                    {this.renderSwitch()}
                </View>

            </View>
        );
    }

    renderSwitch = () => {
        if(this.props.DisableSwitch)
            return;
        return(           
                     <Switch
            value={this.state.isOn}
            tintColor='rgb(83,45,62)'
            thumbTintColor='rgb(83,45,62)'
            onValueChange={(toggle) => this.onSwitchPress(toggle)}
        />);
    }

    renderCard = () => {

        return (
            <View>
                <Card containerStyle={{ borderRadius: 15 }}>
                    {this.renderCardHeader()}
                    {this.props.children}
                </Card>
            </View>
        );
    }

    render() {
        return (
            this.renderCard()
        );
    }


}

const styles = StyleSheet.create({

    container: {
        padding: 0,
        flexDirection: 'row',
        flex: 1,
    },

    iconContainer: {
        flex: 6,
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
    switchStyle: {
        padding: 13,
    }
});
