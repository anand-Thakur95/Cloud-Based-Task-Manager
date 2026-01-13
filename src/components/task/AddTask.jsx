import React from 'react'
import ModalWrapper from '../ModalWrapper'
import { Dialog } from '@headlessui/react'

function AddTask({open , setOpen}) {
    const task = ""
  return (
 <>
<ModalWrapper open={open} setOpen={setOpen}>
    <form action="">
<Dialog.Title
as='h2'
className='text-base font-bold leading-6 text-gray-900 mb-4'
>
{task ? "UPDATE TASK" : "ADD TASK"}

</Dialog.Title>

    </form>

</ModalWrapper>
 </>
  )
}

export default AddTask
