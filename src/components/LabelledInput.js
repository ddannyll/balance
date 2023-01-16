import { Component } from "react";
import Cleave from "cleave.js/react";
import './LabelledInput.css'

class LabelledInput extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <label htmlFor="">
                {this.props.label}
                <Cleave
                    value={this.props.value}
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
            </label>
        )
    }
}

export default LabelledInput