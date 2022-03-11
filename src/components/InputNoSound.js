import '../App.css';
import InputCheckbox from './InputCheckbox.js';

import effectData from '../data/effects.json';

function InputSlot({ id, label, startValue, onChange }) {
    // Make sure the effect has sounds to cancel
    if ("has_sound" in effectData[id] && effectData[id].has_sound) {
        return (
            <InputCheckbox
                label={label}
                startValue={startValue}
                onChange={onChange}
            />
        )
    }

    // No sounds to cancel. Set nosound to false and return empty element
    if (startValue !== false) {
        onChange(false);
    }
    return <div/>
    
}

export default InputSlot;
