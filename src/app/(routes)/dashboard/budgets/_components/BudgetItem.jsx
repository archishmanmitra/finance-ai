import Link from 'next/link'
import React from 'react'

const BudgetItem = ({budget}) => {
    const calcProgressPercent = ()=>{
        const perc= (budget.totalSpend/budget.amount)*100;
        return perc.toFixed(2);
    }
  return (
    <Link href={'/dashboard/expenses/'+budget?.id} className='p-5 border rounded-lg hover:shadow-md cursor-pointer'>
        <div className='flex gap-2 items-center justify-between'>
            <div className='flex gap-2 items-center'>
                <h2 className='rounded-full text-3xl p-3'>{budget?.icon}</h2>
                <div>
                    <h2 className='font-semibold '>{budget.name}</h2>
                    <h2 className='text-sm text-gray-500'>{budget.totalItem} Item</h2>
                </div>
            </div>
            <h2 className='font-bold text-primary text-lg'>₹{budget.amount}</h2>
        </div>
        <div className='mt-5'>
            <div className='flex items-center justify-between mb-3'>
                <h2 className='text-xs text-slate-400'>₹{budget.totalSpend?budget.totalSpend:0} Spend</h2>
                <h2 className='text-xs text-slate-400'>Remaining ₹{budget.amount-budget.totalSpend}</h2>
            </div>
            <div className='w-full h-2 rounded-full bg-slate-300'>
                <div className=' h-2 rounded-full bg-primary' style={{
                    width: `${calcProgressPercent()}%`
                }} ></div>
            </div>
        </div>
    </Link>
  )
}

export default BudgetItem