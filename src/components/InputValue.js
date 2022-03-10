import '../App.css';
import InputId from './InputId.js';
import InputRange from './InputRange.js';

import effectData from '../data/effects.json';
import conditionData from '../data/conditions.json';
import filterData from '../data/filters.json';

function Input({ type, id, jsonKey, startValue, onChange }) {
    let mode = null
    let labelName = ""
    let data = null;

    // Effects
    if (type === 0) {
        data = effectData;
    }
    // Conditions
    else if (type === 1) {
        data = conditionData;
    }
    // Filters
    else if (type === 2) {
        data = filterData;
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

    console.log(mode)
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
