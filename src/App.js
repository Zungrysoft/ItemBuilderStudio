import React,{useState} from 'react';
import './App.css';
import FunctionalityPage from './pages/Functionality.js';
import CommandOutput from './components/CommandOutput.js';

function App() {
    const [page, setPage] = useState("functionality")
    const [data, setData] = useState({
        structure: {
            effects:[],
            conditions:[],
            filters:[],
        },
        itemId: "minecraft:iron_sword",
        slot: "ItemBuilderMainhand",
        includeGive: true,
    })
    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <FunctionalityPage
                        data={data}
                        onChange={setData}
                    />
                    <CommandOutput
                        structure={data.structure}
                        id={data.itemId}
                        slot={data.slot}
                        includeGive={data.includeGive}
                    />
                </div>
            </header>
        </div>
    );
}

export default App;
