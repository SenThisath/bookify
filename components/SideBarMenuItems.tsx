import { ComponentType } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import {
  HomeIcon,
  SquareLibrary,
  Ticket,
  TicketCheck,
  Wand,
} from "lucide-react";
import Link from "next/link";

const menu: { title: string; icon: ComponentType; link: string }[] = [
  { title: "Dashboard", icon: HomeIcon, link: "/dashboard" },
  { title: "Wish List", icon: Wand, link: "/dashboard/wish-list" },
  {
    title: "Purchased Tickets",
    icon: TicketCheck,
    link: "/dashboard/purchased-tickets",
  },
  { title: "Sell Tickets", icon: Ticket, link: "/dashboard/sell-tickets" },
  { title: "My Events", icon: SquareLibrary, link: "/dashboard/my-events" },
];

const SideBarMenuItems = () => {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu></SidebarMenu>
        <SidebarMenu>
          {menu.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.link}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SideBarMenuItems;
