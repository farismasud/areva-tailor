"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

/**
 * Option C: 3D Minimalist Geometric Silk Ribbon (ThreeUI Inspired)
 * Single continuous Möbius-like silk ribbon strip spiraling gracefully.
 */
export function SilkRibbon3DCanvas() {
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

    // Lighting
    const dirLight = new THREE.DirectionalLight(0xfff1cf, 2.5)
    dirLight.position.set(5, 8, 5)
    scene.add(dirLight)

    const fillLight = new THREE.DirectionalLight(0x403010, 1.5)
    fillLight.position.set(-5, -4, -2)
    scene.add(fillLight)

    const ambientLight = new THREE.AmbientLight(0x1a1610, 1.0)
    scene.add(ambientLight)

    // Create a 3D spline curve for the continuous ribbon using CatmullRomCurve3
    const curvePoints: THREE.Vector3[] = []
    const numPoints = 80
    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints
      const angle = t * Math.PI * 4
      const x = Math.sin(angle) * (2.2 + Math.cos(t * Math.PI * 2) * 0.5)
      const y = Math.cos(t * Math.PI * 2) * 1.8 + Math.sin(angle * 2) * 0.4
      const z = Math.cos(angle) * (2.0 + Math.sin(t * Math.PI * 2) * 0.5)
      curvePoints.push(new THREE.Vector3(x, y, z))
    }

    const path = new THREE.CatmullRomCurve3(curvePoints, true)
    const tubeGeometry = new THREE.TubeGeometry(path, 160, 0.22, 16, true)

    // Gold silk physical material
    const material = new THREE.MeshStandardMaterial({
      color: 0xcaa048,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: false,
    })

    const ribbonMesh = new THREE.Mesh(tubeGeometry, material)
    scene.add(ribbonMesh)

    // Subtle hairline wireframe overlay for sartorial sketch look
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    })
    const wireframeMesh = new THREE.Mesh(tubeGeometry, wireframeMat)
    ribbonMesh.add(wireframeMesh)

    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 1.8
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 1.2
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

      ribbonMesh.rotation.y = t * 0.35 + mouseX
      ribbonMesh.rotation.x = Math.sin(t * 0.2) * 0.2 + mouseY * 0.5
      ribbonMesh.rotation.z = Math.cos(t * 0.25) * 0.15

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(reqId)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      tubeGeometry.dispose()
      material.dispose()
      wireframeMat.dispose()
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
