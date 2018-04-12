import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { List, ListItem, WebView, Button } from 'react-native-elements';

import CustomListItem from '../components/Common/CustomListItem';

import UserInput from '../components/login-components/UserInput';

import userIcon from '../assets/username.png';
import passIcon from '../assets/password.png';
import spotifyIcon from '../assets/icon_spotify.png';

import config from '../config'
const { URL } = config

class SettingsScreen extends Component {
    state = {
        spotify_password: '',
        spotify_username: ''
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Settings'
        }
    }

    updateSpotify = () => {
        let javaScript = 'document.getElementsByName("spotify__username")[0].attributes[2].value="' + this.state.spotify_username + '";';
        javaScript += 'document.getElementsByName("spotify__password")[0].attributes[2].value="' + this.state.spotify_password + '";';
        javaScript += 'document.forms[0].submit();document.forms[0].submit();';

        return (
            <View style={{ flex: 1 }}>
                <WebView
                    source={{ uri: `${URL}/settings` }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    injectedJavaScript={javaScript}
                    style={{ width: 0, height: 0 }}
                />
            </View>
        );
    }
    onSpotifyUsernameChange = (value) => {
        this.setState({ spotify_username: value })
    }

    onSpotifyPasswordChange = (value) => {
        this.setState({ spotify_password: value })
    }

    render() {
        return (
            <List>
                {
                    <CustomListItem
                        title='Spotify'
                        icon={{ name: 'spotify', type: 'entypo' }}
                    >
                        <Image
                            source={spotifyIcon}
                            style={styles.icon}
                        />

                        <UserInput
                            source={userIcon}
                            placeholder='Username'
                            autoCapitalize={'none'}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            onInputChange={this.onSpotifyUsernameChange}
                        />
                        <UserInput
                            source={passIcon}
                            placeholder='Password'
                            autoCapitalize={'none'}
                            returnKeyType={'done'}
                            autoCorrect={false}
                            onInputChange={this.onSpotifyPasswordChange}
                            showPassword={true}
                        />

                        <View style={styles.buttonContainer}>
                            <Button
                                raised
                                borderRadius={50}
                                title='LOGIN'
                                buttonStyle={styles.button}
                                containerViewStyle={{ width: 200 }}
                            />
                        </View>
                    </CustomListItem>
                }
            </List>
        );
    }
}


const styles = {
    container: {
        flex: 1,
        marginTop: 10
    },
    icon: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom: 40,
        marginTop: 20
    },
    buttonContainer: {
        margin: 15,
        borderRadius: 50,
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#1ED760',
        width: 200
    }
}

export default SettingsScreen;
