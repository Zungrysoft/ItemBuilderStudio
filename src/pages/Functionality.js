import React,{useState} from 'react';
import Condition from '../components/Condition.js';
import CommandOutput from '../components/CommandOutput.js';

function FunctionalityPage() {
    const [structure, setStructure] = useState({
        id: 5,
        value:70,
        effects:[],
        conditions:[
            {
                id: 6,
                value:71,
                effects:[],
                conditions:[
                    {
                        id: 10,
                        value:78,
                        effects:[],
                        conditions: [],
                        filters: [],
                    },
                    {
                        id: 10,
                        value:78,
                        effects:[],
                        conditions: [],
                        filters:[],
                    }
                ],
                filters:[],
            }
        ],
        filters:[],
    });

    return (
        <div>
            <Condition type={1} structure={structure} onChange={setStructure} depth={0}/>
            <CommandOutput structure={structure} id="minecraft:iron_sword" slot="ItemBuilderMainhand"/>
        </div>
    );
}

function command(structure) {

    //structure.
}

export default FunctionalityPage;
