import type { Metadata } from 'next';
import { Sidebar, SidebarContent, SidebarProvider } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AuthProvider from '@/components/providers/session-provider';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import './globals.css';

export const metadata: Metadata = {
  title: 'InvoiceFlow',
  description: 'Modern Invoicing Solution',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

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
                      {session?.user?.image ? (
                        <AvatarImage src={session.user.image} alt={session.user.name || "User Avatar"} />
                      ) : (
                        <AvatarFallback>{session?.user?.name?.substring(0, 2).toUpperCase() || 'IN'}</AvatarFallback>
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
