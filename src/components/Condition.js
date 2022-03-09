import React,{ Component } from 'react';
import AddEffectButton from './AddEffectButton.js';
import AddConditionButton from './AddConditionButton.js';
import AddFilterButton from './AddFilterButton.js';
import DeleteButton from './DeleteButton.js';
import InputId from './InputId.js';
import '../App.css';

function newCondition() {
    return {
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
                                    id: val
                                })
                            }}
                        />
                    </div>
                    <div className="entry">
                        <p className="label">Value: </p>
                        <input
                            className="text-box"
                            type="text"
                            defaultValue={structure.value}
                            onChange={(e) => {
                                onChange({
                                    ...structure,
                                    value: e.target.value
                                })
                            }}
                        />
                    </div>
                    <div className="entry">
                        <p className="label">Value2: </p>
                        <input
                            className="text-box"
                            type="text"
                            defaultValue={structure.value2}
                            onChange={(e) => {
                                onChange({
                                    ...structure,
                                    value2: e.target.value
                                })
                            }}
                        />
                    </div>
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

/*class Condition extends Component {
    state = {
        id: 0,
        value: 0,
        value2: 0,
        inverted: false,
        effects: [],
        conditions: [],
        filters: [],
    }
    addCondition() {
        this.state.conditions.push(new Condition())
        this.setState({conditions: this.state.conditions})
    }
    updateId(value) {
        this.setState({id: value})
        console.log(value)
    }
    render() {
        return (
            <div>
                <div>{this.command()}</div>
                <InputBox startValue={0} eventUpdate={(e) => this.updateId()}/>
                <AddButton eventClick={(e) => this.addCondition()}/>
            </div>
        );
    }
    command() {
        let ret = "{"
        
        // Id
        ret += "Id:" + this.state.id

        // Value
        if (this.state.value != 0) {
            ret += ",Value:" + this.state.value
        }

        // Value2
        if (this.state.value2 != 0) {
            ret += ",Value2:" + this.state.value2
        }

        // Inverted
        if (this.state.inverted) {
            ret += ",Inverted:1"
        }

        // Conditions
        console.log("LENGTH"+this.state.conditions.length);
        if (this.state.conditions.length > 0) {
            ret += ",Conditions:["
            this.state.conditions.forEach((item, index) => {
                if (index != 0) {
                    ret += ",";
                }
                console.log("INDEX:"+index);
                ret += item.command();
            });
            ret += "]"
        }
        

        return ret + "}"
    }
}

export default Condition;*/
