import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';

export default class Logo extends Component {
    // Props:
    //     size: (large) or (small)
    //     img: image source
    //     title: title text

    render() {
        return (
            <View style={styles.container}>
                <Image 
                    source={this.props.img} 
                    style={this.props.size === 'small' ? styles.SImage : styles.LImage} 
                />
                <Text style={styles.text}>{this.props.title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    LImage: {
        width: 80,
        height: 80,
    },
    SImage: {
        width: 40,
        height: 40,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        marginTop: 20,
    }
});