import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setTotal } from '../redux/Slices/TotalMoneySlice';
import { setBudget } from '../redux/Slices/BudgetSlice';
import { toast } from 'react-hot-toast';

function User() {

  const {totalMoney} = useSelector((state)=>state);
  const {totalExpense} = useSelector((state)=>state);

  const dispatch = useDispatch();

  const balance_ref = useRef(null);
  const budget_ref = useRef(null);

  async function updateTotalMoney(money){
    try{
      await fetch(
        `${process.env.REACT_APP_BASE_URL}/updateMoney/6485a75a603e4e648a4b2478`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
            val: money,
          })
        }
      );
    }catch(err){
      console.log(err);
    }
  }
  async function updateTotalBudget(money){
    try{
      await fetch(
        `${process.env.REACT_APP_BASE_URL}/updateBudget/6485aa21603e4e648a4b2481`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
            val: money,
          })
        }
      );
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    balance_ref.current.addEventListener("keypress",(e)=>{
      if(e.key==="Enter"){
        dispatch(setTotal(parseFloat(e.target.value)));
        updateTotalMoney(parseFloat(e.target.value));
        e.target.value = '';
        toast.success("Total Balance value Reset");
      }
    })
    budget_ref.current.addEventListener("keypress",(e)=>{
      if(e.key==="Enter"){
        dispatch(setBudget(parseFloat(e.target.value)));
        updateTotalBudget(parseFloat(e.target.value));
        e.target.value = '';
        toast.success("Budget Value Reset");
      }
    })
  },[])

  return (
    <div className='w-[60%] mx-auto pt-20'>

      <div className='flex flex-col gap-20'>

        <div className='flex gap-10 items-center'>
          <div>
            <img src="../userImage.png" alt="UserImage" className='w-[200px] h-[200px] object-cover rounded-[50%]' />
          </div>
          <div className='flex flex-col gap-10'>
            <div className='text-5xl font-bold'>Jitesh Pahwa</div>
            <div className='flex gap-10'>
              <div className='font-bold flex flex-col items-center'>
                <div className='text-4xl text-green-500'>&#8377;{totalMoney}</div>
                <div>Total Balance</div>
              </div>
              <div className='font-bold flex flex-col items-center'>
                <div className='text-4xl text-red-500'>&#8377;{totalExpense}</div>
                <div>Total Expenditure</div>
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-5'>
          <div className='text-2xl font-bold flex flex-col gap-3'>
            Reset Total Bank Balance: <input type="text" name="" id="reset_balance" ref={balance_ref}  placeholder='Enter the amount' className='text-2xl placeholder:text-2xl p-3 border border-slate-500 rounded-lg'/>
          </div>
          <div className='text-2xl font-bold flex flex-col gap-3'>
            Reset Total Budget for this Month: <input type="text" name="" id="reset_budget" ref={budget_ref}  placeholder='Enter the amount' className='text-2xl placeholder:text-2xl p-3 border border-slate-500 rounded-lg'/>
          </div>
        </div>

      </div>
      

    </div>
  )
}

export default User