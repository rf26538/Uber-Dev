import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div className='h-screen pt-5 flex justify-between flex-col w-full bg-[url("/assets/images/uber-home-bg.jpg")] bg-cover'>
        <img src="/assets/images/uber-logo.png" alt="Uber Logo" className='w-16 ml-4'/>
        <div className='bg-white pb-7 py-5 px-4'>
          <h1 className='text-[30px] font-bold'>Get Started With Uber</h1>
          <Link to="/login" className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start;