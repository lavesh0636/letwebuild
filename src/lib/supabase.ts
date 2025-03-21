import { createClient } from '@supabase/supabase-js';

// When using empty URLs, createClient will throw an error.
// For development without real credentials, we can use a mock client for SSR
const isBrowser = typeof window !== 'undefined';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only create a real client if we have valid credentials
const hasValidCredentials = 
  typeof supabaseUrl === 'string' && 
  typeof supabaseKey === 'string' && 
  supabaseUrl.startsWith('https://') && 
  supabaseUrl.length > 10 && 
  supabaseKey.length > 10;

// Create client or mock client
export const supabase = hasValidCredentials
  ? createClient(supabaseUrl, supabaseKey)
  : createMockClient();

// Simple mock client with empty methods for development without real credentials
function createMockClient() {
  if (isBrowser) {
    console.warn('Using mock Supabase client. Please add your Supabase credentials to .env.local');
  }
  
  return {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signUp: () => Promise.resolve({ data: { user: null }, error: null }),
      signInWithPassword: () => Promise.resolve({ data: { user: null }, error: null }),
      signOut: () => Promise.resolve({ error: null }),
      signInWithOAuth: () => Promise.resolve({ error: null })
    },
    from: () => ({
      select: (columns: string, options?: any) => {
        const mockResponse = {
          data: [],
          error: null,
          count: 0, // Add count property for queries with count option
          status: 200,
          statusText: 'OK'
        };
        
        return {
          eq: () => ({
            single: () => Promise.resolve({ ...mockResponse, data: null })
          }),
          order: () => ({
            limit: () => Promise.resolve(mockResponse)
          }),
          limit: () => Promise.resolve(mockResponse),
          gte: () => Promise.resolve(mockResponse),
          lt: () => Promise.resolve(mockResponse),
          single: () => Promise.resolve({ ...mockResponse, data: null })
        };
      },
      insert: () => Promise.resolve({ error: null }),
      update: () => ({
        eq: () => Promise.resolve({ error: null }),
        match: () => Promise.resolve({ error: null })
      }),
      upsert: () => Promise.resolve({ error: null }),
      delete: () => ({
        eq: () => Promise.resolve({ error: null })
      })
    })
  };
}

// Database types
export type Tables = {
  profiles: Profile;
  jobs: Job;
  applications: Application;
  proposals: Proposal;
  clients: Client;
  talents: Talent;
  categories: Category;
  skills: Skill;
  education: Education;
  work_experience: WorkExperience;
  projects: Project;
  messages: Message;
  reviews: Review;
  notifications: Notification;
};

export type Profile = {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string | null;
  avatar_url: string | null;
  email: string;
  account_type: 'talent' | 'client' | 'admin' | null;
  onboarding_completed: boolean;
  onboarding_step: number;
  last_active: string | null;
  notifications_settings: {
    email: boolean;
    application_updates: boolean;
    messages: boolean;
    marketing: boolean;
  };
  theme_preference: 'light' | 'dark' | 'system';
};

export type Talent = {
  id: string;
  user_id: string;
  title: string | null;
  bio: string | null;
  skills: string[] | null;
  hourly_rate: number | null;
  availability: 'full-time' | 'part-time' | 'contract' | 'freelance' | null;
  years_of_experience: number | null;
  profile_completed: boolean;
  location: string | null;
  primary_role: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  portfolio_url: string | null;
  resume_url: string | null;
  open_to_work: boolean;
  preferred_job_types: string[] | null;
  preferred_work_location: 'remote' | 'onsite' | 'hybrid' | null;
  education: Education[];
  work_experience: WorkExperience[];
  projects: Project[];
};

export type Client = {
  id: string;
  user_id: string;
  company_name: string | null;
  company_size: string | null;
  industry: string | null;
  company_website: string | null;
  company_description: string | null;
  location: string | null;
  logo_url: string | null;
  verified: boolean;
  profile_completed: boolean;
};

export type Job = {
  id: string;
  created_at: string;
  updated_at: string;
  client_id: string;
  title: string;
  description: string;
  skills_required: string[];
  job_type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  experience_level: 'entry' | 'mid' | 'senior' | 'lead';
  location: string | null;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string;
  remote: boolean;
  status: 'draft' | 'active' | 'closed' | 'filled';
  application_deadline: string | null;
  category_id: string;
  perks: string[] | null;
  application_count: number;
  view_count: number;
  is_featured: boolean;
};

export type Application = {
  id: string;
  created_at: string;
  updated_at: string;
  job_id: string;
  talent_id: string;
  cover_letter: string | null;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  talent_resume_url: string | null;
  client_notes: string | null;
  interview_scheduled: string | null;
};

export type Proposal = {
  id: string;
  created_at: string;
  updated_at: string;
  client_id: string;
  talent_id: string;
  job_id: string | null;
  message: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  rate: number | null;
  rate_type: 'hourly' | 'fixed' | null;
  availability_date: string | null;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon_url: string | null;
};

export type Skill = {
  id: string;
  name: string;
  category_id: string;
};

export type Education = {
  id: string;
  talent_id: string;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string | null;
  current: boolean;
  description: string | null;
};

export type WorkExperience = {
  id: string;
  talent_id: string;
  company: string;
  title: string;
  location: string | null;
  start_date: string;
  end_date: string | null;
  current: boolean;
  description: string | null;
};

export type Project = {
  id: string;
  talent_id: string;
  title: string;
  description: string;
  url: string | null;
  image_url: string | null;
  skills_used: string[] | null;
  start_date: string;
  end_date: string | null;
  current: boolean;
};

export type Message = {
  id: string;
  created_at: string;
  conversation_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read: boolean;
  attachment_url: string | null;
};

export type Review = {
  id: string;
  created_at: string;
  job_id: string;
  reviewer_id: string;
  reviewee_id: string;
  rating: number;
  content: string | null;
  is_public: boolean;
};

export type Notification = {
  id: string;
  created_at: string;
  user_id: string;
  type: 'application_update' | 'message' | 'job_alert' | 'system';
  title: string;
  content: string;
  read: boolean;
  action_url: string | null;
}; 