import React from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/TaskDetails";
import Dashboard from "./pages/Dashboard";
import Trash from "./pages/Trash";
import Users from "./pages/Users";
import Register from "./pages/register";
import AppSidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { SidebarProvider } from "./components/ui/sidebar";


function Layout() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/Register" state={{ from: location }} replace />;
  }

  return (
    <SidebarProvider>
      <div className="w-full min-h-screen flex flex-col md:flex-row">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
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
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/complete" element={<Tasks />} />
        <Route path="/in-process" element={<Tasks />} />
        <Route path="/todo" element={<Tasks />} />
        <Route path="/Details" element={<TaskDetails />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/team" element={<Users />} />
      </Route>

      {/* Public Route */}
      <Route path="/Register" element={<Register />} />
         <Route path="/Login" element={<Login />} />
    </Routes>
  );
}

export default App;
