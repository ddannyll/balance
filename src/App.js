import { Component } from "react";
import Summary from "./components/Summary";
import Income from "./components/Income";
import Savings from "./components/Savings";
import './App.css'
import 'destyle.css'
import LabelledInput from "./components/LabelledInput";

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            income: 0,
            savings: 0,
            investments: 0,
            expenses: 0,
            budget: 0
        }
    }

    updateIncome = (newIncome) => {
        const { savings, investments, expenses } = this.state
        this.setState({
            income: newIncome,
            budget: newIncome - savings - investments - expenses
        })
    }

    updateSavings = (newSavings) => {
        const { income, investments, expenses } = this.state
        this.setState({
            savings: newSavings,
            budget: income - newSavings - investments - expenses
        })
    }

    updateInvestments = (newInvestments) => {
        const {income, savings, expenses} = this.state
        this.setState({
            investments: newInvestments,
            budget: income - savings - newInvestments, expenses
        })
    }

    render() {
        return (
            <div className="app">
                <Summary summary = {this.state}/>
                <div className="card">
                    <Income updateIncome = {this.updateIncome}/>
                    <Savings updateSavings = {this.updateSavings}/>
                    <LabelledInput label='Investments' handleChange={e => this.updateInvestments(Number(e.target.rawValue))}/>


                </div>
            </div>
        )
    }
}

export default App;
