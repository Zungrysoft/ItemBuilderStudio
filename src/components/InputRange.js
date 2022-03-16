import '../App.css';

function amplifierNumeral(num) {
    if (num == 0) {return "I";}
    if (num == 1) {return "II";}
    if (num == 2) {return "III";}
    if (num == 3) {return "IV";}
    if (num == 4) {return "V";}
    if (num == 5) {return "VI";}
    if (num == 6) {return "VII";}
    if (num == 7) {return "VIII";}
    if (num == 8) {return "IX";}
    if (num == 9) {return "X";}
}

function InputSlot({ startValue, data, onChange, style }) {
    let optionList = [];

    // Make sure there is a min and max key
    if (!("min" in data && "max" in data)) {
        return <div/>
    }
    
    // Validate that min > max
    if (data.min > data.max) {
        return <div/>
    }

    // If the startValue is not between min and max, set it to be
    if (startValue < data.min || startValue > data.max) {
        onChange(data.min);
    }

    // Create option list from min and max
    for (let i = data.min; i <= data.max; i ++) {
        optionList.push(
            <option value={i}>
                {style == 1 ? amplifierNumeral(i) : i}
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
