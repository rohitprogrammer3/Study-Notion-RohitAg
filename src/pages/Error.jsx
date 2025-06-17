import React from 'react'
import {TbError404} from "react-icons/tb"

const Error = () => {
  return (
    <div className='flex flex-col justify-center items-center mx-auto my-auto font-bold text-4xl font-edu-sa text-[#FF0000] border-pink-100 border p-10 w-4/12 bg-[rgb(220,20,60,0.2)]'>
      <p className='text-lg'>Error</p>
     <TbError404 className='text-9xl'/>
     <p className='text-lg'>Page not found</p>
    </div>
  )
}

export default Error