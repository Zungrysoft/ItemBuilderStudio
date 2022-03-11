import React,{useState} from 'react';
import Condition from '../components/Condition.js';
import CommandOutput from '../components/CommandOutput.js';
import InputSlot from '../components/InputSlot.js';

function FunctionalityPage() {
    const [structure, setStructure] = useState({
        effects:[],
        conditions:[],
        filters:[],
    });
    const [itemId, setItemId] = useState("minecraft:iron_sword");
    const [slot, setSlot] = useState("ItemBuilderMainhand");
    const [includeGive, setIncludeGive] = useState(true);

    return (
        <div>
            <div className="entry">
                <p className="label">Item Id: </p>
                <input
                    className="input-box"
                    type="text"
                    defaultValue={"minecraft:iron_sword"}
                    onChange={(e) => {setItemId(e.target.value);}}
                />
                <input
                    className="input-checkbox"
                    type="checkbox"
                    checked={includeGive}
                    onChange={(e) => {setIncludeGive(e.target.checked);}}
                />
            </div>
            <InputSlot defaultValue="ItemBuilderMainhand" onChange={setSlot}/>
            <Condition type={1} structure={structure} onChange={setStructure} depth={0} context={0}/>
            <CommandOutput structure={structure} id={itemId} slot={slot} includeGive={includeGive}/>
        </div>
    );
}

export default FunctionalityPage;
