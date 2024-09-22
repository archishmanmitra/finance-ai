"use client"
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import { db } from '../../../../../../utils/dbConfig';
import { Expenses, Income } from '../../../../../../utils/schema';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import Incomeitem from './Incomeitem';
import CreateIncome from './CreateIncome';

const IncomeList = () => {
    const [incomelist, setIncomelist] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    user && getIncomelist();
  }, [user]);

  const getIncomelist = async () => {
    const result = await db
      .select({
        ...getTableColumns(Income),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Income)
      .leftJoin(Expenses, eq(Income.id, Expenses.budgetId))
      .where(eq(Income.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Income.id)
      .orderBy(desc(Income.id));
    setIncomelist(result);
  };
  return (
    <div className="mt-7">
      <div
        className="grid grid-cols-1
        md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <CreateIncome refreshData={() => getIncomelist()} />
        {incomelist?.length > 0
          ? incomelist.map((budget, index) => (
              <Incomeitem budget={budget} key={index} />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 rounded-lg
        h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  )
}

export default IncomeList