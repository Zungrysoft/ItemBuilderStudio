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

import { cleanData } from './helpers/conditionUtils.js'

let tabs = [
    {display:"Functionality",id:"functionality"},
    {display:"Display",id:"display"},
    {display:"Enchantments",id:"enchantments"},
    {display:"Saved",id:"storage"},
    {display:"Settings",id:"settings"},
    {display:"Info",id:"about"},
];

function App() {
    const [page, setPage] = useState("functionality");
    const [settings, setSettingsFinal] = useState({
        version: 2.0
    });
    const [data, setDataFinal] = useState(cleanData(0, settings.version));

    function setData(newData) {
        setDataFinal(cleanData(newData,settings.version));
    }
    function setSettings(newSettings) {
        // If version is updated, clean item data again
        if (newSettings.version !== settings.version) {
            setDataFinal(cleanData(data,newSettings.version));
        }
        setSettingsFinal(newSettings);
    }

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
                            version={settings.version}
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
                            onChange={setSettings}
                        /> 
                    :<div/>}
                    {page=="about" ?
                        <AboutPage/> 
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
