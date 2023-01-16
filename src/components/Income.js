import { Component } from "react";
import LabelledInput from "./LabelledInput";

class Income extends Component {
    #incomeTypes
    constructor(props) {
        super(props)
        this.state = JSON.parse(window.localStorage.getItem('Income')) || {
            primaryIncome: 0,
            otherIncome: 0
        }
        this.#incomeTypes = ["primaryIncome", "otherIncome"]
    }

    handleChange = (e) => {
        const value = Number(e.target.rawValue)
        const incomeType = e.target.dataset.for
        this.setState({
            [incomeType]: value
        }, () => {
            const { primaryIncome, otherIncome } = this.state
            this.props.updateIncome(primaryIncome + otherIncome)
            window.localStorage.setItem('Income', JSON.stringify(this.state))
        })
    }

    render() {
        let incomeNodes = []
        this.#incomeTypes.forEach((incomeType) => {
            incomeNodes.push(
                <LabelledInput 
                    value={this.state[incomeType]}
                    key={incomeType}
                    for={incomeType}
                    label={incomeType.replace(/([A-Z])/, ' $1').replace(/^./, c => c.toUpperCase())}
                    handleChange={this.handleChange}
                />
            )
        })


        return (
            <div className="income">
                {incomeNodes}
            </div>
        )
    }
}

export default Income