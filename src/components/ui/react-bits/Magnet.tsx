"use client"

import React, { useRef, useState } from "react"

interface MagnetProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  disabled?: boolean
  magnetStrength?: number
}

export function Magnet({
  children,
  disabled = false,
  magnetStrength = 0.35,
  className = "",
  ...props
}: MagnetProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2

    const distX = e.clientX - centerX
    const distY = e.clientY - centerY

    setPosition({
      x: distX * magnetStrength,
      y: distY * magnetStrength,
    })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 ? "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)" : "transform 0.1s ease-out",
      }}
      className={`inline-block will-change-transform ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
