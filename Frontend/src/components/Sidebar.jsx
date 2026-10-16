import { CircleCheckBig, ClipboardClock, ClipboardCheck, Trash2, Users, TableOfContents, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdDashboard } from "react-icons/md";
import { toast } from "react-toastify";
import {
  Sidebar,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

// Menu items — adminOnly: true means only admins can navigate there
const items = [
  { title: "Tasks",       url: "/tasks",                   icon: TableOfContents },
  { title: "Complete",    url: "/completed/completed",     icon: CircleCheckBig  },
  { title: "In Process",  url: "/in-progress/in progress", icon: ClipboardClock  },
  { title: "To Do",       url: "/todo/todo",               icon: ClipboardCheck  },
  { title: "Team",        url: "/team",                    icon: Users,  adminOnly: true },
  { title: "Trash",       url: "/trashed",                 icon: Trash2, adminOnly: true },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const isAdmin = Boolean(
    user?.isAdmin ||
    user?.role === "Admin" ||
    user?.role?.toLowerCase() === "admin"
  );

  const handleNavClick = (item) => {
    // Block non-admin from admin-only pages (Team, Trash)
    if (item.adminOnly && !isAdmin) {
      toast.error(`Access denied! Only Admin can view the ${item.title} page.`, {
        position: "top-center",
        autoClose: 3000,
      });
      navigate("/dashboard");
      return;
    }
    navigate(item.url);
  };

  return (
    <Sidebar className="flex left-0 right-0 top-15">
      <SidebarHeader
        className="flex flex-row items-center text-2xl text-blue-500 gap-2 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        <MdDashboard />
        <p className="font-bold">Dashboard</p>
      </SidebarHeader>

      <SidebarMenu className="gap-1.5">
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <button
                onClick={() => handleNavClick(item)}
                className="flex items-center gap-2 w-full text-left"
              >
                <item.icon />
                <span>{item.title}</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>

      <SidebarFooter className="absolute flex flex-row bottom-17 gap-1 cursor-pointer">
        <Link to="/profile" className="flex flex-row items-center gap-1">
          <Settings />
          <span>Settings</span>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
