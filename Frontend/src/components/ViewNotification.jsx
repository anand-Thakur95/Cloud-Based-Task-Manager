import React from "react";
import ModelWrapper from "./ModalWrapper"
import { Button, Dialog } from "@headlessui/react"

const ViewNotification = ({ open, setOpen, el }) => {

    return (
<>
<ModelWrapper open={open} setOpen={setOpen}>
<div className="py-4 w-full flex flex-col gap-4 items-center justify-center">
    <Dialog.Title as='h3' className='font-semibold text-lg'>
        {el?.task?.title}
    </Dialog.Title>
<p className="text-start text-gray-500">{el?.text}</p>

<Button
type="button"
className='bg-white px-8 mt-3 text-sm font-semibold text-gray-900 sm:w-auto border'
onClick={()=> setOpen(false)}
label='Ok'
>


</Button>

</div>

</ModelWrapper>

</>


    )


}

export default ViewNotification