"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

// Skip static generation and make the page render only on the client
export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  const { user, profile, isLoading } = useAuth();
  const router = useRouter();
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || (profile && profile.account_type !== "admin"))) {
      router.push("/login");
    }
    setLoadingData(false);
  }, [user, profile, isLoading, router]);

  if (isLoading || loadingData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage the entire platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        {["Total Candidates", "Total Clients", "Total Jobs", "Total Applications", "New Users Today", "New Jobs Today"].map((title, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
            <p className="text-3xl font-bold mt-2">0</p>
            <div className="mt-4">
              <Link 
                href="#"
                className="text-blue-500 text-sm font-medium hover:text-blue-700"
              >
                View all
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Jobs</h2>
              <Link 
                href="#"
                className="text-blue-500 text-sm font-medium hover:text-blue-700"
              >
                View All
              </Link>
            </div>
            
            <p className="text-gray-500 py-4">No jobs available</p>
          </div>
        </div>
        
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Users</h2>
              <Link 
                href="#"
                className="text-blue-500 text-sm font-medium hover:text-blue-700"
              >
                View All
              </Link>
            </div>
            
            <p className="text-gray-500 py-4">No recent users</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <Link 
                href="#"
                className="block px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/40"
              >
                Add New Job
              </Link>
              <Link 
                href="#"
                className="block px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-md hover:bg-purple-100 dark:hover:bg-purple-900/40"
              >
                Create New User
              </Link>
              <Link 
                href="#"
                className="block px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md hover:bg-green-100 dark:hover:bg-green-900/40"
              >
                View Reports
              </Link>
              <Link 
                href="#"
                className="block px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 rounded-md hover:bg-yellow-100 dark:hover:bg-yellow-900/40"
              >
                Platform Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 