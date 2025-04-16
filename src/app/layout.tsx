"use client";

import type {Metadata} from 'next';
import {AuthProvider} from '@/hooks/use-auth';
import {Sidebar, SidebarContent, SidebarProvider} from '@/components/ui/sidebar';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useAuth} from '@/hooks/use-auth';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const {user} = useAuth();

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <SidebarProvider>
            <div className="flex h-screen">
              <Sidebar className="w-64 border-r flex-shrink-0">
                <SidebarContent>
                  <div className="p-4 flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      {user?.photoURL ? (
                          <AvatarImage src={user.photoURL} alt={user.displayName || "User Avatar"}/>
                      ) : (
                          <AvatarFallback>{user?.displayName?.substring(0, 2).toUpperCase() || 'CN'}</AvatarFallback>
                      )}
                    </Avatar>
                    <span className="font-semibold">InvoiceFlow</span>
                  </div>
                  {children}
                </SidebarContent>
              </Sidebar>
            </div>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

