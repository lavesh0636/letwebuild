"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';

// Form validation schema
const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must include at least one uppercase letter')
    .regex(/[a-z]/, 'Password must include at least one lowercase letter')
    .regex(/[0-9]/, 'Password must include at least one number'),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function TalentSignup() {
  const { signUp, updateProfile } = useAuth();
  const router = useRouter();
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with react-hook-form
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      terms: false
    }
  });

  const onSubmit = async (data: SignupFormValues) => {
    setGeneralError(null);
    setIsSubmitting(true);

    try {
      const { error } = await signUp(data.email, data.password);
      
      if (error) {
        setGeneralError(error.message);
      } else {
        // Update profile with account type
        const { error: profileError } = await updateProfile({
          account_type: 'talent'
        });
        
        if (profileError) {
          setGeneralError(profileError.message);
          return;
        }
        
        // Redirect to onboarding
        router.push('/onboarding/talent');
      }
    } catch (err: any) {
      setGeneralError(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-sm text-text-secondary hover:text-accent-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to home
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-display font-bold mb-2">Join as Talent</h1>
            <p className="text-text-secondary mb-8">
              Create your talent profile and get matched with top opportunities
            </p>

            {generalError && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-200 rounded-lg">
                {generalError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="input-field"
                  placeholder="you@example.com"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="input-field"
                  placeholder="••••••••"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="input-field"
                  placeholder="••••••••"
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 text-accent-primary border-gray-300 rounded focus:ring-accent-primary"
                    {...register('terms')}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-700 dark:text-gray-300">
                    I agree to the{' '}
                    <a href="/terms" className="text-accent-primary hover:text-accent-secondary">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-accent-primary hover:text-accent-secondary">
                      Privacy Policy
                    </a>
                  </label>
                  {errors.terms && (
                    <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex justify-center items-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-text-secondary">
              Already have an account?{' '}
              <Link href="/login" className="text-accent-primary hover:text-accent-secondary font-medium">
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side - Image/Content */}
      <div className="hidden lg:block lg:w-1/2 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {[...Array(10)].map((_, i) => (
              <line
                key={i}
                x1={i * 10}
                y1="0"
                x2={i * 10 + 100}
                y2="100"
                strokeWidth="0.5"
                stroke="#fff"
                strokeOpacity="0.3"
              />
            ))}
          </svg>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center items-center h-full p-12 text-white">
          <div className="glass p-8 rounded-xl max-w-lg">
            <h2 className="text-2xl font-display font-bold mb-6">
              Why join LetWeHire as Talent?
            </h2>
            
            <ul className="space-y-4">
              <li className="flex">
                <Check className="w-5 h-5 text-accent-tertiary mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold">Access Top Companies</h3>
                  <p className="text-white/80">
                    Get matched with leading companies looking for your specific skills
                  </p>
                </div>
              </li>
              <li className="flex">
                <Check className="w-5 h-5 text-accent-tertiary mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold">Competitive Rates</h3>
                  <p className="text-white/80">
                    Set your own rates and work on projects that value your expertise
                  </p>
                </div>
              </li>
              <li className="flex">
                <Check className="w-5 h-5 text-accent-tertiary mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold">Flexible Work</h3>
                  <p className="text-white/80">
                    Choose from remote, part-time, full-time, or contract opportunities
                  </p>
                </div>
              </li>
              <li className="flex">
                <Check className="w-5 h-5 text-accent-tertiary mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold">AI-Powered Matching</h3>
                  <p className="text-white/80">
                    Our intelligent algorithm finds the perfect fit for your skills and preferences
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 