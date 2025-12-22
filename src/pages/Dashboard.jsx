import React from "react";
import { clsx } from "clsx";
import moment from "moment";
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import { LuClipboardPen } from "react-icons/lu";

import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { Chart } from "../components/Chart";
import {summary} from "../assets/data.js"
import UserInfo from "../components/UserInfo";

const TaskTable = ({ tasks = [] }) => {
  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  const PRIORITY_COLORS = {
    high: "text-red-500",
    medium: "text-yellow-500",
    low: "text-blue-500",
  };

  const STAGE_COLORS = {
    todo: "bg-gray-400",
    "in progress": "bg-blue-400",
    completed: "bg-green-500",
  };

  const BGS = [
    "bg-[#1d4ed8]",
    "bg-[#0f766e]",
    "bg-[#f59e0b]",
    "bg-[#be185d]",
    "bg-[#7c3aed]",
    "bg-[#dc2626]",
  ];

  const getInitials = (name) => {
    if (typeof name === "string") {
      return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return name[0]?.toUpperCase() || "";
  };

  const TableHeader = () => (
    <thead className="border-gray-300">
      <tr className="text-black text-left">
        <th className="py-2">Task Title</th>
        <th className="py-2">Priority</th>
        <th className="py-2">Team</th>
        <th className="py-2 hidden md:block">Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10">
      <td className="py-2">
        <div className="flex items-center gap-2">
          <div
            className={clsx("w-4 h-4 rounded-full", STAGE_COLORS[task.stage])}
          ></div>
          <span className="font-medium">{task.title}</span>
        </div>
      </td>
      <td className="py-2">
        <div className="flex items-center gap-1">
          <span className={clsx(PRIORITY_COLORS[task.priority])}>
            {ICONS[task.priority]}
          </span>
          <span className="capitalize">{task.priority}</span>
        </div>
      </td>


      <td className="py-2">
        <div className="flex">
          {Array.isArray(task.team)
            ? task.team.map((member, index) => (
                <div
                  key={index}
                  className={clsx(
                    "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm font-semibold -mr-1",
                    BGS[index % BGS.length]
                  )}
                 
                >
                 
                 <UserInfo user={member} />
                </div>
              ))
            : (
                <div
                  className={clsx(
                    "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm font-semibold",
                    BGS[task.team.length % BGS.length]
                  )}
                  title={task.team}
                >
                  {getInitials(task.team)}
                </div>
              )}
        </div>
      </td>
      <td className="py-2 hidden md:block">{moment(task?.date).fromNow()}</td>
    </tr>
  );

  return (
    <div className="w-full bg-white px-2 md:px-4 pb-4 shadow-md rounded">
      <table className="w-full">
        <TableHeader />
        <tbody>
          {tasks?.map((task, id) => (
            <TableRow key={task._id || id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

function Dashboard() {
  const totals = summary.tasks;

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: summary.totalTasks,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLTED TASK",
      total: totals.completed,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS ",
      total: totals["in progress"],
      icon: <LuClipboardPen />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals.todo,
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]",
    },
  ];
  const Card = ({ icon, bg, label, count }) => {
    return (
      <div className="w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between">
        <div className="h-full flex flex-1 flex-col items-start justify-between">
          <p className="text-sm text-gray-500">{label}</p>
          <span className="text-2xl font-bold">{count}</span>
          <span className="text-sm text-gray-500">{"129 days"}</span>
        </div>

        <div
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center text-white",
            bg
          )}
        >
          {icon}
        </div>
      </div>
    );
  };
  return (
    <div className="relative top-16 h-full py-4 px-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {stats.map(({ icon, label, total, bg }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      <div className="w-full bg-white my-16 p-4 rounded shadow-sm">
        <h4 className="text-lg font-bold">Chart by Priority</h4>
        <Chart/>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
        {/* left  */}
        <TaskTable tasks={summary?.last10Task} />

        {/* right */}
        <div>
        
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
