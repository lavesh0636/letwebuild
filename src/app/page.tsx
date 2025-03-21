"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTheme } from "next-themes";
import MainLayout from "@/components/layouts/MainLayout";
import { ChevronRight, CheckCircle2, Users, Building, Briefcase } from "lucide-react";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const features = [
  {
    title: "Find top talent",
    description: "Access a vetted network of top developers, designers, and other tech professionals.",
    icon: Users
  },
  {
    title: "Streamlined hiring",
    description: "Our platform makes it easy to find, interview, and hire the perfect candidates.",
    icon: Building
  },
  {
    title: "Find great opportunities",
    description: "Discover rewarding remote, contract, and full-time positions with leading companies.",
    icon: Briefcase
  }
];

const benefits = [
  "No recruitment fees or commissions",
  "Talent pre-vetted through technical assessments",
  "Dedicated support throughout the hiring process",
  "Direct communication with candidates",
  "Flexible hiring options to suit your needs",
  "Global talent pool with diverse skills"
];

export default function Home() {
  const { theme } = useTheme();
  const [statsRef, statsInView] = useInView({ 
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <MainLayout withContainer={false}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-dark pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent-primary rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute top-1/2 right-0 w-80 h-80 bg-accent-secondary rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-accent-tertiary rounded-full filter blur-3xl opacity-20"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <motion.div 
              className="flex-1 text-center lg:text-left"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h1 className="heading-xl mb-6 text-gray-900 dark:text-white">
                Connect With <span className="text-gradient">Top Tech Talent</span> Today
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                LetWeHire connects companies with pre-vetted tech professionals for remote, contract, and full-time roles. Fast, efficient, and transparent.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/signup/client" className="btn-primary py-3 px-6">
                  Hire Talent
                </Link>
                <Link href="/signup/talent" className="btn-secondary py-3 px-6">
                  Find Work
                </Link>
              </div>
              
              <div className="mt-8 flex items-center justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-dark-light bg-accent-primary text-white flex items-center justify-center font-bold">
                      {i}
                    </div>
                  ))}
                </div>
                <div className="ml-4 text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">10,000+</span> professionals on the platform
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary rounded-xl opacity-10 blur-xl transform -rotate-3"></div>
                <div className="card relative overflow-hidden border-0 shadow-smooth-lg h-64 flex items-center justify-center bg-gray-100 dark:bg-dark-light">
                  <p className="text-gray-500 dark:text-gray-400">Platform Preview</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Trusted By Section */}
      <section className="bg-gray-50 dark:bg-dark-light py-12">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300">Trusted by companies worldwide</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-70">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-12 w-24 bg-gray-200 dark:bg-dark-accent rounded flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">Logo {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-dark">
        <div className="container">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="heading-lg mb-4 text-gray-900 dark:text-white">
              Simplifying The Way Tech Hiring Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Our platform connects the right talent with the right opportunities, making the hiring process seamless and efficient.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8 lg:gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="card"
                variants={fadeIn}
              >
                <div className="rounded-full w-12 h-12 bg-gradient-primary flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-light">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="heading-lg mb-6 text-gray-900 dark:text-white">
                How LetWeHire <span className="text-gradient">Works</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-primary text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Create Your Profile</h3>
                    <p className="text-gray-600 dark:text-gray-300">Sign up and create a comprehensive profile highlighting your company needs or professional skills.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-secondary text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Connect & Communicate</h3>
                    <p className="text-gray-600 dark:text-gray-300">Browse opportunities or talent, connect directly, and discuss project details securely through our platform.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-tertiary text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Hire & Collaborate</h3>
                    <p className="text-gray-600 dark:text-gray-300">Finalize agreements, set up contracts, and start working together with our collaborative tools.</p>
                  </div>
                </div>
                
                <Link href="/how-it-works" className="inline-flex items-center text-accent-primary font-medium mt-2">
                  Learn more about our process <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-secondary rounded-xl opacity-10 blur-xl transform rotate-3"></div>
                <div className="card relative overflow-hidden h-64 flex items-center justify-center bg-gray-100 dark:bg-dark-light">
                  <p className="text-gray-500 dark:text-gray-400">How It Works Illustration</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-dark">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary rounded-xl opacity-10 blur-xl transform -rotate-2"></div>
                <div className="card relative overflow-hidden h-64 flex items-center justify-center bg-gray-100 dark:bg-dark-light">
                  <p className="text-gray-500 dark:text-gray-400">Benefits Illustration</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="order-1 lg:order-2"
            >
              <h2 className="heading-lg mb-6 text-gray-900 dark:text-white">
                Why Choose <span className="text-gradient">LetWeHire</span>
              </h2>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Our platform offers unique advantages that make hiring and finding work simpler, faster, and more effective.
              </p>
              
              <motion.div 
                className="space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start gap-3"
                    variants={fadeIn}
                  >
                    <CheckCircle2 className="w-6 h-6 text-accent-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-200">{benefit}</span>
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="mt-8">
                <Link href="/pricing" className="btn-primary py-3 px-6">
                  View Our Pricing
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <motion.section 
        ref={statsRef}
        className="py-16 bg-gray-50 dark:bg-dark-light"
      >
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl font-bold text-gradient mb-2"
              >
                10K+
              </motion.div>
              <p className="text-gray-600 dark:text-gray-400">Active Users</p>
            </div>
            <div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl font-bold text-gradient mb-2"
              >
                1.5K+
              </motion.div>
              <p className="text-gray-600 dark:text-gray-400">Companies</p>
            </div>
            <div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-4xl font-bold text-gradient mb-2"
              >
                8K+
              </motion.div>
              <p className="text-gray-600 dark:text-gray-400">Jobs Posted</p>
            </div>
            <div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-4xl font-bold text-gradient mb-2"
              >
                95%
              </motion.div>
              <p className="text-gray-600 dark:text-gray-400">Success Rate</p>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="heading-lg mb-6">Ready to Transform Your Hiring Process?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of companies and professionals already using LetWeHire to connect, collaborate, and grow together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/signup/client" 
                className="bg-white text-accent-primary font-medium px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all"
              >
                I'm Hiring
              </Link>
              <Link 
                href="/signup/talent" 
                className="bg-transparent border border-white font-medium px-6 py-3 rounded-lg hover:bg-white/10 transition-all"
              >
                I'm Looking for Work
              </Link>
            </div>
          </motion.div>
    </div>
      </section>
    </MainLayout>
  );
}
