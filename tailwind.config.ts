import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      colors: {
        'accent-primary': '#3b82f6', // Blue for primary accent
        'accent-secondary': '#8b5cf6', // Purple for secondary accent
        'accent-tertiary': '#ec4899', // Pink for tertiary accent
        'dark': '#111827', // Dark background
        'dark-light': '#1f2937', // Lighter dark background
        'dark-accent': '#374151', // Border and accent for dark mode
        text: {
          primary: '#F8FAFC', // Light text for dark backgrounds
          secondary: '#94A3B8', // Secondary text
        },
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.1)',
          dark: 'rgba(0, 0, 0, 0.3)',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #3b82f6, #8b5cf6)',
        'gradient-secondary': 'linear-gradient(to right, #8b5cf6, #ec4899)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'smooth': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'smooth-lg': '0 10px 30px rgba(0, 0, 0, 0.1)',
        'inner-light': 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
        'neon-purple': '0 0 15px rgba(124, 58, 237, 0.5)',
        'neon-blue': '0 0 15px rgba(59, 130, 246, 0.5)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      // For glassmorphism effects
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    function({ addUtilities }: any) {
      const newUtilities = {
        '.glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
          'border-radius': '10px',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          'box-shadow': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        },
        '.glass-dark': {
          background: 'rgba(0, 0, 0, 0.25)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
          'border-radius': '10px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          'box-shadow': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        },
        '.text-gradient': {
          'background-clip': 'text',
          'background-image': 'linear-gradient(to right, #7C3AED, #3B82F6)',
          'color': 'transparent',
        }
      }
      addUtilities(newUtilities)
    }
  ],
}

export default config 