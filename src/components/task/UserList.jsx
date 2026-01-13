import React, { Fragment, useState } from 'react'
import { summary } from '../../assets/data'
import { Listbox, ListboxOption } from '@headlessui/react';
import { BsChevronExpand } from "react-icons/bs";
import clsx from 'clsx';


function UserList({setTeam, team}) {
 const data = summary.users;
 const [selectedUsers, setSelectedUsers] = useState([])

 const handleChange = (el) => {
    setSelectedUsers(el)
    setTeam(el.map((u)=> u._id))
 }

  return (
    <div>
    <p className='text-gray-700'>Assign Task To: </p>
    <Listbox
    value={selectedUsers}
    onChange={(el)=> handleChange(el)}
    multiple
    >
<div className='relative mt-1 '>
<Listbox.Button className='relative w-full cursor-default rounded bg-white pl-3 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-gray-300 sm:text-sm'>
            <span className='block truncate'>
              {selectedUsers?.map((user) => user.name).join(", ")}
            </span>

            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <BsChevronExpand
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>

</div>
    </Listbox>

    <Transition
    as= {Fragment}
    leave='transition ease-in duration-100'
    leaveFrom='opacity-100'
    leaveTo="opacity-0"
    >
<Listbox.Options
className='z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>

    {data?.map((user, index)=> (
        <ListboxOption
        key={index}
        className={({active})=>`relative coursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"}`}

        value={user}
        >
            {({selected})=> (

                <>
                <div className={clsx}>

                </div>
                </>
            )}

        </ListboxOption>
    ))}


</Listbox.Options>

    </Transition>
    </div>
  )
}

export default UserList

