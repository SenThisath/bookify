import SideBarProvider from "@/components/SideBarProvider";
import SyncUserWithConvex from "@/components/SyncUserWithConvex";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SideBarProvider>
      <SyncUserWithConvex />
      {children}
    </SideBarProvider>
  );
};

export default DashboardLayout;
