import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ModalWrapper from '../ModalWrapper'
import { Dialog } from '@headlessui/react'
import UserList from './UserList';
import SelectList from '../SelectList';
import Textbox from '../Textbox';
import { BiImages } from "react-icons/bi";
import {Button} from "../ui/button"


const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"]
const uploadedFileURLs = [];


function AddTask({open , setOpen}) {
    const task = "";
    const {register, handleSubmit, formState: {errors},} = useForm();
    const [team, setTeam] = useState(task?.team || []);
    const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0])

    const [priority, setPriority] = useState(
      task?.priority?.toUpperCase() || PRIORIRY[2]
    );
    const [, setAssets] = useState([]);
    const [uploading] = useState(false);

    const handleSelect = (e) => {
      // Handle file selection
      const files = Array.from(e.target.files);
      setAssets(files);
    };

    const SubmitHandler = () => {};
  return (
 <>
<ModalWrapper open={open} setOpen={setOpen}>
    <form onSubmit={handleSubmit(SubmitHandler)} className='w-full'>
<Dialog.Title
as='h2'
className='text-base sm:text-lg font-bold leading-6 text-gray-900 mb-4'
>
{task ? "UPDATE TASK" : "ADD TASK"}
</Dialog.Title>

<div className='mt-2 flex flex-col gap-4 sm:gap-6'>
    <div className='flex flex-col gap-2'>
      <label htmlFor='title' className='text-sm font-medium text-gray-700'>Task Title</label>
      <textarea
        id='title'
        placeholder='Task Title'
        name='title'
        rows={3}
        className='w-full rounded border border-gray-300 px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
        {...register("title", {required: "Title is required"})}
        />
      {errors.title && (
          <span className='text-xs sm:text-sm text-red-600'>{errors.title.message}</span>
        )}
    </div>

    <UserList
      setTeam={setTeam}
      team={team}
    />

    <div className='flex flex-col sm:flex-row gap-4'>
      <div className='w-full sm:w-1/2'>
        <SelectList 
          label="Task Stage"
          lists={LISTS}
          selected={stage}
          setSelected={setStage}
        />
      </div>

      <div className='w-full sm:w-1/2'>
        <Textbox
          placeholder="Date"
          type='date'
          name='date'
          label='Task Date'
          className='w-full rounded'
          register={register("date", {
            required: "Date is required!"
          })}
          error={errors.date ? errors.date.message : ""}
        />
      </div>
    </div>

    <div className='flex flex-col sm:flex-row gap-4'>
      <div className='w-full sm:w-1/2'>
        <SelectList
          label='Priority Level'
          lists={PRIORIRY}
          selected={priority}
          setSelected={setPriority}
        />
      </div>

      <div className='w-full sm:w-1/2 flex items-center justify-center sm:justify-start mt-2 sm:mt-0'>
        <label
          className='flex items-center gap-1 text-sm sm:text-base text-gray-600 hover:text-gray-800 cursor-pointer transition-colors'
          htmlFor='imgUpload'
        >
          <input
            type='file'
            className='hidden'
            id='imgUpload'
            onChange={(e) => handleSelect(e)}
            accept='.jpg, .png, .jpeg'
            multiple={true}
          />
          <BiImages className='text-xl sm:text-2xl' />
          <span className='whitespace-nowrap'>Add Assets</span>
        </label>
      </div>
    </div>

    <div className='bg-gray-50 py-4 sm:py-6 px-2 sm:px-0 flex flex-col sm:flex-row-reverse gap-3 sm:gap-4 mt-2'>
      {uploading ? (
        <span className='text-xs sm:text-sm py-2 text-red-500 text-center sm:text-left'>
          Uploading assets...
        </span>
      ) : (
        <Button
          type='submit'
          className='w-full sm:w-auto bg-blue-600 px-6 sm:px-8 text-sm font-semibold text-white hover:bg-blue-700 py-2 sm:py-2.5'
        >
          Submit
        </Button>
      )}

      <Button
        type='button'
        variant='outline'
        className='w-full sm:w-auto px-5 sm:px-6 text-sm font-semibold text-gray-900 py-2 sm:py-2.5'
        onClick={() => setOpen(false)}
      >
        Cancel
      </Button>
    </div>
</div>

    </form>

</ModalWrapper>
 </>
  )
}

export default AddTask
