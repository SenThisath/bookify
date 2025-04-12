import React from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const SideBarFooterItems = async () => {
  const user = await currentUser();
  if (!user) return;
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size={"lg"}
          className="flex items-center justify-center"
        >
          <div className="w-full h-full flex gap-4 items-center">
            <UserButton userProfileMode="modal" />
            <div>{user.fullName}</div>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SideBarFooterItems;
