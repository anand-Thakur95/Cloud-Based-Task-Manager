import { CircleCheckBig, ClipboardClock, ClipboardCheck, Trash2, Users,TableOfContents, Settings } from "lucide-react";


import { MdDashboard } from "react-icons/md";
import {
  Sidebar,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";




// Menu items
const items = [
  { title: "Tasks", url: "/tasks", icon: TableOfContents },
  { title: "Complete", url: "/complete", icon: CircleCheckBig },
  { title: "In Process", url: "/in-process", icon: ClipboardClock },
  { title: "To Do", url: "/todo", icon: ClipboardCheck },
  { title: "Team", url: "/team", icon: Users },
  { title: "Trash", url: "/trash", icon: Trash2 },
 
];

export function AppSidebar() {
  

  return (
    
      <Sidebar className="flex left-0 right-0 top-15">
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
     <SidebarFooter className="absolute flex flex-row bottom-17  gap-1 ">
      <Settings />
      <span>Setting</span> 
     </SidebarFooter>
      </Sidebar>
   
   
  );
}

export default AppSidebar;