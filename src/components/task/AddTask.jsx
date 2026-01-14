import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ModalWrapper from '../ModalWrapper'
import { Dialog } from '@headlessui/react'
import UserList from './UserList';
import SelectList from '../SelectList';

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"]

const uploadedFileURLs = [];


function AddTask({open , setOpen}) {
    const task = "";
    const {register, handleSubmit, formState: {errors},} = useForm();
    const [team, setTeam] = useState(task?.team || []);
    const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0])


    const SubmitHandler = () => {};
  return (
 <>
<ModalWrapper open={open} setOpen={setOpen}>
    <form onSubmit={handleSubmit(SubmitHandler)}>
<Dialog.Title
as='h2'
className='text-base font-bold leading-6 text-gray-900 mb-4'
>
{task ? "UPDATE TASK" : "ADD TASK"}

</Dialog.Title>

<div className='mt-2 flex flex-col gap-6'>
    <div className='flex flex-col gap-2'>
      <label htmlFor='title' className='text-sm font-medium text-gray-700'>Task Title</label>
      <textarea
        id='title'
        placeholder='Task Title'
        name='title'
        className='w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        {...register("title", {required: "Title is required"})}
        />
      {errors.title && (
          <span className='text-sm text-red-600'>{errors.title.message}</span>
        )}

    </div>
    <UserList
    setTeam={setTeam}
    team={team}
    ></UserList>
<div className='flex gap-4'>
  <SelectList 
  label="Task Stage"
  list={LISTS}
  selected= {stage}
  setSelected={setStage}
  />


</div>



</div>

    </form>

</ModalWrapper>
 </>
  )
}

export default AddTask
