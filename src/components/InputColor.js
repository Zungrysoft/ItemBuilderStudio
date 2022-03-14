import '../App.css';
import { hexFormat } from '../helpers/color.js'

function InputColor({ label, startValue, onChange }) {
    return (
        <div>
            <p className="label">{label + ": "}</p>
            <input
                className="input-box"
                type="color"
                value={hexFormat(startValue)}
                onChange={(e) => onChange(e.target.value)}
            />
            <input
                className="input-item"
                type="text"
                value={startValue}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

export default InputColor;
