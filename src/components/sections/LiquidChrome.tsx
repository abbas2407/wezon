import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/**
 * Pixel-Perfect Chrome/Platinum 3D Liquid Object
 * - Custom metallic physical material (roughness 0.1, metalness 1.0, envMap).
 * - Simplex noise-based vertex displacement.
 * - Mousemove displacement toward cursor with liquid splatter & break-apart effect.
 * - Rendered on transparent canvas centered on page with subtle idle rotation.
 */

class TwistedRingCurve extends THREE.Curve<THREE.Vector3> {
  constructor() {
    super();
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const angle = t * Math.PI * 2;
    const r = 1.15 + Math.sin(angle * 3) * 0.12 + Math.cos(angle * 5) * 0.05;
    const z = Math.sin(angle * 2) * 0.08;
    return target.set(Math.cos(angle) * r, Math.sin(angle) * r, z);
  }
}

class OuterRibbonCurve extends THREE.Curve<THREE.Vector3> {
  constructor() {
    super();
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const angle = t * Math.PI * 2 * 1.08 - 0.25;
    const r = 1.6 + Math.sin(t * Math.PI * 6) * 0.06;
    const z = Math.cos(t * Math.PI * 4) * 0.04;
    return target.set(Math.cos(angle) * r, Math.sin(angle) * r, z);
  }
}

interface SplatterFragment {
  mesh: THREE.Mesh;
  basePos: THREE.Vector3;
  velocity: THREE.Vector3;
  size: number;
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
    renderer.toneMappingExposure = 1.3;
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

    // ── Lighting & Studio Environment ───────────────────────────────────
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.8);
    dirLight1.position.set(5, 6, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x88bbff, 1.2);
    dirLight2.position.set(-5, -4, -3);
    scene.add(dirLight2);

    // ── Metallic Custom Shader Uniforms ──────────────────────────────────
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(999, 999, 0) },
      uHover: { value: 0 },
      uDispAmp: { value: 0.12 },
      uCursorForce: { value: 0.55 },
      uCursorRadius: { value: 0.75 },
    };

    const makeMetallicShaderMaterial = () => {
      const mat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 1.0,
        roughness: 0.1,
        envMapIntensity: 2.2,
        clearcoat: 0.8,
        clearcoatRoughness: 0.05,
      });

      mat.onBeforeCompile = (shader) => {
        Object.assign(shader.uniforms, uniforms);

        shader.vertexShader = `
          uniform float uTime;
          uniform vec3  uMouse;
          uniform float uHover;
          uniform float uDispAmp;
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

            // Simplex noise idle displacement
            float n1 = snoise(position * 2.5 + vec3(uTime * 0.4, 0.0, 0.0));
            float n2 = snoise(position * 6.0 - vec3(0.0, uTime * 0.6, 0.0)) * 0.4;
            float idleNoise = (n1 + n2) * uDispAmp;

            // Cursor proximity displacement towards cursor + splatter turbulence
            vec3 mPos = uMouse;
            float d = distance(position, mPos);
            float cursorInfluence = smoothstep(uCursorRadius, 0.0, d) * uHover;

            vec3 attractDir = normalize(mPos - position);
            float pull = cursorInfluence * uCursorForce;
            float splatterTurbulence = snoise(position * 12.0 + vec3(uTime * 2.5)) * cursorInfluence * 0.35;

            transformed += normal * (idleNoise + splatterTurbulence) + attractDir * pull;
          `
        );
      };
      return mat;
    };

    const chromeMat = makeMetallicShaderMaterial();
    const rootGroup = new THREE.Group();

    // ── Build Organic Molten Form ─────────────────────────────────────────
    const mainRingGeo = new THREE.TubeGeometry(new TwistedRingCurve(), 450, 0.16, 26, true);
    rootGroup.add(new THREE.Mesh(mainRingGeo, chromeMat));

    const outerRibbonGeo = new THREE.TubeGeometry(new OuterRibbonCurve(), 350, 0.05, 18, false);
    rootGroup.add(new THREE.Mesh(outerRibbonGeo, chromeMat));

    // Inner fluid core
    const coreGeo = new THREE.TorusGeometry(0.55, 0.08, 20, 100);
    rootGroup.add(new THREE.Mesh(coreGeo, chromeMat));

    // ── Liquid Splatter Fragments ─────────────────────────────────────────
    const fragments: SplatterFragment[] = [];
    const fragGroup = new THREE.Group();
    const FRAG_COUNT = 48;

    for (let i = 0; i < FRAG_COUNT; i++) {
      const angle = (i / FRAG_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const radius = 0.4 + Math.random() * 1.3;
      const basePos = new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 0.2
      );

      const size = 0.03 + Math.random() * 0.05;
      const fGeo = new THREE.IcosahedronGeometry(size, 3);
      const fMesh = new THREE.Mesh(fGeo, chromeMat);
      fMesh.position.copy(basePos);

      fragGroup.add(fMesh);
      fragments.push({
        mesh: fMesh,
        basePos: basePos.clone(),
        velocity: new THREE.Vector3(),
        size,
      });
    }
    rootGroup.add(fragGroup);
    scene.add(rootGroup);

    // ── Raycasting Pointer Tracking ───────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2(999, 999);
    const targetLocalMouse = new THREE.Vector3(999, 999, 0);
    let hoverState = 0;

    const onPointerMove = (e: PointerEvent) => {
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

      const hit = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(plane, hit)) {
        targetLocalMouse.copy(rootGroup.worldToLocal(hit.clone()));
        hoverState = 1;
      }
    };

    const onPointerLeave = () => {
      hoverState = 0;
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

    // ── Animation Loop ────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let animId = 0;

    const render = () => {
      const dt = Math.min(clock.getDelta(), 0.033);
      const t = clock.getElapsedTime();

      uniforms.uTime.value = t;
      uniforms.uMouse.value.lerp(targetLocalMouse, Math.min(1, dt * 8));
      uniforms.uHover.value += (hoverState - uniforms.uHover.value) * Math.min(1, dt * 4);

      // Subtle idle rotation when no hover
      const idleRotSpeed = hoverState > 0.5 ? 0.02 : 0.06;
      rootGroup.rotation.z = Math.sin(t * 0.1) * 0.04 + t * idleRotSpeed;
      rootGroup.rotation.x = Math.sin(t * 0.2) * 0.03;

      // Mouse displacement & liquid splatter physics on fragments
      const mPos = uniforms.uMouse.value;
      const hVal = uniforms.uHover.value;

      fragments.forEach((frag) => {
        const d = frag.mesh.position.distanceTo(mPos);
        const radius = 0.8;

        if (hVal > 0.02 && d < radius) {
          const pushDir = frag.mesh.position.clone().sub(mPos).normalize();
          const force = (1.0 - d / radius) * 2.5 * hVal;
          frag.velocity.add(pushDir.multiplyScalar(force * dt * 6));
        }

        const spring = frag.basePos.clone().sub(frag.mesh.position).multiplyScalar(12);
        frag.velocity.add(spring.multiplyScalar(dt));
        frag.velocity.multiplyScalar(0.86);

        frag.mesh.position.add(frag.velocity.clone().multiplyScalar(dt));
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

      mainRingGeo.dispose();
      outerRibbonGeo.dispose();
      coreGeo.dispose();
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
