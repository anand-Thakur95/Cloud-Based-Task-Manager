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
import UserInfo from "../components/UserInfo";
import { getInitials } from "../utils";
import { useGetDashboardStatsQuery } from "../redux/slices/taskApiSlice";

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
    <thead className="border-b border-gray-300">
      <tr className="text-black text-left">
        <th className="py-2 px-2 text-xs sm:text-sm">Task Title</th>
        <th className="py-2 px-2 text-xs sm:text-sm">Priority</th>
        <th className="py-2 px-2 text-xs sm:text-sm">Team</th>
        <th className="py-2 px-2 text-xs sm:text-sm">Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10">
      <td className="py-3 px-2">
        <div className="flex items-center gap-2">
          <div
            className={clsx("w-3 h-3 rounded-full shrink-0", STAGE_COLORS[task.stage])}
          ></div>
          <span className="font-medium text-xs sm:text-sm line-clamp-2">{task.title}</span>
        </div>
      </td>
      <td className="py-3 px-2">
        <div className="flex items-center gap-1">
          <span className={clsx(PRIORITY_COLORS[task.priority], "text-base sm:text-lg")}>
            {ICONS[task.priority]}
          </span>
          <span className="capitalize text-xs sm:text-sm hidden sm:inline">{task.priority}</span>
        </div>
      </td>
      <td className="py-3 px-2">
        <div className="flex -space-x-1">
          {Array.isArray(task.team)
            ? task.team.slice(0, 2).map((member, index) => (
                <div
                  key={index}
                  className={clsx(
                    "w-6 h-6 sm:w-7 sm:h-7 rounded-full text-white flex items-center justify-center text-xs font-semibold",
                    BGS[index % BGS.length]
                  )}
                >
                  <UserInfo user={member} />
                </div>
              ))
            : (
                <div
                  className={clsx(
                    "w-6 h-6 sm:w-7 sm:h-7 rounded-full text-white flex items-center justify-center text-xs font-semibold",
                    BGS[task.team.length % BGS.length]
                  )}
                  title={task.team}
                >
                  {getInitials(task.team)}
                </div>
              )}
          {Array.isArray(task.team) && task.team.length > 2 && (
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs font-semibold">
              +{task.team.length - 2}
            </div>
          )}
        </div>
      </td>
      <td className="py-3 px-2">
        <span className="text-xs sm:text-sm text-gray-600">
          {moment(task?.date).fromNow()}
        </span>
      </td>
    </tr>
  );

  return (
    <div className="w-full bg-white px-3 sm:px-4 pb-4 shadow-md rounded">
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

const UserTable = ({users}) =>{
const TableHeader = () =>(
  <thead className="border-b border-gray-300 dark:border-gray-600">
<tr className="text-black dark:text-white text-left">
  <th className="py-2 px-2 text-xs sm:text-sm">Full Name</th>
  <th className="py-2 px-2 text-xs sm:text-sm">Status</th>
  <th className="py-2 px-2 text-xs sm:text-sm">Created At</th>
</tr>
  </thead>
);

const TableRow = ({ user }) => (
  <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
    <td className="py-3 px-2">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full text-white flex items-center justify-center text-xs sm:text-sm bg-violet-700 shrink-0">
          <span className="text-center">{getInitials(user?.name)}</span>
        </div>
        <div className="min-w-0">
          <p className="font-medium text-xs sm:text-sm line-clamp-1">{user?.name || "N/A"}</p>
        </div>
      </div>
    </td>
    <td className="py-3 px-2">
      <span className={clsx(
        "px-2 py-1 rounded-full text-xs font-semibold inline-block",
        user?.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
      )}>
        {user?.isActive ? "Active" : "Inactive"}
      </span>
    </td>
    <td className="py-3 px-2">
      <span className="text-xs sm:text-sm text-gray-600">
        {moment(user?.createdAt).fromNow()}
      </span>
    </td>
  </tr>
)

return (
  <div className="w-full bg-white h-fit px-3 sm:px-4 py-4 shadow-md rounded">
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
  // const { data, isLoading } = useGetDashboardStatsQuery();

  // const summary = data || {};

  // const totals = summary.tasks || {};

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: summary.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLTED TASK",
      total: totals.completed || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS ",
      total: totals["in progress"] || 0,
      icon: <LuClipboardPen />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals.todo || 0,
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]",
    },
  ];
  
  const Card = ({ icon, bg, label, count }) => {
    return (
      <div className="w-full h-28 sm:h-32 bg-white p-4 sm:p-5 shadow-md rounded-md flex items-center justify-between">
        <div className="h-full flex flex-1 flex-col items-start justify-between min-w-0">
          <p className="text-xs sm:text-sm text-gray-500 line-clamp-1 w-full">{label}</p>
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
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative top-16 h-full py-4 px-3 sm:px-4 md:px-5 lg:px-6 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {stats.map(({ icon, label, total, bg }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      <div className="w-full bg-white my-8 sm:my-12 md:my-16 p-3 sm:p-4 rounded shadow-sm">
        <h4 className="text-base sm:text-lg font-bold mb-2 sm:mb-4">Chart by Priority</h4>
        <div className="w-full h-64 sm:h-80">
          <Chart data={summary.graphData} />
        </div>
      </div>

      <div className="w-full flex flex-col xl:flex-row gap-4 xl:gap-6 py-6 sm:py-8">
        <div className="w-full xl:w-3/5">
          <TaskTable tasks={summary?.last10Task || []} />
        </div>
        <div className="w-full xl:w-2/5">
          <UserTable users={summary.users || []} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;