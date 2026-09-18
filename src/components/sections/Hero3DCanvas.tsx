import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

// ── GLSL Simplex Noise for Real-Time Liquid Ripples & Splatter ────────────────
const NOISE_GLSL = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0 / 7.0;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;

// ── Organic Curves Matching Reference Image ───────────────────────────────────

// 1. Outer Swirl Ribbon Curve
class OuterSwirlCurve extends THREE.Curve<THREE.Vector3> {
  public constructor() {
    super();
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const angle = t * Math.PI * 2 * 1.15 - 0.2;
    const r = 1.62 + Math.sin(t * Math.PI * 5) * 0.08 + Math.cos(t * Math.PI * 3) * 0.04;
    const z = Math.sin(t * Math.PI * 3) * 0.04;
    return target.set(Math.cos(angle) * r, Math.sin(angle) * r, z);
  }
}

// 2. Middle Main Liquid Ring Body
class MiddleRingCurve extends THREE.Curve<THREE.Vector3> {
  public constructor() {
    super();
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const angle = t * Math.PI * 2;
    const r = 1.12 + Math.sin(angle * 3) * 0.09 + Math.cos(angle * 5) * 0.04;
    const z = Math.cos(angle * 2) * 0.04;
    return target.set(Math.cos(angle) * r, Math.sin(angle) * r, z);
  }
}

// 3. Inner Core Loop
class InnerCoreCurve extends THREE.Curve<THREE.Vector3> {
  public constructor() {
    super();
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const angle = t * Math.PI * 2;
    const r = 0.62 + Math.sin(angle * 4) * 0.06;
    return target.set(Math.cos(angle) * r, Math.sin(angle) * r, 0);
  }
}

// 4. Center Teardrop Hook
class CenterHookCurve extends THREE.Curve<THREE.Vector3> {
  public constructor() {
    super();
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const angle = t * Math.PI * 1.5 - 0.7;
    const r = 0.38 + t * 0.2;
    return target.set(Math.cos(angle) * r, Math.sin(angle) * r, 0);
  }
}

// ── Fluid Splatter Droplet Interface ──────────────────────────────────────────
interface SplatterDroplet {
  mesh: THREE.Mesh;
  basePos: THREE.Vector3;
  velocity: THREE.Vector3;
  currentPos: THREE.Vector3;
  scale: number;
  targetScale: number;
}

// ── Liquid Platinum Ring Component ────────────────────────────────────────────
function LiquidRing() {
  const rootGroupRef = useRef<THREE.Group>(null);
  const { camera, gl } = useThree();

  // Uniforms for GLSL liquid displacement shader
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(999, 999, 0) },
      uHover: { value: 0 },
      uShatterRadius: { value: 0.68 },
      uShatterForce: { value: 0.75 },
    }),
    []
  );

  // Bright, high-contrast liquid platinum/silver mirror material
  const platinumMaterial = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xffffff),
      metalness: 1.0,
      roughness: 0.015,
      envMapIntensity: 4.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.01,
      ior: 1.55,
      reflectivity: 1.0,
    });

    mat.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, uniforms);

      shader.vertexShader = `
        uniform float uTime;
        uniform vec3 uMouse;
        uniform float uHover;
        uniform float uShatterRadius;
        uniform float uShatterForce;
        ${NOISE_GLSL}
      ` + shader.vertexShader;

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
          vec3 transformed = vec3(position);

          // 1. Idle state subtle liquid surface ripples
          float idleNoise = snoise(position * 2.2 + vec3(0.0, 0.0, uTime * 0.6)) * 0.045;
          float fineRipples = snoise(position * 5.0 - vec3(0.0, 0.0, uTime * 1.2)) * 0.02;

          // 2. Dynamic fluid splatter break-up along mouse path on hover
          float dist = distance(position.xy, uMouse.xy);
          float hoverImpact = smoothstep(uShatterRadius, 0.0, dist) * uHover;

          vec3 pushDir = normalize(position - vec3(uMouse.xy, 0.0));
          float splatterNoise = snoise(position * 8.0 + vec3(0.0, 0.0, uTime * 2.8)) * hoverImpact * uShatterForce;

          transformed += normal * (idleNoise + fineRipples + hoverImpact * 0.12) + pushDir * splatterNoise;
        `
      );
    };

    return mat;
  }, [uniforms]);

  // Geometries for the single-layer organic liquid ring, cutouts, and fluid bridges
  const { outerGeo, mainGeo, innerGeo, hookGeo, voidGeos, bridgeGeos } = useMemo(() => {
    // 1. Outer swirl ribbon
    const oGeo = new THREE.TubeGeometry(new OuterSwirlCurve(), 350, 0.048, 18, false);

    // 2. Middle main organic liquid ring body
    const mGeo = new THREE.TubeGeometry(new MiddleRingCurve(), 450, 0.14, 26, true);

    // 3. Inner core loop
    const iGeo = new THREE.TubeGeometry(new InnerCoreCurve(), 300, 0.075, 20, true);

    // 4. Center teardrop hook
    const hGeo = new THREE.TubeGeometry(new CenterHookCurve(), 100, 0.048, 16, false);

    // 5. Hollow cutout loops (void spaces in main ring)
    const voidPos = [
      new THREE.Vector3(-0.9, 0.25, 0.05),
      new THREE.Vector3(-0.6, 0.75, -0.05),
      new THREE.Vector3(-0.35, -0.9, 0.0),
      new THREE.Vector3(0.8, -0.4, 0.05),
    ];
    const vGeos = voidPos.map((p) => {
      const ellipse = new THREE.EllipseCurve(p.x, p.y, 0.11, 0.07, 0, Math.PI * 2, false, 0);
      const pts = ellipse.getPoints(28).map((pt) => new THREE.Vector3(pt.x, pt.y, p.z));
      const vCurve = new THREE.CatmullRomCurve3(pts, true);
      return new THREE.TubeGeometry(vCurve, 28, 0.032, 10, true);
    });

    // 6. Thin fluid bridges connecting inner core to outer ribbon
    const bridges: THREE.BufferGeometry[] = [];
    const bridgeEndpoints = [
      { from: new THREE.Vector3(-0.55, 0.45, 0), to: new THREE.Vector3(-0.95, 0.65, 0) },
      { from: new THREE.Vector3(0.5, 0.45, 0), to: new THREE.Vector3(0.95, 0.62, 0) },
      { from: new THREE.Vector3(0.55, -0.35, 0), to: new THREE.Vector3(1.05, -0.45, 0) },
      { from: new THREE.Vector3(-0.45, -0.5, 0), to: new THREE.Vector3(-0.85, -0.7, 0) },
    ];
    bridgeEndpoints.forEach(({ from, to }) => {
      const curve = new THREE.CatmullRomCurve3([
        from,
        from.clone().lerp(to, 0.5).add(new THREE.Vector3(0, 0, 0.015)),
        to,
      ]);
      bridges.push(new THREE.TubeGeometry(curve, 18, 0.024, 8, false));
    });

    return {
      outerGeo: oGeo,
      mainGeo: mGeo,
      innerGeo: iGeo,
      hookGeo: hGeo,
      voidGeos: vGeos,
      bridgeGeos: bridges,
    };
  }, []);

  // Liquid Droplets (Zero scale in idle state; disperse on hover along mouse path, then re-coalesce)
  const droplets = useMemo(() => {
    const drops: SplatterDroplet[] = [];
    const DROPLET_COUNT = 36;

    for (let i = 0; i < DROPLET_COUNT; i++) {
      const angle = (i / DROPLET_COUNT) * Math.PI * 2 + (Math.sin(i * 47) * 0.3);
      const radius = 0.65 + (Math.abs(Math.sin(i * 29)) * 0.85);
      const basePos = new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        (Math.sin(i * 19) * 0.05)
      );

      const sphereGeo = new THREE.IcosahedronGeometry(0.038, 3);
      const mesh = new THREE.Mesh(sphereGeo, platinumMaterial);
      mesh.position.copy(basePos);
      mesh.scale.set(0, 0, 0); // Hidden in idle state

      drops.push({
        mesh,
        basePos,
        velocity: new THREE.Vector3(),
        currentPos: basePos.clone(),
        scale: 0,
        targetScale: 0,
      });
    }

    return drops;
  }, [platinumMaterial]);

  // Pointer tracking state
  const mouseLocalTarget = useRef(new THREE.Vector3(999, 999, 0));
  const isHoveredRef = useRef(0);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const planeZ = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const canvasEl = gl.domElement;
      const rect = canvasEl.getBoundingClientRect();

      const expand = 40;
      if (
        e.clientX < rect.left - expand ||
        e.clientX > rect.right + expand ||
        e.clientY < rect.top - expand ||
        e.clientY > rect.bottom + expand
      ) {
        isHoveredRef.current = 0;
        return;
      }

      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      const hit = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(planeZ, hit)) {
        if (rootGroupRef.current) {
          mouseLocalTarget.current.copy(rootGroupRef.current.worldToLocal(hit.clone()));
        } else {
          mouseLocalTarget.current.copy(hit);
        }
        isHoveredRef.current = 1;
      }
    };

    const handlePointerLeave = () => {
      isHoveredRef.current = 0;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [gl, camera, raycaster, planeZ]);

  // Animation frame loop: Idle rotation, GLSL ripples, fluid splatter & surface tension re-coalescing
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.033);

    // 1. Idle State: Smooth continuous slow rotation
    if (rootGroupRef.current) {
      rootGroupRef.current.rotation.z += 0.0025;
      rootGroupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.03;
      rootGroupRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.03;
    }

    // 2. Update uniforms
    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uMouse.value.lerp(mouseLocalTarget.current, Math.min(1, dt * 10));
    uniforms.uHover.value += (isHoveredRef.current - uniforms.uHover.value) * Math.min(1, dt * 6);

    // 3. Fluid Splatter Physics
    const mPos = uniforms.uMouse.value;
    const hVal = uniforms.uHover.value;

    droplets.forEach((drop) => {
      const d = drop.currentPos.distanceTo(mPos);

      // On hover: disperse along mouse path
      if (hVal > 0.08 && d < 0.65) {
        const pushDir = drop.currentPos.clone().sub(mPos).normalize();
        const force = (1.0 - d / 0.65) * 3.5 * hVal;
        drop.velocity.add(pushDir.multiplyScalar(force * dt * 8));
        drop.targetScale = Math.min(1.0, (1.0 - d / 0.65) * 1.2);
      } else {
        drop.targetScale = 0;
      }

      // Surface tension spring pulling back to base position
      const spring = drop.basePos.clone().sub(drop.currentPos).multiplyScalar(15.0);
      drop.velocity.add(spring.multiplyScalar(dt));
      drop.velocity.multiplyScalar(0.83); // Viscous damping

      drop.currentPos.add(drop.velocity.clone().multiplyScalar(dt));
      drop.mesh.position.copy(drop.currentPos);

      // Smooth scale interpolation: pops out on hover splatter, re-coalesces smoothly
      drop.scale += (drop.targetScale - drop.scale) * Math.min(1, dt * 7);
      drop.mesh.scale.set(drop.scale, drop.scale, drop.scale);
    });
  });

  return (
    <group
      ref={rootGroupRef}
      onPointerOver={() => { isHoveredRef.current = 1; }}
      onPointerOut={() => { isHoveredRef.current = 0; }}
    >
      {/* 1. Outer Swirl Fluid Ribbon */}
      <mesh geometry={outerGeo} material={platinumMaterial} />

      {/* 2. Middle Main Organic Liquid Ring */}
      <mesh geometry={mainGeo} material={platinumMaterial} />

      {/* 3. Inner Core Fluid Loop */}
      <mesh geometry={innerGeo} material={platinumMaterial} />

      {/* 4. Center Teardrop Hook */}
      <mesh geometry={hookGeo} material={platinumMaterial} />

      {/* 5. Void Holes Cutouts */}
      {voidGeos.map((geo, idx) => (
        <mesh key={`void-${idx}`} geometry={geo} material={platinumMaterial} />
      ))}

      {/* 6. Thin Fluid Bridges */}
      {bridgeGeos.map((geo, idx) => (
        <mesh key={`bridge-${idx}`} geometry={geo} material={platinumMaterial} />
      ))}

      {/* 7. Dynamic Splatter Droplets (Active on hover only, re-coalesces when mouse leaves) */}
      <group>
        {droplets.map((d, i) => (
          <primitive key={`drop-${i}`} object={d.mesh} />
        ))}
      </group>
    </group>
  );
}

// ── Hero 3D Canvas Root Component ─────────────────────────────────────────────
export default function Hero3DCanvas() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
        userSelect: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.6,
        }}
        dpr={[1, 2]}
      >
        {/* Luminous Studio Platinum Lighting (Bright white highlights & reflections) */}
        <ambientLight intensity={2.0} color="#ffffff" />
        <directionalLight position={[5, 7, 8]} intensity={4.5} color="#ffffff" />
        <directionalLight position={[-6, -4, -4]} intensity={2.8} color="#ffffff" />
        <directionalLight position={[-5, 5, 6]} intensity={2.5} color="#edf2ff" />
        <pointLight position={[0, 0, 5]} intensity={2.2} color="#ffffff" />

        <Environment preset="studio" />
        <LiquidRing />
      </Canvas>
    </div>
  );
}

export { Hero3DCanvas };
