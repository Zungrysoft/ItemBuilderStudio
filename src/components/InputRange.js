import '../App.css';

function InputSlot({ startValue, data, onChange }) {
    let optionList = [];

    // Make sure there is a min and max key
    if (!("min" in data && "max" in data)) {
        return <div/>
    }

    // Create option list from min and max
    for (let i = data.min; i <= data.max; i ++) {
        optionList.push(
            <option value={i}>
                {i}
            </option>
        );
    }

    return (
        <div>
            <select className="input-item" value={startValue} onChange={(e) => onChange(e.target.value)}>
                {optionList}
            </select>
        </div>
    )
}

export default InputSlot;
