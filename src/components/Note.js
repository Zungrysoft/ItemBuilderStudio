import '../App.css';
import effectData from '../data/effects.json';
import conditionData from '../data/conditions.json';
import filterData from '../data/filters.json';

function Note({ type, id }) {
    let data = {};
    let note = "";

    // Effects
    if (type === 0) {
        data = effectData;
    }
    // Conditions
    else if (type === 1) {
        data = conditionData;
    }
    // Filters
    else if (type === 2) {
        data = filterData;
    }

    // If this id is not in the json table, just exit
    if ( !(id in data) ) {
        return <div/>
    }

    // Exit out if there is no note for this Condition
    if ( !("note" in data[id]) ) {
        return <div/>
    }

    // Read data
    note = data[id].note

    return (
        <div>
            <i>
                <p className="condition-note">{"(" + note + ")"}</p>
            </i>
        </div>
    )
}

export default Note;
