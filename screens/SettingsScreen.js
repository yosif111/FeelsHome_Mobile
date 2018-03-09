import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';

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
}

export default SettingsScreen;