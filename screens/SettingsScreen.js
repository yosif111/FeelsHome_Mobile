import React, { Component } from 'react';
import { View, Text, WebView } from 'react-native';

class SettingsScreen extends Component {
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