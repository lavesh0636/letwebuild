"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { Candidate, Client, Job, Application, Profile } from "@/lib/supabase";
import Link from "next/link";

export default function AdminDashboard() {
  const { user, profile, isLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalCandidates: 0,
    totalClients: 0,
    totalJobs: 0,
    totalApplications: 0,
    newUsersToday: 0,
    newJobsToday: 0,
  });
  const [recentUsers, setRecentUsers] = useState<Profile[]>([]);
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || (profile && profile.account_type !== "admin"))) {
      router.push("/login");
    }
  }, [user, profile, isLoading, router]);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;

      setLoadingData(true);
      
      // Get count of candidates
      const { count: candidatesCount } = await supabase
        .from("candidates")
        .select("*", { count: "exact", head: true });
      
      // Get count of clients
      const { count: clientsCount } = await supabase
        .from("clients")
        .select("*", { count: "exact", head: true });
      
      // Get count of jobs
      const { count: jobsCount } = await supabase
        .from("jobs")
        .select("*", { count: "exact", head: true });
      
      // Get count of applications
      const { count: applicationsCount } = await supabase
        .from("applications")
        .select("*", { count: "exact", head: true });
      
      // Get today's date at midnight
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayISO = today.toISOString();
      
      // Get count of new users today
      const { count: newUsersCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .gte("created_at", todayISO);
      
      // Get count of new jobs today
      const { count: newJobsCount } = await supabase
        .from("jobs")
        .select("*", { count: "exact", head: true })
        .gte("created_at", todayISO);
      
      setStats({
        totalCandidates: candidatesCount || 0,
        totalClients: clientsCount || 0,
        totalJobs: jobsCount || 0,
        totalApplications: applicationsCount || 0,
        newUsersToday: newUsersCount || 0,
        newJobsToday: newJobsCount || 0,
      });
      
      // Get recent users
      const { data: recentUsersData } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      
      if (recentUsersData) {
        setRecentUsers(recentUsersData);
      }
      
      // Get recent jobs
      const { data: recentJobsData } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      
      if (recentJobsData) {
        setRecentJobs(recentJobsData);
      }
      
      setLoadingData(false);
    }

    fetchData();
  }, [user]);

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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Candidates</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalCandidates}</p>
          <div className="mt-4">
            <Link 
              href="/admin/candidates"
              className="text-blue-500 text-sm font-medium hover:text-blue-700"
            >
              View all
            </Link>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Clients</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalClients}</p>
          <div className="mt-4">
            <Link 
              href="/admin/clients"
              className="text-blue-500 text-sm font-medium hover:text-blue-700"
            >
              View all
            </Link>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Jobs</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalJobs}</p>
          <div className="mt-4">
            <Link 
              href="/admin/jobs"
              className="text-blue-500 text-sm font-medium hover:text-blue-700"
            >
              View all
            </Link>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Applications</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalApplications}</p>
          <div className="mt-4">
            <Link 
              href="/admin/applications"
              className="text-blue-500 text-sm font-medium hover:text-blue-700"
            >
              View all
            </Link>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">New Users Today</h3>
          <p className="text-3xl font-bold mt-2">{stats.newUsersToday}</p>
          <div className="mt-4">
            <Link 
              href="/admin/users/new"
              className="text-blue-500 text-sm font-medium hover:text-blue-700"
            >
              View details
            </Link>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">New Jobs Today</h3>
          <p className="text-3xl font-bold mt-2">{stats.newJobsToday}</p>
          <div className="mt-4">
            <Link 
              href="/admin/jobs/new"
              className="text-blue-500 text-sm font-medium hover:text-blue-700"
            >
              View details
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Jobs</h2>
              <Link 
                href="/admin/jobs"
                className="text-blue-500 text-sm font-medium hover:text-blue-700"
              >
                View All
              </Link>
            </div>
            
            {recentJobs.length === 0 ? (
              <p className="text-gray-500 py-4">No jobs available</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left py-3 px-4">Title</th>
                      <th className="text-left py-3 px-4">Company</th>
                      <th className="text-left py-3 px-4">Posted</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentJobs.map((job) => (
                      <tr key={job.id} className="border-b dark:border-gray-700">
                        <td className="py-3 px-4">{job.title}</td>
                        <td className="py-3 px-4">{job.client_id}</td>
                        <td className="py-3 px-4">
                          {new Date(job.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            job.status === "open" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Link 
                            href={`/admin/jobs/${job.id}`}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            Manage
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">System Status</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-gray-600">All services operational</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Users</h2>
              <Link 
                href="/admin/users"
                className="text-blue-500 text-sm font-medium hover:text-blue-700"
              >
                View All
              </Link>
            </div>
            
            {recentUsers.length === 0 ? (
              <p className="text-gray-500 py-4">No recent users</p>
            ) : (
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between border-b pb-4 last:border-0 dark:border-gray-700">
                    <div>
                      <p className="font-medium">{user.email}</p>
                      <p className="text-sm text-gray-500">{user.account_type}</p>
                      <p className="text-xs text-gray-400">{new Date(user.created_at).toLocaleDateString()}</p>
                    </div>
                    <Link 
                      href={`/admin/users/${user.id}`}
                      className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/admin/jobs/new"
                className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                Add New Job
              </Link>
              <Link
                href="/admin/users/new"
                className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                Add New User
              </Link>
              <Link
                href="/admin/settings"
                className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
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