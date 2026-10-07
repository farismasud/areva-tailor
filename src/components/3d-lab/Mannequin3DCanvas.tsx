"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

/**
 * Option A: 3D Sartorial Torso / Mannequin Contour Lines
 * Simulates tailor's dress form with anatomical measuring slices and glowing golden dots.
 */
export function Mannequin3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 7)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    // Create horizontal contour slices forming a tailor's mannequin bust
    const sliceCount = 38
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xd49b35,
      transparent: true,
      opacity: 0.6,
      linewidth: 1,
    })

    const pointMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.04,
      transparent: true,
      opacity: 0.8,
    })

    for (let i = 0; i < sliceCount; i++) {
      const y = (i / sliceCount) * 4.2 - 2.1
      
      // Parametric bust radius profile (shoulders, chest, waist, hips)
      let radius = 0.8
      if (y > 1.2) {
        radius = 0.4 + (2.1 - y) * 0.4 // Neck to shoulder
      } else if (y > 0.4) {
        radius = 1.35 - (y - 0.4) * 0.3 // Chest / bust
      } else if (y > -0.6) {
        radius = 0.95 + (y + 0.6) * 0.4 // Tapered waist
      } else {
        radius = 1.25 - (y + 2.1) * 0.2 // Hips / skirt of mannequin
      }

      const points: THREE.Vector3[] = []
      const segments = 64
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2
        // Slightly elliptical for human torso
        const x = Math.cos(theta) * radius * 1.15
        const z = Math.sin(theta) * radius * 0.75
        points.push(new THREE.Vector3(x, y, z))
      }

      const geom = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(geom, lineMaterial)
      group.add(line)

      // Add anatomical anchor measuring dots every few slices
      if (i % 4 === 0) {
        const pGeom = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(radius * 1.15, y, 0),
          new THREE.Vector3(-radius * 1.15, y, 0),
          new THREE.Vector3(0, y, radius * 0.75),
          new THREE.Vector3(0, y, -radius * 0.75),
        ])
        const pts = new THREE.Points(pGeom, pointMaterial)
        group.add(pts)
      }
    }

    // Spine centerline
    const spinePts: THREE.Vector3[] = []
    for (let i = 0; i < 40; i++) {
      const y = (i / 40) * 4.4 - 2.2
      spinePts.push(new THREE.Vector3(0, y, 0))
    }
    const spineGeom = new THREE.BufferGeometry().setFromPoints(spinePts)
    const spineLine = new THREE.Line(spineGeom, new THREE.LineBasicMaterial({ color: 0xffe6a3, opacity: 0.3, transparent: true }))
    group.add(spineLine)

    // Mouse movement
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 1.5
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 1.0
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
      const elapsed = clock.getElapsedTime()

      mouseX += (targetX - mouseX) * 0.05
      mouseY += (targetY - mouseY) * 0.05

      // Elegant slow rotation + mouse tilt
      group.rotation.y = elapsed * 0.35 + mouseX
      group.rotation.x = mouseY * 0.4
      group.position.y = Math.sin(elapsed * 0.8) * 0.08

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
    <div ref={containerRef} className="w-full h-full relative cursor-grab active:cursor-grabbing" />
  )
}
