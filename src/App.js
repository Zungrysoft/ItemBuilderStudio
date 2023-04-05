import React,{useState} from 'react';
import './App.css';

import FunctionalityPage from './pages/Functionality.js';
import DisplayPage from './pages/Display.js';
import EnchantmentsPage from './pages/Enchantments.js';
import StoragePage from './pages/Storage.js';
import SettingsPage from './pages/Settings.js';
import AboutPage from './pages/About.js';

import CommandOutput from './components/CommandOutput.js';
import Navbar from './components/Navbar.js';
import JokeOverlay from './components/JokeOverlay.js';

let tabs = [
    {display:"Functionality",id:"functionality"},
    {display:"Display",id:"display"},
    {display:"Enchantments",id:"enchantments"},
    {display:"Saved",id:"storage"},
    {display:"Settings",id:"settings"},
    {display:"Info",id:"about"},
];

function getStoredSettings() {
    let FAILCASE = {
        version: 2.1,
        userDefinedEnabled: false,
    }
    try {
        let ret = JSON.parse(localStorage.getItem("settings"))
        if (!ret) {
            ret = FAILCASE
        }
        return ret
    }
    catch (e) {
        return FAILCASE
    }
}

function App() {
    const [page, setPage] = useState("functionality");
    const [settings, setSettings] = useState(getStoredSettings());
    const [data, setData] = useState({
        structure: {
            effects:[],
            conditions:[],
            filters:[],
        },
        itemId: "minecraft:iron_sword",
        slot: "ItemBuilderMainhand",
        includeGive: true,
        name: {
            text: "",
            color: "ffffff",
            color2: "555555",
            color3: "fc03db",
            colorMode: "single",
            bold: false,
            italic: false,
        },
        lore: {
            upsides: "",
            downsides: "",
            lore: "",
        },
        model: {
            color: "2c2f9e",
            colorEnabled: false,
            customModelData: 0,
        },
        enchantments:[],
    });
    return (
        <div className="App">
            <JokeOverlay/>
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
                            settings={settings}
                        />
                    :<div/>}
                    {page=="display" ?
                        <DisplayPage
                            data={data}
                            onChange={setData}
                        />
                    :<div/>}
                    {page=="enchantments" ?
                        <EnchantmentsPage
                            data={data}
                            onChange={setData}
                        />
                    :<div/>}
                    {page=="storage" ?
                        <StoragePage
                            data={data}
                            onChange={setData}
                        />
                    :<div/>}
                    {page=="settings" ?
                        <SettingsPage
                            data={settings}
                            onChange={(v) => {
                                localStorage.setItem("settings", JSON.stringify(v))
                                setSettings(v)
                            }}
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
