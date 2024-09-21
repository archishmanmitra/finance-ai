"use client"
import React, { useEffect, useState } from 'react'
import { db } from '../../../../../../utils/dbConfig'
import { Budgets, Expenses } from '../../../../../../utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import BudgetItem from '../../budgets/_components/BudgetItem'
import AddExpenses from '../_components/AddExpenses'
import ExpenseListTable from '../_components/ExpenseListTable'
import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import EditBudget from '../_components/EditBudget'


const ExpensesPage = ({ params }) => {
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState();
  const [expensesList, setExpensesList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const route = useRouter()

  useEffect(() => {
    user && getBudgetinfo()

  }, [user])

  const getBudgetinfo = async () => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql`count(${Expenses.id})`.mapWith(Number),
    }).from(Budgets).leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, params.id))
      .groupBy(Budgets.id);
    setBudgetInfo(result[0]);
    getExpensesList();
  }

  const getExpensesList = async () => {
    setIsLoading(true);
    const result = await db.select().from(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .orderBy(desc(Expenses.id));
    console.log(result);

    setExpensesList(result);
    setIsLoading(false);
  }

  const deleteBudget = async () => {
    const deleteExpense = await db.delete(Expenses)
      .where(eq(Expenses.budgetId, params.id))
    if (deleteBudget) {
      const result = await db.delete(Budgets)
        .where(eq(Budgets.id, params.id))
        .returning();
    }
    toast('Budget Deleted!');
    route.replace('/dashboard/budgets');
  }

  return (
    <div className='p-10'>
      <h2 className='text-3xl font-bold flex justify-between items-center'>My Expenses
        <div className='flex gap-2 items-center'>
          <EditBudget budgetInfo={budgetInfo} refreshData={()=>getBudgetinfo()}/>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className='flex gap-2 font-semibold' variant='destructive'><Trash /> Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='bg-white'>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your budget along with expenses
                  and remove that data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBudget()}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetInfo ?
          (<BudgetItem budget={budgetInfo} />) : (
            <div className="rounded-lg h-[150px] w-full animate-pulse"></div>)
        }
        <AddExpenses budgetId={params.id} user={user} refreshData={() => getBudgetinfo()} />
      </div>
      <div className='mt-4'>
        <h2 className='font-bold text-lg'>Latest Expenses</h2>
        {isLoading ? (
          <p>Loading expenses...</p>
        ) : (
          <ExpenseListTable expensesList={expensesList} refreshData={() => getBudgetinfo()} />
        )}
      </div>
    </div>
  )
}

export default ExpensesPage