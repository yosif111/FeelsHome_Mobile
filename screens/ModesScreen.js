import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { List, ListItem, Button, Icon } from 'react-native-elements';

let params = {};

class ModesScreen extends Component {
    state = {
        modes: [],
        playlists: [],
        editMode: false,
        activeItem: 0
    }

    static navigationOptions = ({ navigation }) => ({
            title: 'Modes',
            headerRight: <Icon 
                            iconStyle={{ marginRight: 10 }}
                            size={40}
                            name='add' 
                            type='Content' 
                            color='#4891db'
                            onPress={() => navigation.navigate('manageModes', params)}
                            />
        })
    
    componentDidMount() {
        this.setState({
            modes: this.props.navigation.getParam('modes', []),
            playlists: this.props.navigation.getParam('playlists', [])
        })
        params = {
            playlists: this.props.navigation.getParam('playlists', []),
            numberOfBulbs: 3
        }
    }

    onModeChange = (i) => {
        //API mode        
        this.setState({ activeItem: i });
    }

    onModeEdit = (i) => {
        this.props.navigation.navigate('manageModes', { 
            mode: this.state.modes[i], 
            playlists: this.state.playlists
        });
    }

    renderButton() {
        if (this.state.modes.length === 0)
            return null;

        if (!this.state.editMode) {
            return (   
            <View style={styles.buttonStyle}>
                <Button
                    title='Edit'
                    raised
                    borderRadius={5}
                    backgroundColor='#4891db'
                    fontSize={22}
                    onPress={() => this.setState({ editMode: true })}    
                />
            </View>
           );
        }
        return (  
            <View style={styles.buttonStyle}> 
                <Button
                    title='Done'
                    raised
                    borderRadius={5}
                    backgroundColor={'#aaa'}
                    fontSize={22}
                    onPress={() => this.setState({ editMode: false })}    
                />
            </View>
       );
    }

    renderRow() {
        if (this.state.modes.length === 0) {
            return ( 
                 <ListItem
                    hideChevron
                    titleStyle={{ fontSize: 18, color: '#aaa' }}
                    title={'Please Add Modes '}
                    />
                    );
                }

        if (!this.state.editMode) {
            return this.state.modes.map((item, i) => (
            <ListItem
                titleStyle={{ fontSize: 20 }}
                key={i}
                title={item.name}
                rightIcon={i === this.state.activeItem ? { name: 'check-circle', type: 'Action', color: '#4891db' } : {}}
                hideChevron={i !== this.state.activeItem}
                onPress={() => this.onModeChange(i)}
            />
            ));
            } 
            return this.state.modes.map((item, i) => (
                <ListItem
                    titleStyle={{ fontSize: 20 }}
                    key={i}
                    title={item.name}
                    rightIcon={{ name: 'edit', type: 'Image', color: '#4891db' }}
                    onPress={() => this.onModeEdit(i)}
                />
            ));
    }

    
    render() {
        return (
            <View>
                <View style={styles.textContainerStyle}>
                    <Text style={{ fontSize: 20, color: '#000000' }}>Select Mode</Text>
                </View>
            
                <View>
                    <List
                        containerStyle={styles.listStyle}
                    >
                    {
                    this.renderRow()
                    }
                    </List>
                </View>
                    {
                    this.renderButton()
                    }  
            </View>
        );
    }
}

const styles = {
    listStyle: {
        marginTop: 5
    },
    textContainerStyle: {
        marginLeft: 8,
        marginTop: 8
    },
    buttonStyle: {
        margin: 20
    }
};

export default ModesScreen;

