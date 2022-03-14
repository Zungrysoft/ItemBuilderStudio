import Checkbox from '../components/Checkbox.js';
import InputList from '../components/InputList.js';
import InputColor from '../components/InputColor.js';

let colorModes = {
    "single":{
        display:"Single Color",
    },
    "gradient":{
        display:"Gradient",
    },
    "metallic":{
        display:"Metallic",
    },
    "alternating":{
        display:"Alternating",
    },
    "capitalized":{
        display:"Capitalized",
    },
};

function DisplayPage({ data, onChange }) {
    return (
        <div>
            <div>
                <p className="label">Name: </p>
                <input
                    className="input-box"
                    type="text"
                    defaultValue={data.name.text}
                    onChange={(e) => {
                        onChange({
                            ...data,
                            name: {
                                ...data.name,
                                text: e.target.value,
                            }
                        })
                    }}
                />
                <Checkbox
                    label="Bold"
                    startValue={data.name.bold}
                    onChange={(val) => {
                        onChange({
                            ...data,
                            name: {
                                ...data.name,
                                bold: val,
                            }
                        })
                    }}
                />
                <Checkbox
                    label="Italic"
                    startValue={data.name.italic}
                    onChange={(val) => {
                        onChange({
                            ...data,
                            name: {
                                ...data.name,
                                italic: val,
                            }
                        })
                    }}
                />
                <InputList
                    label="Name Color Mode"
                    startValue={data.name.colorMode}
                    data={colorModes}
                    onChange={(val) => {
                        onChange({
                            ...data,
                            name: {
                                ...data.name,
                                colorMode: val,
                            }
                        })
                    }}
                />
                <InputColor
                    label="Color"
                    startValue={data.name.color}
                    onChange={(val) => {
                        onChange({
                            ...data,
                            name: {
                                ...data.name,
                                color: val,
                            }
                        })
                    }}
                />
                <InputColor
                    label="Alt Color"
                    startValue={data.name.color2}
                    onChange={(val) => {
                        onChange({
                            ...data,
                            name: {
                                ...data.name,
                                color2: val,
                            }
                        })
                    }}
                />
            </div>
            <p className="label">Lore: </p>
            <input
                className="input-box"
                type="text"
                defaultValue={data.lore}
                onChange={(e) => {
                    onChange({
                        ...data,
                        lore: e.target.value,
                    })
                }}
            />
            <InputColor
                label="Leather Color"
                startValue={data.color}
                onChange={(val) => {
                    onChange({
                        ...data,
                        color: val,
                    })
                }}
            />
        </div>
    );
}

export default DisplayPage;
