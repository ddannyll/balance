import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' 

const ExpenseDefault = [
    {
        label: 'Housing and Utilities',
        value: 0,
        icon: solid("house"),
        items: [
            {
                label: 'Rent & Mortgage',
                value: 0
            },
            {
                label: 'Home Maintenance',
                value: 0
            },
            {
                label: 'Electric & Gas',
                value: 0
            },
            {
                label: 'Water',
                value: 0
            },
            {
                label: 'Phone',
                value: 0
            },
            {
                label: 'Internet',
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
                label: 'Public Transportation',
                value: 0
            },
            {
                label: 'Parking & Tolls',
                value: 0
            },
            {
                label: 'Vehicle Insurance & Payment',
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
                label: 'Eating Out',
                value: 0
            },
            {
                label: 'Food Delivery',
                value: 0
            }
        ]
    },                
    {
        label: 'Health',
        value: 0,
        icon: solid("heart"),
        items: [
            {
                label: 'Medication',
                value: 0
            },
            {
                label: 'Hair & Beauty Products',
                value: 0
            },
            {
                label: 'Barber/Hairdresser',
                value: 0
            },
            {
                label: 'Clothing',
                value: 0
            },
            {
                label: 'Insurance',
                value: 0
            }
        ]
    },                
    {
        label: 'Debt',
        value: 0,
        icon: solid("credit-card"),
        items: [
            {
                label: 'Credit Card Payments',
                value: 0
            },
            {
                label: 'Tax Payments',
                value: 0
            },
            {
                label: 'Student Loans',
                value: 0
            }
        ]
    },                
    {
        label: 'Miscellaneous',
        value: 0,
        icon: solid("ellipsis"),
        items: [
            {
                label: 'Hobbies & Activities',
                value: 0
            },
            {
                label: 'Subscription Payments',
                value: 0
            },
            {
                label: 'Travel Expenses',
                value: 0
            },
            {
                label: 'Gifts',
                value: 0
            },
            {
                label: 'Donations',
                value: 0
            }
        ]
    },
]

export default ExpenseDefault