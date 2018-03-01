import React from 'react';
import pureRender from 'pure-render-decorator';

import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
} from 'react-native';

// import Heating from './components/Heating/Heating';
// import AC from './components/AC/AC';
// import SofaLED from './components/SofaLED/SofaLED';
// import FloorLED from './components/FloorLED/FloorLED';

import styles from './styles';
const backgroundImage = require('./assets/background.png');

function getTemperatureString (temperature) {
    return parseFloat(temperature.temperature).toFixed(1);
}

function Home ({
    items,
    dispatch,
}) {
    return (
        <Image
         source={backgroundImage}
         style={styles.background}>
            <ScrollView>
                <View
                 style={styles.container}>

                    <Text
                     style={styles.temperatureText}>
                        {getTemperatureString(items.Temperature)} °C
                    </Text>

                    {/* <Heating
                     onChange={(newValue) => dispatch('Heating', newValue)}
                     item={items.Heating} />

                    <AC
                     onChange={(newValue) => dispatch('AC', newValue)}
                     item={items.AC} />

                    <FloorLED
                     onChange={(newValue) => dispatch('LedFloor', newValue)}
                     item={items.LedFloor} />

                    <SofaLED
                     onChange={(newValue) => dispatch('LedSofa', newValue)}
                     item={items.LedSofa}  /> */}

                </View>
            </ScrollView>
        </Image>
    );
}

export default pureRender(Home);
