import { Component } from "react";
import Cleave from "cleave.js/react";
import './LabelledInput.css'

class LabelledInput extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <label>
                <div>
                    {this.props.label}
                </div>
                <Cleave
                    value={this.props.value === 0 ? null : this.props.value}
                    data-for={this.props.for} 
                    placeholder='$0.00' 
                    options={{
                        numeral:true,
                        numeralPositiveOnly: true,
                        prefix:'$',
                        rawValueTrimPrefix:true,
                        noImmediatePrefix: true
                    }}
                    onChange={this.props.handleChange}
                />
                {this.props.deleteable ? <button className="delete" onClick={this.props.delete}>✖</button> : null}
            </label>
        )
    }
}

export default LabelledInput