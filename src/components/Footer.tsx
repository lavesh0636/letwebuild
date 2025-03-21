"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Github, Linkedin, Twitter, Instagram, Facebook, Youtube } from "lucide-react";

const footerNavigation = {
  platform: [
    { name: "How It Works", href: "/how-it-works" },
    { name: "For Companies", href: "/for-clients" },
    { name: "For Talent", href: "/for-talent" },
    { name: "Pricing", href: "/pricing" },
    { name: "Success Stories", href: "/success-stories" },
  ],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
    { name: "Guides", href: "/guides" },
    { name: "Support", href: "/support" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
    { name: "Press", href: "/press" },
    { name: "Partners", href: "/partners" },
  ],
  social: [
    { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { name: "Twitter", href: "https://twitter.com", icon: Twitter },
    { name: "GitHub", href: "https://github.com", icon: Github },
    { name: "Instagram", href: "https://instagram.com", icon: Instagram },
    { name: "Facebook", href: "https://facebook.com", icon: Facebook },
    { name: "YouTube", href: "https://youtube.com", icon: Youtube },
  ],
};

export default function Footer() {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-dark border-t border-gray-100 dark:border-dark-accent">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-display font-bold text-gradient">
                LetWeHire
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Connecting top tech talent with innovative companies worldwide. 
              Our platform makes hiring and finding work simple, transparent, and effective.
            </p>
            <div className="flex space-x-4">
              {footerNavigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-accent-primary dark:text-gray-400 dark:hover:text-accent-primary transition-colors"
                  aria-label={item.name}
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-3">
              {footerNavigation.platform.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-base text-gray-600 hover:text-accent-primary dark:text-gray-400 dark:hover:text-accent-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerNavigation.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-base text-gray-600 hover:text-accent-primary dark:text-gray-400 dark:hover:text-accent-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-base text-gray-600 hover:text-accent-primary dark:text-gray-400 dark:hover:text-accent-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section with copyright and additional links */}
        <div className="border-t border-gray-100 dark:border-dark-accent pt-8 mt-12 flex flex-col md:flex-row justify-between items-center text-gray-500 dark:text-gray-400">
          <p className="text-sm mb-4 md:mb-0">
            &copy; {currentYear} LetWeHire. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/terms"
              className="text-sm hover:text-accent-primary transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm hover:text-accent-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/cookies"
              className="text-sm hover:text-accent-primary transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 