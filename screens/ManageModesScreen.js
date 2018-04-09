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
    Platform,
    ScrollView
} from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';

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
        selectedPlaylist: {},
        modeName: '',
        modeId: ''
    }

    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    componentDidMount() {
        this.state.playlists = this.props.navigation.getParam('playlists', [])
        this.state.numberOfBulbs = this.props.navigation.getParam('numberOfBulbs', 3)

        const mode = this.props.navigation.getParam('mode', null);
        if(mode != null) {
            this.setState({
                lightsInfo: mode.lightsInfo ? mode.lightsInfo : [],
                selectedPlaylist: mode.playlist ? mode.playlist : {},
                modeName: mode.name ? mode.name : '',
                isEdit: true,
                modeId: mode.id ? mode.id : ''
            })
        }  
        else {
            let lightsInfo = [];
            for(let i = 0; i < this.state.numberOfBulbs; i++) {
                lightsInfo[i] = {
                    name: 'bulb ' + i,
                    bri: 128,
                    hue: 0,
                    sat: 255,
                    isOn: true
                }
            }
            this.setState({ 
                lightsInfo,
                selectedPlaylist: this.state.playlists.length > 0 ? this.state.playlists[0] : {}
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
        console.log('(onSave)   state => %O', this.state)
        firebase.auth().onAuthStateChanged(user => {
            firebase.database().ref(`/Users/${user.uid}/Modes/${this.state.modeId}`)
                .update({
                    lightsInfo: this.state.lightsInfo,
                    playlist: this.state.selectedPlaylist,
                    name: this.state.modeName
                })
                .then(() => this.props.navigation.goBack())
                .catch(error => console.log(error))
        })
    }

    onDelete = () => {
        console.log('(onDelete)   state => %O', this.state)
        firebase.auth().onAuthStateChanged(user => {
            firebase.database().ref(`/Users/${user.uid}/Modes/${this.state.modeId}`)
                .remove()
                .then(() => this.props.navigation.goBack())
                .catch(error => console.log(error))
        })
    }

    onCreate = () => {
        console.log('(onCreate)   state => %O', this.state)
        firebase.auth().onAuthStateChanged(user => {
            firebase.database().ref(`/Users/${user.uid}/Modes`)
            .push({
                lightsInfo: this.state.lightsInfo,
                playlist: this.state.selectedPlaylist,
                name: this.state.modeName
            })
            .then(() => this.props.navigation.goBack())
            .catch(error => console.log(error))
        })
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
                        this.state.selectedPlaylist != null ? this.state.selectedPlaylist.name : ''
                    }
                    onValueChange={(itemValue, itemIndex) => this.setState({ 
                        selectedPlaylist: this.state.playlists[itemIndex]
                        })}>
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
                    buttonStyle={{ backgroundColor: '#6f6', borderRadius: 40 }}
                    containerViewStyle={{ borderRadius: 40, flex: 1 }}
                    onPress={ this.state.isEdit ? this.onSave : this.onCreate }
                />
                {this.renderDeleteButton()}
                <Button
                    title='Cancel'
                    raised
                    buttonStyle={{ backgroundColor: '#eee', borderRadius: 40 }}
                    containerViewStyle={{ borderRadius: 40, flex: 1 }}
                    onPress={() => this.props.navigation.goBack()}
                />
            </View>
        );
    }

    renderDeleteButton = () => {
        if(this.state.isEdit)
            return (
                <Button
                    title='Delete'
                    raised
                    buttonStyle={{ backgroundColor: '#f66', borderRadius: 40 }}
                    containerViewStyle={{ borderRadius: 40, flex: 1 }}
                    onPress={this.onDelete}
                />
            )
    }

    render() {
        return(
            <ScrollView>

                    <ImageBackground style={{ flex: 1 }} source={backgroundImage}>
                        {this.renderModeHeader()}
                        {this.renderBulbs()}
                        {this.renderPlaylists()}
                        {this.renderButtons()}
                    </ImageBackground>

            </ScrollView>
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