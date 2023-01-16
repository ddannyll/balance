import { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LabelledInput from "./LabelledInput";
import ExpenseDefault from "../ExpenseDefault";
import 'chart.js/auto';
import { Doughnut } from "react-chartjs-2";
import './Expenses.css'


class Expenses extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedGroup: 0,
            expenseGroups: ExpenseDefault
        }
    }

            

    handleChange = (selectedGroupIndex, itemIndex, updatedValue) => {
        const {expenseGroups} = this.state
        const selectedGroup = expenseGroups[selectedGroupIndex]
        const {items} = selectedGroup
        this.setState({
            expenseGroups: expenseGroups.slice(0, selectedGroupIndex).concat(
                {
                    ...selectedGroup,
                    items: items.slice(0, itemIndex).concat(
                        {...items[itemIndex], value:updatedValue}
                    ).concat(items.slice(itemIndex + 1)),
                    value: selectedGroup.value - selectedGroup.items[itemIndex].value + updatedValue
                }
            ).concat(expenseGroups.slice(selectedGroupIndex + 1))
        }, 
            () => this.props.updateExpenses(this.state.expenseGroups.reduce((prev, curr) => prev + curr.value, 0))
        )
    }

    selectGroup = (index) => {
       this.setState({selectedGroup: index})
    }

    render() {
        const {selectedGroup, expenseGroups} = this.state
        const groupButtons = []
        expenseGroups.forEach((expenseGroup, index) => {
            groupButtons.push(
                <button 
                    key={expenseGroup.label}
                    onClick={() => this.selectGroup(index)}
                    className={selectedGroup === index ? 'selected': ''}
                >
                    <FontAwesomeIcon icon={expenseGroup.icon}/>
                </button>
            )
        })

        const labelledInputs = expenseGroups[selectedGroup].items.map((item, index) => {
            return (
                <LabelledInput
                    key={`${selectedGroup}:${index}`}
                    label={item.label}
                    value={item.value} 
                    handleChange={(e) => {this.handleChange(selectedGroup, index, Number(e.target.rawValue))}}
                />
            )
        })

        const formatCurrency = (dollars) => {
            return Number(dollars.toFixed(2)).toLocaleString('en', {minimumFractionDigits:2})
        }

        const chartData = {
            labels: expenseGroups.map(group => group.label),
            datasets: [{
                data: expenseGroups.map(group => group.value),
            }]
          };

        const chartOptions = {
            responseive:true,
            hoverOffset: 10,
            layout: {
                padding:20,
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            return `$${context.raw}`
                        },
                        footer: (context) => {
                            context = context[0]
                            const percent = (context.raw / context.dataset.data.reduce((sum, curr) => sum + curr) * 100).toFixed(1)
                            return `${percent}% of expenses`
                        }
                    }
                }
            }
        }


        return (
            <div className="expenses">
                <div className="buttonsContainer">
                    {groupButtons}
                </div>
                <div className="groupSummary">
                    <div className="labelTotalContainer">
                        <h2 className="label">{expenseGroups[selectedGroup].label}</h2>
                        <h3 className="total">${formatCurrency(expenseGroups[selectedGroup].value)}</h3>
                    </div>
                    <div className="chartContainer">
                        <Doughnut className="chart" data={chartData} options={chartOptions}/>
                    </div>
                </div>
                {labelledInputs}
            </div>
        )
    }
}

export default Expenses