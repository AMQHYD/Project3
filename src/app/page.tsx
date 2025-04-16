"use client";

import DashboardPage from "./dashboard/page";
import { useAuth } from '@/hooks/use-auth'; // Import the useAuth hook
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return <div>Loading...</div>; // Replace with a proper loading indicator
    }

    if (!user) {
        return null; // or a redirect component
    }

  return (
    <DashboardPage/>
  );
}
