import React from "react";
import { clsx } from "clsx";
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import { LuClipboardPen } from "react-icons/lu";

import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";

function Dashboard() {
  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: 10,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLTED TASK",
      total: 3,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS ",
      total: 2,
      icon: <LuClipboardPen />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: 1,
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
          <span className="text-sm text-gray-500">{"129 last month"}</span>
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
      </div>
    </div>
  );
}

export default Dashboard;
