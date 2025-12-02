import React from 'react'
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
  return (
    <div>
      {
        stats.map((stat) => (
          <div key={stat._id}>
            <div>{stat.icon}</div>
            <div>{stat.label}</div>
            <div>{stat.total}</div>
          </div>
        ))
      }
    </div>
  )
}

export default Dashboard
