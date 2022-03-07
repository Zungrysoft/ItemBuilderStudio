import React,{ Component } from 'react';
import AddButton from './AddButton.js';
import DeleteButton from './DeleteButton.js';
import '../App.css';

function newCondition() {
    return {
        id: 0,
        value: 0,
        value2: 0,
        events: [],
        conditions: [],
        filters: [],
    };
}

function Condition({ structure, onChange, depth }) {
    return (
        <div className={depth%2 == 0 ? "bounding-box" : "bounding-box-alt"}>
            {depth > 0 ? <div>
                <DeleteButton
                    eventClick={(e) => {
                        console.log(structure);
                        onChange({})
                    }}
                />
                <div class="container">
                    <div className="entry">
                        <p className="label">Id: </p>
                        <input
                            className="text-box"
                            type="text"
                            defaultValue={structure.id}
                            onChange={(e) => {
                                onChange({
                                    ...structure,
                                    id: e.target.value
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
            <AddButton
                eventClick={(e) => {
                    console.log(structure);
                    onChange({
                        ...structure,
                        conditions: structure.conditions.concat(newCondition())
                    })
                }}
            />
            <div>
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
                        />
                    </div>
                ))}
            </div>
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
