"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

/**
 * Three.js Procedural Silk Cloth Simulation with Dynamic Cursor Ripples
 * Inspired by WebGL couture showcases (ThreeUI, mesh3d.gallery)
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
    const geometry = new THREE.PlaneGeometry(18, 12, 100, 80)

    // Custom Shader Material with Realistic Drape and Cursor Interaction
    const customMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColorDark: { value: new THREE.Color("#050505") },
        uColorSilk: { value: new THREE.Color("#1a150f") },
        uColorGold: { value: new THREE.Color("#e0a338") },
        uColorHighlight: { value: new THREE.Color("#fce2a6") },
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying float vElevation;
        varying float vFresnel;

        void main() {
          vUv = uv;
          vec3 pos = position;
          
          // Organic undulating silk folds (varying frequencies)
          float wave1 = sin(pos.x * 0.75 + uTime * 0.9) * 0.7;
          float wave2 = cos(pos.y * 1.1 + uTime * 0.75) * 0.6;
          float wave3 = sin((pos.x + pos.y) * 1.4 + uTime * 0.6) * 0.4;
          
          // Cursor displacement wave: creates a tactile ripple when pointer moves
          vec2 mouseWorld = vec2(uMouse.x * 7.5, uMouse.y * 4.5);
          float mouseDist = length(pos.xy - mouseWorld);
          float ripple = sin(mouseDist * 3.5 - uTime * 4.0) * exp(-mouseDist * 0.6) * 0.75;
          float mouseDeform = smoothstep(4.5, 0.0, mouseDist) * 0.5;
          
          float elevation = wave1 + wave2 + wave3 + ripple + mouseDeform;
          pos.z += elevation;
          
          vElevation = elevation;
          vNormal = normalize(normalMatrix * normal);
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          vec3 viewDir = normalize(-mvPosition.xyz);
          vFresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.2);

          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColorDark;
        uniform vec3 uColorSilk;
        uniform vec3 uColorGold;
        uniform vec3 uColorHighlight;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying float vElevation;
        varying float vFresnel;

        void main() {
          // Specular directional grazing light simulating Italian wool/silk luster
          vec3 lightDir = normalize(vec3(0.5, 0.8, 1.0));
          float diff = max(dot(vNormal, lightDir), 0.0);

          // Micro textile thread pattern
          float threadX = sin(vUv.x * 240.0);
          float threadY = sin(vUv.y * 240.0);
          float thread = (threadX * threadY) * 0.08;

          // Color composition: Noir fabric -> Silk sheen -> Gold grazing edges
          vec3 base = mix(uColorDark, uColorSilk, diff * 0.85);
          vec3 goldSheen = mix(uColorGold, uColorHighlight, vFresnel);
          vec3 finalColor = base + (goldSheen * (vFresnel * 1.6 + max(vElevation * 0.5, 0.0) + thread));

          // Soft vignette edge fade
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
    mesh.rotation.x = -Math.PI * 0.14
    mesh.rotation.z = -Math.PI * 0.03
    scene.add(mesh)

    // Interactive pointer interpolation
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
      mouse.lerp(targetMouse, 0.06)
      customMaterial.uniforms.uMouse.value.copy(mouse)
      customMaterial.uniforms.uTime.value = elapsedTime

      // Gentle undulating tilt
      mesh.rotation.y = Math.sin(elapsedTime * 0.2) * 0.06 + mouse.x * 0.06
      mesh.rotation.x = -Math.PI * 0.14 + mouse.y * 0.05

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
