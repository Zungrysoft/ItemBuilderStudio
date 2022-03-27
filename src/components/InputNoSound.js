import '../App.css';
import InputCheckbox from './InputCheckbox.js';

import { getEffectData } from '../helpers/jsonData.js';

function InputSlot({ id, label, startValue, onChange }) {
    // Make sure the effect has sounds to cancel
    if ("has_sound" in getEffectData()[id] && getEffectData()[id].has_sound) {
        return (
            <InputCheckbox
                label={label}
                startValue={startValue}
                onChange={onChange}
            />
        )
    }
    return <div/>
    
}

export default InputSlot;
