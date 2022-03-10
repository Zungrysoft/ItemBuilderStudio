import '../App.css';
import effectData from '../data/effects.json';
import conditionData from '../data/conditions.json';
import filterData from '../data/filters.json';

import loadableData from '../data/loadables.json';
import soundData from '../data/sounds.json';
import rangeData from '../data/ranges.json';
import slotData from '../data/slots.json';
import mobTypeData from '../data/mob_types.json';
import durationData from '../data/durations.json';
import resourceData from '../data/resources.json';

function getCategory( type, id ) {
    if (0 <= id && id < 100) {return "Utility";}
    if (800 <= id && id < 900) {return "Logic";}

    if (type === 0) {
        if (100 <= id && id < 200) {return "Attributes";}
        if (200 <= id && id < 300) {return "Bonuses";}
        if (300 <= id && id < 350) {return "Passive Potion Effects";}
        if (350 <= id && id < 400) {return "Cleanse Potion Effects";}
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
    else if (type === "sound") {
        if (100 <= id && id < 200) {return "Passive";}
        if (200 <= id && id < 300) {return "Instant";}
        if (300 <= id && id < 400) {return "Attack";}
    }

    return "Misc"
}

function InputId({ type, startValue, onChange }) {
    let data = {};
    let labelName = "";
    let options = [];
    let optionGroups = [];
    let useCategories = false;

    // Effects
    if (type === 0) {
        data = effectData;
        labelName = "Effect";
        useCategories = true;
    }
    // Conditions
    else if (type === 1) {
        data = conditionData;
        labelName = "Condition";
        useCategories = true;
    }
    // Filters
    else if (type === 2) {
        data = filterData;
        labelName = "Filter";
        useCategories = true;
    }
    // Other dropdowns
    else if (type === "loadable") {
        data = loadableData;
    }
    else if (type === "sound") {
        data = soundData;
        useCategories = true;
    }
    else if (type === "range") {
        data = rangeData;
    }
    else if (type === "slot") {
        data = slotData;
    }
    else if (type === "mob_type") {
        data = mobTypeData;
    }
    else if (type === "duration") {
        data = durationData;
    }
    else if (type === "resource") {
        data = resourceData;
    }
    else {
        return <div/>
    }

    // If the current value is not within the list, set it to something in the list
    if (!(startValue in data)) {
        if (Object.keys(data).length > 0) {
            onChange(Object.keys(data)[0]);
        }
    }

    // Create option list from json data
    let prev = "";
    let curList = [];
    Object.keys(data).forEach(function(id, _) {
        // Whenever the category changes, form a new group from collected elements
        if (useCategories) {
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
        }
        // Determine the label for the option
        let labelName = data[id].display;
        // Add asterisk if this is an instant condition
        if ("instant" in data[id] && data[id].instant == true) {
            labelName = "*" + labelName;
        }
        curList.push(
            <option value={id}>
                {labelName}
            </option>
        )
    });
    
    if (useCategories) {
        // Collect remaining elements at the end
        optionGroups.push(
            <optgroup label={prev}>
                {curList}
            </optgroup>
        );
        // This method inserts an unwanted first group. This line removes it.
        optionGroups = optionGroups.splice(1);
    }
    else {
        // Bypasses option grouping by setting the optionGroups list equal to the options list
        optionGroups = curList;
    }

    return (
        <div>
            {labelName == "" ? <div/> : <p className="condition-label">{labelName + ": "}</p>}
            <select className="input-item" value={startValue} onChange={(e) => onChange(e.target.value)}>
                {optionGroups}
            </select>
        </div>
    )
}

export default InputId;
