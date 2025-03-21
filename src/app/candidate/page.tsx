"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

// Skip static generation
export const dynamic = 'force-dynamic';

export default function CandidateDashboard() {
  const { user, profile, isLoading } = useAuth();
  const router = useRouter();
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || (profile && profile.account_type !== "talent"))) {
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
        <h1 className="text-3xl font-bold mb-2">Candidate Dashboard</h1>
        <p className="text-gray-600">Manage your job applications and discover new opportunities</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Applications</h2>
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You haven't applied to any jobs yet</p>
              <Link href="/jobs" className="btn-primary">
                Browse Jobs
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recommended Jobs</h2>
            <p className="text-gray-500">No recommended jobs available at the moment</p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Profile Stats</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Applications</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Interviews</span>
                <span className="font-medium">0</span>
              </div>
            </div>
            <div className="mt-6">
              <Link 
                href="/candidate/profile"
                className="w-full block text-center py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
              >
                Edit Profile
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/jobs"
                className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                Browse All Jobs
              </Link>
              <Link
                href="/candidate/settings"
                className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                Account Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 