"use client"

import React from "react"
import { motion, useReducedMotion } from "motion/react"

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
}

export function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 0.04,
}: SplitTextProps) {
  const shouldReduceMotion = useReducedMotion()
  const words = text.split(" ")

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>
  }

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden pb-1">
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.7,
              ease: [0.23, 1, 0.32, 1],
              delay: delay + wordIndex * stagger,
            }}
            className="inline-block will-change-transform"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
