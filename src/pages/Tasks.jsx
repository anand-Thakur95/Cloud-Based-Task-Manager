import React, { useState } from 'react'
import { FaList } from 'react-icons/fa'
import { MdGridView } from 'react-icons/md'
import Loading from '../components/Loading';



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


  return loading ? (
  <div className='py-10'>
    <Loading/>
  </div>
  ) : (
    <div></div>
  )
}

export default Tasks
