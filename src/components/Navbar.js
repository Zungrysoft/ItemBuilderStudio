import './Navbar.css';


function Navbar({ tabs, startVal, onChange }) {
    return(
        <div className="tab">
            {tabs.map((val) => 
                <button
                    className={startVal == val["id"] ? "tab-link active" : "tab-link"}
                    onClick={(e) => {
                        onChange(val["id"])
                    }}
                >{val.display}</button>
            )}
        </div>
    )
}

export default Navbar;
