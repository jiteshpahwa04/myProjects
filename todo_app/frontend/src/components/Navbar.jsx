import React from 'react'
import logo from "../logo.png";
import {FaUserAlt} from "react-icons/fa";

function Navbar() {
  return (
    <div className='flex justify-between content-center'>
      <div>
        <img src={logo} alt="Logo" width="80px"/>
      </div>
      <div className='flex justify-center items-center'>
        <FaUserAlt size="40px"/>
      </div>
    </div>
  )
}

export default Navbar;