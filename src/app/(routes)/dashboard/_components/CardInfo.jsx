import React, {useState,useEffect} from 'react'

import { 
    PiggyBank,
    ReceiptText, 
    Wallet,
    Sparkles,
    CircleDollarSign
 } from 'lucide-react'
import formatNumber from '../../../../../utils';
import getFinancialAdvice from '../../../../../utils/getFinancialAdvice';

const CardInfo = ({budgetList, incomeList}) => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [financialAdvice, setFinancialAdvice] = useState("");

  useEffect(() => {
    if(budgetList?.length>0 || incomeList?.length>0 ){
      CalculateCardInfo();
    }
  }, [budgetList, incomeList]);

  useEffect(() => {
    if(totalBudget>0 || totalIncome>0 || totalSpent>0){
      const fetchFinancialAdvice = async ()=> {
        const advice = await getFinancialAdvice(totalBudget,totalIncome,totalSpent);
        setFinancialAdvice(advice);
      }
      fetchFinancialAdvice();
    }
  }, [totalBudget,totalIncome,totalSpent]);

  const CalculateCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    let totalIncome_ = 0;

    budgetList.forEach((element) => {
      totalBudget_ = totalBudget_ + Number(element.amount);
      totalSpend_ = totalSpend_ + element.totalSpend;
    });

    incomeList.forEach((element) => {
      totalIncome_ = totalIncome_ + element.totalAmount;
    });

    setTotalIncome(totalIncome_);
    setTotalBudget(totalBudget_);
    setTotalSpent(totalSpend_);
  }
  
  return (
    <div>
      { budgetList?.length>0 ? (
        <div> 
          {/* AI Section */}
          <div className='border rounded-2xl p-7 flex items-center justify-center mt-4 -mb-1'>
            <div>
              <div className='flex mb-2 items-center space-x-1'>
                <h2 className='text-base font-semibold'>AI Adviser</h2>
                <Sparkles className='rounded-full text-white w-10 h-10'/>
              </div>
              <h2 className='text-base font-light'>{financialAdvice || "Loading..."}</h2>
            </div>
          </div>
          {/* Card Section */}
          <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
            <div className="flex items-center justify-between p-7 border rounded-2xl">
              <div>
                <h2 className='text-base'>Total Budget</h2>
                <h2 className='text-2xl font-bold'>₹ {formatNumber(totalBudget)}</h2>
              </div>
              <PiggyBank className='bg-primary p-3 h-12 w-12 rounded-full text-white'/>
            </div>
            <div className="flex items-center justify-between p-7 border rounded-2xl">
              <div>
                <h2 className='text-base'>Total Spent</h2>
                <h2 className='text-2xl font-bold'>₹ {formatNumber(totalSpent)}</h2>
              </div>
              <ReceiptText className='bg-primary p-3 h-12 w-12 rounded-full text-white'/>
            </div>
            <div className="flex items-center justify-between p-7 border rounded-2xl">
              <div>
                <h2 className='text-base'>No. of Budgets</h2>
                <h2 className='text-2xl font-bold'>{budgetList?.length}</h2>
              </div>
              <Wallet className='bg-primary p-3 h-12 w-12 rounded-full text-white'/>
            </div>
            <div className="flex items-center justify-between p-7 border rounded-2xl">
              <div>
                <h2 className='text-base'>Sum of Income Streams</h2>
                <h2 className='text-2xl font-bold'>₹ {formatNumber(totalIncome)}</h2>
              </div>
              <CircleDollarSign className='bg-primary p-3 h-12 w-12 rounded-full text-white'/>
            </div>     
          </div>
        </div>
      ) : (
      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4].map((item, index) => (
            <div
              className="h-[110px] w-full bg-slate-200 animate-pulse rounded-lg"
              key={index}
            ></div>
          ))}
        </div>
        )}
    </div>
  )
}

export default CardInfo 