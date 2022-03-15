import '../App.css';
import InputId from './InputId.js';
import InputRange from './InputRange.js';
import InputCheckbox from './InputCheckbox.js';

import { getEffectData, getConditionData, getFilterData } from '../helpers/jsonData.js';

function Input({ type, id, jsonKey, startValue, onChange }) {
    let mode = null
    let labelName = ""
    let data = null;

    // Effects
    if (type === 0) {
        data = getEffectData();
    }
    // Conditions
    else if (type === 1) {
        data = getConditionData();
    }
    // Filters
    else if (type === 2) {
        data = getFilterData();
    }
    else {
        return <div/>
    }

    // If this id is not in the json table, just exit
    if ( !(id in data) ) {
        return <div/>
    }

    // If there is no data for this key, exit out
    if ( !((jsonKey + "_mode") in data[id]) || !((jsonKey + "_display") in data[id])) {
        // Also set this input's value to 0, so it doesn't show up in the final command
        if (startValue != 0) {
            onChange(0);
        }
        return <div/>
    }

    // Pull out data
    mode = data[id][jsonKey + "_mode"]
    labelName = data[id][jsonKey + "_display"]

    // Build label object
    let label = <p className="condition-label">{labelName + ": "}</p>
    
    if (mode === "input") {
        return (
            <div>
                {label}
                <input
                    className="input-item"
                    type="text"
                    defaultValue={startValue}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        );
    }
    else if (mode === "value_range") {
        return (
            <div>
                {label}
                <InputRange
                    startValue={startValue}
                    data={data[id]}
                    onChange={onChange}
                />
            </div>
        );
    }
    else if (mode === "value_range_amp") {
        return (
            <div>
                {label}
                <InputRange
                    startValue={startValue}
                    data={data[id]}
                    onChange={onChange}
                    style={1}
                />
            </div>
        );
    }
    else if (mode === "checkbox") {
        return (
            <div>
                <InputCheckbox
                    label={labelName}
                    startValue={startValue}
                    onChange={onChange}
                />
            </div>
        );
    }
    else {
        return (
            <div>
                {label}
                <InputId
                    type={mode}
                    startValue={startValue}
                    onChange={onChange}
                />
            </div>
        );
    }
}

export default Input;
