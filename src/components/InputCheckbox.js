import '../App.css';

function InputCheckbox({ label, startValue, onChange }) {
    let rnum = Math.trunc(Math.random() * 524280);
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
