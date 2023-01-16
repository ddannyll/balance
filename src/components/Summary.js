import { Component } from "react";
import './Summary.css'

class Summary extends Component {
    render() {
        const { income, savings, investments, expenses, budget } = this.props.summary
        // all currency stored in cents as BigInt 

        const formatCurrency = (dollars) => {
            const absolute = Math.abs(dollars)
            const formatted = Number(absolute.toFixed(2)).toLocaleString('en', {minimumFractionDigits:2})
            if (dollars < 0) {
                return `-$${formatted}`
            } else {
                return `$${formatted}`
            }
        }

        let budgetClassModifier
        if (budget > 0) {
            budgetClassModifier = 'positive'
        } else if (budget < 0) {
            budgetClassModifier = 'negative'
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
                <div className={`summaryItem budget ${budgetClassModifier}`}>
                    <h3>{formatCurrency(budget)}</h3>
                    <h4>Budget</h4>
                </div>
            </div>
        )
    }
}

export default Summary