import effectData from '../data/effects.json';
import conditionData from '../data/conditions.json';
import filterData from '../data/filters.json';

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
