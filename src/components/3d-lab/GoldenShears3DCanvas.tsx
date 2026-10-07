"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

/**
 * Option 04: Golden Shear (Artisan Tailor Scissor Sculptural Cut)
 * Kinetic tailor's shears carving gold ribbon strokes in space.
 */
export function GoldenShears3DCanvas() {
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

    // Lighting
    const dirLight = new THREE.DirectionalLight(0xfff3db, 3.0)
    dirLight.position.set(5, 8, 6)
    scene.add(dirLight)

    const blueRim = new THREE.DirectionalLight(0x554422, 2.0)
    blueRim.position.set(-6, -4, -3)
    scene.add(blueRim)

    const ambientLight = new THREE.AmbientLight(0x201a14, 1.2)
    scene.add(ambientLight)

    const shearsGroup = new THREE.Group()
    scene.add(shearsGroup)

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xdfa53e,
      metalness: 0.95,
      roughness: 0.18,
    })

    const bladeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.12,
    })

    // Scissor blade geometry 1
    const createBladeHalf = () => {
      const half = new THREE.Group()
      
      // Blade
      const bladeShape = new THREE.Shape()
      bladeShape.moveTo(0, -0.15)
      bladeShape.lineTo(2.8, -0.05)
      bladeShape.lineTo(3.2, 0)
      bladeShape.lineTo(2.8, 0.08)
      bladeShape.lineTo(0, 0.25)
      bladeShape.closePath()

      const extrudeSettings = { depth: 0.05, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 }
      const bladeGeom = new THREE.ExtrudeGeometry(bladeShape, extrudeSettings)
      const bladeMesh = new THREE.Mesh(bladeGeom, bladeMaterial)
      half.add(bladeMesh)

      // Handle ring
      const ringGeom = new THREE.TorusGeometry(0.55, 0.1, 16, 40)
      const ringMesh = new THREE.Mesh(ringGeom, goldMaterial)
      ringMesh.position.set(-0.9, 0, 0.03)
      half.add(ringMesh)

      // Handle shank
      const shankGeom = new THREE.CylinderGeometry(0.12, 0.14, 0.8, 16)
      const shankMesh = new THREE.Mesh(shankGeom, goldMaterial)
      shankMesh.rotation.z = Math.PI / 2
      shankMesh.position.set(-0.4, 0, 0.03)
      half.add(shankMesh)

      return half
    }

    const bladeA = createBladeHalf()
    const bladeB = createBladeHalf()
    bladeB.scale.y = -1

    // Center pivot screw
    const screwGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.14, 24)
    const screw = new THREE.Mesh(screwGeom, goldMaterial)
    screw.rotation.x = Math.PI / 2
    screw.position.z = 0.03
    shearsGroup.add(screw)

    shearsGroup.add(bladeA)
    shearsGroup.add(bladeB)

    // Tailor pattern cut lines floating behind
    const cutPoints: THREE.Vector3[] = []
    for (let i = 0; i < 120; i++) {
      const t = (i / 120) * Math.PI * 4
      cutPoints.push(new THREE.Vector3(Math.cos(t) * (2.4 + Math.sin(t * 2) * 0.5), Math.sin(t * 1.5) * 1.8, Math.sin(t) * 1.2))
    }
    const cutPath = new THREE.CatmullRomCurve3(cutPoints, true)
    const cutGeom = new THREE.TubeGeometry(cutPath, 140, 0.04, 12, true)
    const cutMat = new THREE.MeshBasicMaterial({ color: 0xd49b35, wireframe: true, transparent: true, opacity: 0.4 })
    const cutMesh = new THREE.Mesh(cutGeom, cutMat)
    shearsGroup.add(cutMesh)

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

      // Rhythmic cutting snip motion
      const snip = Math.sin(t * 2.8) * 0.18 + 0.18
      bladeA.rotation.z = snip
      bladeB.rotation.z = -snip

      shearsGroup.rotation.y = t * 0.4 + mouseX
      shearsGroup.rotation.x = Math.sin(t * 0.3) * 0.15 + mouseY * 0.5
      shearsGroup.rotation.z = Math.cos(t * 0.25) * 0.15

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
