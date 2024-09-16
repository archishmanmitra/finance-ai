import React from 'react'
import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip} from 'recharts'

const BarChart = ({budgetList}) => {
  return (
    <div className='rounded-2xl border p-5'>
        <h2 className='font-bold text-lg'>Activity</h2>
        <ResponsiveContainer width={'80%'} height={300}>
            <BarChart data={budgetList} margin={{top:7}}>
                <XAxis dataKey='name'/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey='totalSpend' stackId='a' fill='#4845d2'/>
                <Bar dataKey='amount' stackId='a' fill='#c3c2ff'/>
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default BarChart