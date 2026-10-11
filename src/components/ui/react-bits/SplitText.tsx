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
        <span key={wordIndex} className="inline-block">
          <motion.span
            initial={{ y: 20, opacity: 0, filter: "blur(3px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
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
