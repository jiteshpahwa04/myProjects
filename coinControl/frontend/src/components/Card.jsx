import React, { useState } from 'react'
import {HiPencilSquare} from 'react-icons/hi2'
import {AiFillDelete} from 'react-icons/ai'

function Card({entry, editEntry, deleteEntry}) {

  const [hovering, setIsHovering] = useState(false);

  function handleMouseOver(){
    // console.log("enter");
    setIsHovering(true);
  }
  function handleMouseOut(){
    // console.log("exit");
    setIsHovering(false);
  }

  return (
    <div className='grid grid-cols-[2fr_2fr_1fr] justify-around items-center bg-slate-200 p-5 rounded-2xl big-container'
    onMouseOver={()=>{handleMouseOver()}}
    onMouseOut={()=>{handleMouseOut()}}
    >
        <div className='text-2xl font-bold flex justify-center'>
            {
                entry.moneySpent ? 
                <div className='text-red-500'>-&#8377;{entry.moneySpent}</div> :
                <div className='text-green-500'>+&#8377;{entry.moneyReceived}</div>
            }
        </div>
        <div className='overflow-hidden flex flex-wrap justify-center font-bold'>{entry.name}</div>
        <div>
        {
          hovering && (
            <div className='opacity-0 transition-all ease-in-out hover:opacity-100 duration-150 flex justify-center items-center gap-3'>
              <div className='p-1 rounded-full bg-blue-100 cursor-pointer'
              onClick={()=>{editEntry(entry)}}
              ><HiPencilSquare color='blue' size="20px"/></div>
              <div className='p-1 rounded-full bg-red-100 cursor-pointer'
              onClick={()=>{deleteEntry(entry)}}
              ><AiFillDelete color='red' size="20px"/></div>
            </div>
          )
        }
        </div>
    </div>
  )
}

export default Card