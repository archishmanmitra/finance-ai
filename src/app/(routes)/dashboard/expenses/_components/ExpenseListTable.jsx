import { Trash } from 'lucide-react'
import React from 'react'

const ExpenseListTable = ({ expensesList }) => {
    console.log(expensesList);
    
    return (
        <div className='mt-3'>
            <div className="grid grid-cols-4 bg-slate-200 p-2">
                <h2 className='font-bold'>Name</h2>
                <h2 className='font-bold'>Amount</h2>
                <h2 className='font-bold'>Date</h2>
                <h2 className='font-bold'>Action</h2>
            </div>
            {expensesList?.map((expenses, index) => (
                <div key={index} className="grid grid-cols-4 bg-slate-50 p-2">
                    <h2>{expenses.name}</h2>
                    <h2>{expenses.amount}</h2>
                    <h2>{expenses.createdAt}</h2>
                    <h2><Trash className='text-red-600'/></h2>
                </div>)
            )
        }
        </div>
    )
}

export default ExpenseListTable