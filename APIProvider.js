import axios from 'axios';

import URL from './config';

export default class APIProvider {

    // res.data = [{'name', 'uri'}]
    getPlaylists() {
        return axios.get(`${URL}/api/audio/playlists`)
                .then(res => {
                    return res.data;    
                })
                .catch(error => {
                    console.log('Request Error => %O', error)
                });
    }

    // res.data = [{'track_name', 'track_length', 'track_uri', 'album_name', 'album_uri', 'artist', 'tlid'}]
    getQueue = () => {
        return axios.get(`${URL}/api/audio/getQueue`)
                .then(res => {
                    return res.data;
                })
                .catch(error => {
                    console.log('Request Error => %O', error)
                });
    }

    // res.data = [{'state', 'track', 'artist', 'album', 'volume'}]
    getAllStatus = () => {
        return axios.get(`${URL}/api/audio/getAllStatus`)
                .then(res => {
                    return res.data;
                })
                .catch(error => {
                    console.log('Request Error => %O', error)
                });
    }

    // res.data = {'track', 'album', 'artist'}
    getCurrentTrack = (id) => {
        console.log('getCurrentTrack (id) = ' + id);
        return axios.get(`${URL}/api/audio/getCurrentTrack`)
                .then(res => {
                    return res.data;
                })
                .catch(error => {
                    console.log('Request Error => %O', error)
                });
    }

    // res.data = {'Msg'}
    play = (id) => {
        console.log('play (id) = ' + id);
        return axios.get(`${URL}/api/audio/play/${id}`)
                .then(res => {
                    return res.data;
                })
                .catch(error => {
                    console.log('Request Error => %O', error)
                });
    }

    // res.data = {'Msg'}
    pause = () => {
        return axios.get(`${URL}/api/audio/pause`)
                .then(res => {
                    return res.data;
                })
                .catch(error => {
                    console.log('Request Error => %O', error)
                });
    }

    // res.data = {'Msg'}
    resume = () => {
        return axios.get(`${URL}/api/audio/resume`)
                .then(res => {
                    return res.data;
                })
                .catch(error => {
                    console.log('Request Error => %O', error)
                });
    }

    // res.data = {'Msg'}
    changeVolume = (volume) => {
        console.log('changeVolume (volume) = ' + volume);
        return axios.get(`${URL}/api/audio/changeVolume/${volume}`)
                .then(res => {
                    return res.data;
                })
                .catch(error => {
                    console.log('Request Error => %O', error)
                });
    }

    // res.data = {'Msg'}
    changePlaylist = (uri) => {
        console.log('changePlaylist (uri) = ' + uri);
        return axios.get(`${URL}/api/audio/InsertPlaylistToQueue/${uri}`)
                .then(res => {
                    return res.data;
                })
                .catch(error => {
                    console.log('Request Error => %O', error)
                });
    }


}