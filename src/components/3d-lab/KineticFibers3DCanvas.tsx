"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

/**
 * Option B: 3D Kinetic Floating Fabric Threads & Golden Fibers
 * Hundreds of woven yarn lines swirling smoothly in dark space.
 */
export function KineticFibers3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 8)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Generate fluid fiber curves
    const threadCount = 45
    const pointsPerThread = 60
    const linesGroup = new THREE.Group()
    scene.add(linesGroup)

    const threadCurves: { geom: THREE.BufferGeometry; phase: number; speed: number; radius: number }[] = []

    for (let i = 0; i < threadCount; i++) {
      const positions = new Float32Array(pointsPerThread * 3)
      const geom = new THREE.BufferGeometry()
      geom.setAttribute("position", new THREE.BufferAttribute(positions, 3))

      const isGold = i % 2 === 0
      const mat = new THREE.LineBasicMaterial({
        color: isGold ? 0xd49b35 : 0xfbf1d8,
        transparent: true,
        opacity: isGold ? 0.65 : 0.35,
        linewidth: 1,
      })

      const line = new THREE.Line(geom, mat)
      linesGroup.add(line)

      threadCurves.push({
        geom,
        phase: (i / threadCount) * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.4,
        radius: 1.2 + Math.random() * 1.6,
      })
    }

    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2.0
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 1.5
    }
    window.addEventListener("mousemove", handleMouseMove)

    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener("resize", handleResize)

    let reqId: number
    const clock = new THREE.Clock()

    const animate = () => {
      reqId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      mouseX += (targetX - mouseX) * 0.05
      mouseY += (targetY - mouseY) * 0.05

      threadCurves.forEach((thread, tIdx) => {
        const posAttr = thread.geom.attributes.position as THREE.BufferAttribute
        const arr = posAttr.array as Float32Array

        for (let j = 0; j < pointsPerThread; j++) {
          const u = (j / pointsPerThread) * Math.PI * 4
          const angle = u + t * thread.speed + thread.phase + mouseX * 0.5
          
          // Flowing helix formula with turbulence
          const r = thread.radius + Math.sin(t * 1.2 + j * 0.15) * 0.4
          const x = Math.cos(angle) * r
          const y = ((j / pointsPerThread) - 0.5) * 6.5 + Math.sin(t * 0.8 + angle) * 0.3 - mouseY
          const z = Math.sin(angle) * r + Math.cos(t * 0.6 + j * 0.1) * 0.5

          arr[j * 3] = x
          arr[j * 3 + 1] = y
          arr[j * 3 + 2] = z
        }
        posAttr.needsUpdate = true
      })

      linesGroup.rotation.y = t * 0.15
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(reqId)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full relative" />
  )
}
