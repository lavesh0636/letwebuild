'use client'

import { motion } from 'framer-motion'
import { FaUserCheck, FaClock, FaGlobe, FaHandshake, FaArrowRight } from 'react-icons/fa'

const features = [
  {
    icon: <FaUserCheck className="w-8 h-8" />,
    title: 'Pre-vetted Talent',
    description: 'Stop evaluating 100s of candidates and directly get access to our talent who are carefully vetted through an extensive screening process.',
  },
  {
    icon: <FaClock className="w-8 h-8" />,
    title: 'Quick Hiring',
    description: 'Focus on building your product while we handpick engineers who match the exact talent persona you are looking for.',
  },
  {
    icon: <FaGlobe className="w-8 h-8" />,
    title: 'Global Talent Pool',
    description: 'Access top talent from around the world with diverse skill sets and experience levels.',
  },
  {
    icon: <FaHandshake className="w-8 h-8" />,
    title: 'Risk-free Trial',
    description: 'Try our talent risk-free with our 2-week trial period. Only pay if you are completely satisfied.',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    y: -5,
    transition: {
      duration: 0.2
    }
  }
}

export default function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tech hiring made easy
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We make it easy to find and hire the perfect talent for your projects
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-blue-600 mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <motion.button
                whileHover={{ x: 5 }}
                className="text-blue-600 flex items-center gap-2 font-medium"
              >
                Learn more <FaArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a href="/hire" className="btn-primary inline-flex items-center gap-2">
            Start Hiring Now <FaArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
} 