import React, { useState } from 'react'

function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
}

const Tabs = ({ tabs, setSelected, children }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleTabClick = (index) => {
    setSelectedIndex(index)
    if (setSelected) {
      setSelected(index)
    }
  }

  return (
    <div className='w-full px-1 sm:px-0'>
      <div className="flex space-x-6 rounded-xl p-1" role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={index + tab.title}
            onClick={() => handleTabClick(index)}
            role="tab"
            aria-selected={selectedIndex === index}
            className={classNames(
              "w-fit flex items-center outline-none gap-2 px-3 py-2.5 text-base font-medium leading-5 bg-white",
              selectedIndex === index
                ? "text-blue-600 border-b-2 border-blue-600" 
                : "text-gray-500 hover:text-blue-800"
            )}
          >
            {tab.icon}
            <span>{tab.title}</span>
          </button>
        ))}
      </div>
      <div className="mt-2" role="tabpanel">
        {children}
      </div>
    </div>
  )
}

export default Tabs