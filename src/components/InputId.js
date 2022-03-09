import '../App.css';
import effectData from '../data/effects.json';
import conditionData from '../data/conditions.json';
import filterData from '../data/filters.json';

function InputId({ type, startValue, onChange }) {
    let data = {};
    let labelName = "";
    let optionList = [];

    // Effects
    if (type == 0) {
        data = effectData;
        labelName = "Effect"
    }
    // Conditions
    else if (type == 1) {
        data = conditionData;
        labelName = "Condition"
    }
    // Filters
    else if (type == 2) {
        data = filterData;
        labelName = "Filter"
    }

    // Create option list from json data
    Object.keys(data).forEach(function(key, _) {
        optionList.push(
            <option value={key}>
                {data[key].display}
            </option>
        );
    });

    return (
        <div>
            <p className="condition-label">{labelName + ": "}</p>
            <select value={startValue} onChange={(e) => onChange(e.target.value)}>
                {optionList}
            </select>
        </div>
    )
}

export default InputId;
