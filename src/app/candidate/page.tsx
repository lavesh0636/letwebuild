"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { Job, Application } from "@/lib/supabase";
import Link from "next/link";

export default function CandidateDashboard() {
  const { user, profile, isLoading } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || (profile && profile.account_type !== "candidate"))) {
      router.push("/login");
    }
  }, [user, profile, isLoading, router]);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;

      setLoadingData(true);
      
      try {
        // Fetch candidate profile
        const { data: candidateData } = await supabase
          .from("candidates")
          .select("*")
          .eq("user_id", user.id)
          .single();
  
        if (candidateData) {
          // Fetch applications made by this candidate
          const { data: applicationsData } = await supabase
            .from("applications")
            .select("*")
            .eq("candidate_id", candidateData.id);
  
          if (applicationsData) {
            setApplications(applicationsData);
            
            // Fetch jobs the candidate has applied to
            const appliedJobIds = applicationsData.map(app => app.job_id);
            
            if (appliedJobIds.length > 0) {
              const { data: appliedJobsData } = await supabase
                .from("jobs")
                .select("*")
                .in("id", appliedJobIds);
                
              if (appliedJobsData) {
                setJobs(appliedJobsData);
              }
            }
          }
          
          // Get recommended jobs based on candidate skills
          if (candidateData?.skills) {
            const { data: recommendedJobsData } = await supabase
              .from("jobs")
              .select("*")
              .contains("skills_required", candidateData.skills)
              .eq("status", "open")
              .limit(5);
              
            if (recommendedJobsData) {
              // Filter out jobs the candidate has already applied to
              const appliedJobIds = applications.map(app => app.job_id);
              const newRecommendedJobs = recommendedJobsData.filter(
                job => !appliedJobIds.includes(job.id)
              );
              
              setJobs(prevJobs => {
                const existingJobIds = prevJobs.map(job => job.id);
                return [
                  ...prevJobs,
                  ...newRecommendedJobs.filter(job => !existingJobIds.includes(job.id))
                ];
              });
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingData(false);
      }
    }

    fetchData();
  }, [user, applications]);

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
            {applications.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">You haven't applied to any jobs yet</p>
                <Link href="/jobs" className="btn-primary">
                  Browse Jobs
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left py-3 px-4">Job Title</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Applied Date</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((application) => {
                      const job = jobs.find(j => j.id === application.job_id);
                      return (
                        <tr key={application.id} className="border-b dark:border-gray-700">
                          <td className="py-3 px-4">
                            {job ? job.title : "Loading..."}
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
                            {new Date(application.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <Link 
                              href={`/applications/${application.id}`}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              View Details
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
            <h2 className="text-xl font-semibold mb-4">Recommended Jobs</h2>
            {jobs.filter(job => !applications.some(app => app.job_id === job.id)).length === 0 ? (
              <p className="text-gray-500">No recommended jobs available at the moment</p>
            ) : (
              <div className="space-y-4">
                {jobs
                  .filter(job => !applications.some(app => app.job_id === job.id))
                  .slice(0, 5)
                  .map((job) => (
                    <div key={job.id} className="border-b pb-4 last:border-0 dark:border-gray-700">
                      <h3 className="font-medium text-lg">{job.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                        {job.location} • {job.job_type} • {job.salary_range}
                      </p>
                      <p className="text-sm mb-3">
                        {job.description.length > 100
                          ? `${job.description.substring(0, 100)}...`
                          : job.description}
                      </p>
                      <Link 
                        href={`/jobs/${job.id}`}
                        className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                      >
                        View Job
                      </Link>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Profile Stats</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Applications</span>
                <span className="font-medium">{applications.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Interviews</span>
                <span className="font-medium">
                  {applications.filter(app => app.status === "accepted").length}
                </span>
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