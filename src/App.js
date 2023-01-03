import { Component } from "react";
import Summary from "./components/Summary";
import Income from "./components/Income";
import './App.css'

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

    render() {
        return (
            <div>
                <Summary summary = {this.state}/>
                <Income updateIncome = {this.updateIncome}/>
            </div>
        )
    }
}

export default App;
