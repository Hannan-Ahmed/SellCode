"use client"
import React from 'react'
import { FaCodeBranch } from "react-icons/fa6";

const Leftbar = () => {
  return (
    <div className="rounded-md overflow-y-hidden  ml-4">
        
      <div className='w-fit border-4 border-gradient-purple-teal  p-2 overflow-y-scroll min-w-full' style={{height:'78vh'} }>
       
        <div className='text-xl text-blue-400 font-semibold ml-9 py-3'>Your Projects</div>



        
       <div className='flex items-center justify-evenly py-3 gap-3 hover:bg-purple-700 hover:rounded-lg hover:px-1 hover:cursor-pointer transition-all duration-300 ease-in-out'>
        <div><FaCodeBranch /></div>
        <div>TechVenture Hub</div>
       </div>
        
       <div className='flex items-center justify-evenly py-3 gap-3 hover:bg-purple-700 hover:rounded-lg hover:px-1 hover:cursor-pointer transition-all duration-300 ease-in-out'>
        <div><FaCodeBranch /></div>
        <div>CodeNest Innovations</div>
       </div>
        
       <div className='flex items-center justify-evenly py-3 gap-3 hover:bg-purple-700 hover:rounded-lg hover:px-1 hover:cursor-pointer transition-all duration-300 ease-in-out'>
        <div><FaCodeBranch /></div>
        <div>DataVerse</div>
       </div>
        
       <div className='flex items-center justify-evenly py-3 gap-3 hover:bg-purple-700 hover:rounded-lg hover:px-1 hover:cursor-pointer transition-all duration-300 ease-in-out'>
        <div><FaCodeBranch /></div>
        <div>BinaryFlow Studios</div>
       </div>

       <div className='flex items-center justify-evenly py-3 gap-3 hover:bg-purple-700 hover:rounded-lg hover:px-1 hover:cursor-pointer transition-all duration-300 ease-in-out'>
        <div><FaCodeBranch /></div>
        <div>ByteHive Labs</div>
       </div>


       <div className='flex items-center justify-evenly py-3 gap-3 hover:bg-purple-700 hover:rounded-lg hover:px-1 hover:cursor-pointer transition-all duration-300 ease-in-out'>
        <div><FaCodeBranch /></div>
        <div>BitLoom Dynamics</div>
       </div>


       <div className='flex items-center justify-evenly py-3 gap-3 hover:bg-purple-700 hover:rounded-lg hover:px-1 hover:cursor-pointer transition-all duration-300 ease-in-out'>
        <div><FaCodeBranch /></div>
        <div>CodeCraft Enterprises</div>
       </div>
        
     
      
      </div>
    </div>
  )
}

export default Leftbar
