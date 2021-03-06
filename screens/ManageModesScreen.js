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
    ScrollView,
    Dimensions
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown'

import CustomSlider from '../components/Common/CustomSlider';
import APIProvider from '../APIProvider'

const api = new APIProvider();

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
        modeId: '',
        reRenderParent: () => {}
    }

    static navigationOptions = ({ navigation }) => ({
        header: null
    })

    componentDidMount() {
        this.state.reRenderParent = this.props.navigation.getParam('reRender', () => {})
        this.state.playlists = this.props.navigation.getParam('playlists', [])
        this.state.numberOfBulbs = this.props.navigation.getParam('numberOfBulbs', 3)
        console.log('playlists from modes = %O', this.state.playlists)

        const mode = this.props.navigation.getParam('mode', null);
        if(mode != null) {
            let lightsInfo = []
            mode.lights.map(item => {
                item = {
                    ...item,
                    bri: item.brightness,
                    hue: item.color / 257,
                    isOn: item.isOn == 1
                }
                delete item.brightness
                delete item.color
                lightsInfo.push(item)
            })
            console.log('lightsInfo ===> %O', lightsInfo)
            console.log('(ManageModesScreen) mode => %O', mode)
            let selectedPlaylist = { name: mode.playlist_name, uri: mode.playlist_uri }
            this.setState({
                lightsInfo,
                selectedPlaylist,
                modeName: mode.name ? mode.name : '',
                isEdit: true,
                modeId: mode.id ? mode.id : ''
            })
        }  
        else {
            let lightsInfo = [];
            for(let i = 0; i < this.state.numberOfBulbs; i++) {
                lightsInfo[i] = {
                    name: 'bulb ' + (i+1),
                    bri: 128,
                    hue: 0,
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
        this.state.reRenderParent()
        console.log('(onSave)   state => %O', this.state)
        const { modeId, modeName, lightsInfo, selectedPlaylist} = this.state
        let lights = []
       lightsInfo.map(item => {
           lights.push({
               ...item,
               brightness: item.bri,
               color: item.hue * 257
           })
        })
        let mode = {
            mode_id: modeId,
            name: modeName,
            playlist_name: selectedPlaylist.name,
            playlist_uri: selectedPlaylist.uri,
            lights
        }
        api.updateMode(mode)
            .then(() => {
                this.state.reRenderParent()
                this.props.navigation.goBack()
            })
            .catch(e => console.log(e))
    }

    onDelete = () => {
        console.log('(onDelete)   state => %O', this.state)
        api.deleteMode(this.state.modeId)
            .then(() => {
                this.state.reRenderParent()
                this.props.navigation.goBack()
            })
            .catch(e => console.log(e))
    }

    onCreate = () => {
        this.state.reRenderParent()
        console.log('(onCreate)   state => %O', this.state)
        const { modeId, modeName, lightsInfo, selectedPlaylist } = this.state
        let lights = []
        lightsInfo.map(item => {
            item = {
                ...item, 
                brightness: item.bri,
                color: item.hue * 257
            }
            delete item.bri
            delete item.hue
            lights.push(item)
        })
        let mode = {
            name: modeName,
            playlist_name: selectedPlaylist.name,
            playlist_uri: selectedPlaylist.uri,
            lights
        }
        api.addMode(mode)
            .then(res => {
                console.log('result mode = %O', res)
                this.state.reRenderParent()
                this.props.navigation.goBack()
            })
            .catch(e => console.log(e))
    }

    getPlaylistNames = () => {
        let result = [];
        if (this.state.playlists.length > 0) {
            this.state.playlists.map(item => {
                result.push({ value: item.name });
            });
        } else {
            result.push({ value: 'No items' });
        }
        return result;
    }

    renderBulbs = () => {
        return this.state.lightsInfo.map((item, index) => {
            return(
                <View style={styles.card} key={index}>
                    <View style={styles.cardHeader}>
                        <View style={styles.iconContainer}>
                            <Icon 
                            name='lightbulb-on-outline'
                            type='material-community'
                            size={30}
                            color='#532d3e'
                            />   
                        </View>
                        <View style={styles.textInputContainer}>
                            <TextInput
                                placeholder='Enter Bulb Name'
                                value={item.name}
                                onChangeText={value => this.onBulbNameChange(value, index)}
                                autoCorrect={false}
                                underlineColorAndroid='transparent'
                                style={{ fontSize: 16 }}
                            />
                        </View>
                        <View style={styles.switchContainer}>
                            <Switch
                                value={item.isOn == 1 ? true : false}
                                tintColor={Platform.OS == 'android' ? 'rgb(200,200,200)' : '#532d3e'}
                                onTintColor={'rgb(80,200,80)'}
                                thumbTintColor='#532d3e'
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
                            
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 12 }}>
                                    <Slider
                                        value={item.bri}
                                        thumbTintColor='#532d3e'
                                        onSlidingComplete={(value) => this.onBrightnessChange(value, index)}
                                        maximumValue={255}
                                        step={10}
                                        maximumTrackTintColor='#bdc3c7'
                                        minimumTrackTintColor='#B33771'
                                        thumbImage={require('../assets/sliderThumb.png')}
                                    />
                                </View>
                                <Icon
                                    name='brightness-medium'
                                    type='Device'
                                    size={18}
                                    containerStyle={{ flex: 1 }}
                                    color='#532d3e'
                                />
                            </View>
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
                    <Icon 
                        name='music'
                        type='material-community'
                        size={30}
                        color='#532d3e'
                    />   
                    </View>
                    <View style={{ flex: 8 }}>
                        <Text style={styles.label}>Select Playlist: </Text>
                    </View>
                </View>
                {/* <Picker
                    selectedValue={ 
                        this.state.selectedPlaylist ? this.state.selectedPlaylist.name : ''
                    }
                    onSlidingComplete={(itemValue, itemIndex) => this.setState({ 
                        selectedPlaylist: this.state.playlists[itemIndex]
                        })}>
                    {this.state.playlists.map((item, index) => {
                        return <Picker.Item key={index} label={item.name} value={item.name} />;
                    })}
                </Picker> */}
                <View style={{ alignItems: 'center' }}>
                <Dropdown
                    label='Select Playlist'
                    value={this.state.selectedPlaylist ? this.state.selectedPlaylist.name : ''}
                    data={this.getPlaylistNames()}
                    onChangeText={(value, index) => this.setState({
                        selectedPlaylist: this.state.playlists[index]
                    })}
                    containerStyle={{ width: '80%' }}
                    pickerStyle={{ }}
                />
            </View> 
            </View>
        );
    }

    renderModeHeader = () => {
        return (
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
                    textStyle={{ color: '#000' }}
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
        return (
            <ScrollView>

                <ImageBackground style={styles.container} resizeMode='stretch' source={backgroundImage}>
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