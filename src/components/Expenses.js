import { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LabelledInput from "./LabelledInput";
import ExpenseDefault from "../ExpenseDefault";
import { Doughnut } from "react-chartjs-2";
import 'chart.js/auto';
import './Expenses.css'


class Expenses extends Component {
    constructor(props) {
        super(props)
        this.state = JSON.parse(window.localStorage.getItem('Expenses')) || {
            selectedGroup: 0,
            expenseGroups: ExpenseDefault
        }
    }

    updateCallback = () => {
        this.props.updateExpenses(this.state.expenseGroups.reduce((prev, curr) => prev + curr.value, 0))
        window.localStorage.setItem('Expenses', JSON.stringify(this.state))
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
        }, this.updateCallback)
    }

    selectGroup = (index) => {
       this.setState({selectedGroup: index})
    }

    deleteCustomExpense = (groupIndex, itemIndex) => {
        const {expenseGroups} = this.state
        const groupToDeleteFrom = this.state.expenseGroups[groupIndex]
        const items = groupToDeleteFrom.items
        
        this.setState({
            expenseGroups: expenseGroups.slice(0, groupIndex).concat(
                {
                    ...groupToDeleteFrom,
                    items: items.slice(0, itemIndex).concat(items.slice(itemIndex + 1)),
                    value: groupToDeleteFrom.value - items[itemIndex].value
                }
            ).concat(expenseGroups.slice(groupIndex + 1))
        }, this.updateCallback)
    }

    createCustomExpense = (groupIndex, expenseName) => {
        const {expenseGroups} = this.state
        const groupToAppend = this.state.expenseGroups[groupIndex]

        // check if label is unique since react requires unique keys (labels used as keys)
        console.log(groupToAppend.items);
        if (groupToAppend.items.some(item => item.label === expenseName)) {
            alert('Label must be unique!')
            return
        }
        
        this.setState({
            expenseGroups: expenseGroups.slice(0, groupIndex).concat(
                {
                    ...groupToAppend,
                    items: groupToAppend.items.concat({
                        label: expenseName,
                        value: 0,
                        custom: true
                    })
                }
            ).concat(expenseGroups.slice(groupIndex + 1))
        }, this.updateCallback)
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
                    key={`${selectedGroup}:${item.label}`}
                    label={item.label}
                    value={item.value} 
                    handleChange={(e) => {this.handleChange(selectedGroup, index, Number(e.target.rawValue))}}
                    deleteable={item.custom}
                    delete={() => {this.deleteCustomExpense(selectedGroup, index)}}
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
                    titleFont: {
                        size: 17
                    },
                    bodyFont: {
                        size:17
                    },
                    footerFont: {
                        size: 17
                    },
                    callbacks: {
                        label: (context) => {
                            return ` $${context.raw}`
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

                <form className="customExpense" onSubmit={(e) => {
                    e.preventDefault()
                    if (e.target[0].value === '') {
                        return
                    }
                    this.createCustomExpense(selectedGroup, e.target[0].value)
                    e.target[0].value = ''
                }}>
                    <input placeholder="Enter Custom Expense" type="text" />
                    <button>Add Expense</button>
                </form>
            </div>
        )
    }
}

export default Expenses