import { Component } from "react";
import Cleave from 'cleave.js/react';
import './Income.css'

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

    handleChange = (e) => {
        const value = Number(e.target.rawValue)
        const incomeType = e.target.dataset.for
        this.setState({
            [incomeType]: value
        }, () => {
            console.log(this.state);
            const { primaryIncome, otherIncome } = this.state
            this.props.updateIncome(primaryIncome + otherIncome)
        })
    }

    render() {
        let incomeNodes = []
        this.#incomeTypes.forEach((incomeType) => {
            incomeNodes.push(
                <label key={incomeType} htmlFor={incomeType}>
                    {incomeType.replace(/([A-Z])/, ' $1').replace(/^./, c => c.toUpperCase())}
                    <Cleave
                        data-for={incomeType} 
                        placeholder='$0.00' 
                        options={{
                            numeral:true,
                            numeralPositiveOnly: true,
                            prefix:'$',
                            rawValueTrimPrefix:true,
                            noImmediatePrefix: true
                        }}
                        onChange={this.handleChange}
                    />
                </label>
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