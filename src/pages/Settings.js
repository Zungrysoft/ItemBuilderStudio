import InputList from '../components/InputList.js';

let versions = {
    "2.0": {
        "display":"Version 2.0 for Minecraft 1.18.2"
    },
    "2.1": {
        "display":"Version 2.1 for Minecraft 1.18.2"
    }
}

function SettingsPage({ data, onChange }) {
    return (
        <div>
            <InputList
                    label="Datapack Version"
                    startValue={data.version}
                    data={versions}
                    onChange={(val) => {
                        onChange({
                            ...data,
                            version: val
                        })
                    }}
                />
        </div>
    );
}

export default SettingsPage;
