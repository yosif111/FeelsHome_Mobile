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
import Collapsible from 'react-native-collapsible';
import CustomSlider from './CustomSlider'
import CustomVolumeControl from './CustomVolumeControl'

export default class CustomCard extends Component {


    constructor() {
        super();
        this.state = {
            isOn: false,
            isCollapsed: true,
            showHeader: true
        };
    }


    onSwitchPress = (toggle) => {
        this.setState({ isOn: toggle });
    }

    toggleHeader = () => {
        this.setState({showHeader: !this.state.showHeader});
    }
    renderCardHeader = () => {
        if(!this.state.showHeader)
            return;

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

    renderSlider = () => {
        if (!this.props.renderSlider || !this.state.showHeader)
            return;

        return (
            <CustomSlider
                maximumValue={255}
                step={5}
                value={0}
            />
        );
    }

    renderVolumeControl = () => {
        if(!this.props.renderVolumeControl)
            return ;
        
            return (
                <CustomVolumeControl
                />
            );
    }

    renderSwitch = () => {
        if (this.props.disableSwitch)
            return;
        return (
            <Switch
                value={this.state.isOn}
                tintColor='rgb(83,45,62)'
                thumbTintColor='rgb(83,45,62)'
                onValueChange={(toggle) => this.onSwitchPress(toggle)}
            />);
    }

    onPress = () => {
        this.setState({ isCollapsed: !this.state.isCollapsed, showHeader: !this.state.showHeader })
    }
    renderCard = () => {

        return (
            <TouchableOpacity onPress={() => this.onPress()}>
                <View>
                    <Card containerStyle={{ borderRadius: 15 }}>
                        {this.renderCardHeader()}
                        {this.renderSlider()}
                        {this.renderVolumeControl()}
                        <Collapsible
                         collapsed={this.state.isCollapsed}
                         duration={800}
                         >
                            {this.props.children}
                        </Collapsible>
                    </Card>
                </View>
            </TouchableOpacity>

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
