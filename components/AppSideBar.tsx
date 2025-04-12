import React, { ComponentProps } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import SideBarMenuItems from "./SideBarMenuItems";
import SideBarFooterItems from "./SideBarFooterItems";
import Link from "next/link";

const AppSideBar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <span className="text-base font-semibold">Bookify</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SideBarMenuItems />
      </SidebarContent>
      <SidebarFooter>
        <SideBarFooterItems />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSideBar;
