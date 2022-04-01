import './JokeOverlay.css'
import React,{useState} from 'react';

let editionData = [
    {display: "Effects", v1: "Yes", v2: "Yes"},
    {display: "Conditions", v1: "Yes", v2: "Yes"},
    {display: "Filters", v1: "Yes", v2: "Yes"},
    {display: "Transmorgurators", v1: "No", v2: "Yes"},
    {display: "Command Length Limit", v1: "1,000,000 Characters", v2: "No Limit"},
    {display: "Supported Platforms", v1: "Java Edition Only", v2: "All Platforms"},
    {display: "Extransibility Factor", v1: "2.812", v2: "14.391"},
    {display: "MIDI Support", v1: "No", v2: "Yes"},
    {display: "Command Parser", v1: "No", v2: "Yes"},
    {display: "ItemBuilder Cloud", v1: "8μB Storage", v2: "10TB Storage"},
    {display: "ItemBuilder Career Network", v1: "No\n-", v2: "Yes\n-"},
    {display: "Bug Free", v1: "No", v2: "No"},
    {display: "Pricing\n-", v1: "Free\n-", v2: "20 ItemCoins per month (Billed Hourly)"},
]

function buildListItem(text, index) {
    return (
        <div className={index % 2 === 0 ? "overlay-text-container" : "overlay-text-container-alt"} key={index}>
            <p className="overlay-text">{text}</p>
        </div>
    )
}

function JokeOverlay() {
    const [closed, setClosed] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Closed
    if (closed) {
        return <div/>
    }

    // Not April Fools Day
    let today = new Date();
    console.log(today.getDate())
    console.log(today.getMonth())
    if (today.getMonth() !== 3) {
        return <div/>
    }
	if (today.getDate() !== 1 && today.getDate() !== 2) {
        return <div/>
    }

    // Build edition data
    let features = [];
    let communityEdition = [];
    let enterpriseEdition = [];
    editionData.forEach((item, index) => {
        features.push(buildListItem(item.display, index))
        communityEdition.push(buildListItem(item.v1, index))
        enterpriseEdition.push(buildListItem(item.v2, index))
    });

    return (
        <div className="overlay">
            <h1 className="overlay-title">Please Select Your Edition</h1>
            <div className="overlay-box" style={{width:200}}>
                <div>
                    <h2 className="overlay-subtitle">Feature List</h2>
                    <div style={{height:32}}/>
                    {features}
                </div>
            </div>
            <div className="overlay-box">
                <div>
                    <h2 className="overlay-subtitle">ItemBuilder Studio Community Edition</h2>
                    {communityEdition}
                    <button className="overlay-button" onClick={() => {setClosed(true)}}>
                        Get Started!
                    </button>
                </div>
            </div>
            <div className="overlay-box">
                <div>
                    <h2 className="overlay-subtitle">ItemBuilder Studio Enterprise Edition</h2>
                    {enterpriseEdition}
                    <input className="overlay-input" placeholder="Enter wallet key"/>
                    <button
                        className="overlay-button"
                        onClick={() => {setErrorMessage("Error: Could not find ItemCoin Wallet")}}
                    >
                        Buy
                    </button>
                    <p className="overlay-error">{errorMessage}</p>
                </div>
            </div>
        </div> 
    );
    
}

export default JokeOverlay;
