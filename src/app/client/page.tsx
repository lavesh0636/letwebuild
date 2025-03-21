"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

// Skip static generation
export const dynamic = 'force-dynamic';

export default function ClientDashboard() {
  const { user, profile, isLoading } = useAuth();
  const router = useRouter();
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || (profile && profile.account_type !== "client"))) {
      router.push("/login");
    }
    setLoadingData(false);
  }, [user, profile, isLoading, router]);

  if (isLoading || loadingData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Client Dashboard</h1>
        <p className="text-gray-600">Manage your job postings and candidates</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Jobs</h3>
          <p className="text-3xl font-bold mt-2">0</p>
          <div className="mt-4">
            <Link 
              href="/client/jobs"
              className="text-blue-500 text-sm font-medium hover:text-blue-700"
            >
              View all jobs
            </Link>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Active Jobs</h3>
          <p className="text-3xl font-bold mt-2">0</p>
          <div className="mt-4">
            <Link 
              href="/client/jobs"
              className="text-blue-500 text-sm font-medium hover:text-blue-700"
            >
              Manage active jobs
            </Link>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Applications</h3>
          <p className="text-3xl font-bold mt-2">0</p>
          <div className="mt-4">
            <Link 
              href="/client/applications"
              className="text-blue-500 text-sm font-medium hover:text-blue-700"
            >
              View all applications
            </Link>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">New Applications</h3>
          <p className="text-3xl font-bold mt-2">0</p>
          <div className="mt-4">
            <Link 
              href="/client/applications"
              className="text-blue-500 text-sm font-medium hover:text-blue-700"
            >
              Review new applications
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Applications</h2>
              <Link 
                href="/client/applications"
                className="text-blue-500 text-sm font-medium hover:text-blue-700"
              >
                View All
              </Link>
            </div>
            
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No applications received yet</p>
              <Link href="/client/jobs/new" className="btn-primary">
                Post a New Job
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Your Jobs</h2>
              <Link 
                href="/client/jobs"
                className="text-blue-500 text-sm font-medium hover:text-blue-700"
              >
                View All
              </Link>
            </div>
            
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You haven't posted any jobs yet</p>
              <Link href="/client/jobs/new" className="btn-primary">
                Post a New Job
              </Link>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/client/jobs/new"
                className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                Post New Job
              </Link>
              <Link
                href="/client/profile"
                className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                Edit Company Profile
              </Link>
              <Link
                href="/client/settings"
                className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                Account Settings
              </Link>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our team is here to help you find the best talent for your company.
            </p>
            <Link
              href="/contact"
              className="block w-full text-center py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 