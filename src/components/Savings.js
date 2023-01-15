import { Component } from "react";
import LabelledInput from "./LabelledInput";

class Savings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            savings: 0
        }
    }

    handleChange = (e) => {
        const value = Number(e.target.rawValue)
        this.props.updateSavings(value)
    }

    render() {
        return (
            <LabelledInput
                label={'Savings'}
                handleChange={this.handleChange}
            />
        )
    }
}

export default Savings