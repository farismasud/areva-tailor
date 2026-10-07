"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

/**
 * Three.js Procedural Silk & Thread Flow Canvas (Inspired by ThreeUI & mesh3d.gallery)
 * Simulates high-density woven fabric ribbons undulating in dark space with gold reflections.
 */
export function SilkClothCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene & Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 0, 7)

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Cloth Plane Geometry (curved silk sheet)
    const geometry = new THREE.PlaneGeometry(16, 10, 80, 60)

    // Custom Shader Material for Silk Sheen & Gold Highlights
    const customMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColorDark: { value: new THREE.Color("#080808") },
        uColorSilk: { value: new THREE.Color("#18140e") },
        uColorGold: { value: new THREE.Color("#e5a93c") },
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying float vElevation;

        void main() {
          vUv = uv;
          vec3 pos = position;
          
          // Organic undulating silk waves with more pronounced folds
          float wave1 = sin(pos.x * 0.9 + uTime * 1.1) * 0.65;
          float wave2 = cos(pos.y * 1.3 + uTime * 0.9) * 0.55;
          float wave3 = sin((pos.x + pos.y) * 1.6 + uTime * 0.7) * 0.35;
          
          // Mouse interaction warp
          float mouseDist = length(pos.xy - vec2(uMouse.x * 6.0, uMouse.y * 4.0));
          float mouseInfluence = smoothstep(4.0, 0.0, mouseDist) * 0.6;
          
          float elevation = wave1 + wave2 + wave3 + mouseInfluence;
          pos.z += elevation;
          
          vElevation = elevation;
          vNormal = normalMatrix * normal;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColorDark;
        uniform vec3 uColorSilk;
        uniform vec3 uColorGold;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying float vElevation;

        void main() {
          // Rim and specular lighting simulating silk luster
          vec3 lightDir = normalize(vec3(0.6, 0.9, 1.2));
          float diff = max(dot(normalize(vNormal), lightDir), 0.0);
          float fresnel = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 1.8);

          // Subtle textile lines (subtle silk weave lines)
          float threadPattern = sin(vUv.x * 160.0) * sin(vUv.y * 160.0);
          float subtleThread = smoothstep(-0.2, 0.8, threadPattern) * 0.15;

          // Blend from deep dark fabric into warm bronze-gold crests
          vec3 baseColor = mix(uColorDark, uColorSilk, diff * 0.9);
          vec3 goldHighlights = uColorGold * (fresnel * 1.5 + max(vElevation * 0.8, 0.0) + subtleThread);
          
          vec3 finalColor = baseColor + goldHighlights;
          
          // Soft edge fade
          float alpha = smoothstep(0.0, 0.12, vUv.x) * smoothstep(1.0, 0.88, vUv.x) *
                        smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.88, vUv.y) * 0.95;

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    })

    const mesh = new THREE.Mesh(geometry, customMaterial)
    mesh.rotation.x = -Math.PI * 0.12
    mesh.rotation.z = -Math.PI * 0.04
    scene.add(mesh)

    // Interactive pointer
    const mouse = new THREE.Vector2(0, 0)
    const targetMouse = new THREE.Vector2(0, 0)

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      targetMouse.set(x, y)
    }

    window.addEventListener("pointermove", handlePointerMove)

    // Resize Handler
    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener("resize", handleResize)

    // Animation Loop
    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Smooth mouse lerp
      mouse.lerp(targetMouse, 0.05)
      customMaterial.uniforms.uMouse.value.copy(mouse)
      customMaterial.uniforms.uTime.value = elapsedTime

      mesh.rotation.y = Math.sin(elapsedTime * 0.15) * 0.05 + mouse.x * 0.08
      mesh.rotation.x = -Math.PI * 0.12 + mouse.y * 0.05

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("resize", handleResize)
      geometry.dispose()
      customMaterial.dispose()
      renderer.dispose()
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-100"
      aria-hidden="true"
    />
  )
}
