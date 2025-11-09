import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/slices/authSlice'
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from 'lucide-react'

export function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  if (!user) {
    return null
  }

  return (
    <nav className=" fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full border-b bg-white dark:bg-slate-900">
      <div className="flex items-center justify-between px-1 py-3 md:px-2">
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="text-xl left-0 font-bold text-blue-600 dark:text-blue-400">
            Task Manager
          </Link>
          
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/dashboard"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/tasks"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Tasks
            </Link>
            <Link
              to="/trashed"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Trashed
            </Link>
            <Link
              to="/team"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Team
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/tasks?status=todo"
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md transition-colors"
            >
              <CircleIcon className="w-4 h-4" />
              <span>To Do</span>
            </Link>
            <Link
              to="/tasks?status=in-process"
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md transition-colors"
            >
              <CircleHelpIcon className="w-4 h-4" />
              <span>In Process</span>
            </Link>
            <Link
              to="/tasks?status=completed"
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md transition-colors"
            >
              <CircleCheckIcon className="w-4 h-4" />
              <span>Completed</span>
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
