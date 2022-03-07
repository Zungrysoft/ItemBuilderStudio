import React,{useState} from 'react';
import Condition from '../components/Condition.js';

function FunctionalityPage() {
    const [structure, setStructure] = useState({
        id: 5,
        value:70,
        conditions:[
            {
                id: 6,
                value:71,
                conditions:[
                    {
                        id: 10,
                        value:78,
                        conditions: []
                    },
                    {
                        id: 10,
                        value:78,
                        conditions: []
                    }
                ],
            }
        ],
    });

    return (
        <Condition structure={structure} onChange={setStructure} depth={0}/>
    );
}

function command(structure) {

    //structure.
}

export default FunctionalityPage;
