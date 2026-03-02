import React from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/TaskDetails";
import Dashboard from "./pages/Dashboard";
import Trash from "./pages/Trash";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";

import AppSidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { SidebarProvider } from "./components/ui/sidebar";

function Layout() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <SidebarProvider>
      <div className="w-full min-h-screen flex flex-col md:flex-row">
        <AppSidebar />

        <div className="flex-1 overflow-y-auto">
          <Navbar />
          <div className="p-4 2xl:px-10">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/completed/:status" element={<Tasks />} />
        <Route path="/in-progress/:status" element={<Tasks />} />
        <Route path="/todo/:status" element={<Tasks />} />
        <Route path="/team" element={<Users />} />
        <Route path="/trashed" element={<Trash />} />
        <Route path="/task/:id" element={<TaskDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
