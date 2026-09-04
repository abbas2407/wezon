import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/**
 * Liquid-chrome / mercury centerpiece.
 *
 * Design goals:
 *  - Smooth ray-traced-looking chrome surface (MeshPhysicalMaterial + PMREM RoomEnvironment).
 *  - Idle motion driven by 3-octave simplex noise gradient → surface flows instead of poking spikes.
 *  - Cursor influence is a broad gaussian bulge + damped turbulence, no ripple sine.
 *  - Satellite droplets scatter outward near the cursor, then spring back to their orbit
 *    positions when the cursor leaves — the surface-tension "coalesce" effect.
 *  - All lerps are heavily damped to eliminate snap / clip / spike artefacts.
 */
export const LiquidChrome: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    // ── Renderer ──────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    // ── Scene & Camera ────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    const SPHERE_R = 1.35;
    const fitCamera = () => {
      const aspect = width / height;
      const vFov = (camera.fov * Math.PI) / 180;
      const dV = SPHERE_R / Math.tan(vFov / 2);
      const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
      const dH = SPHERE_R / Math.tan(hFov / 2);
      camera.position.set(0, 0, Math.max(dV, dH) * 1.25);
    };
    fitCamera();

    // ── Environment (chrome reflections) ─────────────────────────────
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;

    const key = new THREE.DirectionalLight(0xffffff, 1.15);
    key.position.set(3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xbfd3ff, 0.55);
    rim.position.set(-4, -2, -3);
    scene.add(rim);

    // ── Shared shader uniforms ───────────────────────────────────────
    const uniforms = {
      uTime:         { value: 0 },
      uMouse:        { value: new THREE.Vector3(999, 999, 0) },
      uHoverAmt:     { value: 0 },
      uDisplace:     { value: 0.06 }, // idle amplitude — small so surface stays smooth
      uCursorForce:  { value: 0.20 }, // gentle push
      uCursorRadius: { value: 1.20 }, // broad gaussian (world units)
    };

    const makeChromeMaterial = () => {
      const m = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 1.0,
        roughness: 0.02,
        envMapIntensity: 1.6,
        clearcoat: 1.0,
        clearcoatRoughness: 0.02,
      });
      m.onBeforeCompile = (shader) => {
        Object.assign(shader.uniforms, uniforms);

        shader.vertexShader = `
          uniform float uTime;
          uniform vec3  uMouse;
          uniform float uHoverAmt;
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
            vec4 mm = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            mm = mm*mm;
            return 42.0 * dot(mm*mm, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
          }

          // 3-octave fBm for smooth idle motion
          float fbm(vec3 p){
            float n  = snoise(p);
            float n2 = snoise(p * 2.0 + 11.3) * 0.5;
            float n3 = snoise(p * 4.0 - 7.7)  * 0.25;
            return n + n2 + n3;
          }
        ` + shader.vertexShader;

        shader.vertexShader = shader.vertexShader.replace(
          '#include <begin_vertex>',
          `
            vec3 transformed = vec3(position);
            vec3 nDir = normalize(position);

            // ── Idle liquid flow (smooth fBm along a slowly drifting field) ──
            float t = uTime * 0.30;
            float flow = fbm(nDir * 1.8 + vec3(0.0, 0.0, t));
            float idle = flow * uDisplace;

            // ── Cursor influence: broad gaussian bulge + damped turbulence ──
            float d = distance(position, uMouse);
            float g = exp(-(d*d) / (uCursorRadius * uCursorRadius));
            float falloff = g * uHoverAmt;
            float turb = snoise(position * 3.5 + vec3(uTime * 0.9)) * falloff * 0.15;
            float push = falloff * uCursorForce;

            float disp = idle + push + turb;

            // Displace along the object-space normal — geometry is a smooth icosahedron
            // so displacement stays continuous.
            transformed += normal * disp;
          `
        );
      };
      return m;
    };

    // ── Core mercury body ────────────────────────────────────────────
    // High-subdivision icosahedron: smooth continuous surface, no polygonal seams.
    const bodyGeo = new THREE.IcosahedronGeometry(1.0, 96);
    const bodyMat = makeChromeMaterial();
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);

    // A slim inner torus preserves the "ring" silhouette from the earlier design
    const ringGeo = new THREE.TorusGeometry(1.15, 0.045, 64, 512);
    const ringMat = makeChromeMaterial();
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = 0.6;

    // Satellite droplets — chrome spheres that scatter near the cursor and coalesce back.
    const droplets: THREE.Mesh[] = [];
    const DROPLET_COUNT = 6;
    for (let i = 0; i < DROPLET_COUNT; i++) {
      const g = new THREE.SphereGeometry(0.055 + Math.random() * 0.04, 32, 32);
      const m = new THREE.Mesh(g, makeChromeMaterial());
      const angle = (i / DROPLET_COUNT) * Math.PI * 2;
      const r = 1.25;
      const home = new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, 0);
      m.position.copy(home);
      m.userData.home = home.clone();
      m.userData.offset = new THREE.Vector3();
      droplets.push(m);
    }

    const group = new THREE.Group();
    group.add(bodyMesh);
    group.add(ringMesh);
    droplets.forEach((d) => group.add(d));
    scene.add(group);

    // ── Pointer tracking (heavily damped for smooth "mercury" feel) ─
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2(999, 999);
    const targetMouse = new THREE.Vector3(999, 999, 0);
    let hoverTarget = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointerNDC.set(x, y);
      raycaster.setFromCamera(pointerNDC, camera);

      // Intersect against a large virtual sphere at group origin so the cursor
      // always maps to a smooth position in object space (no NaN when off-mesh).
      const sphere = new THREE.Sphere(group.position.clone(), 1.7);
      const hit = new THREE.Vector3();
      if (raycaster.ray.intersectSphere(sphere, hit)) {
        targetMouse.copy(group.worldToLocal(hit.clone()));
        hoverTarget = 1;
      }
    };
    const onPointerLeave = () => { hoverTarget = 0; };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);

    // ── Resize ───────────────────────────────────────────────────────
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

    // ── Render loop ──────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let raf = 0;

    const render = () => {
      const dt = clock.getDelta();
      const t  = clock.getElapsedTime();

      uniforms.uTime.value = t;
      // Very slow lerps → no snap / spike
      uniforms.uMouse.value.lerp(targetMouse, Math.min(1, dt * 2.2));
      uniforms.uHoverAmt.value += (hoverTarget - uniforms.uHoverAmt.value) * Math.min(1, dt * 1.6);

      // Gentle whole-group rotation so reflections shift over time
      group.rotation.z = t * 0.08;
      group.rotation.x = Math.sin(t * 0.35) * 0.05;
      group.rotation.y = Math.cos(t * 0.28) * 0.05;

      // Droplets: scatter near cursor, spring back home when it leaves
      droplets.forEach((d) => {
        const home = d.userData.home as THREE.Vector3;
        const off  = d.userData.offset as THREE.Vector3;
        const mouseLocal = uniforms.uMouse.value;
        // vector from home → cursor projected onto local space
        const toMouse = new THREE.Vector3().subVectors(mouseLocal, home);
        const dist = toMouse.length();
        const infl = Math.exp(-(dist * dist) / 1.0) * uniforms.uHoverAmt.value;
        // scatter direction: away from home in the mouse direction
        const desired = toMouse.normalize().multiplyScalar(-0.35 * infl);
        // Damp toward desired offset (surface-tension spring on return)
        off.lerp(desired, Math.min(1, dt * 3.0));
        d.position.copy(home).add(off);
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      bodyGeo.dispose();
      ringGeo.dispose();
      (bodyMesh.material as THREE.Material).dispose();
      (ringMesh.material as THREE.Material).dispose();
      droplets.forEach((d) => {
        d.geometry.dispose();
        (d.material as THREE.Material).dispose();
      });
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
        pointerEvents: 'none',
      }}
    />
  );
};
