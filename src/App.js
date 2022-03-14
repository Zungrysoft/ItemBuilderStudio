import React,{useState} from 'react';
import './App.css';

import FunctionalityPage from './pages/Functionality.js';
import DisplayPage from './pages/Display.js';
import AboutPage from './pages/About.js';

import CommandOutput from './components/CommandOutput.js';
import Navbar from './components/Navbar.js';

let tabs = [
    {display:"Functionality",id:"functionality"},
    {display:"Display",id:"display"},
    //{display:"Enchantments",id:"enchantments"},
    {display:"Info",id:"about"},
];

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
        name:{
            text: "",
            color: "ffffff",
            color2: "555555",
            colorMode: "single",
            bold: false,
            italic: false,
        },
        lore: "",
        color: "2c2f9e",
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
                    {page=="display" ? 
                        <DisplayPage
                            data={data}
                            onChange={setData}
                        /> 
                    :<div/>}
                    {page=="about" ? 
                        <AboutPage
                            data={data}
                            onChange={setData}
                        /> 
                    :<div/>}
                    <div className="command-output">
                        <CommandOutput
                            data={data}
                        />
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
