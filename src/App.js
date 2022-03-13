import React,{useState} from 'react';
import './App.css';
import FunctionalityPage from './pages/Functionality.js';
import CommandOutput from './components/CommandOutput.js';
import Navbar from './components/Navbar.js';

let tabs = [
    {display:"Functionality",id:"functionality"},
    {display:"Display",id:"display"},
    {display:"Enchantments",id:"enchantments"},
]

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
            <Navbar
                tabs={tabs}
                startVal={page}
                onChange={setPage}
            />
            <header className="App-header">
                <div>
                    {/* Pages */}
                    {page=="functionality" ? 
                        <FunctionalityPage
                            data={data}
                            onChange={setData}
                        /> 
                    :<div/>}
                    <div className="command-output">
                        <CommandOutput
                            structure={data.structure}
                            id={data.itemId}
                            slot={data.slot}
                            includeGive={data.includeGive}
                        />
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
