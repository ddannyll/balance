import { Component } from "react";
import './Summary.css'

class Summary extends Component {
    render() {
        const { income, savings, investments, expenses, budget } = this.props.summary
        // all currency stored in cents as BigInt 

        const formatCurrency = (dollars) => {
            return Number(dollars.toFixed(2)).toLocaleString('en', {minimumFractionDigits:2})
        }
        return (
            <div className="summary">
                <div className="summaryItem incomeSummary">
                    <h3>{formatCurrency(income)}</h3>
                    <h4>Income</h4>
                </div>
                <div className="summaryItem savings">
                    <h3>{formatCurrency(savings)}</h3>
                    <h4>Savings</h4>
                </div>
                <div className="summaryItem investments">
                    <h3>{formatCurrency(investments)}</h3>
                    <h4>Investments</h4>
                </div>
                <div className="summaryItem expenses">
                    <h3>{formatCurrency(expenses)}</h3>
                    <h4>Expenses</h4>
                </div>
                <div className="summaryItem budget">
                    <h3>{formatCurrency(budget)}</h3>
                    <h4>Budget</h4>
                </div>
            </div>
        )
    }
}

export default Summary