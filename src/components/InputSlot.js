import '../App.css';
import slotData from '../data/slot_tags.json';

function InputSlot({ startValue, onChange }) {
    let data = slotData;
    let optionList = [];

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
            <p className="label">{"Activator Type: "}</p>
            <select value={startValue} onChange={(e) => onChange(e.target.value)}>
                {optionList}
            </select>
        </div>
    )
}

export default InputSlot;
