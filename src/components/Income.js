import { Component } from "react";

class Income extends Component {
    #incomeTypes
    constructor(props) {
        super(props)
        this.state = {
            primaryIncome: 0,
            otherIncome: 0
        }
        this.#incomeTypes = ["primaryIncome", "otherIncome"]
    }

    updateValue(value, incomeType) {
        this.setState({
            [incomeType]: value
        }, () => {
            const { primaryIncome, otherIncome } = this.state
            this.props.updateIncome(primaryIncome + otherIncome)
        })
    }

    render() {
        let incomeNodes = []
        this.#incomeTypes.forEach((incomeType, index) => {
            incomeNodes.push(
            )
        })


        return (
            <div>
                {incomeNodes}
            </div>
        )
    }
}

export default Income