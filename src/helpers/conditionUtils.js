import { getDataByType, getFilterData } from '../helpers/jsonData.js';

let defaultData = {
    structure: {
        effects:[],
        conditions:[],
        filters:[],
    },
    itemId: "minecraft:iron_sword",
    slot: "ItemBuilderMainhand",
    includeGive: true,
    name: {
        text: "",
        color: "ffffff",
        color2: "555555",
        colorMode: "single",
        bold: false,
        italic: false,
    },
    lore: {
        upsides: "",
        downsides: "",
        lore: "",
    },
    model: {
        color: "2c2f9e",
        colorEnabled: false,
        customModelData: 0,
    },
    enchantments:[],
}

let defaultCondition = {
    id: 0,
    value: 0,
    value2: 0,
    value3: 0,
    inverted: 0,
    nosound: 0,
    text: "",
    effects: [],
    conditions: [],
    filters: [],
};

function verifyKeys(data, template) {
    // If this somehow isn't an object, something has gone horribly, horribly wrong.
    // Just reset everything.
    if (typeof data !== "object") {
        return template;
    }
    // Go through each key
    Object.keys(template).forEach(templateKey => {
        // If the key is not found in the data, add it from the template
        // Also correct it if it's the wrong datatype
        if ( (!templateKey in data) /*|| (typeof data[templateKey] !== typeof template[templateKey])*/ ) {
            data[templateKey] = template[templateKey];
        }
        // If the key is an object, verify its children
        else if (typeof template[templateKey] === "object") {
            data[templateKey] = verifyKeys(data[templateKey], template[templateKey]);
        }
    })
    return data;
}

// Context tracks whether the filter is causing conditions to
// be run on players or mobs. Some conditions need to be disabled
// out depending on the context
export function getFilterContext(oldContext, id) {
    if (!getFilterData()[id]) {
        return oldContext;
    }
    if ("context" in getFilterData()[id]) {
        return getFilterData()[id].context;
    }
    return oldContext;
}

// Checks whether or not a particular id can be used under the circumstances
export function isDisabled(id,data,context,version) {
    // Versioning
    if ("version_min" in data[id] && version < data[id].version_min) {
        return true;
    }
    if ("version_max" in data[id] && version > data[id].version_max) {
        return true;
    }

    // Filter context
    if ((context === "self" || context === "player") && "monster_only" in data[id] && data[id].monster_only) {
        return true;
    }
    if ((context === "mob" || context === "player") && "self_only" in data[id] && data[id].self_only) {
        return true;
    }
    else if (context === "mob" && "player_only" in data[id] && data[id].player_only) {
        return true;
    }

    return false;
}

// Trims down data to just the id's that are allowed under the circumstances
export function getValidEntries(data, context, version) {
    let ret = {};
    Object.keys(data).forEach((id) => {
        if (!isDisabled(id,data,context,version)) {
            ret[id] = data[id];
        }
    })
    return ret;
}

function verifyInputCheckbox(val) {
    if (val == 0) {
        return 0;
    }
    return 1;
}

function verifyInputRange(val, data, jsonKey) {
    let minKey = jsonKey + "_min";
    let maxKey = jsonKey + "_max";

    // Make sure there is a min and max key
    if ( !(minKey in data && maxKey in data) ) {
        return 0;
    }

    // Validate that the value is between min and max
    if (val < data[minKey] || val > data[maxKey]) {
        return data[minKey];
    }

    return val;
}

function verifyInputId(val, data, context, version) {
    // If the id is not in the list or is disabled, set it to something in the list
    if (!(val in data) || isDisabled(val,data,context,version)) {
        let valid = getValidEntries(data, context, version);
        if (valid.length > 0) {
            console.log(val);
            console.log(data);
            return Object.keys(valid)[0];
        }
        else {
            return 0;
        }
    }
    return val;
}

function verifyInput(val, id, data, jsonKey, context, version) {
    if ( !((jsonKey + "_mode") in data[id]) ) {
        return 0;
    }

    let mode = data[id][jsonKey + "_mode"];
    if (mode === "input") {
        return val;
    }
    if (mode === "value_range" || mode === "value_range_amp") {
        return verifyInputRange(val, data, jsonKey);
    }
    if (mode === "checkbox") {
        return verifyInputCheckbox(val);
    }
    return verifyInputId(val, getDataByType(mode), context, version)
}

function verifyCondition(structure, type, context, version) {
    // Make sure all of the necessary keys are in
    structure = verifyKeys(structure, defaultCondition);

    // Retrieve data for this condition
    let data = getDataByType(type);

    // Verify id
    structure.id = verifyInputId(structure.id, data, context, version);

    // Verify fields are in the correct ranges
    structure.value = verifyInput(structure.value, structure.id, data, "value");
    structure.value2 = verifyInput(structure.value2, structure.id, data, "value2");
    structure.value3 = verifyInput(structure.value3, structure.id, data, "value3");
    structure.text = verifyInput(structure.text, structure.id, data, "text");
    structure.inverted = verifyInputCheckbox(structure.inverted);

    // Verify nosound key
    structure.nosound = verifyInputCheckbox(structure.nosound);
    if (type !== 0) {
        structure.nosound = 0;
    }
    if (!"has_sound" in data[structure.id] || !data[structure.id].has_sound) {
        structure.nosound = 0;
    }

    // Clean children
    for (let i = 0; i < structure.effects.length; i ++) {
        structure.effects[i] = verifyCondition(structure.effects[i], 0, context, version);
    }
    for (let i = 0; i < structure.conditions.length; i ++) {
        structure.conditions[i] = verifyCondition(structure.conditions[i], 1, context, version);
    }
    for (let i = 0; i < structure.filters.length; i ++) {
        let newContext = getFilterContext(context, structure.id);
        structure.filters[i] = verifyCondition(structure.filters[i], 2, newContext, version);
    }

    return structure;
}

// This function makes sure that any item data going into the render function will not cause errors
export function cleanData(data, version) {
    // Make sure all of the necessary keys are in
    data = verifyKeys(data, defaultData);

    // Verify condition data
    data.structure = verifyCondition(data.structure, 1, "self", version);

    return data;
}
