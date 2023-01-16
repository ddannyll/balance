import 'destyle.css'
import { Component } from "react";
import Expenses from "./components/Expenses";
import Summary from "./components/Summary";
import Income from "./components/Income";
import Savings from "./components/Savings";
import LabelledInput from "./components/LabelledInput";
import './App.css'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = JSON.parse(window.localStorage.getItem('App')) || {
            income: 0,
            savings: 0,
            investments: 0,
            expenses: 0,
            budget: 0
        }
    }

    storeState = () => {
        window.localStorage.setItem('App', JSON.stringify(this.state))
    }

    updateIncome = (newIncome) => {
        const { savings, investments, expenses } = this.state
        this.setState({
            income: newIncome,
            budget: newIncome - savings - investments - expenses
        }, this.storeState)
    }

    updateSavings = (newSavings) => {
        const { income, investments, expenses } = this.state
        this.setState({
            savings: newSavings,
            budget: income - newSavings - investments - expenses
        }, this.storeState)
    }

    updateInvestments = (newInvestments) => {
        const {income, savings, expenses} = this.state
        this.setState({
            investments: newInvestments,
            budget: income - savings - newInvestments - expenses
        }, this.storeState)
    }

    updateExpenses = (newExpenses) => {
        const {income, savings, investments} = this.state
        this.setState({
            expenses: newExpenses,
            budget: income - savings - investments - newExpenses
        }, this.storeState)
    }

    render() {
        return (
            <div className="app">
                <Summary summary = {this.state}/>
                <div className="card">
                    <div className="cardHeader">
                        <h2>Balance</h2>
                        <button className='clearBtn' onClick={() => {window.localStorage.clear(); location.reload()}}>Clear All</button>
                    </div>
                    <Income updateIncome = {this.updateIncome}/>
                    <Savings updateSavings = {this.updateSavings}/>
                    <LabelledInput label='Investments' handleChange={e => this.updateInvestments(Number(e.target.rawValue))}/>
                    <h2>Expenses</h2>
                    <Expenses updateExpenses={this.updateExpenses}/>
                </div>
            </div>
        )
    }
}

export default App;
