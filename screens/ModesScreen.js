import React, { Component } from 'react';
<<<<<<< HEAD
import { View, Text, TouchableOpacity } from 'react-native';

const playlists = [
    {
        name: 'Piano',
        uri: 'idofhdifjif'
    },
    {
        name: 'Pop',
        uri: 'lslskfodifododoooo'
    }
]

const lightsInfo = [
    {
        name: 'test 1',
        bri: 100,
        hue: 0,
        sat: 255,
        isOn: true
    },
    {
        name: 'test 2',
        bri: 0,
        hue: 126,
        sat: 255,
        isOn: false
    },
    {
        name: 'test 3',
        bri: 200,
        hue: 255,
        sat: 255,
        isOn: true
    }
]

const mode = {
    playlist: 'Piano',
    lightsInfo,
    name: 'Reading'
}
=======
import { View, Text } from 'react-native';
import { List, ListItem, Button, Icon } from 'react-native-elements';
>>>>>>> cd8983d592833913c1259a71a0ee0293f686a5a3

class ModesScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
            title: 'Modes',
            headerRight: <Icon 
                            iconStyle={{ marginRight: 10 }}
                            size={40}
                            name='add' 
                            type='Content' 
                            color='#4891db'
                            onPress={this.onModeAdd}
                            />
        })


    state = {
        modes: [],
        playlists: null,
        editMode: false,
        activeItem: null
    }
    componentDidMount() {
        if (this.props.modes !== null)
            this.state.modes = this.props.modes;
        if (this.props.playlists !== null)
            this.state.playlists = this.props.playlists;
    }
    onModeChange = (i) => {
        //API mode        
        this.setState({ activeItem: i });
    }
    onModeEdit = (i) => {
         return navigation.navigate('manageModes', { Mode: this.state.modes[i] });
    }
    onModeAdd = () => {
        return navigation.navigate('manageModes', { playlists: this.state.playlists });
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
<<<<<<< HEAD
                <TouchableOpacity onPress={() => this.props.navigation.navigate('manageModes', { mode, playlists })}>
                    <Text style={{ fontSize: 20 }}>ModesScreen</Text>
                </TouchableOpacity>
=======
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
>>>>>>> cd8983d592833913c1259a71a0ee0293f686a5a3
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

