import React from 'react'

const Incomeitem = ({budget}) => {
   
  return (
    <div
      className="p-5 pb-7 border rounded-2xl
    hover:shadow-md cursor-pointer "
    >
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2
            className="rounded-full text-3xl p-3
              "
          >
            {budget?.icon}
          </h2>
          <div>
            <h2 className="font-bold">{budget.name}</h2>
            <h2 className="text-sm text-gray-500">{budget.totalItem} Item</h2>
          </div>
        </div>
        <h2 className="font-bold text-primary text-lg"> ₹{budget.amount}</h2>
      </div>
    </div>
  )
}

export default Incomeitem