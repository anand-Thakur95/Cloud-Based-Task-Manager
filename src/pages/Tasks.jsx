import React, { useState } from 'react'
import { FaList } from 'react-icons/fa'
import { MdGridView } from 'react-icons/md'
import Loading from '../components/Loading.jsx';
import { useParams } from 'react-router-dom';
import { Button } from '@headlessui/react';
import Title from '../components/Title.jsx';



const TABS = [
  {title:"Board View", icon:<MdGridView/>},
  {title: "List View", icon: <FaList/>}
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in process": "bg-yellow-600",
  comleted: "bg-green-600",
};
function Tasks() {
  const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true)

const status = params?.status || "";
  return loading ? (
  <div className='py-20 '>
    <Loading/>
  </div>
  ) : (
    <div className='w-full'>
      <div className='flex items-center justify-center mb-4'>
        <Title title={status ? `${status} Tasks` : "Task"} />


        {/* {
          !status && <Button
          label="Create Task"
          icon={<IoMdAdd className="text-lg" />}
          className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5" />
        } */}
      </div>
      
    </div>
  )

}

export default Tasks
