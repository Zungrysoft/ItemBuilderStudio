import '../App.css';

function InputBox({ startValue, eventUpdate }) {
    return (
        <input
            type="text"
            defaultValue={startValue}
            onChange={(e) => eventUpdate(e.target.value)}
        />
    );
}

export default InputBox;
