import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';

import CustomListItem from '../components/Common/CustomListItem';
import UserInput from '../components/login-components/UserInput';
import Logo from '../components/login-components/Logo';

import userIcon from '../assets/username.png';
import passIcon from '../assets/password.png';
import spotifyIcon from '../assets/icon_spotify.png'

const list = [
    {
        title: 'Spotify',
        icon: 'av-timer'
    },
    {
        title: 'Trips',
        icon: 'flight-takeoff'
    }
]

class SettingsScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Settings'
        }
    }

    onUsernameChange = () => {

    }

    onPasswordChange = () => {

    }

    render() {
        return (
            <List>
                {
                    list.map((item, i) => (
                        <CustomListItem
                            key={i}
                            title={item.title}
                            icon={{ name: item.icon }}
                        >
                            <Logo 
                                img={spotifyIcon}
                                size='small'
                            />
                            <UserInput 
                                source={userIcon}
                                placeholder='UserName'
                                autoCapitalize={'none'}
                                returnKeyType={'done'}
                                autoCorrect={false}
                                onInputChange={this.onUsernameChange}
                            />
                            <UserInput
                                source={passIcon}
                                placeholder='Password'
                                autoCapitalize={'none'}
                                returnKeyType={'done'}
                                autoCorrect={false}
                                onInputChange={this.onPasswordChange}
                                showPassword={true}
                            />
                        </CustomListItem>
                    ))
                }
            </List>
        );
    }
}

export default SettingsScreen;