import effectData from '../data/effects.json';
import conditionData from '../data/conditions.json';
import filterData from '../data/filters.json';

import loadableData from '../data/loadables.json';
import soundData from '../data/sounds.json';
import rangeData from '../data/ranges.json';
import slotData from '../data/slots.json';
import mobTypeData from '../data/mob_types.json';
import durationData from '../data/durations.json';
import resourceData from '../data/resources.json';
import equipmentData from '../data/equipment.json';
import angleData from '../data/angles.json';
import potionEffectData from '../data/potion_effects.json';

function userDefined() {
    let ret = {};
    for (let i = 1; i <= 40; i ++) {
        ret[i + 1000] = {
            "display":"User-Defined #" + i,
            "note":"See user_defined.txt for more info.",
            "value_mode":"input",
            "value_display":"Value",
            "value2_mode":"input",
            "value2_display":"Value2",
            "text_mode":"input",
            "text_display":"Text",
            "has_sound":true,
        }
    }
    return ret;
}

export function getEffectData() {
    return {
        ...effectData,
        ...userDefined(),
    }
}

export function getConditionData() {
    return {
        ...conditionData,
        ...userDefined(),
    }
}

export function getFilterData() {
    return {
        ...filterData,
        ...userDefined(),
    }
}

export function getDataByType(type) {
    let data = {};
    if (type === 0) {
        data = getEffectData();
    }
    else if (type === 1) {
        data = getConditionData();
    }
    else if (type === 2) {
        data = getFilterData();
    }
    else if (type === "loadable") {
        data = loadableData;
    }
    else if (type === "sound") {
        data = soundData;
    }
    else if (type === "range") {
        data = rangeData;
    }
    else if (type === "slot") {
        data = slotData;
    }
    else if (type === "mob_type") {
        data = mobTypeData;
    }
    else if (type === "duration") {
        data = durationData;
    }
    else if (type === "resource") {
        data = resourceData;
    }
    else if (type === "equipment") {
        data = equipmentData;
    }
    else if (type === "angle") {
        data = angleData;
    }
    else if (type === "potion_effect") {
        data = potionEffectData;
    }
    return data;
}
