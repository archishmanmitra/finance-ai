"use client";
import React, { useState, useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import { eq, getTableColumns } from "drizzle-orm";
import { Budgets, Expenses, Income } from "../../../../utils/schema";
import { db } from "../../../../utils/dbConfig";
import { sql, desc } from "drizzle-orm";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";



export default function Dashboard() {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    user && getBudgetlist()
  }, [user]);

  const getBudgetlist = async () => {
    setIsLoading(true);
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql`count(${Expenses.id})`.mapWith(Number),
    }).from(Budgets).leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id).orderBy(desc(Budgets.id));

    setBudgetList(result);
    setIsLoading(false);
    getAllExpenses();
    getAllIncome();
  }

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

  const getAllIncome = async () => {
    try {
      const result = await db.select({
        ...getTableColumns(Income),
        totalAmount: sql`sum(cast(${Income.amount} as numeric))`.mapWith(Number)
      }).from(Income).where(eq(Income.createdBy, user?.primaryEmailAddress?.emailAddress)).groupBy(Income.id)

      setIncomeList(result)
    } catch (error) {
      console.log('error fetching income list:', error)
    }
  }

  return (
    <div className="p-8">
      <h2 className="font-bold text-4xl">Hi, {user?.fullName} 👋</h2>
      <p className="text-gray-500"> Let's see what's happenning with your money!!</p>

      <CardInfo budgetList={budgetList} incomeList={incomeList} />

      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">


        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="lg:col-span-2">
            <h2 className="font-bold text-lg mb-5">Latest Expenses</h2>
            <ExpenseListTable expensesList={expenseList.slice(0,6)} refreshData={() => getBudgetlist()} />
          </div>
        )}

        <div className="grid gap-5">
          <h2 className="font-bold text-lg">Latest Budgets</h2>
          {budgetList?.length > 0 ?
            budgetList.slice(0,4).map((budget, index) => (
              <BudgetItem budget={budget} key={index} />
            ))
            :
            [1, 2, 3, 4].map((item, index) => (
              <div key={index}
                className="h-[180xp] w-full
               bg-slate-200 rounded-lg animate-pulse"
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
}