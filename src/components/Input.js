import '../App.css';

function Input({ type, index, startValue, eventUpdate }) {
    // Effects
    if (type == 0) {
        
    }

    return (
        <input
            type="text"
            defaultValue={startValue}
            onChange={(e) => eventUpdate(e.target.value)}
        />
    );
}

export default InputBox;
