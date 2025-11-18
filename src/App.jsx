import React from 'react';
import './App.css';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';

import Login from './pages/Login';
import Tasks from './pages/Tasks';
import TaskDetails from './pages/TaskDetails';
import Dashboard from './pages/Dashboard';
import Trash from './pages/Trash';
import Users from './pages/Users';
import { useSelector } from 'react-redux';
import AppSidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { SidebarProvider } from './components/ui/sidebar';

function Layout() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return user ? (
    <SidebarProvider>
      <div className='w-full h-screen fixed top-0 left-0 right-0 flex flex-col md:flex-row bg-gray-500 '>
        {/* Sidebar - visible on mobile when toggled, always visible on desktop */}
        <AppSidebar />

        {/* Main Content */}
        <div className='flex-1 overflow-y-auto'>
          <Navbar />
          <div className=''>
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/tasks' element={<Tasks />} />
        <Route path='/complete' element={<Tasks />} />
        <Route path='/in-process' element={<Tasks />} />
        <Route path='/todo' element={<Tasks />} />
        <Route path='/task/:id' element={<TaskDetails />} />
        <Route path='/trash' element={<Trash />} />
        <Route path='/team' element={<Users />} />
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

export default App;