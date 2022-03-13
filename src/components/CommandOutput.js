import '../App.css';

function bindValue(num) {
    // Make sure it's an int
    num = parseInt(String(num).replace(/,/g, ""));

    // Bind value to within the safe limits of Minecraft scoreboards
    /*if (num > 2147483647) {
        num = 2147483647;
    }
    if (num < -2147483648) {
        num = -2147483648;
    }*/

    return num;
}

function jsonParam(item, key, quotes) {
    if (item && item != 0 && item != "") {
        return "," + key + ":" + quotes + item + quotes;
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
        output += jsonParam(bindValue(structure.value),"Value","");
        output += jsonParam(bindValue(structure.value2),"Value2","");
        output += jsonParam(bindValue(structure.value3),"Value3","");
        output += jsonParam(structure.nosound,"NoSound","");
        output += jsonParam(structure.inverted,"Inverted","");
        output += jsonParam(structure.text,"Text","\"");
    }
    
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

function generateCommand(data) {
    let output = "";
    
    if (data.includeGive) {
        output += "/give @p " + data.itemId + "{";
    }
    
    output += data.slot + ":";

    output += generateCondition(data.structure, true);

    if (data.includeGive) {
        output += "}";
    }

    return output;
}

function CommandOutput({ data }) {
    let cmd = generateCommand(data);

    return (
        <div>
            <button
                onClick={(e) => {
                    navigator.clipboard.writeText(cmd);
                }}
            >Copy Command</button>
            <div>
                <code className="command-text">{cmd}</code>
            </div>
        </div>
    );
}

export default CommandOutput;
