"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { Job, Application, Candidate } from "@/lib/supabase";
import Link from "next/link";

export default function ClientDashboard() {
  const { user, profile, isLoading } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [candidates, setCandidates] = useState<{ [key: string]: Candidate }>({});
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    newApplications: 0,
  });
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || (profile && profile.account_type !== "client"))) {
      router.push("/login");
    }
  }, [user, profile, isLoading, router]);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;

      setLoadingData(true);
      
      try {
        // Fetch client profile
        const { data: clientData } = await supabase
          .from("clients")
          .select("*")
          .eq("user_id", user.id)
          .single();
  
        if (clientData) {
          // Fetch jobs posted by this client
          const { data: jobsData } = await supabase
            .from("jobs")
            .select("*")
            .eq("client_id", clientData.id)
            .order("created_at", { ascending: false });
  
          if (jobsData) {
            setJobs(jobsData);
            
            // Calculate stats
            setStats(prev => ({
              ...prev,
              totalJobs: jobsData.length,
              activeJobs: jobsData.filter(job => job.status === "open").length,
            }));
            
            // Fetch applications for these jobs
            const jobIds = jobsData.map(job => job.id);
            
            if (jobIds.length > 0) {
              const { data: applicationsData } = await supabase
                .from("applications")
                .select("*")
                .in("job_id", jobIds)
                .order("created_at", { ascending: false });
                
              if (applicationsData) {
                setApplications(applicationsData);
                
                // Update stats
                setStats(prev => ({
                  ...prev,
                  totalApplications: applicationsData.length,
                  newApplications: applicationsData.filter(app => app.status === "applied").length,
                }));
                
                // Fetch candidates who applied
                const candidateIds = [...new Set(applicationsData.map(app => app.candidate_id))];
                
                if (candidateIds.length > 0) {
                  const { data: candidatesData } = await supabase
                    .from("candidates")
                    .select("*")
                    .in("id", candidateIds);
                    
                  if (candidatesData) {
                    const candidatesMap = candidatesData.reduce((acc, candidate) => {
                      acc[candidate.id] = candidate;
                      return acc;
                    }, {} as { [key: string]: Candidate });
                    
                    setCandidates(candidatesMap);
                  }
                }
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching client data:", error);
      } finally {
        setLoadingData(false);
      }
    }

    fetchData();
  }, [user]);

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
          <p className="text-3xl font-bold mt-2">{stats.totalJobs}</p>
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
          <p className="text-3xl font-bold mt-2">{stats.activeJobs}</p>
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
          <p className="text-3xl font-bold mt-2">{stats.totalApplications}</p>
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
          <p className="text-3xl font-bold mt-2">{stats.newApplications}</p>
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
            
            {applications.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No applications received yet</p>
                <Link href="/client/jobs/new" className="btn-primary">
                  Post a New Job
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left py-3 px-4">Candidate</th>
                      <th className="text-left py-3 px-4">Job</th>
                      <th className="text-left py-3 px-4">Applied On</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.slice(0, 5).map((application) => {
                      const job = jobs.find(j => j.id === application.job_id);
                      const candidate = candidates[application.candidate_id];
                      return (
                        <tr key={application.id} className="border-b dark:border-gray-700">
                          <td className="py-3 px-4">
                            {candidate ? candidate.name : "Loading..."}
                          </td>
                          <td className="py-3 px-4">
                            {job ? job.title : "Loading..."}
                          </td>
                          <td className="py-3 px-4">
                            {new Date(application.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-xs ${
                              application.status === "accepted" 
                                ? "bg-green-100 text-green-800" 
                                : application.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                            }`}>
                              {application.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Link 
                              href={`/client/applications/${application.id}`}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              Review
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Your Job Postings</h2>
              <Link 
                href="/client/jobs"
                className="text-blue-500 text-sm font-medium hover:text-blue-700"
              >
                View All
              </Link>
            </div>
            
            {jobs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">You haven't posted any jobs yet</p>
                <Link href="/client/jobs/new" className="btn-primary">
                  Post a New Job
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.slice(0, 5).map((job) => (
                  <div key={job.id} className="border-b pb-4 last:border-0 dark:border-gray-700">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-lg">{job.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs self-start ${
                        job.status === "open" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {job.status}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                      {job.location} • {job.job_type} • {job.salary_range}
                    </p>
                    <div className="flex justify-between items-end mt-3">
                      <span className="text-gray-500 text-sm">
                        {applications.filter(app => app.job_id === job.id).length} applications
                      </span>
                      <Link 
                        href={`/client/jobs/${job.id}`}
                        className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                      >
                        Manage
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <Link
                href="/client/jobs/new"
                className="block w-full text-center py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
              >
                Post a New Job
              </Link>
              
              <Link
                href="/client/applications"
                className="block w-full text-center py-3 border border-blue-500 text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
              >
                Review Applications
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Account</h2>
            <div className="space-y-3">
              <Link
                href="/client/profile"
                className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                Company Profile
              </Link>
              <Link
                href="/client/settings"
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