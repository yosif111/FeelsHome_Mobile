import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { List, ListItem, WebView } from 'react-native-elements';

import CustomListItem from '../components/Common/CustomListItem';
import UserInput from '../components/login-components/UserInput';
import Logo from '../components/login-components/Logo';

import userIcon from '../assets/username.png';
import passIcon from '../assets/password.png';
import spotifyIcon from '../assets/icon_spotify.png'

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
        let javaScript = 'document.getElementsByName("spotify__username")[0].attributes[2].value="yosif111";document.getElementsByName("spotify__password")[0].attributes[2].value="yosif1113434";document.forms[0].submit();document.forms[0].submit();'

        return (
            <View style={{flex: 1}}>
            <WebView
            source={{uri: 'http://192.168.8.107/settings'}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            injectedJavaScript={javaScript}
            style={{width: 0, height: 0}}
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
                        <Logo 
                            img={spotifyIcon}
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
                    </CustomListItem>
                }
            </List>
        );
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