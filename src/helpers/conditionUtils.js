import { getFilterData } from '../helpers/jsonData.js';

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
