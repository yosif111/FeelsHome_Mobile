import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import axios from 'axios';

import config from './config'
const {URL, DB_URL} = config

export default class APIProvider extends Component {

    // ================================== Audio ================================== //

    // res.data = [{'name', 'uri'}]
    getPlaylists() {
        return axios.get(`${URL}/api/audio/playlists`)
                .then(res => {
                    return new Promise((resolve, reject) => {
                        resolve(res.data)
                    })     
                })
                .catch(error => {
                    console.log('Request Error => %O', error)
                });
    }

    // res.data = [{'track_name', 'track_length', 'track_uri', 'album_name', 'album_uri', 'artist', 'tlid'}]
    getQueue = () => {
        return axios.get(`${URL}/api/audio/getQueue`)
                .then(res => {
                    return new Promise((resolve, reject) => {
                        resolve(res.data)
                    }) 
                })
                .catch(error => {
                    console.log('Request Error => %O', error)
                });
    }

    // res.data = {'state', 'track', 'artist', 'album', 'volume'}
    getAllStatus = () => {
        return axios.get(`${URL}/api/audio/getAllStatus`)
                .then(res => {
                    return new Promise((resolve, reject) => {
                        resolve(res.data)
                    }) 
                })
                .catch(error => {
                    console.log('Request Error => %O', error)
                });
    }

    // res.data = {'track', 'album', 'artist'}
    getCurrentTrack = (id) => {
        console.log('getCurrentTrack (id) = ' + id);
        return axios.get(`${URL}/api/audio/getCurrentTrack`)
                return new Promise((resolve, reject) => {
                        resolve(res.data)
                    }) 
                .catch(error => {
                    console.log('Request Error => %O', error)
                });
    }

    // res.data = {'Msg'}
    play = (id) => {
        console.log('play (id) = ' + id);
        return axios.get(`${URL}/api/audio/play/${id}`)
                return new Promise((resolve, reject) => {
                        resolve(res.data)
                    }) 
                .catch(error => {
                    console.log('Request Error => %O', error)
                });
    }

    // res.data = {'Msg'}
    pause = () => {
        return axios.get(`${URL}/api/audio/pause`)
                return new Promise((resolve, reject) => {
                        resolve(res.data)
                    }) 
                .catch(error => {
                    console.log('Request Error => %O', error)
                });
    }

    // res.data = {'Msg'}
    resume = () => {
        return axios.get(`${URL}/api/audio/resume`)
                return new Promise((resolve, reject) => {
                        resolve(res.data)
                    }) 
                .catch(error => {
                    console.log('Request Error => %O', error)
                });
    }

    // res.data = {'Msg'}
    changeVolume = (volume) => {
        console.log('changeVolume (volume) = ' + volume);
        return axios.get(`${URL}/api/audio/changeVolume/${volume}`)
                return new Promise((resolve, reject) => {
                        resolve(res.data)
                    }) 
                .catch(error => {
                    console.log('Request Error => %O', error)
                });
    }

    // res.data = {'Msg'}
    changePlaylist = (uri) => {
        console.log('changePlaylist (uri) = ' + uri);
        return axios.get(`${URL}/api/audio/InsertPlaylistToQueue/${uri}`)
                return new Promise((resolve, reject) => {
                        resolve(res.data)
                    }) 
                .catch(error => {
                    console.log('Request Error => %O', error)
                });
    }

    // res.data = {'Msg'}
    getProgress = () => {
        return axios.get(`${URL}/api/audio/getProgress`)
            .then(res => {
                return new Promise((resolve, reject) => {
                        resolve(res.data)
                    }) 
            })
            .catch(error => {
                console.log('Request Error => %O', error)
            });
    }

    // res.data = 'image'
    getImage = (uri) => {
        return axios.get(`${URL}/api/audio/getImage/${uri}`)
            .then(res => {
                return new Promise((resolve, reject) => {
                        resolve(res.data)
                    }) 
            })
            .catch(error => {
                console.log('Request Error => %O', error)
            });
    }

        // ================================== Light ================================== //

    // res.data = lightsInfo[{}]
    getLights = () => {
        return axios.get(`${URL}/api/lights`)
        .then(res => {
            return new Promise((resolve, reject) => {
                        resolve(res.data)
                    }) 
        })
        .catch(error => {
            console.log(error);
        });
    }


        // ================================== Modes ================================== //

    // res.data = {}
    getModes = async () => {
        const token = 'Bearer ' + await AsyncStorage.getItem('token');
        console.log('(getModes) token = ' + token)
        const instance = axios.create({
            timeout: 3000,
            headers: { 'Authorization': token }
        });
        return instance.get(`${DB_URL}/api/modes`)
            .then(res => {
                return new Promise((resolve, reject) => {
                    resolve(res.data.Modes)
                }) 
            })
            .catch(error => {
                console.log(error);
            });
    }

    // res.data = {mode_id}
    addMode = async (mode) => {
        console.log('(addMode) mode = %O', mode)
        const token = 'Bearer ' + await AsyncStorage.getItem('token');
        const instance = axios.create({
            timeout: 3000,
            headers: { 'Authorization': token }
        });
        return instance.post(`${DB_URL}/api/modes/add`, mode)
            .then(res => {
                console.log('res = %O', res)
                return new Promise((resolve, reject) => {
                    if(res)
                        resolve(res.data)
                    else
                        reject('Rejected')
                    }) 
            })
            .catch((error) => {
                console.log(error.response);
            });
    }

    // res.data = {success}
    deleteMode = async (modeId) => {
        const token = 'Bearer ' + await AsyncStorage.getItem('token');
        const instance = axios.create({
            timeout: 3000,
            headers: { 'Authorization': token }
        });
        return instance.delete(`${DB_URL}/api/modes/delete/${modeId}`)
            .then(res => {
                return new Promise((resolve, reject) => {
                        resolve(res.data)
                    }) 
            })
            .catch(error => {
                console.log(error);
            });
    }

    // res.data = {mode} updated
    updateMode = async (mode) => {
        const token = 'Bearer ' + await AsyncStorage.getItem('token');
        const instance = axios.create({
            timeout: 3000,
            headers: { 'Authorization': token }
        });
        return instance.post(`${DB_URL}/api/modes/update`, mode)
            .then(res => {
                return new Promise((resolve, reject) => {
                    resolve(res.data.mode)
                }) 
            })
            .catch(error => {
                console.log(error);
            });
    }

        // ================================== Auth ================================== //

    // res.data = {user}
    register = (email, password, name) => {
        return axios.post(`${DB_URL}/api/register`, {email, password, name})
            .then(res => {
                return new Promise((resolve, reject) => {
                        resolve(res.data)
                    }) 
            })
            .catch(error => {
                console.log(error);
            });
    }

    // res.data = {token}
    login = (email, password) => {
        return axios.post(`${DB_URL}/api/login`, {email, password})
            .then(res => {
                return new Promise((resolve, reject) => {
                    resolve(res.data[0].token)
                }) 
            })
            .catch(error => {
                console.log(error);
            });
    }
}