import clsx from 'clsx';
import React, { useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from 'react-icons/md';

const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  import { useSelector } from "react-redux"
function TaskCard({ task}) {
    const { user } = useSelector((state)=> state.auth)
    const [open, setOpen] = useState(false);

  return (
<>
<div className='w-full h-fit bg-white shadow-md p-4 rounded'>
    <div className={clsx("flex flex-1 gap-1 items-center text-sm font-medium", PRIORITYSTYLES[task?.priority])}>

<span className='text-lg'>{ICONS[task?.priority]}</span>
<span className='uppercase'>{task?.priority}</span>
    </div>
{user?.isAdmin && <TaskDialog task={task}/>}
</div>

</>
  )
}

export default TaskCard
