import { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' 
import './Expenses.css'
import LabelledInput from "./LabelledInput";


class Expenses extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedGroup: 0,
            expenseGroups: [
                {
                    label: 'Housing and Utilities',
                    value: 0,
                    icon: solid("house"),
                    items: [
                        {
                            label: 'Rent',
                            value: 0
                        },
                        {
                            label: 'Electrical',
                            value: 0
                        }
                    ]
                },
                {
                    label: 'Transportation',
                    value: 0,
                    icon: solid("car"),
                    items: [
                        {
                            label: 'Fuel',
                            value: 0
                        },
                        {
                            label: 'Train',
                            value: 0
                        }
                    ]
                },                
                {
                    label: 'Food',
                    value: 0,
                    icon: solid("utensils"),
                    items: [
                        {
                            label: 'Groceries',
                            value: 0
                        },
                        {
                            label: 'Eating out',
                            value: 0
                        }
                    ]
                },                
                {
                    label: 'Health',
                    value: 0,
                    icon: solid("heart"),
                    items: []
                },                
                {
                    label: 'Debt',
                    value: 0,
                    icon: solid("credit-card"),
                    items: []
                },                
                {
                    label: 'Miscellaneous',
                    value: 0,
                    icon: solid("ellipsis"),
                    items: []
                },
            ]
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
                    ).concat(items.slice(itemIndex + 1))
                }
            ).concat(expenseGroups.slice(selectedGroupIndex + 1))
        })
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
                    handleChange={(e) => {this.handleChange(selectedGroup, index, e.target.rawValue)}}
                />
            )
        })


        return (
            <div className="expenses">
                {groupButtons}
                {labelledInputs}
            </div>
        )
    }
}

export default Expenses