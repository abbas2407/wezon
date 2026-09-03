import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/**
 * Exact Liquid Chrome Centerpiece matching Reference Image.
 * - Subtle idle liquid breathing.
 * - Cursor hover creates local liquid tearing & cutting effect.
 * - Mercury droplets split off under cursor and recombine with surface tension.
 */

// 1. Outer Thin Liquid Wave Ribbon
class OuterWaveCurve extends THREE.Curve<THREE.Vector3> {
  constructor() {
    super();
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const angle = t * Math.PI * 2 * 1.05 - 0.3;
    const r = 1.62 + Math.sin(t * Math.PI * 5) * 0.07 + Math.cos(t * Math.PI * 3) * 0.04;
    const z = Math.sin(t * Math.PI * 4) * 0.03;
    return target.set(Math.cos(angle) * r, Math.sin(angle) * r, z);
  }
}

// 2. Main Thick Liquid Ring Curve (With organic thickness)
class MainRingCurve extends THREE.Curve<THREE.Vector3> {
  constructor() {
    super();
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const angle = t * Math.PI * 2;
    const r = 1.12 + Math.sin(angle * 3) * 0.08 + Math.cos(angle * 6) * 0.04;
    const z = Math.cos(angle * 2) * 0.04;
    return target.set(Math.cos(angle) * r, Math.sin(angle) * r, z);
  }
}

// 3. Inner Center Fluid Loop Curve
class CenterLoopCurve extends THREE.Curve<THREE.Vector3> {
  constructor() {
    super();
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const angle = t * Math.PI * 2;
    const r = 0.6 + Math.sin(angle * 4) * 0.06;
    return target.set(Math.cos(angle) * r, Math.sin(angle) * r, 0);
  }
}

// 4. Center Teardrop Hook Curve
class TeardropHookCurve extends THREE.Curve<THREE.Vector3> {
  constructor() {
    super();
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const angle = t * Math.PI * 1.6 - 0.8;
    const r = 0.38 + t * 0.18;
    return target.set(Math.cos(angle) * r, Math.sin(angle) * r, 0);
  }
}

interface MercuryDroplet {
  mesh: THREE.Mesh;
  homePos: THREE.Vector3;
  currentPos: THREE.Vector3;
  velocity: THREE.Vector3;
  baseRadius: number;
  isTornOff: boolean;
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
    renderer.toneMappingExposure = 1.4;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    // ── Scene & Camera ───────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);

    const fitCamera = () => {
      const aspect = width / height;
      const BOUNDS = 1.95;
      const vFov = (camera.fov * Math.PI) / 180;
      const dV = BOUNDS / Math.tan(vFov / 2);
      const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
      const dH = BOUNDS / Math.tan(hFov / 2);
      camera.position.set(0, 0, Math.max(dV, dH));
    };
    fitCamera();

    // ── Environment & Platinum Metal Studio Lighting ─────────────────────
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;

    const mainLight = new THREE.DirectionalLight(0xffffff, 3.0);
    mainLight.position.set(5, 6, 7);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xaaccff, 1.5);
    fillLight.position.set(-5, -4, -3);
    scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 2.0);
    backLight.position.set(0, 0, -5);
    scene.add(backLight);

    // ── Uniforms for Liquid Tearing GLSL Shader ──────────────────────────
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(999, 999, 0) },
      uHover: { value: 0 },
      uCutRadius: { value: 0.55 },
      uTearForce: { value: 0.65 },
    };

    const createPlatinumMaterial = () => {
      const mat = new THREE.MeshPhysicalMaterial({
        color: 0xf8fafc,
        metalness: 0.99,
        roughness: 0.02,
        envMapIntensity: 2.5,
        clearcoat: 1.0,
        clearcoatRoughness: 0.01,
        ior: 1.55,
      });

      mat.onBeforeCompile = (shader) => {
        Object.assign(shader.uniforms, uniforms);

        shader.vertexShader = `
          uniform float uTime;
          uniform vec3  uMouse;
          uniform float uHover;
          uniform float uCutRadius;
          uniform float uTearForce;

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

            // 1. Subtle, slow idle organic wave
            float idleWave = snoise(position * 2.0 + vec3(uTime * 0.2, 0.0, 0.0)) * 0.025;

            // 2. Cursor Liquid Cut / Tear Effect
            vec3 mLoc = uMouse;
            float distToCursor = distance(position, mLoc);
            float cutEffect = smoothstep(uCutRadius, 0.0, distToCursor) * uHover;

            // Push vertices AWAY from cursor center to cut a hole in the liquid metal
            vec3 tearDir = normalize(position - mLoc);
            float tearDisplacement = cutEffect * uTearForce;

            // High frequency liquid bead ripples along torn edge
            float edgeRipples = snoise(position * 18.0 + vec3(uTime * 3.0)) * cutEffect * 0.15;

            // Apply displacement: push inward/outward creating gash
            transformed += (tearDir * tearDisplacement + normal * (idleWave + edgeRipples));
          `
        );
      };
      return mat;
    };

    const sharedChromeMat = createPlatinumMaterial();
    const rootGroup = new THREE.Group();

    // ── Build Geometries ──────────────────────────────────────────────────
    // 1. Outer Wave Ribbon
    const outerGeo = new THREE.TubeGeometry(new OuterWaveCurve(), 350, 0.04, 18, false);
    rootGroup.add(new THREE.Mesh(outerGeo, sharedChromeMat));

    // 2. Main Middle Ring
    const mainGeo = new THREE.TubeGeometry(new MainRingCurve(), 450, 0.16, 26, true);
    rootGroup.add(new THREE.Mesh(mainGeo, sharedChromeMat));

    // 3. Inner Center Ring
    const innerGeo = new THREE.TubeGeometry(new CenterLoopCurve(), 300, 0.08, 20, true);
    rootGroup.add(new THREE.Mesh(innerGeo, sharedChromeMat));

    // 4. Center Teardrop Tongue
    const tearGeo = new THREE.TubeGeometry(new TeardropHookCurve(), 100, 0.05, 16, false);
    rootGroup.add(new THREE.Mesh(tearGeo, sharedChromeMat));

    // 5. Hole Voids & Bridges (Specific details matching image 2)
    const holePositions = [
      new THREE.Vector3(-0.9, 0.25, 0.05),
      new THREE.Vector3(-0.6, 0.75, -0.05),
      new THREE.Vector3(-0.35, -0.9, 0.0),
      new THREE.Vector3(0.8, -0.4, 0.05),
      new THREE.Vector3(0.95, 0.3, -0.05),
    ];

    holePositions.forEach((pos) => {
      const holeRingCurve = new THREE.EllipseCurve(
        pos.x, pos.y,
        0.12, 0.08,
        0, Math.PI * 2,
        false, 0
      );
      const points = holeRingCurve.getPoints(30).map((p) => new THREE.Vector3(p.x, p.y, pos.z));
      const holeCurve = new THREE.CatmullRomCurve3(points, true);
      const hGeo = new THREE.TubeGeometry(holeCurve, 40, 0.035, 12, true);
      rootGroup.add(new THREE.Mesh(hGeo, sharedChromeMat));
    });

    // ── 6. Mercury Droplets (Liquefy & tear apart under cursor) ───────────
    const droplets: MercuryDroplet[] = [];
    const DROPLET_COUNT = 65;
    const dropletGroup = new THREE.Group();

    for (let i = 0; i < DROPLET_COUNT; i++) {
      const angle = (i / DROPLET_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
      const radius = 0.35 + Math.random() * 1.35;
      const homePos = new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 0.1
      );

      const rSize = 0.03 + Math.random() * 0.05;
      const dGeo = new THREE.IcosahedronGeometry(rSize, 3);
      const dMesh = new THREE.Mesh(dGeo, sharedChromeMat);
      dMesh.position.copy(homePos);

      dropletGroup.add(dMesh);
      droplets.push({
        mesh: dMesh,
        homePos: homePos.clone(),
        currentPos: homePos.clone(),
        velocity: new THREE.Vector3(),
        baseRadius: rSize,
        isTornOff: false,
      });
    }
    rootGroup.add(dropletGroup);
    scene.add(rootGroup);

    // ── Pointer Raycasting ────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2(999, 999);
    const mouseLocalTarget = new THREE.Vector3(999, 999, 0);
    let isHovered = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        isHovered = 0;
        return;
      }

      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointerNDC.set(x, y);

      raycaster.setFromCamera(pointerNDC, camera);
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      plane.applyMatrix4(rootGroup.matrixWorld);

      const hit = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(plane, hit)) {
        mouseLocalTarget.copy(rootGroup.worldToLocal(hit.clone()));
        isHovered = 1;
      }
    };

    const onPointerLeave = () => {
      isHovered = 0;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      fitCamera();
      camera.updateProjectionMatrix();
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    // ── Render Loop ───────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let animId = 0;

    const render = () => {
      const dt = Math.min(clock.getDelta(), 0.033);
      const t = clock.getElapsedTime();

      uniforms.uTime.value = t;
      uniforms.uMouse.value.lerp(mouseLocalTarget, Math.min(1, dt * 10));
      uniforms.uHover.value += (isHovered - uniforms.uHover.value) * Math.min(1, dt * 5);

      // Very subtle slow drift (NOT wild animation)
      rootGroup.rotation.z = Math.sin(t * 0.08) * 0.03;
      rootGroup.rotation.x = Math.sin(t * 0.05) * 0.02;

      // Physics: Mercury droplets tear apart on hover & coalesce back
      const mPos = uniforms.uMouse.value;
      const hVal = uniforms.uHover.value;
      const CUT_DIST = 0.65;

      droplets.forEach((drop) => {
        const dist = drop.mesh.position.distanceTo(mPos);

        if (hVal > 0.02 && dist < CUT_DIST) {
          // Tear apart from surface: push away from cursor with liquid burst
          const pushDir = drop.mesh.position.clone().sub(mPos).normalize();
          if (pushDir.lengthSq() === 0) pushDir.set(0, 1, 0);

          const force = (1.0 - dist / CUT_DIST) * 3.5 * hVal;
          drop.velocity.add(pushDir.multiplyScalar(force * dt * 8));
          drop.isTornOff = true;
        } else {
          drop.isTornOff = false;
        }

        // Surface tension cohesion: spring force pulling back to home location
        const springForce = drop.homePos.clone().sub(drop.mesh.position).multiplyScalar(15);
        drop.velocity.add(springForce.multiplyScalar(dt));

        // Viscous fluid damping
        drop.velocity.multiplyScalar(0.85);

        // Update position
        drop.mesh.position.add(drop.velocity.clone().multiplyScalar(dt));

        // Stretch shape when moving fast (liquid drop deformation)
        const speed = drop.velocity.length();
        const stretch = 1.0 + Math.min(speed * 0.3, 0.6);
        drop.mesh.scale.set(
          drop.baseRadius * (2.0 - stretch),
          drop.baseRadius * stretch,
          drop.baseRadius
        );
      });

      renderer.render(scene, camera);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);

      outerGeo.dispose();
      mainGeo.dispose();
      innerGeo.dispose();
      tearGeo.dispose();
      sharedChromeMat.dispose();
      envRT.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
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
