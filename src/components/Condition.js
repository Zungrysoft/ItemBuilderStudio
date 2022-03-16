import React,{ Component } from 'react';
import AddEffectButton from './AddEffectButton.js';
import AddConditionButton from './AddConditionButton.js';
import AddFilterButton from './AddFilterButton.js';
import DeleteButton from './DeleteButton.js';
import InputId from './InputId.js';
import Input from './Input.js';
import InputCheckbox from './InputCheckbox.js';
import InputNoSound from './InputNoSound.js';
import Note from './Note.js';
import '../App.css';

import { getFilterData } from '../helpers/jsonData.js';

// Context tracks whether the filter is causing conditions to
// be run on players or mobs. Some conditions need to be disabled
// out depending on the context
function filterContext(oldContext, id) {
    if (!getFilterData()[id]) {
        return oldContext;
    }
    if ("context" in getFilterData()[id]) {
        return getFilterData()[id].context;
    }
    return oldContext;
}

// Whether this item can contain more conditions in it
function hasChildren(type, id) {
    if (type === 0) {
        return false;
    }
    return true;
}

function boxType(type, depth) {
    if (type === 1) {
        if (depth % 2 === 0) {
            return "bounding-box-condition";
        }
        return "bounding-box-condition-alt";
    }
    if (type === 2) {
        return "bounding-box-filter";
    }

    return "bounding-box-effect";
}

function newCondition() {
    return {
        id: 0,
        value: 0,
        value2: 0,
        value3: 0,
        inverted: false,
        nosound: false,
        text: "",
        effects: [],
        conditions: [],
        filters: [],
    };
}

function Condition({ type, structure, onChange, depth, context }) {
    return (
        <div className={boxType(type, depth)}>
            {depth > 0 ? <div>
                <DeleteButton
                    eventClick={(e) => {
                        onChange({})
                    }}
                />
                <div>
                    <div className="entry">
                        <InputId
                            type={type}
                            startValue={structure.id}
                            context={context}
                            onChange={(val) => {
                                onChange({
                                    ...structure,
                                    id: val,
                                })
                            }}
                        />
                    </div>
                    <div className="entry">
                        <Input
                            type={type}
                            id={structure.id}
                            jsonKey="value"
                            startValue={structure.value}
                            onChange={(val) => {
                                onChange({
                                    ...structure,
                                    value: val,
                                })
                            }}
                        />
                    </div>
                    <div className="entry">
                        <Input
                            type={type}
                            id={structure.id}
                            jsonKey="value2"
                            startValue={structure.value2}
                            onChange={(val) => {
                                onChange({
                                    ...structure,
                                    value2: val,
                                })
                            }}
                        />
                    </div>
                    <div className="entry">
                        <Input
                            type={type}
                            id={structure.id}
                            jsonKey="value3"
                            startValue={structure.value3}
                            onChange={(val) => {
                                onChange({
                                    ...structure,
                                    value3: val,
                                })
                            }}
                        />
                    </div>
                    <div className="entry">
                        <Input
                            type={type}
                            id={structure.id}
                            jsonKey="text"
                            startValue={structure.text}
                            onChange={(val) => {
                                onChange({
                                    ...structure,
                                    text: val
                                })
                            }}
                        />
                    </div>
                    {type === 0 ?
                        <div className="entry">
                            <InputNoSound
                                label="No Sounds or Particles"
                                id={structure.id}
                                startValue={structure.nosound}
                                onChange={(val) => {
                                    onChange({
                                        ...structure,
                                        nosound: val
                                    })
                                }}
                            />
                        </div>
                    : <div/>}
                    {type === 1 ?
                        <div className="entry">
                            <InputCheckbox
                                label="Inverted"
                                startValue={structure.inverted}
                                onChange={(val) => {
                                    onChange({
                                        ...structure,
                                        inverted: val
                                    })
                                }}
                            />
                        </div>
                    : <div/>}
                    <Note
                        type={type}
                        id={structure.id}
                    />
                </div>
            </div> : <div/>}
            {hasChildren(type, structure.id) ? <div>
                <div>
                    <AddEffectButton
                        eventClick={(e) => {
                            onChange({
                                ...structure,
                                effects: structure.effects.concat(newCondition())
                            })
                        }}
                    />
                </div>
                <div>
                    <AddConditionButton
                        eventClick={(e) => {
                            onChange({
                                ...structure,
                                conditions: structure.conditions.concat(newCondition())
                            })
                        }}
                    />
                </div>
                <div>
                    <AddFilterButton
                        eventClick={(e) => {
                            onChange({
                                ...structure,
                                filters: structure.filters.concat(newCondition())
                            })
                        }}
                    />
                </div>
            </div> : <div/>}
            {hasChildren(type, structure.id) ? <div>
                {/* Child Effects */}
                {structure.effects.map((effect) => (
                    <div>
                        <Condition
                            structure={effect}
                            onChange={(childStructure) => {
                                onChange({
                                    ...structure,
                                    effects: structure.effects.map(
                                        x => x === effect ? childStructure : x
                                    ).filter(
                                        x => Object.keys(x).length !== 0
                                    )
                                })
                            }}
                            depth={depth+1}
                            type={0}
                            context={context}
                        />
                    </div>
                ))}
                {/* Child Conditions */}
                {structure.conditions.map((condition) => (
                    <div>
                        <Condition
                            structure={condition}
                            onChange={(childStructure) => {
                                onChange({
                                    ...structure,
                                    conditions: structure.conditions.map(
                                        x => x === condition ? childStructure : x
                                    ).filter(
                                        x => Object.keys(x).length !== 0
                                    )
                                })
                            }}
                            depth={depth+1}
                            type={1}
                            context={context}
                        />
                    </div>
                ))}
                {/* Child Filters */}
                {structure.filters.map((filter) => (
                    <div>
                        <Condition
                            structure={filter}
                            onChange={(childStructure) => {
                                onChange({
                                    ...structure,
                                    filters: structure.filters.map(
                                        x => x === filter ? childStructure : x
                                    ).filter(
                                        x => Object.keys(x).length !== 0
                                    )
                                })
                            }}
                            depth={depth+1}
                            type={2}
                            context={filterContext(context, filter.id)}
                        />
                    </div>
                ))}
            </div> : <div/>}
        </div>
    );
}

export default Condition;
