import AppSideBar from "@/components/AppSideBar";
import Header from "@/components/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

const SideBarProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSideBar variant="inset" />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SideBarProvider;
