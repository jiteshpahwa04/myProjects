import React from 'react'
import {HiCurrencyRupee} from 'react-icons/hi';
import {FaRegUser} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div>
        <nav className='flex justify-between p-3 bg-slate-100'>
            <NavLink to="/">
                <div className='flex items-center gap-3 cursor-pointer'>
                    <div><HiCurrencyRupee  size="70px"/></div>
                    <h1 className='text-3xl font-bold'>CoinControl</h1>
                </div>
            </NavLink>
            <div className='flex items-center pr-5 cursor-pointer'>
                <NavLink to="/user">
                    <img src="../userImage.png" alt="UserImage" className='w-[50px] h-[50px] object-cover rounded-[50%]' />
                </NavLink>
            </div>
        </nav>
    </div>
  )
}

export default Navbar