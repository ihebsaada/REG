'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { workflowSVG } from '@/lib/svgPaths'

export default function AnimatedWorkflow() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div
      className="relative flex items-center justify-center w-full overflow-hidden bg-black"
      style={{ minHeight: isMobile ? '100vh' : '120vh' }}
    >
      <svg
        viewBox={workflowSVG.viewBox}
        className="w-[90vw] h-auto overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        {workflowSVG.lines.map((line, lineIndex) =>
          line.paths.map((d, i) => {
            // Position / scale dynamique selon l’écran
            const translateX = isMobile
              ? lineIndex * 20 // léger décalage sur mobile
              : lineIndex * 80 // espacement horizontal desktop
            const translateY = isMobile ? lineIndex * 40 : 0
            const scale = isMobile ? 0.9 : 1.2

            return (
              <motion.path
                key={`${line.id}-${i}`}
                d={d}
                stroke="#00FF66"
                strokeWidth={isMobile ? 2 : 3}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="3000"
                strokeDashoffset="3000"
                initial={{ strokeDashoffset: 3000, opacity: 0 }}
                animate={{ strokeDashoffset: 0, opacity: 1 }}
                transition={{
                  duration: 3.2,
                  delay: lineIndex * 1.4 + i * 0.3,
                  ease: 'easeInOut',
                }}
                transform={`translate(${translateX}, ${translateY}) scale(${scale})`}
                style={{
                  filter: 'drop-shadow(0 0 10px #00ff66)',
                }}
              />
            )
          }),
        )}
      </svg>
    </div>
  )
}
