import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Image, 
    TextInput, 
    Slider, 
    ImageBackground, 
    Picker, 
    Switch,
    Platform
} from 'react-native';
import { Button } from 'react-native-elements';

import CustomSlider from '../components/Common/CustomSlider';

const bulbImg = require('../assets/icon_bulb.png');
const audioImg = require('../assets/icon_audio.png');
const backgroundImage = require('../assets/background.png');

export default class ManageModesScreen extends Component {
    state={ 
        lightsInfo: [], 
        playlists: [], 
        isEdit: false, 
        numberOfBulbs: 0, 
        selectedPlaylist: 0,
        modeName: ''
    }

    componentDidMount() {
        this.state.playlists = this.props.navigation.getParam('playlists', []);
        this.state.numberOfBulbs = this.props.navigation.getParam('numberOfBulbs', 3);
        const mode = this.props.navigation.getParam('mode', null);
        if(mode != null) {
            this.setState({
                lightsInfo: mode.lightsInfo,
                selectedPlaylist: mode.playlist,
                modeName: mode.name,
                isEdit: true
            })
        }  
        else {
            this.setState({ 
                lightsInfo: [
                    {
                        name: 'bulb 1',
                        bri: 128,
                        hue: 0,
                        sat: 255,
                        isOn: true
                    },
                    {
                        name: 'bulb 2',
                        bri: 128,
                        hue: 0,
                        sat: 255,
                        isOn: true
                    },
                    {
                        name: 'bulb 3',
                        bri: 128,
                        hue: 0,
                        sat: 255,
                        isOn: true
                    }
                ]
            })
        }
    }

    onBulbNameChange = (value, index) => {
        const lightsInfo = this.state.lightsInfo;
        lightsInfo[index].name = value;
        this.setState({ lightsInfo });
    }

    onBrightnessChange = (value, index) => {
        const lightsInfo = this.state.lightsInfo;
        lightsInfo[index].bri = value;
        this.setState({ lightsInfo });
    }

    onColorChange = (value, index) => {
        const lightsInfo = this.state.lightsInfo;
        lightsInfo[index].hue = value;
        this.setState({ lightsInfo });
    }

    onSwitchPress = (toggle, index) => {
        const lightsInfo = this.state.lightsInfo;
        lightsInfo[index].isOn = toggle;
        this.setState({ lightsInfo });
    }

    onSave = () => {

    }

    onCreate = () => {
        console.log('ManageModesScreen state => %O', this.state);
    }

    renderBulbs = () => {
        return this.state.lightsInfo.map((item, index) => {
            return(
                <View style={styles.card} key={index}>
                    <View style={styles.cardHeader}>
                        <View style={styles.iconContainer}>
                            <Image
                                style={styles.icon}
                                source={bulbImg}
                                resizeMode='contain'
                            />
                        </View>
                        <View style={styles.textInputContainer}>
                            <TextInput
                                placeholder='Enter Bulb Name'
                                value= {item.name}
                                onChangeText={value => this.onBulbNameChange(value, index)}
                                autoCorrect={false}
                                underlineColorAndroid='transparent'
                                style={{ fontSize: 16 }}
                            />
                        </View>
                        <View style={styles.switchContainer}>
                            <Switch
                                value={item.isOn}
                                tintColor={Platform.OS == 'android' ? 'rgb(200,200,200)' : 'rgb(83,45,62)'}
                                onTintColor={Platform.OS == 'android' ? 'rgb(80,200,80)' : 'rgb(83,45,62)'}
                                thumbTintColor='rgb(83,45,62)'
                                onValueChange={(toggle) => this.onSwitchPress(toggle, index)}
                            />
                        </View>
                    </View>
                    <View style={styles.cardBody}>
                        <View>
                            <View style={{ marginBottom: 20 }} >
                                <CustomSlider
                                    maximumValue={255}
                                    step={5}
                                    value={item.hue}
                                    onChange={this.onColorChange}
                                    lightID={index}
                                />
                            </View>


                            <Slider
                                value={item.bri}
                                thumbTintColor='rgb(83,45,62)'
                                onValueChange={(value) => this.onBrightnessChange(value, index)}
                                maximumValue={255}
                                step={10}
                                maximumTrackTintColor='#bdc3c7'
                                minimumTrackTintColor='#B33771'
                                thumbImage={require('../assets/sliderThumb.png')}
                            />
                        </View>
                    </View>
                </View>
            );
        });
    }

    renderPlaylists = () => {
        return(
            <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.iconContainer}>
                        <Image
                            style={styles.icon}
                            source={audioImg}
                            resizeMode='contain'
                        />
                    </View>
                    <View style={{ flex: 8 }}>
                        <Text style={styles.label}>Select Playlist: </Text>
                    </View>
                </View>
                <Picker
                    selectedValue={
                        this.state.playlists.length > 0 ?
                        this.state.playlists[this.state.selectedPlaylist] : 'Empty'
                    }
                    onValueChange={(itemValue, itemIndex) => this.setState({ selectedPlaylist: itemIndex })}>
                    {this.state.playlists.map((item, index) => {
                        return <Picker.Item key={index} label={item.name} value={item.name} />;
                    })}
                </Picker>
            </View>
        );
    }

    renderModeHeader = () => {
        return(
            <View style={styles.card}>
                <TextInput 
                    placeholder={'Enter Mode Name'}
                    value={this.state.modeName}
                    onChangeText={modeName => this.setState({ modeName })}
                    autoCorrect={false}
                    underlineColorAndroid='transparent'
                    style={{ fontSize: 20 }}
                />
            </View>
        );
    }

    renderButtons = () => {
        return (
            <View style={styles.buttonsContainer}>
                <Button
                    title= {this.state.isEdit ? 'Save' : 'Create'}
                    raised
                    large
                    buttonStyle={{ backgroundColor: '#6f6', borderRadius: 40 }}
                    containerViewStyle={{ borderRadius: 40, flex: 1 }}
                    onPress={ this.state.isEdit ? this.onSave : this.onCreate }
                />
                <Button
                    title='Cancel'
                    raised
                    large
                    buttonStyle={{ backgroundColor: '#f66', borderRadius: 40 }}
                    containerViewStyle={{ borderRadius: 40, flex: 1 }}
                    onPress={() => this.props.navigation.goBack()}
                />
            </View>
        );
    }

    render() {
        return(
            <View style={styles.container}>
                <ImageBackground style={{ flex: 1 }} source={backgroundImage}>
                    {this.renderModeHeader()}
                    {this.renderBulbs()}
                    {this.renderPlaylists()}
                    {this.renderButtons()}
                </ImageBackground>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1
    },
    card: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff'
    },
    cardHeader: {
        flexDirection: 'row',
        marginBottom: 20
    },
    iconContainer: {
        flex: 2
    },
    icon: {
       width: 30,
       height: 30
    },
    textInputContainer: {
        flex: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 40
    },
    label: {
        color: '#000',
        fontSize: 20
    },
    buttonsContainer: {
        margin: 10,
        flexDirection: 'row'
    },
    switchContainer: {
        flex: 2
    }
}