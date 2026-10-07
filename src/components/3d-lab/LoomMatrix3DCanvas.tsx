"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

/**
 * Option 05: Bespoke Loom Matrix & Thread Weft (Dynamic Textiles)
 * Warp and weft textile weave breathing dynamically with golden pulse waves.
 */
export function LoomMatrix3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 7.5)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const loomGroup = new THREE.Group()
    scene.add(loomGroup)

    const gridRows = 28
    const gridCols = 28
    const particleCount = gridRows * gridCols

    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    const goldColor = new THREE.Color(0xd49b35)
    const ivoryColor = new THREE.Color(0xfff6e5)

    let idx = 0
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const x = (c / (gridCols - 1) - 0.5) * 5.5
        const y = (r / (gridRows - 1) - 0.5) * 5.5
        positions[idx * 3] = x
        positions[idx * 3 + 1] = y
        positions[idx * 3 + 2] = 0

        const col = (r + c) % 2 === 0 ? goldColor : ivoryColor
        colors[idx * 3] = col.r
        colors[idx * 3 + 1] = col.g
        colors[idx * 3 + 2] = col.b
        idx++
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    // Glowing silk nodes
    const pointMaterial = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    })
    const pointsMesh = new THREE.Points(geometry, pointMaterial)
    loomGroup.add(pointsMesh)

    // Intersecting thread lines
    const lineIndices: number[] = []
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const i = r * gridCols + c
        if (c < gridCols - 1) lineIndices.push(i, i + 1)
        if (r < gridRows - 1) lineIndices.push(i, i + gridCols)
      }
    }
    const lineGeom = new THREE.BufferGeometry()
    lineGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    lineGeom.setIndex(lineIndices)

    const lineMat = new THREE.LineBasicMaterial({
      color: 0xd49b35,
      transparent: true,
      opacity: 0.25,
    })
    const linesMesh = new THREE.LineSegments(lineGeom, lineMat)
    loomGroup.add(linesMesh)

    loomGroup.rotation.x = -Math.PI * 0.22
    loomGroup.rotation.z = Math.PI * 0.08

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

      const posArr = geometry.attributes.position.array as Float32Array
      let pIdx = 0
      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          const x = posArr[pIdx * 3]
          const y = posArr[pIdx * 3 + 1]

          // Loom warp undulation
          const distToCenter = Math.sqrt(x * x + y * y)
          const z = Math.sin(x * 1.5 + t * 2.0) * 0.35 +
                    Math.cos(y * 1.8 + t * 1.6) * 0.3 +
                    Math.sin(distToCenter * 2.5 - t * 3.0) * 0.25 +
                    (mouseX * x + mouseY * y) * 0.2

          posArr[pIdx * 3 + 2] = z
          pIdx++
        }
      }
      geometry.attributes.position.needsUpdate = true
      lineGeom.attributes.position.needsUpdate = true

      loomGroup.rotation.y = t * 0.15 + mouseX * 0.4
      loomGroup.rotation.x = -Math.PI * 0.22 + mouseY * 0.3

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
