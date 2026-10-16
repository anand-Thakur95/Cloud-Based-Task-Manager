import React from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
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

// Guard: redirects non-admin users to /dashboard
function AdminRoute() {
  const { user } = useSelector((state) => state.auth);
  const isAdmin = Boolean(
    user?.isAdmin ||
    user?.role === "Admin" ||
    user?.role?.toLowerCase() === "admin"
  );
  return isAdmin ? <Outlet /> : <Navigate to="/dashboard" replace />;
}

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
      <Route path="/login" element={<Login />} />
      <Route path="/Login" element={<Navigate to="/login" replace />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Dashboard" element={<Navigate to="/dashboard" replace />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/completed/:status" element={<Tasks />} />
        <Route path="/in-progress/:status" element={<Tasks />} />
        <Route path="/todo/:status" element={<Tasks />} />
        <Route path="/trashed" element={<Trash />} />
        <Route path="/task/:id" element={<TaskDetails />} />
        <Route path="/profile" element={<Profile />} />

        {/* Admin-only routes */}
        <Route element={<AdminRoute />}>
          <Route path="/team" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

