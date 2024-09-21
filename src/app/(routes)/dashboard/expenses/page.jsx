"use client"
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import ExpenseListTable from './_components/ExpenseListTable';
import { useUser } from '@clerk/nextjs';
import { Budgets,Expenses } from '../../../../../utils/schema';
import { db } from '../../../../../utils/dbConfig';

const ExpensesRootPage = () => {
    const [expenseList,setExpenseList]=useState([]);
    const {user}=useUser();

    useEffect(()=>{
        user&&getAllExpenses();
      },[user])
    const getAllExpenses = async () => {
        const result = await db.select({
          id: Expenses.id,
          name: Expenses.name,
          amount: Expenses.amount,
          createdAt: Expenses.createdAt,
        }).from(Budgets).rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
          .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
          .orderBy(desc(Expenses.id));
        console.log(result);
    
        setExpenseList(result);
      }
    
    return (
        <div>
            <div className='p-10'>
                <h2 className='font-bold text-3xl mb-5'>My Expenses</h2>

                <ExpenseListTable refreshData={() => getAllExpenses()}
                    expensesList={expenseList}
                />
            </div>
        </div>
    )
}

export default ExpensesRootPage