import '../App.css';

function InputCheckbox({ label, startValue, onChange }) {
    let rnum = Math.trunc(Math.random() * 524280);

    // If the startValue is not 1 or 0, set it to be
    if (startValue !== 0 && startValue !== 1) {
        onChange(0);
    }

    return (
        <div>
            <label className="condition-label" for={"label_" + rnum}>{label + ": "}</label>
            <input
                className="input-checkbox"
                type="checkbox"
                id={"label_" + rnum}
                checked={startValue}
                onChange={(e) => {onChange(e.target.checked ? 1 : 0)}}
            />
            
        </div>
    )
}

export default InputCheckbox;
