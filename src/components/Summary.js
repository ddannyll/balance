import { Component } from "react";

class Summary extends Component {
    render() {
        const { income, savings, investments, expenses, budget } = this.props.summary
        // all currency stored in cents as BigInt 
        const currencyFormatter = new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: 'USD' // TODO: option to select currency tyle for now keep USD
        })
        const formatCurrency = (cents) => {
            return currencyFormatter.formatToParts(Number(cents) / 100).slice(1).map(part => part.value).join('')
        }
        return (
            <div>
                <div className="incomeSummary">
                    <h3>{formatCurrency(income)}</h3>
                    <h4>Income</h4>
                </div>
                <div className="savings">
                    <h3>{formatCurrency(savings)}</h3>
                    <h4>Income</h4>
                </div>
                <div className="investments">
                    <h3>{formatCurrency(investments)}</h3>
                    <h4>Investments</h4>
                </div>
                <div className="expenses">
                    <h3>{formatCurrency(expenses)}</h3>
                    <h4>Expenses</h4>
                </div>
                <div className="budget">
                    <h3>{formatCurrency(budget)}</h3>
                    <h4>Budget</h4>
                </div>
            </div>
        )
    }
}

export default Summary