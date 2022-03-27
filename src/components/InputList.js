import '../App.css';

function InputList({ startValue, data, label, onChange }) {
    let optionList = [];

    // Create option list from json data
    Object.keys(data).forEach(function(key, _) {
        optionList.push(
            <option value={key} key={key}>
                {data[key].display}
            </option>
        );
    });

    return (
        <div>
            <p className="label">{label + ": "}</p>
            <select value={startValue} onChange={(e) => onChange(e.target.value)}>
                {optionList}
            </select>
        </div>
    )
}

export default InputList;
