import clsx from 'clsx'
import React from 'react'
import { IoMdAdd } from 'react-icons/io'

function TaskTitle({label, className}) {
  return (
    <div className='w-full h-10 md:h-12 rounded bg-white flex items-center justify-between'>
        <div className='flex gap-2 items-center m-2'>
            <div className={clsx("w-3 h-3 rounded-full shrink-0", className)}></div>
            <p className='text-sm md:text-base text-gray-600 '>{label}</p>
        </div>

 <button className='hidden md:block'>
    <IoMdAdd className='text-lg text-black'/>
 </button>

    </div>
  )
}

export default TaskTitle 
