import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { MdDashboard } from "react-icons/md";

import {
  Sidebar,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "./Navbar.jsx",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function  AppSidebar() {
  
        return (
            <SidebarProvider>
          <Sidebar className= "flex left-0 right-0  top-15">
            <SidebarHeader className= " flex flex-row items-center text-2xl text-blue-500 gap-2" >
            <MdDashboard />
              <p className="font-bold">Task Manager</p>
            </SidebarHeader>
                  <SidebarMenu>
                    {items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
          </Sidebar>
          </SidebarProvider>
        )
      }
      


export default AppSidebar