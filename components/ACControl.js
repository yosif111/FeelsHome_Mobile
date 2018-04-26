import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, Text, Icon } from 'react-native-elements';


export default class ACControl extends Component {
    onPowerPress = () => {
        this.props.changeState({ isOn: !this.props.isOn });
    }
    increaseFanSpeed = () => {
        this.props.changeState({ fanSpeed: this.props.fanSpeed < 5 ? this.props.fanSpeed + 1 : this.props.fanSpeed });
    }
    decreaseFanSpeed = () => {
        this.props.changeState({ fanSpeed: this.props.fanSpeed > 1 ? this.props.fanSpeed - 1 : this.props.fanSpeed });
    }
    increaseTemperature = () => {
        this.props.changeState({ temperature: this.props.temperature < 30 ? this.props.temperature + 1 : this.props.temperature });
    }
    decreaseTemperature = () => {
        this.props.changeState({ temperature: this.props.temperature > 18 ? this.props.temperature - 1 : this.props.temperature });
    }

    // renderCardHeader = () => {
    //     return (
    //         <View style={styles.container}>
    //             <View
    //                 style={styles.iconContainer}
    //             >
    //                 { <Icon
    //                     name='air-conditioner'
    //                     type='material-community'
    //                     color='#532d3e'
    //                     size={30}
    //                 /> }
    //             </View>

    //             <View
    //                 style={styles.labelContainer}
    //             >
    //                 <Text
    //                     style={styles.label}
    //                 >
    //                     {this.props.label}
    //                 </Text>
    //             </View>
    //         </View>
    //     );
    // }
    renderFanControl = () => {
        return (
           <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center', marginLeft: 5 }} >
                <Icon
                    name='fan'
                    type='material-community'
                    color='#532d3e'
                    size={28}
                />
                
                </View>
                <View style={styles.buttonGroupStyle}>
                    <Icon 
                    raised
                    name='add'
                    type='content' 
                    size={16}
                    containerStyle={{ backgroundColor: '#532d3e' }}
                    color='#FFF'
                    onPress={this.increaseFanSpeed}
                    />
                    <Text h4>{this.props.fanSpeed}</Text>
                    <Icon 
                    raised
                    name='remove'
                    type='content' 
                    size={16}
                    containerStyle={{ backgroundColor: '#532d3e' }}
                    onPress={this.decreaseFanSpeed}
                    color='#FFF'
                    />
                </View>
            </View>
        );
    }
    renderColdControl = () => {
        return (
           <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={styles.buttonGroupStyle}>
                    <Icon 
                    raised
                    name='add'
                    type='content' 
                    size={16}
                    containerStyle={{ backgroundColor: '#532d3e' }}
                    onPress={this.increaseTemperature}
                    color='#FFF'
                    />
                    <Text h4>{this.props.temperature}°</Text>
                    <Icon 
                    raised
                    name='remove'
                    type='content' 
                    size={16}
                    containerStyle={{ backgroundColor: '#532d3e' }}
                    onPress={this.decreaseTemperature}
                    color='#FFF'
                    />
                </View>
                <View style={{ justifyContent: 'center', marginRight: 5 }} >
                <Icon
                    name='snowflake'
                    type='material-community'
                    color='#532d3e'
                    size={28}
                />
                </View>
            </View>
        );
    }
    renderPowerButton = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Icon 
                    raised
                    size={20}
                    containerStyle={{ backgroundColor: this.props.isOn ? '#18A826' : '#D41717' }}
                    color='#FFF'
                    name='power-settings-new'
                    type='action'
                    onPress={this.onPowerPress}
                />
            </View>
        );
    }
    renderCard = () => {
        return (
                <View style={{ flex: 1 }}>
                    <View>
                        
                        {/* <View style={{ flex: 1 }}> 
                        {this.renderCardHeader()}
                        </View> */}
                    
                        <View style={{ flex: 7, flexDirection: 'row' }}>
                        {this.renderFanControl()}
                        {this.renderPowerButton()}
                        {this.renderColdControl()}
                        </View>

                    </View>
                </View>
        );
    }
    render() {
        return (
            <View>
                {this.renderCard()}
            </View>   
        ); 
    }
}

const styles = {
    container: {
        padding: 0,
        flexDirection: 'row',
        flex: 1,
        marginBottom: 10,
        justifyContent: 'center'
    },

    iconContainer: {
        flex: 8,
        marginTop: 5,
        marginBottom: 5
    },

    labelContainer: {
        marginTop: 5,
        marginBottom: 5,
        flex: 32,
    },

    icon: {
        height: 25,
        width: 25
    },

    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#532d3e',
    },
    switchStyle: {
        marginTop: 5
    },
    buttonGroupStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }
};
