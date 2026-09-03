import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/**
 * High-performance liquid metal 3D centerpiece matching Image 2 reference.
 * - Outer wavy organic spiral curve.
 * - Inner topological liquid ring with organic voids/holes.
 * - Orbiting liquid droplets that break apart and scatter on cursor hover.
 * - Custom GLSL vertex displacement shader for real-time mercury viscosity.
 */

// Custom curve for outer thin liquid ribbon
class OuterLiquidRibbonCurve extends THREE.Curve<THREE.Vector3> {
  constructor(private radius = 1.6) {
    super();
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const angle = t * Math.PI * 2 * 1.1 - 0.2;
    const r = this.radius + Math.sin(t * Math.PI * 6) * 0.08 + Math.cos(t * Math.PI * 4) * 0.05;
    const z = Math.sin(t * Math.PI * 3) * 0.04;
    return target.set(Math.cos(angle) * r, Math.sin(angle) * r, z);
  }
}

// Custom curve for inner main liquid ring
class MainLiquidRingCurve extends THREE.Curve<THREE.Vector3> {
  constructor(private radius = 1.05) {
    super();
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const angle = t * Math.PI * 2;
    const r = this.radius + Math.sin(angle * 3) * 0.12 + Math.cos(angle * 5) * 0.06;
    const z = Math.cos(angle * 2) * 0.05;
    return target.set(Math.cos(angle) * r, Math.sin(angle) * r, z);
  }
}

// Custom curve for innermost fluid loop
class InnerLoopCurve extends THREE.Curve<THREE.Vector3> {
  constructor(private radius = 0.55) {
    super();
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const angle = t * Math.PI * 2;
    const r = this.radius + Math.sin(angle * 4) * 0.09;
    return target.set(Math.cos(angle) * r, Math.sin(angle) * r, 0);
  }
}

interface ParticleFragment {
  mesh: THREE.Mesh;
  basePos: THREE.Vector3;
  velocity: THREE.Vector3;
  scale: number;
}

export const LiquidChrome: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    // ── Scene & Camera ───────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.8);

    const fitCamera = () => {
      const aspect = width / height;
      const BOUNDS = 1.95;
      const vFov = (camera.fov * Math.PI) / 180;
      const dV = BOUNDS / Math.tan(vFov / 2);
      const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
      const dH = BOUNDS / Math.tan(hFov / 2);
      camera.position.z = Math.max(dV, dH);
    };
    fitCamera();

    // ── Lighting & Environment (Platinum Reflections) ───────────────────
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(4, 5, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x99ccff, 1.2);
    dirLight2.position.set(-4, -3, -2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 1.5, 10);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    // ── Uniforms ──────────────────────────────────────────────────────────
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(999, 999, 0) },
      uHover: { value: 0 },
      uDisplace: { value: 0.08 },
      uCursorForce: { value: 0.45 },
      uCursorRadius: { value: 0.85 },
    };

    const makeChromeMaterial = () => {
      const mat = new THREE.MeshPhysicalMaterial({
        color: 0xf5f7fa,
        metalness: 0.98,
        roughness: 0.03,
        envMapIntensity: 2.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.02,
        ior: 1.5,
      });

      mat.onBeforeCompile = (shader) => {
        Object.assign(shader.uniforms, uniforms);

        shader.vertexShader = `
          uniform float uTime;
          uniform vec3  uMouse;
          uniform float uHover;
          uniform float uDisplace;
          uniform float uCursorForce;
          uniform float uCursorRadius;

          vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
          vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
          float snoise(vec3 v){
            const vec2  C = vec2(1.0/6.0, 1.0/3.0);
            const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i  = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;
            i = mod(i, 289.0);
            vec4 p = permute(permute(permute(
                       i.z + vec4(0.0, i1.z, i2.z, 1.0))
                     + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                     + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            float n_ = 1.0/7.0;
            vec3 ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);
            vec4 x = x_ *ns.x + ns.yyyy;
            vec4 y = y_ *ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);
            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
            vec3 p0 = vec3(a0.xy, h.x);
            vec3 p1 = vec3(a0.zw, h.y);
            vec3 p2 = vec3(a1.xy, h.z);
            vec3 p3 = vec3(a1.zw, h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
            p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
            vec4 m2 = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m2 = m2*m2;
            return 42.0 * dot(m2*m2, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
          }
        ` + shader.vertexShader;

        shader.vertexShader = shader.vertexShader.replace(
          '#include <begin_vertex>',
          `
            vec3 transformed = vec3(position);

            // Organic continuous liquid flow
            float wave1 = snoise(position * 2.2 + vec3(uTime * 0.5, 0.0, uTime * 0.2));
            float wave2 = snoise(position * 5.0 - vec3(0.0, uTime * 0.8, 0.0)) * 0.4;
            float idleDisp = (wave1 + wave2) * uDisplace;

            // Real-time local mouse deformation & liquid breaking
            vec3 mLocal = uMouse;
            float distToMouse = distance(position, mLocal);
            float cursorEffect = smoothstep(uCursorRadius, 0.0, distToMouse) * uHover;

            // Viscous liquid stretch & tearing waves
            float tearNoise = snoise(position * 14.0 + vec3(uTime * 2.2)) * cursorEffect * 0.35;
            float repulsion = cursorEffect * uCursorForce;
            float liquidRipple = sin(distToMouse * 30.0 - uTime * 6.0) * 0.09 * cursorEffect;

            float totalDisp = idleDisp + repulsion + tearNoise + liquidRipple;
            transformed += normal * totalDisp;
          `
        );
      };
      return mat;
    };

    const sharedChromeMat = makeChromeMaterial();

    // ── Build Central Platinum Geometry (Matching Image 2) ────────────────
    const rootGroup = new THREE.Group();

    // 1. Outer Thin Liquid Ribbon
    const outerCurve = new OuterLiquidRibbonCurve(1.55);
    const outerGeo = new THREE.TubeGeometry(outerCurve, 400, 0.05, 20, false);
    const outerMesh = new THREE.Mesh(outerGeo, sharedChromeMat);
    rootGroup.add(outerMesh);

    // 2. Main Middle Liquid Ring (Thicker torus with organic shape)
    const mainCurve = new MainLiquidRingCurve(1.1);
    const mainGeo = new THREE.TubeGeometry(mainCurve, 500, 0.16, 28, true);
    const mainMesh = new THREE.Mesh(mainGeo, sharedChromeMat);
    rootGroup.add(mainMesh);

    // 3. Inner Fluid Loop
    const innerCurve = new InnerLoopCurve(0.65);
    const innerGeo = new THREE.TubeGeometry(innerCurve, 300, 0.09, 20, true);
    const innerMesh = new THREE.Mesh(innerGeo, sharedChromeMat);
    rootGroup.add(innerMesh);

    // 4. Connecting Liquid Tendrils & Bridges
    const bridgePoints = [
      new THREE.Vector3(-0.8, 0.4, 0.1),
      new THREE.Vector3(-0.4, 0.8, -0.1),
      new THREE.Vector3(0.7, -0.5, 0.05),
      new THREE.Vector3(-0.2, -0.85, 0.0),
    ];

    bridgePoints.forEach((pt) => {
      const tendrilCurve = new THREE.CatmullRomCurve3([
        pt,
        pt.clone().multiplyScalar(1.4).add(new THREE.Vector3(0.1, -0.1, 0.05)),
        pt.clone().multiplyScalar(1.8),
      ]);
      const tendrilGeo = new THREE.TubeGeometry(tendrilCurve, 40, 0.045, 12, false);
      const tendrilMesh = new THREE.Mesh(tendrilGeo, sharedChromeMat);
      rootGroup.add(tendrilMesh);
    });

    // 5. Interactive Liquid Fragments / Droplets that break off
    const fragments: ParticleFragment[] = [];
    const fragmentGroup = new THREE.Group();
    const FRAGMENT_COUNT = 32;

    for (let i = 0; i < FRAGMENT_COUNT; i++) {
      const angle = (i / FRAGMENT_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const rad = 0.4 + Math.random() * 1.35;
      const basePos = new THREE.Vector3(
        Math.cos(angle) * rad,
        Math.sin(angle) * rad,
        (Math.random() - 0.5) * 0.3
      );

      const size = 0.035 + Math.random() * 0.06;
      const fragGeo = new THREE.IcosahedronGeometry(size, 3);
      const fragMesh = new THREE.Mesh(fragGeo, sharedChromeMat);
      fragMesh.position.copy(basePos);

      fragmentGroup.add(fragMesh);
      fragments.push({
        mesh: fragMesh,
        basePos: basePos.clone(),
        velocity: new THREE.Vector3(),
        scale: size,
      });
    }
    rootGroup.add(fragmentGroup);

    scene.add(rootGroup);

    // ── Raycasting & Pointer Setup ────────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2(999, 999);
    const targetMouseLocal = new THREE.Vector3(999, 999, 0);
    let hoverState = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        hoverState = 0;
        return;
      }

      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointerNDC.set(x, y);

      raycaster.setFromCamera(pointerNDC, camera);
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      plane.applyMatrix4(rootGroup.matrixWorld);

      const hitPoint = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(plane, hitPoint)) {
        const localHit = rootGroup.worldToLocal(hitPoint.clone());
        targetMouseLocal.copy(localHit);
        hoverState = 1;
      }
    };

    const handlePointerLeave = () => {
      hoverState = 0;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);

    // ── Resize Handler ────────────────────────────────────────────────────
    const handleResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      fitCamera();
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mount);

    // ── Animation Loop ────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let animFrameId = 0;

    const animate = () => {
      const dt = clock.getDelta();
      const t = clock.getElapsedTime();

      uniforms.uTime.value = t;
      uniforms.uMouse.value.lerp(targetMouseLocal, Math.min(1, dt * 8));
      uniforms.uHover.value += (hoverState - uniforms.uHover.value) * Math.min(1, dt * 4);

      // Continuous subtle organic float
      rootGroup.rotation.z = Math.sin(t * 0.12) * 0.08 + t * 0.05;
      rootGroup.rotation.x = Math.sin(t * 0.3) * 0.05;
      rootGroup.rotation.y = Math.cos(t * 0.25) * 0.05;

      // Particle liquid droplets fragmenting & springing back
      const mousePos = uniforms.uMouse.value;
      const hoverVal = uniforms.uHover.value;

      fragments.forEach((frag) => {
        const d = frag.mesh.position.distanceTo(mousePos);
        const repulseRadius = 0.9;

        if (hoverVal > 0.01 && d < repulseRadius) {
          // Repel away from cursor
          const dir = frag.mesh.position.clone().sub(mousePos).normalize();
          const force = (1.0 - d / repulseRadius) * 1.8 * hoverVal;
          frag.velocity.add(dir.multiplyScalar(force * dt * 5));
        }

        // Spring force pulling back to base location
        const springAcc = frag.basePos.clone().sub(frag.mesh.position).multiplyScalar(12);
        frag.velocity.add(springAcc.multiplyScalar(dt));
        frag.velocity.multiplyScalar(0.88); // Damping

        frag.mesh.position.add(frag.velocity.clone().multiplyScalar(dt));

        // Pulsate individual droplet sizes
        const pSize = frag.scale * (1 + Math.sin(t * 3 + frag.basePos.x * 10) * 0.15);
        frag.mesh.scale.setScalar(pSize / frag.scale);
      });

      renderer.render(scene, camera);
      animFrameId = requestAnimationFrame(animate);
    };

    animFrameId = requestAnimationFrame(animate);

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);

      outerGeo.dispose();
      mainGeo.dispose();
      innerGeo.dispose();
      sharedChromeMat.dispose();
      envRT.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
      }}
    />
  );
};
