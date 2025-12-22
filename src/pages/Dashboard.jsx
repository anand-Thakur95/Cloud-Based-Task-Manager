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
import { getInitials } from "../utils";

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
        <th className="py-2 text-xs sm:text-sm">Task Title</th>
        <th className="py-2 text-xs sm:text-sm">Priority</th>
        <th className="py-2 text-xs sm:text-sm hidden sm:table-cell">Team</th>
        <th className="py-2 text-xs sm:text-sm hidden md:table-cell">Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10">
      <td className="py-2">
        <div className="flex items-center gap-2">
          <div
            className={clsx("w-3 h-3 sm:w-4 sm:h-4 rounded-full shrink-0", STAGE_COLORS[task.stage])}
          ></div>
          <span className="font-medium text-xs sm:text-sm truncate max-w-[150px] sm:max-w-none">{task.title}</span>
        </div>
      </td>
      <td className="py-2">
        <div className="flex items-center gap-1">
          <span className={clsx(PRIORITY_COLORS[task.priority], "text-sm sm:text-base")}>
            {ICONS[task.priority]}
          </span>
          <span className="capitalize text-xs sm:text-sm hidden xs:inline">{task.priority}</span>
        </div>
      </td>
      <td className="py-2 hidden sm:table-cell">
        <div className="flex">
          {Array.isArray(task.team)
            ? task.team.map((member, index) => (
                <div
                  key={index}
                  className={clsx(
                    "w-6 h-6 sm:w-7 sm:h-7 rounded-full text-white flex items-center justify-center text-xs sm:text-sm font-semibold -mr-1",
                    BGS[index % BGS.length]
                  )}
                >
                  <UserInfo user={member} />
                </div>
              ))
            : (
                <div
                  className={clsx(
                    "w-6 h-6 sm:w-7 sm:h-7 rounded-full text-white flex items-center justify-center text-xs sm:text-sm font-semibold",
                    BGS[task.team.length % BGS.length]
                  )}
                  title={task.team}
                >
                  {getInitials(task.team)}
                </div>
              )}
        </div>
      </td>
      <td className="py-2 hidden md:table-cell">
        <span className="text-xs sm:text-sm text-gray-600">
          {moment(task?.date).fromNow()}
        </span>
      </td>
    </tr>
  );

  return (
    <div className="w-full bg-white px-2 sm:px-3 md:px-4 pb-4 shadow-md rounded overflow-x-auto">
      <div className="min-w-full">
        <table className="w-full min-w-[600px]">
          <TableHeader />
          <tbody>
            {tasks?.map((task, id) => (
              <TableRow key={task._id || id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const UserTable = ({users}) =>{
const TableHeader = () =>(
  <thead className="border-b border-gray-300 dark:border-gray-600">
<tr className="text-black dark:text-white text-left">
  <th className="py-2 text-xs sm:text-sm">Full Name</th>
  <th className="py-2 text-xs sm:text-sm hidden sm:table-cell">Status</th>
  <th className="py-2 text-xs sm:text-sm hidden md:table-cell">Created At</th>
</tr>
  </thead>
);

const TableRow = ({ user }) => (
  <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
    <td className="py-2">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full text-white flex items-center justify-center text-xs sm:text-sm bg-violet-700 shrink-0">
          <span className="text-center">{getInitials(user?.name)}</span>
        </div>
        <div className="min-w-0">
          <p className="font-medium text-xs sm:text-sm truncate">{user?.name || "N/A"}</p>
        </div>
      </div>
    </td>
    <td className="py-2 hidden sm:table-cell">
      <span className={clsx(
        "px-2 py-1 rounded-full text-xs font-semibold inline-block",
        user?.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
      )}>
        {user?.isActive ? "Active" : "Inactive"}
      </span>
    </td>
    <td className="py-2 hidden md:table-cell">
      <span className="text-xs sm:text-sm text-gray-600">
        {moment(user?.createdAt).fromNow()}
      </span>
    </td>
  </tr>
)

return (
  <div className="w-full lg:w-2/4 bg-white h-fit px-2 sm:px-3 md:px-4 lg:px-6 py-4 shadow-md rounded">
    <table className="w-full mb-5">
      <TableHeader/>
      <tbody>
        {users?.map((user, index) => (
          <TableRow key={index + user?._id} user={user} />
        ))}
      </tbody>
    </table>
  </div>
)

}


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
      <div className="w-full h-28 sm:h-32 bg-white p-4 sm:p-5 shadow-md rounded-md flex items-center justify-between">
        <div className="h-full flex flex-1 flex-col items-start justify-between min-w-0">
          <p className="text-xs sm:text-sm text-gray-500 truncate w-full">{label}</p>
          <span className="text-xl sm:text-2xl font-bold">{count}</span>
          <span className="text-xs sm:text-sm text-gray-500">{"129 days"}</span>
        </div>

        <div
          className={clsx(
            "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white shrink-0 ml-2",
            bg
          )}
        >
          {icon}
        </div>
      </div>
    );
  };
  return (
    <div className="relative top-16 h-full py-4 px-3 sm:px-4 md:px-5 max-w-full overflow-x-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {stats.map(({ icon, label, total, bg }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      <div className="w-full bg-white my-8 sm:my-12 md:my-16 p-3 sm:p-4 rounded shadow-sm overflow-hidden">
        <h4 className="text-base sm:text-lg font-bold mb-2 sm:mb-4">Chart by Priority</h4>
        <div className="w-full overflow-x-auto">
          <Chart/>
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-4 xl:gap-6 2xl:gap-10 py-6 sm:py-8">
        <div className="w-full lg:flex-1">
          <TaskTable tasks={summary?.last10Task} />
        </div>
        <div className="w-full lg:w-auto lg:flex-1">
          <UserTable users={summary.users} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
