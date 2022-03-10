import '../App.css';
import effectData from '../data/effects.json';
import conditionData from '../data/conditions.json';
import filterData from '../data/filters.json';

function getCategory( type, id ) {
    if (0 <= id && id < 100) {return "Utility";}
    if (800 <= id && id < 900) {return "Logic";}

    if (type === 0) {
        if (100 <= id && id < 200) {return "Attributes";}
        if (200 <= id && id < 300) {return "Bonuses";}
        if (400 <= id && id < 500) {return "Item Modification";}
        if (500 <= id && id < 600) {return "Special Attacks";}
    }
    else if (type === 1) {
        if (100 <= id && id < 200) {return "Combat";}
        if (200 <= id && id < 300) {return "Actions";}
        if (300 <= id && id < 400) {return "Entity Data";}
        if (400 <= id && id < 500) {return "Item Data";}
    }
    else if (type === 2) {
        if (100 <= id && id < 200) {return "Contextual";}
    }

    return "Misc"
}

function InputId({ type, startValue, onChange }) {
    let data = {};
    let labelName = "";
    let options = [];
    let optionGroups = [];

    // Effects
    if (type === 0) {
        data = effectData;
        labelName = "Effect"
    }
    // Conditions
    else if (type === 1) {
        data = conditionData;
        labelName = "Condition"
    }
    // Filters
    else if (type === 2) {
        data = filterData;
        labelName = "Filter"
    }

    // Create option list from json data
    let prev = "";
    let curList = [];
    Object.keys(data).forEach(function(id, _) {
        // Whenever the category changes, form a new group from collected elements
        let category = getCategory(type, id);
        if (category != prev) {
            optionGroups.push(
                <optgroup label={prev}>
                    {curList}
                </optgroup>
            );
            curList = [];
            prev = category;
        }
        curList.push(
            <option value={id}>
                {data[id].display}
            </option>
        )
    });
    // Collect remaining elements at the end
    optionGroups.push(
        <optgroup label={prev}>
            {curList}
        </optgroup>
    );
    // This method inserts an unwanted first group. This line removes it.
    optionGroups = optionGroups.splice(1);

    return (
        <div>
            <p className="condition-label">{labelName + ": "}</p>
            <select className="input-item" value={startValue} onChange={(e) => onChange(e.target.value)}>
                {optionGroups}
            </select>
        </div>
    )
}

export default InputId;
