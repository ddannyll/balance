import { Component } from "react";

class Income extends Component {
    #incomeTypes
    constructor(props) {
        super(props)
        this.state = {
            primaryIncome: 0n,
            otherIncome: 0n
        }
        this.#incomeTypes = ["primaryIncome", "otherIncome"]
    }

    handleChange(e, incomeType) {
        this.setState({
            [incomeType]: e.target.value
        })
        const { primaryIncome, otherIncome } = this.state
        this.props.updateIncome(primaryIncome + otherIncome)
    }

    render() {
        let incomeNodes = []
        this.#incomeTypes.forEach((incomeType, index) => {
            incomeNodes.push(
                <label htmlFor={incomeType}>
                    {incomeType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </label>)
            incomeNodes.push(
                <input 
                    type="number" 
                    onChange={(e) => 
                    this.handleChange(e, incomeType)} 
                    id={incomeType}
                />
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