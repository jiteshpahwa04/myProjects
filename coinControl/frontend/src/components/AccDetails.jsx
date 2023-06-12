import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {useSelector} from 'react-redux';

function AccDetails() {

    const {budget} = useSelector((state)=>state);
    const {totalMoney} = useSelector((state)=>state);
    const {totalExpense} = useSelector((state)=>state);

    useEffect(()=>{
        if(budget-totalExpense<0){
            toast.error("You went below the Budget");
        }
    },[])

  return (
    <div className='flex flex-col justify-center items-center gap-10'>
        <div className='text-5xl font-bold'>
            Summary
        </div>
        <div className='text-2xl font-bold flex flex-col gap-5'>
            <div className='grid grid-cols-2 items-center'>
                Money Left to Spend: <div className='text-green-500 text-3xl flex justify-center'>&#8377;{budget-totalExpense>=0 ? budget-totalExpense : 0}</div>
            </div>
            <div className='grid grid-cols-2 items-center'>
                Money Spent: <div className='text-red-500 text-3xl flex justify-center'>&#8377;{totalExpense}</div>
            </div>
            <div className='grid grid-cols-2 items-center'>
                Total Balance: <div className='text-green-500 text-3xl flex justify-center'>&#8377;{totalMoney}</div>
            </div>
            <div className='grid grid-cols-2 items-center'>
                This Month's Budget: <div className='text-green-500 text-3xl flex justify-center'>&#8377;{budget}</div>
            </div>
        </div>
    </div>
  )
}

export default AccDetails