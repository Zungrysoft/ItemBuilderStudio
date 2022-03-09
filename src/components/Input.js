import '../App.css';
import effectData from '../public/data/effects.json';
import conditionData from '../public/data/conditions.json';
import filterData from '../public/data/filters.json';

function Input({ type, id, key, startValue, onChange }) {
    mode = null;
    display = null;

    let labelName = ""
    // Effects
    if (type == 0) {
        mode = effectData[id][key];
        display = effectData[id][key + "_display"];
        labelName = "Effect"
    }
    // Conditions
    else if (type == 1) {
        mode = conditionData[id][key];
        display = conditionData[id][key + "_display"];
        labelName = "Condition"
    }
    // Filters
    else if (type == 2) {
        mode = filterData[id][key];
        display = filterData[id][key + "_display"];
        labelName = "Filter"
    }

    let label = <p className="label">{labelName + ": "}</p>

    if (mode === "input") {
        return (
            <div>
                {label}
                <input
                    type="text"
                    defaultValue={startValue}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        );
    }

    // No data to enter
    return (
        <div/>
    );
}

export default Input;
