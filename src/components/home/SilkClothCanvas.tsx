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
    const geometry = new THREE.PlaneGeometry(12, 8, 80, 60)

    // Custom Shader Material for Silk Sheen & Gold Highlights
    const customMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColorDark: { value: new THREE.Color("#0d0d0d") },
        uColorSilk: { value: new THREE.Color("#1f1a14") },
        uColorGold: { value: new THREE.Color("#d49b35") },
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
          
          // Organic undulating silk waves
          float wave1 = sin(pos.x * 0.8 + uTime * 0.9) * 0.45;
          float wave2 = cos(pos.y * 1.2 + uTime * 0.7) * 0.35;
          float wave3 = sin((pos.x + pos.y) * 1.5 + uTime * 0.5) * 0.25;
          
          // Mouse interaction warp
          float mouseDist = length(pos.xy - vec2(uMouse.x * 5.0, uMouse.y * 3.0));
          float mouseInfluence = smoothstep(3.5, 0.0, mouseDist) * 0.4;
          
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
          // Micro-thread grid weave
          float weaveX = step(0.5, fract(vUv.x * 120.0));
          float weaveY = step(0.5, fract(vUv.y * 120.0));
          float weave = mix(0.92, 1.0, abs(weaveX - weaveY));

          // Rim and specular lighting simulating silk luster
          vec3 lightDir = normalize(vec3(0.5, 0.8, 1.0));
          float diff = max(dot(normalize(vNormal), lightDir), 0.0);
          float fresnel = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 2.5);

          // Blend from dark fabric into warm bronze-gold crests
          vec3 baseColor = mix(uColorDark, uColorSilk, diff * 0.8);
          vec3 goldHighlights = uColorGold * (fresnel * 0.85 + max(vElevation * 0.35, 0.0));
          
          vec3 finalColor = (baseColor + goldHighlights) * weave;
          
          // Soft edge fade
          float alpha = smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x) *
                        smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y) * 0.85;

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
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-90"
      aria-hidden="true"
    />
  )
}
