import '../App.css';

function jsonParam(item, key) {
    if (item && item != 0 && item != "") {
        return "," + key + ":" + item;
    }
    return "";
}

function jsonChildren(children, key) {
    let output = "";

    if (children.length > 0) {
        output += "," + key + ":[";
        children.forEach((element, index) => {
            if (index > 0) {
                output += ",";
            }
            output += generateCondition(element, false);
        });
        output += "]";
    }

    return output;
}

function generateCondition(structure, isBase) {
    let output = "";

    output += "{";

    // Condition parameters
    if (!isBase) {
        output += "Id:" + structure.id;
        output += jsonParam(structure.value,"Value");
        output += jsonParam(structure.value2,"Value2");
        output += jsonParam(structure.value3,"Value3");
        output += jsonParam(structure.nosound,"NoSound");
        output += jsonParam(structure.inverted,"Inverted");
        output += jsonParam(structure.text,"Text");
    }

    // Child Effects
    
    // Child Conditions
    output += jsonChildren(structure.effects, "Effects");
    output += jsonChildren(structure.conditions, "Conditions");
    output += jsonChildren(structure.filters, "Filters");

    // Remove trailing comma
    if (output[1] == ",") {
        output = output.slice(0,1) + output.slice(2);
    }

    output += "}";

    return output;
}

function generateCommand(structure, id, slot) {
    let output = "";

    output += "/give @p " + id + "{" + slot + ":";

    output += generateCondition(structure, true);

    output += "}";

    return output;
}

function CommandOutput({ structure, id, slot }) {
    return (
        <p>{generateCommand(structure, id, slot)}</p>
    );
}

export default CommandOutput;
