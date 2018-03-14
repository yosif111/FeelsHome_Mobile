import { self } from 'react-native-threads';
import api from './APIProvider';

// const api = new APIProvider();
const i = 1;

self.onmessage = (message) => {
    while(i > 0){
        console.log('test');
        i--;
    }
    // setTimeout(async () => {
    //     let progress = await api.getProgress();
    //     self.postMessage(progress);
    // }, 1000);
    self.postMessage(message);
}
