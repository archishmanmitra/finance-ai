"use client";
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { db } from '../../../../../../utils/dbConfig';
import { Budgets, Expenses } from '../../../../../../utils/schema';
import { toast } from 'sonner';

const AddExpenses = ({ budgetId, user, refreshData }) => {
    const [name, setName] = useState()
    const [amount, setAmount] = useState()

    const addNewExpense = async () => {
        const result = db.insert(Expenses).values({
            name: name,
            amount: amount,
            budgetId: budgetId,
            createdAt: user?.primaryEmailAddress?.emailAddress,
        }).returning({ insertedId: Budgets.id })

        setAmount("");
        setName("");

        if (result) {
            refreshData();
            toast('Expense Added Successfully!')
        }
    }
    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-xl'>Add Expense</h2>
            <div className='mt-2'>
                <h2 className='text-black font-semibold my-1'>Expense Name</h2>
                <Input onChange={(e) => setName(e.target.value)} placeholder='example: Phone Bill' />
            </div>
            <div className='mt-2'>
                <h2 className='text-black font-semibold my-1'>Expense Amount</h2>
                <Input type='number' onChange={(e) => setAmount(e.target.value)} placeholder='example: 300' />
            </div>
            <Button className='mt-3 w-full' disabled={!(name && amount)} onClick={() => addNewExpense()} >Add New Expense</Button>
        </div>
    )
}

export default AddExpenses