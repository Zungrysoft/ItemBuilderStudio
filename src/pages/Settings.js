import InputCheckbox from '../components/InputCheckbox.js';
import InputList from '../components/InputList.js';
import versions from '../data/versions.json';

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
            <InputCheckbox
                label="Show User-Defined"
                startValue={data.userDefinedEnabled}
                onChange={(val) => {
                    onChange({
                        ...data,
                        userDefinedEnabled: val
                    })
                }}
            />
        </div>
    );
}

export default SettingsPage;
