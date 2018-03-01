import React from 'react';
import pureRender from 'pure-render-decorator';

import Slider from '../Common/Slider/Slider';
import Card from '../Common/Card/Card';
import CardHeader from '../Common/CardHeader/CardHeader';

function Heating ({
    item,
    onChange,
}) {
    return (
        <Card>
            <CardHeader
             label="Heating"
             icon={require('../../assets/icon_heat.png')}
             isEnabled={item.isEnabled}
             onChange={(newValue) => onChange(item.set('isEnabled', newValue))} />

            <Slider
             value={parseInt(item.value)}
             onChange={(newValue) => onChange(item.set('value', newValue))} />
        </Card>
    );
};

export default pureRender(Heating);
