import React,{ Component } from 'react';
import AddEffectButton from './AddEffectButton.js';
import AddConditionButton from './AddConditionButton.js';
import AddFilterButton from './AddFilterButton.js';
import DeleteButton from './DeleteButton.js';
import InputId from './InputId.js';
import InputValue from './InputValue.js';
import InputCheckbox from './InputCheckbox.js';
import InputNoSound from './InputNoSound.js';
import Note from './Note.js';
import '../App.css';

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

function Condition({ type, structure, onChange, depth }) {
    return (
        <div className={boxType( type, depth )}>
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
                            onChange={(val) => {
                                onChange({
                                    ...structure,
                                    id: val,
                                })
                            }}
                        />
                    </div>
                    <div className="entry">
                        <InputValue
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
                        <InputValue
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
                        <InputValue
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
                        <InputValue
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
                                label="No Sound"
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
                        />
                    </div>
                ))}
            </div> : <div/>}
        </div>
    );
}

export default Condition;
