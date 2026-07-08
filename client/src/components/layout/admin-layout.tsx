import { AppSidebar } from "@/components/layout/admin/app-sidebar";
import { AdminHeader } from "@/components/layout/admin/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar variant="sidebar" />
      <SidebarInset>
        <AdminHeader />
        <div className="h-full overflow-auto bg-muted/40 p-3 md:p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
