import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  AsyncStorage,
  Picker
} from "react-native";
import { Button } from "react-native-elements";
// import Picker from 'react-native-picker';
import * as Progress from "react-native-progress";

import URL from "../config";
import APIProvider from "../APIProvider";
import CustomAudioControl from "./Common/CustomAudioControl";
import { Thread } from "react-native-threads";

const api = new APIProvider();

const DEFAULT_IMAGE = require("../assets/icon_music.jpg");

export default class AudioControl extends Component {
  state = {
    image: DEFAULT_IMAGE,
    playlists: [],
    queue: [],
    currentPlaylist: "",
    currentTrack: "",
    currentArtist: "",
    currentAlbum: "",
    progress: 0,
    volume: 0,
    playerState: "stopped",
    index: 0,
    currentTrackLength: 0,
    showPicker: false
  };

  progressThread = null;

    async componentDidMount() {
        let playlists = await api.getPlaylists();
        let queue = await api.getQueue();
        let status = await api.getAllStatus();
        console.log('playlists = %O', playlists);
        console.log('queue = %O', queue);
        console.log('status = %O', status);
        // try {
        //     let value = await AsyncStorage.getItem('currentPlaylist');
        //     if (value !== null) {
        //         this.setState({ currentPlaylist: value });
        //     }
        //     else {
        //         this.state.currentPlaylist = (playlists != null) && (playlists != 'undefined') ?
        //         playlists[0].name : 'Select Playlist';
        //     }
        // } catch (error) {
        //     console.log('AsyncStorage error = ' + error);
        // }
        if (status != 'undefined' && status.state == 'playing') {
            this.startThread();
        }
        this.setState({ 
            playlists, 
            queue,
            currentTrack: (status.track != 'undefined') && (status.track != null) ? status.track : '',
            currentAlbum: (status.album != 'undefined') && (status.album != null) ? status.album : '',
            currentArtist: (status.artist != 'undefined') && (status.artist != null) ? status.artist : '',
            volume: (status.volume != 'undefined') && (status.volume != null) ? status.volume : 0,
            playerState: (status.state != 'undefined') && (status.state != null) ? status.state : 'stopped',
            index: (status.index != 'undefined') && (status.index != null) ? status.index : 0,
            progress: (status.progress != 'undefined') && (status.progress != null) ? status.progress : 0,
            currentTrackLength: (queue.length > 0) && (status.index != null) ? parseInt(queue[status.index].track_length / 1000) : 0,
            image: (status.image != 'undefined' && status.image != null) ?
            { uri: 'http:' + status.image } : DEFAULT_IMAGE
        });
        if (status.index == null || status.image == null) {
            let status = await api.getAllStatus();
            this.setState({
                index: (status.index != 'undefined') && (status.index != null) ? status.index : 0,
                image: (status.image != 'undefined' && status.image != null) ?
                { uri: 'http:' + status.image } : DEFAULT_IMAGE,
                currentTrackLength: (queue.length > 0) && (status.index != null) ? parseInt(queue[status.index].track_length / 1000) : 0
            });
        }
    }
  
  componentWillUnmount() {
    this.killThread();
  }

  startThread = () => {
    if (this.progressThread != null) return;
    this.progressThread = new Thread("../progress.thread.js");
    this.progressThread.onmessage = progress => {
      progress /= 1000;
      progress = parseInt(progress);
      this.setState({ progress });
    };
  };

  killThread = () => {
    if (this.progressThread == null) return;
    this.progressThread.terminate();
    this.progressThread = null;
  };

  loadTrack = async index => {
    const track = this.state.queue[index];
    this.setState({
      currentTrack: track.track_name,
      currentAlbum: track.album_name,
      currentArtist: track.artist,
      image: DEFAULT_IMAGE,
      progress: 0
    });
    let image = await api.getImage(
      this.state.queue[this.state.index].track_uri
    );
    this.setState({ image: { uri: "http:" + image } });
  };

  onPreviousPress = async () => {
    if (this.state.queue.length == 0) return;
    this.state.index =
      this.state.index - 1 < 0
        ? this.state.queue.length - 1
        : this.state.index - 1;
    await api.play(this.state.queue[this.state.index].tlid);
    this.startThread();
    this.loadTrack(this.state.index);
    this.setState({ playerState: "playing" });
  };

  onNextPress = async () => {
    if (this.state.queue.length == 0) return;
    this.state.index = (this.state.index + 1) % this.state.queue.length;
    await api.play(this.state.queue[this.state.index].tlid);
    this.startThread();
    this.loadTrack(this.state.index);
    this.setState({ playerState: "playing" });
  };

  onPausePress = () => {
    this.killThread();
    if (this.state.queue.length == 0) return;
    api.pause();
    this.setState({ playerState: "paused" });
  };

  onPlayPress = () => {
    if (this.state.queue.length == 0) return;
    this.startThread();
    if (this.state.playerState == "paused") api.resume();
    else {
      api.play(this.state.queue[this.state.index].tlid);
      this.loadTrack(this.state.index);
    }
    this.setState({ playerState: "playing" });
  };

  onVolumeChange = value => {
    api.changeVolume(value);
    this.setState({ volume: value });
  };

  renderImage = () => {
    return (
      <View
        style={{ width: "100%", height: 200, marginTop: 10, marginBottom: 10 }}
      >
        <Image
          resizeMode="center"
          style={{ width: "100%", height: "100%" }}
          source={this.state.image}
        />
      </View>
    );
  };

  onPlaylistChange = async value => {
    let playlist = this.state.playlists.find(element => {
      return element.name == value;
    });
    await api.changePlaylist(playlist.uri);
    let queue = await api.getQueue();
    this.setState({
      currentPlaylist: value,
      playerState: "stopped",
      queue,
      index: 0
    });
    this.loadTrack(0);
    AsyncStorage.setItem("currentPlaylist", value);
    this.setState({showPicker: false});
  };

  getPlaylistNames = () => {
    let result = [];
    if (this.state.playlists.length > 0) {
      this.state.playlists.map(item => {
        result.push(item.name);
      });
    } else {
      result.push("No items");
    }
    return result;
  };

  showPicker = () => {
    //   const values = this.getPlaylistNames();
    const values = ['1','2'];
    return (
      <Picker
      enabled={this.state.showPicker}
        selectedValue={this.state.currentPlaylist}
        onValueChange={(itemValue, itemIndex) =>
            this.onPlaylistChange(itemValue.toString())
        }
      >
        {values.map((item, index) => {
            return <Picker.Item label={item} value={item} key={index} />
        })}

      </Picker>
    );
    // Picker.init({
    //     pickerData: [this.getPlaylistNames()],
    //     selectedValue: [this.state.currentPlaylist],
    //     pickerConfirmBtnText: 'Select',
    //     pickerTitleText: 'Select Playlist',
    //     pickerCancelBtnText: 'Cancel',
    //     pickerConfirmBtnColor: [179, 55, 113, 1],
    //     pickerCancelBtnColor: [179, 55, 113, 1],
    //     onPickerConfirm: data => {
    //         console.log(data);
    //         this.onPlaylistChange(data.toString());
    //     },
    //     onPickerCancel: data => {
    //         console.log(data);
    //     },
    //     onPickerSelect: data => {
    //         console.log(data);
    //     }
    // });
    // Picker.show();
  };

  renderPicker = () => {
      if( ! this.state.showPicker )
    return (
      <View>
        <Button
          raised
          icon={{ name: "playlist", type: "simple-line-icon" }}
          title={
            this.state.currentPlaylist == ""
              ? "Select Playlist"
              : this.state.currentPlaylist
          }
          onPress={() => this.setState({ showPicker: !this.state.showPicker})}
          buttonStyle={{ backgroundColor: "rgb(83,45,62)", height: 40 }}
        />
      </View>
    );
    const values = ['1','2'];
    return (
        <Picker
        enabled={this.state.showPicker}
          selectedValue={this.state.currentPlaylist}
          onValueChange={(itemValue, itemIndex) =>
              this.onPlaylistChange(itemValue.toString())
          }
        >
          {values.map((item, index) => {
              return <Picker.Item label={item} value={item} key={index} />
          })}
  
        </Picker>
    );
  };

  getTrackLength = () => {
    if (this.state.queue.length > 0) {
      const sec = this.state.queue[this.state.index].track_length / 1000;
      const min = parseInt(sec / 60);
      return min % 60 + ":" + (sec % 60 < 10 ? "0" + sec % 60 : sec % 60);
    }
    return "00:00";
  };

  renderProgressBar = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 20,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={{ marginRight: 5, fontSize: 12 }}>
          {parseInt((this.state.progress / 60) % 60)}
          :
          {this.state.progress % 60 < 10
            ? "0" + this.state.progress % 60
            : this.state.progress % 60}
        </Text>
        <Progress.Bar
          progress={
            this.state.progress /
            (this.state.currentTrackLength > 0
              ? this.state.currentTrackLength
              : 1)
          }
          width={200}
        />
        <Text style={{ marginLeft: 5, fontSize: 12 }}>
          {this.getTrackLength()}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View>
        {this.renderPicker()}
        {this.renderImage()}
        {this.renderProgressBar()}
        <CustomAudioControl
          trackName={this.state.currentTrack}
          album={this.state.currentAlbum}
          artist={this.state.currentArtist}
          volume={this.state.volume}
          playerState={this.state.playerState}
          onVolumeChange={this.onVolumeChange}
          onNextPress={this.onNextPress}
          onPreviousPress={this.onPreviousPress}
          onPausePress={this.onPausePress}
          onPlayPress={this.onPlayPress}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  trackStyle: {
    borderRadius: 10
  },
  container: {
    padding: 0,
    flexDirection: "row",
    flex: 1,
    marginTop: 5,
    marginBottom: 5
  }
});
