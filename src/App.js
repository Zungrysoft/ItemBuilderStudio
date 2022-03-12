import './App.css';
import FunctionalityPage from './pages/Functionality.js';

function App() {
    // ItemBuilder Structure
    const [structure, setStructure] = useState({
        effects:[],
        conditions:[],
        filters:[],
    });
    // Item Id
    const [itemId, setItemId] = useState("minecraft:iron_sword");
    // Equip Slot
    const [slot, setSlot] = useState("ItemBuilderMainhand");
    // Command Mode Flag
    const [includeGive, setIncludeGive] = useState(true);

    return (
        <div className="App">
            <header className="App-header">
                <FunctionalityPage
                    structure={structure}
                    itemId={itemId}
                    slot={slot}
                    includeGive={includeGive}
                    onChange={(structureRet, itemIdRet, slotRet, includeGiveRet) => {
                        setStructure(structureRet);
                        setItemId(itemIdRet);
                        setSlot(slotRet);
                        setIncludeGive(includeGiveRet);
                    }}
                />
            </header>
        </div>
    );
}

export default App;
