import { CircleCheckBig, ClipboardClock, ClipboardCheck, Trash2, Users } from "lucide-react";
import { MdDashboard } from "react-icons/md";
import {
  Sidebar,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
 
} from "@/components/ui/sidebar";



// Menu items
const items = [
  { title: "Complete", url: "/complete", icon: CircleCheckBig },
  { title: "In Process", url: "/in-process", icon: ClipboardClock },
  { title: "To Do", url: "/todo", icon: ClipboardCheck },
  { title: "Team", url: "/team", icon: Users },
  { title: "Trash", url: "/trash", icon: Trash2 },
];

export function AppSidebar() {
  

  return (
    
      <Sidebar className="flex left-0 right-0 top-12">
        <SidebarHeader className="flex flex-row items-center text-2xl text-blue-500 gap-2">
          <MdDashboard />
          <p className="font-bold">Dashboard</p>
        </SidebarHeader>

        <SidebarMenu className="gap-1.5">
          {items.map((item) => {

        
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                >
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
                
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      
      </Sidebar>
   
   
  );
}

export default AppSidebar;