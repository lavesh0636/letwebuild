'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'

const stats = [
  { number: '$6 Million', label: 'Talent Payments' },
  { number: '100,000+', label: 'Engineers Vetted' },
  { number: '72 Hrs', label: 'Average Time-to-hire' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Build your dream<br />tech team
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-600 mb-8"
            >
              LetWeBuild is your 1-stop solution to hire dream developers for full-time or contract roles
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/hire" className="btn-primary inline-flex items-center gap-2">
                Hire Developers <FaArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/hire-designers" className="btn-secondary inline-flex items-center gap-2">
                Hire Designers <FaArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 grid grid-cols-3 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <h3 className="text-2xl lg:text-3xl font-bold text-blue-600 mb-1">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1 relative"
          >
            <div className="relative w-full h-[400px] lg:h-[500px]">
              <Image
                src="/images/hero-image.png"
                alt="LetWeBuild Platform"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trusted By Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="container mx-auto px-4 mt-16"
      >
        <p className="text-center text-gray-600 mb-8">Trusted by leading companies</p>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
          {/* Add your client logos here */}
          {[1, 2, 3, 4, 5].map((index) => (
            <motion.div 
              key={index} 
              className="w-32 h-12 relative grayscale hover:grayscale-0 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={`/images/client-${index}.png`}
                alt={`Client ${index}`}
                fill
                className="object-contain"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
} 