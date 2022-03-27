import './Navbar.css';


function Navbar({ tabs, startVal, onChange }) {
    return(
        <div className="tab">
            {tabs.map((val,index) => 
                <button
                    className={startVal == val["id"] ? "tab-link active" : "tab-link"}
                    onClick={(e) => {
                        onChange(val["id"])
                    }}
                    key={index}
                >{val.display}</button>
            )}
            <button
                style={{float:"right"}}
                onClick={(e) => {
                    navigator.clipboard.writeText(document.getElementById("cmdText").innerText);
                }}
                key={-1}
            >Copy Command</button>
        </div>
    )
}

export default Navbar;
