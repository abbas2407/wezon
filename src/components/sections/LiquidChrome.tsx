import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/**
 * Mirror Platinum/Chrome Liquid Metal Centerpiece matching Image 2 reference.
 * - STATIC by default: Zero idle rotation or continuous motion.
 * - High-contrast mirror chrome: bright white highlights, deep black reflections.
 * - On hover ONLY: Shatters and breaks apart into fragments/droplets around cursor.
 */

// 1. Outer Swirl Arc Curve (Image 2 outer ribbon)
class OuterSwirlCurve extends THREE.Curve<THREE.Vector3> {
  constructor() {
    super();
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const angle = t * Math.PI * 2 * 1.15 - 0.2;
    const r = 1.62 + Math.sin(t * Math.PI * 5) * 0.08 + Math.cos(t * Math.PI * 3) * 0.04;
    const z = Math.sin(t * Math.PI * 3) * 0.04;
    return target.set(Math.cos(angle) * r, Math.sin(angle) * r, z);
  }
}

// 2. Middle Twisted Ring Curve (Image 2 main body)
class MiddleRingCurve extends THREE.Curve<THREE.Vector3> {
  constructor() {
    super();
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const angle = t * Math.PI * 2;
    const r = 1.12 + Math.sin(angle * 3) * 0.09 + Math.cos(angle * 5) * 0.04;
    const z = Math.cos(angle * 2) * 0.04;
    return target.set(Math.cos(angle) * r, Math.sin(angle) * r, z);
  }
}

// 3. Inner Center Fluid Loop Curve
class InnerCoreCurve extends THREE.Curve<THREE.Vector3> {
  constructor() {
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
  constructor() {
    super();
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const angle = t * Math.PI * 1.5 - 0.7;
    const r = 0.38 + t * 0.2;
    return target.set(Math.cos(angle) * r, Math.sin(angle) * r, 0);
  }
}

interface ShatterDroplet {
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

    // ── WebGL Renderer ───────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.6;
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

    // ── Studio Environment Lighting for Pure Chrome Mirrors ─────────────
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.02);
    scene.environment = envRT.texture;

    const mainLight = new THREE.DirectionalLight(0xffffff, 4.0);
    mainLight.position.set(5, 7, 8);
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 2.5);
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    // ── High Contrast Pure Mirror Chrome Shader ──────────────────────────
    const uniforms = {
      uMouse: { value: new THREE.Vector3(999, 999, 0) },
      uHover: { value: 0 },
      uShatterRadius: { value: 0.65 },
      uShatterForce: { value: 0.8 },
    };

    const makeMirrorChromeMaterial = () => {
      const mat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 1.0,
        roughness: 0.0,
        envMapIntensity: 3.5,
        clearcoat: 1.0,
        clearcoatRoughness: 0.0,
        ior: 1.5,
      });

      mat.onBeforeCompile = (shader) => {
        Object.assign(shader.uniforms, uniforms);

        shader.vertexShader = `
          uniform vec3  uMouse;
          uniform float uHover;
          uniform float uShatterRadius;
          uniform float uShatterForce;

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

            // Shatter displacement ON HOVER ONLY
            vec3 mPos = uMouse;
            float d = distance(position, mPos);
            float shatterFactor = smoothstep(uShatterRadius, 0.0, d) * uHover;

            // Push vertices away & create sharp fragment tearing noise on hover
            vec3 pushDir = normalize(position - mPos);
            float tearTurbulence = snoise(position * 16.0) * shatterFactor * 0.4;
            float totalDisplace = (shatterFactor * uShatterForce) + tearTurbulence;

            transformed += pushDir * totalDisplace + normal * (shatterFactor * 0.1);
          `
        );
      };
      return mat;
    };

    const chromeMat = makeMirrorChromeMaterial();
    const rootGroup = new THREE.Group();

    // ── Build Swirl Chrome Ribbon Geometry Matching Image 2 ────────────────
    const outerGeo = new THREE.TubeGeometry(new OuterSwirlCurve(), 350, 0.045, 18, false);
    rootGroup.add(new THREE.Mesh(outerGeo, chromeMat));

    const mainGeo = new THREE.TubeGeometry(new MiddleRingCurve(), 450, 0.15, 26, true);
    rootGroup.add(new THREE.Mesh(mainGeo, chromeMat));

    const innerGeo = new THREE.TubeGeometry(new InnerCoreCurve(), 300, 0.08, 20, true);
    rootGroup.add(new THREE.Mesh(innerGeo, chromeMat));

    const hookGeo = new THREE.TubeGeometry(new CenterHookCurve(), 100, 0.05, 16, false);
    rootGroup.add(new THREE.Mesh(hookGeo, chromeMat));

    // Void holes in main ring
    const voidPos = [
      new THREE.Vector3(-0.9, 0.25, 0.05),
      new THREE.Vector3(-0.6, 0.75, -0.05),
      new THREE.Vector3(-0.35, -0.9, 0.0),
      new THREE.Vector3(0.8, -0.4, 0.05),
    ];
    voidPos.forEach((p) => {
      const ellipse = new THREE.EllipseCurve(p.x, p.y, 0.11, 0.07, 0, Math.PI * 2, false, 0);
      const pts = ellipse.getPoints(30).map((pt) => new THREE.Vector3(pt.x, pt.y, p.z));
      const vCurve = new THREE.CatmullRomCurve3(pts, true);
      rootGroup.add(new THREE.Mesh(new THREE.TubeGeometry(vCurve, 30, 0.03, 10, true), chromeMat));
    });

    // ── Shatter Fragments (Break apart on hover only) ──────────────────────
    const droplets: ShatterDroplet[] = [];
    const dropGroup = new THREE.Group();
    const DROPLET_COUNT = 50;

    for (let i = 0; i < DROPLET_COUNT; i++) {
      const angle = (i / DROPLET_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const radius = 0.4 + Math.random() * 1.3;
      const basePos = new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 0.1
      );

      const size = 0.03 + Math.random() * 0.045;
      const dMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(size, 3), chromeMat);
      dMesh.position.copy(basePos);

      dropGroup.add(dMesh);
      droplets.push({
        mesh: dMesh,
        basePos: basePos.clone(),
        velocity: new THREE.Vector3(),
        scale: size,
      });
    }
    rootGroup.add(dropGroup);
    scene.add(rootGroup);

    // ── Raycasting Pointer Tracking ───────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2(999, 999);
    const mouseTargetLocal = new THREE.Vector3(999, 999, 0);
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
        mouseTargetLocal.copy(rootGroup.worldToLocal(hit.clone()));
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

    // ── Render Loop (STATIC BY DEFAULT) ───────────────────────────────────
    const clock = new THREE.Clock();
    let animId = 0;

    const render = () => {
      const dt = Math.min(clock.getDelta(), 0.033);

      uniforms.uMouse.value.lerp(mouseTargetLocal, Math.min(1, dt * 10));
      uniforms.uHover.value += (isHovered - uniforms.uHover.value) * Math.min(1, dt * 6);

      // NO IDLE ROTATION - Object is static by default
      rootGroup.rotation.set(0, 0, 0);

      // On hover ONLY: fragments break apart and spring back
      const mPos = uniforms.uMouse.value;
      const hVal = uniforms.uHover.value;

      droplets.forEach((drop) => {
        const d = drop.mesh.position.distanceTo(mPos);

        if (hVal > 0.02 && d < 0.7) {
          const pushDir = drop.mesh.position.clone().sub(mPos).normalize();
          const force = (1.0 - d / 0.7) * 3.0 * hVal;
          drop.velocity.add(pushDir.multiplyScalar(force * dt * 8));
        }

        const spring = drop.basePos.clone().sub(drop.mesh.position).multiplyScalar(16);
        drop.velocity.add(spring.multiplyScalar(dt));
        drop.velocity.multiplyScalar(0.82);

        drop.mesh.position.add(drop.velocity.clone().multiplyScalar(dt));
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
      hookGeo.dispose();
      chromeMat.dispose();
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
