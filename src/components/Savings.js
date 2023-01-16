import { Component } from "react";
import LabelledInput from "./LabelledInput";

class Savings extends Component {
    constructor(props) {
        super(props)
        this.state = JSON.parse(window.localStorage.getItem('Savings')) || {
            savings: 0
        }
    }

    handleChange = (e) => {
        const value = Number(e.target.rawValue)
        this.props.updateSavings(value)
        window.localStorage.setItem('Savings', JSON.stringify(this.state))
    }

    render() {
        return (
            <LabelledInput
                valie={this.state.savings}
                label={'Savings'}
                handleChange={this.handleChange}
            />
        )
    }
}

export default Savings