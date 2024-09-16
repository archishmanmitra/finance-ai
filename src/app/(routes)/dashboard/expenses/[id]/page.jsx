"use client"
import React, { useEffect, useState } from 'react'
import { db } from '../../../../../../utils/dbConfig'
import { Budgets, Expenses } from '../../../../../../utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq, getTableColumns, sql } from 'drizzle-orm'
import BudgetItem from '../../budgets/_components/BudgetItem'
import AddExpenses from '../_components/AddExpenses'

const ExpensesPage = ({params}) => {
    const {user} = useUser();
    const [budgetInfo, setBudgetInfo] = useState();
    useEffect(() => {
      user&&getBudgetinfo()
      
    }, [user])
    
    const getBudgetinfo = async ()=>{
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
            totalItem: sql`count(${Expenses.id})`.mapWith(Number),
        }).from(Budgets).leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .where(eq(Budgets.id, params.id))
        .groupBy(Budgets.id);
        setBudgetInfo(result[0]);
    }
  return (
    <div className='p-10'> 
        <h2 className='text-3xl font-bold'>My Expenses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
            {budgetInfo?
           (<BudgetItem budget={budgetInfo}/>):(
            <div className="rounded-lg h-[150px] w-full animate-pulse"></div>)
            }
            <AddExpenses budgetId={params.id} user={user} refreshData={()=>getBudgetinfo()}/>
        </div>
    </div>
  )
}

export default ExpensesPage