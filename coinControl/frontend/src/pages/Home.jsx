import React, { useEffect, useRef, useState } from 'react'
// import {data} from '../Data';
import Card from '../components/Card';
import AccDetails from '../components/AccDetails';
import { BarChart } from '../components/BarChart';
import { useDispatch, useSelector } from 'react-redux';
import { setBudget } from '../redux/Slices/BudgetSlice';
import { addExpense, removeExpense, setExpense } from '../redux/Slices/ExpenseSlice';
import { addTotal, subtractTotal, setTotal } from '../redux/Slices/TotalMoneySlice';
import { toast } from 'react-hot-toast';

function Home() {

    const [allEntries, setAllEntries] = useState([]);

    const moneyValue = useRef(null);
    const sen_rec_name = useRef(null);

    const dispatch = useDispatch();

    const {totalMoney} = useSelector((state)=>state);
    const {totalExpense} = useSelector((state)=>state);

    async function getTotals(){
        try{
            const res1 = await fetch(
                `${process.env.REACT_APP_BASE_URL}/getTotalBudget`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
            );
            const data1 = await res1.json();
            console.log(data1.data[0].value);
            const val1 = data1.data[0].value;
            dispatch(setBudget(val1));

            const res2 = await fetch(
                `${process.env.REACT_APP_BASE_URL}/getTotalMoney`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
            );
            const data2 = await res2.json();
            console.log(data2.data[0].value);
            const val2 = data2.data[0].value;
            dispatch(setTotal(val2));

            const res3 = await fetch(
                `${process.env.REACT_APP_BASE_URL}/getTotalExpense`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
            );
            const data3 = await res3.json();
            console.log(data3.data[0].value);
            const val3 = data3.data[0].value;
            dispatch(setExpense(val3));

        }catch(err){
            console.log("Error is: ",err);
        }
    }

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
                val: totalMoney+money,
              })
            }
          );
        }catch(err){
          console.log(err);
        }
      }

      async function updateTotalExpense(money){
        try{
          await fetch(
            `${process.env.REACT_APP_BASE_URL}/updateExpense/6485aa15603e4e648a4b247e`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body:JSON.stringify({
                val: totalExpense+money,
              })
            }
          );
        }catch(err){
          console.log(err);
        }
      }

    async function createEntry(name, moneyReceived, moneySpent){
        try{
            const res = await fetch(
                `${process.env.REACT_APP_BASE_URL}/createEntry`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name: name.length>0 ? name : "Personal",
                    moneyReceived: moneyReceived,
                    moneySpent: moneySpent
                  })
                }
            );
            await fetchAllEntries();
        }catch(err){
            console.log("Error is: ", err);
        }
    }

    async function spendMoney(){
        const val = parseFloat(moneyValue.current.value);
        const name = sen_rec_name.current.value.lenght===0 ? "Personal" : sen_rec_name.current.value;
        if(val){
            if(totalMoney>=val){
                await updateTotalExpense(val);
                await updateTotalMoney(-val);
                dispatch(subtractTotal(val));
                dispatch(addExpense(val));
                setAllEntries([...allEntries, {
                    "name": name ? name : "Personal",
                    "moneySpent": val,
                }])
                await createEntry(name, null, val);
                toast.success("Money Spent");
            }
        }else{
            toast.error("Please enter a valid Amount");
        }
        moneyValue.current.value = '';
        sen_rec_name.current.value = '';
    }

    async function addMoney(){
        const val = parseFloat(moneyValue.current.value);
        const name = sen_rec_name.current.value.lenght===0 ? "Personal" : sen_rec_name.current.value;
        if(val){
            await updateTotalMoney(val);
            dispatch(addTotal(val));
            setAllEntries([...allEntries, {
                "name": name ? name : "Personal",
                "moneyReceived": val,
            }])
            await createEntry(name, val, null);
            toast.success("Added Money to Balance");
        }else{
            toast.error("Please enter a valid Amount");
        }
        moneyValue.current.value = '';
        sen_rec_name.current.value = '';
    }
 
    function editEntry(entry){
        deleteEntry(entry);
        moneyValue.current.value = entry.moneySpent ? entry.moneySpent : entry.moneyReceived;
        sen_rec_name.current.value = entry.name ? entry.name : '';
    }

    async function deleteEntry(entry){

        try{
            const res = await fetch(
                `${process.env.REACT_APP_BASE_URL}/deleteEntry/${entry._id}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                } 
              );

            if(entry.moneyReceived){
                dispatch(subtractTotal(parseFloat(entry.moneyReceived)));
                await updateTotalMoney(-entry.moneyReceived);
            }else{
                await updateTotalExpense(-entry.moneySpent);
                await updateTotalMoney(entry.moneySpent);
                dispatch(removeExpense(parseFloat(entry.moneySpent)));
                dispatch(addTotal(parseFloat(entry.moneySpent)));
            }
        }catch(err){
            console.log("Error is: ", err);
        }

        console.log(entry._id);
        setAllEntries(allEntries.filter((obj)=>obj._id!==entry._id));
        console.log(allEntries);
        toast.success("Entry Deleted");
    }

    async function fetchAllEntries(){
        try{
            const res = await fetch(
                `${process.env.REACT_APP_BASE_URL}/getEntries`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
            // console.log(res);
            const data = await res.json();
            setAllEntries(data.data);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchAllEntries();
        getTotals();
    },[])

  return (
    <div className='grid grid-cols-[1fr_2fr_1fr] p-5'>
        <div>
            <AccDetails />
        </div>
        <div className='flex flex-col gap-5'>
            <div className='grid grid-cols-[2fr_1fr] items-center w-full justify-between gap-5'>
                <div className='flex flex-col gap-2'>
                    <input type="text" name="" id="" ref={moneyValue} placeholder='Enter the amount' className='text-2xl placeholder:text-2xl p-3 border border-slate-500 rounded-lg'/>
                    <input type="text" name="" id="" ref={sen_rec_name} placeholder='From or To (Default : Personal)' className='text-2xl placeholder:text-2xl p-3 border border-slate-500 rounded-lg'/>
                </div>
                <div className='flex flex-col gap-2'>
                    <button className='font-bold text-white text-xl bg-red-500 p-3 rounded-lg'
                    onClick={spendMoney}
                    >Debit</button>
                    <button className='font-bold text-white text-xl bg-green-500 p-3 rounded-lg'
                    onClick={addMoney}
                    >Credit</button>
                </div>
            </div>
            {
                allEntries.map((entry, i)=>(
                    <Card entry={entry} editEntry={editEntry} deleteEntry={deleteEntry} key={i} />
                ))
            }
        </div>
        <div className='flex flex-col gap-10'>
            <div className='text-5xl font-bold flex items-center justify-center'>Statistics</div>
            <BarChart totalExpense={totalExpense} totalMoney={totalMoney} />
        </div>
    </div>
  )
}

export default Home;