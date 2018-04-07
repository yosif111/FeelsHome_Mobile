import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import Collapsible from 'react-native-collapsible';

export default class CustomListItem extends Component {
    state = { isCollapsed: true };

    onPress = () => {
        this.setState({ isCollapsed: !this.state.isCollapsed });
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.onPress()} >
                <View style={styles.container} >
                    <ListItem 
                        title={this.props.title}
                        leftIcon={this.props.icon}
                    /> 
                    <View style={styles.body} >
                        <Collapsible
                            collapsed={this.state.isCollapsed}
                            duration={500}
                        >
                            {this.props.children}
                        </Collapsible>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

}

const styles = {
    body: {
        backgroundColor: '#444'
    }
};
