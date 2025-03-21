"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Particles } from "@/components/ui/particles"

export default function ParticlesPage() {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [color, setColor] = useState("#ffffff")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const currentTheme = theme === 'system' ? systemTheme : theme
    setColor(currentTheme === "dark" ? "#ffffff" : "#000000")
  }, [theme, systemTheme, mounted])

  if (!mounted) {
    return (
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent">
          Loading...
        </span>
      </div>
    )
  }

  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Particles
      </span>
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={color}
        refresh={false}
        staticity={50}
      />
    </div>
  )
} 