import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/**
 * Interactive liquid-chrome centerpiece (nested ripply rings).
 * - Three concentric tori (torus knots) with a custom vertex shader:
 *    (a) low-frequency 3D simplex-noise gives idle organic ripple
 *    (b) cursor position (mapped to object space) locally deforms + breaks the surface
 * - MeshPhysicalMaterial with a PMREM RoomEnvironment for real chrome reflections.
 * - Camera locked; only the mesh moves.
 */
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
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    // ── Scene & Camera (locked) ───────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    // ── Environment map for chrome reflections ───────────────────────────
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;

    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xbfd3ff, 0.5);
    rim.position.set(-4, -2, -3);
    scene.add(rim);

    // ── Shared shader uniforms ────────────────────────────────────────────
    const uniforms = {
      uTime:         { value: 0 },
      uMouse:        { value: new THREE.Vector3(999, 999, 0) },
      uHoverAmt:     { value: 0 },
      uDisplace:     { value: 0.10 },
      uCursorForce:  { value: 0.28 },
      uCursorRadius: { value: 0.9 },
    };

    // ── Chrome material with vertex displacement hook ────────────────────
    const makeChromeMaterial = () => {
      const m = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 1.0,
        roughness: 0.05,
        envMapIntensity: 1.4,
        clearcoat: 1.0,
        clearcoatRoughness: 0.03,
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

          // Ashima simplex noise
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
            vec3 nDir = normalize(position);

            float base = snoise(nDir * 2.2 + vec3(0.0, 0.0, uTime * 0.4));
            float base2 = snoise(nDir * 5.0 + vec3(uTime * 0.6, -uTime * 0.4, 0.0)) * 0.4;
            float idle = (base + base2) * uDisplace;

            vec3 mDir = normalize(uMouse);
            float d = distance(nDir, mDir);
            float falloff = smoothstep(uCursorRadius, 0.0, d) * uHoverAmt;
            float turbulence = snoise(nDir * 6.0 + vec3(uTime * 1.4)) * falloff * 0.35;
            float pushOut   = falloff * uCursorForce;
            float ripple    = sin(d * 16.0 - uTime * 3.0) * 0.08 * falloff;

            float disp = idle + pushOut + turbulence + ripple;

            transformed += normal * disp;
          `
        );
      };
      return m;
    };

    // ── Nested chrome rings (three concentric torus knots) ───────────────
    const group = new THREE.Group();

    const rings: THREE.Mesh[] = [];
    const ringSpecs = [
      { radius: 1.35, tube: 0.10, p: 2, q: 3, rotX: 0.15, rotZ: 0.0, spin: 0.20 },
      { radius: 1.00, tube: 0.09, p: 3, q: 2, rotX: -0.10, rotZ: 0.4, spin: -0.28 },
      { radius: 0.62, tube: 0.11, p: 2, q: 5, rotX: 0.05, rotZ: -0.3, spin: 0.34 },
    ];

    ringSpecs.forEach((s) => {
      const geo = new THREE.TorusKnotGeometry(s.radius, s.tube, 480, 40, s.p, s.q);
      const mesh = new THREE.Mesh(geo, makeChromeMaterial());
      mesh.rotation.x = s.rotX;
      mesh.rotation.z = s.rotZ;
      (mesh as any).userData.spin = s.spin;
      group.add(mesh);
      rings.push(mesh);
    });
    scene.add(group);

    // ── Pointer tracking ─────────────────────────────────────────────────
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
      const sphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1.6);
      const hitPoint = new THREE.Vector3();
      const hit = raycaster.ray.intersectSphere(sphere, hitPoint);
      if (hit) {
        const local = group.worldToLocal(hitPoint.clone());
        targetMouse.copy(local.normalize());
        hoverTarget = 1;
      }
    };
    const onPointerLeave = () => { hoverTarget = 0; };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    // ── Render loop ───────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let raf = 0;

    const render = () => {
      const dt = clock.getDelta();
      const t  = clock.getElapsedTime();

      uniforms.uTime.value = t;
      uniforms.uMouse.value.lerp(targetMouse, Math.min(1, dt * 6));
      uniforms.uHoverAmt.value += (hoverTarget - uniforms.uHoverAmt.value) * Math.min(1, dt * 3.5);

      rings.forEach((m) => {
        const spin = (m as any).userData.spin as number;
        m.rotation.y += spin * dt;
        m.rotation.x += spin * 0.35 * dt;
      });

      group.rotation.z = Math.sin(t * 0.3) * 0.06;
      group.position.y = Math.sin(t * 0.9) * 0.03;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      rings.forEach((m) => { m.geometry.dispose(); (m.material as THREE.Material).dispose(); });
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
