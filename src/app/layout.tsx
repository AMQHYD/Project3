"use client";

import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {SidebarProvider} from "@/components/ui/sidebar";
import {Sidebar} from "@/components/ui/sidebar";
import {SidebarContent} from "@/components/ui/sidebar";
import {SidebarMenu} from "@/components/ui/sidebar";
import {SidebarMenuItem} from "@/components/ui/sidebar";
import {SidebarMenuButton} from "@/components/ui/sidebar";
import {Icons} from "@/components/icons";
import {Toaster} from "@/components/ui/toaster";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Bell} from "lucide-react";
import {Button} from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// export const metadata: Metadata = {
//   title: 'InvoiceFlow',
//   description: 'Generated by Firebase Studio',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Simulate authentication status

  useEffect(() => {
    // Simulate authentication check (replace with your actual authentication logic)
    const checkAuth = () => {
      // For this demo, we're using a simple flag. In a real app, you'd check for a token, session, etc.
      const isLoggedIn = true; // Replace with your actual check
      setIsAuthenticated(isLoggedIn);

      if (!isLoggedIn) {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  // If not authenticated, don't render the app layout
  if (!isAuthenticated) {
    return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
          <Toaster />
        </body>
      </html>
    );
  }

    const handleLogout = () => {
        setIsAuthenticated(false);
        router.push('/login');
    };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SidebarProvider>
          <div className="flex h-screen">
            <Sidebar className="w-64 border-r flex-shrink-0">
              <SidebarContent>
                <div className="p-4 flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://picsum.photos/50/50" alt="User Avatar" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">InvoiceFlow</span>
                </div>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <Link href="/dashboard">
                      <SidebarMenuButton>
                        <Icons.home className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/invoices">
                      <SidebarMenuButton>
                        <Icons.invoice className="mr-2 h-4 w-4" />
                        <span>Invoices</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/estimates">
                      <SidebarMenuButton>
                        <Icons.estimate className="mr-2 h-4 w-4" />
                        <span>Estimates</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/clients/create">
                      <SidebarMenuButton>
                        <Icons.client className="mr-2 h-4 w-4" />
                        <span>Add Client</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/products/create">
                      <SidebarMenuButton>
                        <Icons.product className="mr-2 h-4 w-4" />
                        <span>Add Product/Service</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>
            </Sidebar>
            <div className="flex-1 flex flex-col">
              <header className="h-16 border-b flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                  </Button>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://picsum.photos/50/50" alt="User Avatar" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </header>
              <main className="flex-1 p-6">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
