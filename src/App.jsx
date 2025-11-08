import React from 'react'
import './App.css'
import { Navigate, Route, Routes, useLocation, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from './pages/Login'
import Tasks from './pages/Tasks'
import TaskDetails from './pages/TaskDetails'
import Dashboard from './pages/Dashboard'
import Trash from './pages/Trash'
import Users from './pages/Users'



function Layout(){
  const { user } = useSelector((state) => state.auth);
  const location = useLocation()

  return user ? (
  <div className='w-full h-screen flex flex-col md:flex-row'>
    <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
    {/* Sidebar */}
    </div>

    {/* MoblieSideBar */}

    <div className='flex-1 overflow-y-auto'>
      {/* Navbar */}
      <div className='p-4 2xl:px-10'>
        <Outlet />
      </div>
    </div>
   
  </div>
  ): (
<Navigate to="/login" state={{from: location}} replace />
  )
}
function App() {

  return (
   <Routes>
    <Route element={<Layout />}>
      <Route index element={<Navigate to="/dashboard" replace />}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/tasks' element={<Tasks/>}/>
      <Route path='/completed/:status' element={<Tasks/>}/>
      <Route path='/in-process/:status' element={<Tasks/>}/>
      <Route path='/todo/:status' element={<Tasks/>}/>

      <Route path='/task/:id' element={<TaskDetails/>}/>
      <Route path='/trashed' element={<Trash/>}/>
      <Route path='/team' element={<Users/>}/>
    </Route>
    <Route path='/login' element={<Login/>}/>
   </Routes>
  )
}

export default App
