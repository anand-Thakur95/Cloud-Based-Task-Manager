import React, { useState } from 'react'
import { FaList } from 'react-icons/fa'
import { IoMdAdd } from 'react-icons/io';
import { MdGridView } from 'react-icons/md'
import Loading from '../components/Loading.jsx';
import { useParams } from 'react-router-dom';
import Title from "../components/Title.jsx"
import {Button } from "../components/ui/button.jsx"
import Tabs from '../components/Tabs.jsx';
import TaskTitle from '../components/TaskTitle.jsx';
import BoarderView from '../components/BoardView.jsx';
import { tasks } from "../assets/data";

const TABS = [
  {title:"Board View", icon:<MdGridView/>},
  {title: "List View", icon: <FaList/>}
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};
const Tasks = () => {
  const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const status = params?.status || "";

  return loading ? (
    <div className='py-10'>
      <Loading />
    </div>
  ) : (
    <div className='w-full py-20'>
      <div className='flex items-center justify-between mb-4'>
        <Title title={status ? `${status} Tasks` : "Tasks"} />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label='Create Task'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
          >Create Task</Button>
        )}
      </div>

{/* Tabs  */}
<div>
<Tabs tabs={TABS}  setSelected={setSelected}>
 {
  !status && (
    <div className='w-full flex justify-between gap-4 md:gap-x-12 py-4 rounded-md'>
      <TaskTitle label="To Do" className={TASK_TYPE.todo} />
      <TaskTitle label="In Progress" className={TASK_TYPE["in progress"]} />
      <TaskTitle label="Completed" className={TASK_TYPE.completed} />

    </div>
 )}
{selected === 0 ? <BoarderView tasks={tasks}/> : <div></div>}
</Tabs>
 
</div>
   
</div>
  )
}
export default Tasks;
