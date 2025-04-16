"use client";

import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarSeparator } from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex">
        <Sidebar collapsible="icon">
          <SidebarHeader>
            InvoiceFlow
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>
                Main
              </SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton href="#" >
                    <Icons.invoice />
                    <span>Invoices</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="#">
                    <Icons.estimate />
                    <span>Estimates</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="#">
                    <Icons.client />
                    <span>Clients</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="#">
                    <Icons.product />
                    <span>Products/Services</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarContent>
          {/* Main Content Area */}
          <div className="p-4">
            <h1>Welcome to InvoiceFlow</h1>
            <p>Manage your invoices, estimates, clients, and products with ease.</p>
          </div>
        </SidebarContent>
      </div>
    </SidebarProvider>
  );
}
