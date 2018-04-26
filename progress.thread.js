import { self } from 'react-native-threads';
import axios from 'axios';

import {URL} from './config';

setInterval( () => {
    axios.get(`${URL}/api/audio/getProgress`)
        .then(res => {
            self.postMessage(res.data + '');
        })
        .catch(error => {
            console.log('Request Error => %O', error);
        });
}, 500);
