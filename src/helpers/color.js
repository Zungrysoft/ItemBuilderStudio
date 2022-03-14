let hexChars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']

function isHexChar(char) {
    return (48 <= char && char <= 57) || (65 <= char && char <= 70);
}

export function hexFormat(color) {
    // Strip off # or 0x
    if (color.slice(0,1) == "#") {
        color = color.slice(1);
    }
    else if (color.slice(0,2) == "0x") {
        color = color.slice(2);
    }

    // Upper-Case it
    color = color.toUpperCase();

    // Make sure all characters are legal hex chars
    for (let i = 0; i < color.length; i ++) {
        if (!isHexChar(color.charCodeAt(i))) {
            color = color.slice(0,i) + color.slice(i+1);
            i -= 1;
        }
    }

    // Make sure it is six characters long
    if (color.length > 6) {
        color = color.slice(0,6);
    }
    while (color.length < 6) {
        color = "0" + color;
    }

    // Put # back on
    color = "#" + color;

    return color;
}
