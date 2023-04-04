import '../App.css';

function InputList({ startValue, data, label, onChange, settings }) {
    let optionList = [];

    // Create option list from json data
    Object.keys(data).forEach(function(key, _) {
        // If this entry has a version_min, don't show it when older versions are selected
        if (!("version_min" in data[key]) || settings.version >= data[key].version_min) {
            optionList.push(
                <option value={key} key={key}>
                    {data[key].display}
                </option>
            );
        }
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
