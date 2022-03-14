import { hexFormat } from '../helpers/color.js'

// Removes leading commas in built lists
function rlc(str) {
    if (str[1] == ",") {
        str = str.slice(0,1) + str.slice(2);
    }
    if (str[0] == ",") {
        str = str.slice(1);
    }
    return str;
}

function charToNum(c) {
    if (c == 'a') {return 10;}
    if (c == 'b') {return 11;}
    if (c == 'c') {return 12;}
    if (c == 'd') {return 13;}
    if (c == 'e') {return 14;}
    if (c == 'f') {return 15;}
    let pc = parseInt(c);
    if (pc) {
        return pc;
    }
    console.log("DAMN");
    return 0;
}

function hexToRgb(color) {


    let r = color.slice(0,1);
    let g = "0x" + color[3] + color[4];
    let b = "0x" + color[5] + color[6];
 
    return +r, +g, +b;
}

/*function rgbToHex(r, g, b) {
    // Remove leading #
    if (color.slice(0,1) == "#") {
        color = color.slice(1);
    }

    let r = 16*charToNum(color.slice(0,1)) + charToNum(color.slice(1,2));
    let g = 16*charToNum(color.slice(2,3)) + charToNum(color.slice(3,4));
    let b = 16*charToNum(color.slice(4,5)) + charToNum(color.slice(5,6));
    return r, g, b;
}*/

// Converts color from a hex string to an integer
function convertColor(color) {
    // Remove leading #
    if (color.slice(0,1) == "#") {
        color = color.slice(1);
    }

    let factor = 1;
    let result = 0;
    for (let i = 5; i >= 0; i --) {
        result += factor * charToNum(color.slice(i,i+1));
        factor *= 16;
    }
    return result
}

function generateText(text, color, bold, italic) {
    if (text === "") {
        return "";
    }

    let output = ",{";

    output += "\"text\":\"" + text + "\"";
    output += ",\"color\":\"" + hexFormat(color) + "\"";
    output += ",\"italic\":" + italic;
    output += ",\"bold\":" + bold;

    return output + "}";
}

function generateNameAlternating(name) {
    let output = "";

    for (let i = 0; i < name.text.length; i ++) {
        let color = i % 2 == 0 ? name.color : name.color2;
        output += generateText(name.text.slice(i,i+1), color, name.bold, name.italic);
    }
    
    return rlc(output);
}

function isCapital(char) {
    return 65 <= char && char <= 90;
}

function generateNameCapitalized(name) {
    let output = "";

    let curCase = true;
    let queue = "";
    for (let i = 0; i < name.text.length; i ++) {
        let newCase = isCapital(name.text.charCodeAt(i));
        if (newCase !== curCase) {
            let chosenColor = curCase ? name.color : name.color2;
            output += generateText(queue, chosenColor, name.bold, name.italic);
            
            queue = "";
            curCase = newCase;
        }
        queue += name.text[i];
    }
    let chosenColor = curCase ? name.color : name.color2;
    output += generateText(queue, chosenColor, name.bold, name.italic);
    
    return rlc(output);
}

function generateName(name) {
    if (name.colorMode === "alternating") {
        return rlc(generateNameAlternating(name));
    }
    if (name.colorMode === "capitalized") {
        return rlc(generateNameCapitalized(name));
    }
    return rlc(generateText(name.text, name.color, name.bold, name.italic));
}

function generateDisplay(data) {
    if (data.name.text === "" && data.lore === "" && data.color === "") {
        return "";
    }

    let output = "";

    if (data.color !== "") {
        output += ",color:" + convertColor(data.color);
    }

    if (data.name.text !== "") {
        output += ",Name:'[" + generateName(data.name) + "]'";
    }

    return ",display:{" + rlc(output) + "}";
}

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

    output += "}";

    return rlc(output);
}

function generateCommand(data) {
    let output = "";
    
    if (data.includeGive) {
        output += "/give @p " + data.itemId + "{";
    }

    output += data.slot + ":";

    output += generateCondition(data.structure, true);

    output += generateDisplay(data);

    output = rlc(output);

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
