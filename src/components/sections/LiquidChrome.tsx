import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/**
 * Interactive liquid-chrome spiral centerpiece.
 * - Flat Archimedean spiral built with TubeGeometry (viewed head-on).
 * - Custom vertex shader:
 *    (a) idle 3D simplex-noise wobble (liquid ripple / thickness variation)
 *    (b) cursor-driven local push + turbulence that stretches / breaks the surface
 * - MeshPhysicalMaterial + PMREM RoomEnvironment for real chrome reflections.
 * - Camera locked; mesh only rotates slowly + wobbles.
 */

class SpiralCurve extends THREE.Curve<THREE.Vector3> {
  constructor(private turns = 3.0, private a = 0.15, private b = 0.16) {
    super();
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const theta = t * Math.PI * 2 * this.turns;
    const r = this.a + this.b * theta;
    return target.set(Math.cos(theta) * r, Math.sin(theta) * r, 0);
  }
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
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    // ── Scene & Camera (locked) ───────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    // ── Environment ──────────────────────────────────────────────────────
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;

    const key = new THREE.DirectionalLight(0xffffff, 1.2);
    key.position.set(3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xbfd3ff, 0.55);
    rim.position.set(-4, -2, -3);
    scene.add(rim);

    // ── Shared uniforms for shader displacement ──────────────────────────
    const uniforms = {
      uTime:         { value: 0 },
      uMouse:        { value: new THREE.Vector3(999, 999, 0) },
      uHoverAmt:     { value: 0 },
      uDisplace:     { value: 0.045 },  // idle wobble amplitude
      uCursorForce:  { value: 0.28 },
      uCursorRadius: { value: 0.6 },
    };

    const makeChromeMaterial = () => {
      const m = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 1.0,
        roughness: 0.04,
        envMapIntensity: 1.45,
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

            // Slow flowing noise along the tube surface
            float n1 = snoise(position * 3.5 + vec3(uTime * 0.45, 0.0, 0.0));
            float n2 = snoise(position * 8.0 + vec3(0.0, uTime * 0.7, 0.0)) * 0.45;
            float idle = (n1 + n2) * uDisplace;

            // Cursor interaction (in object space)
            vec3 mDir = uMouse;
            float d = distance(position, mDir);
            float falloff = smoothstep(uCursorRadius, 0.0, d) * uHoverAmt;
            float turbulence = snoise(position * 12.0 + vec3(uTime * 1.6)) * falloff * 0.25;
            float pushOut   = falloff * uCursorForce;
            float ripple    = sin(d * 22.0 - uTime * 4.0) * 0.06 * falloff;

            float disp = idle + pushOut + turbulence + ripple;
            transformed += normal * disp;
          `
        );
      };
      return m;
    };

    // ── Spiral chrome ribbon ─────────────────────────────────────────────
    const spiralCurve = new SpiralCurve(3.0, 0.15, 0.16);
    // TubeGeometry: (path, tubularSegments, radius, radialSegments, closed)
    const spiralGeo = new THREE.TubeGeometry(spiralCurve, 900, 0.075, 24, false);
    const spiralMesh = new THREE.Mesh(spiralGeo, makeChromeMaterial());

    // Small liquid "droplets" scattered around the spiral for the organic look
    const dropGroup = new THREE.Group();
    const dropCount = 14;
    for (let i = 0; i < dropCount; i++) {
      const t = i / dropCount;
      const p = spiralCurve.getPoint(0.15 + t * 0.85);
      // Offset outward from spiral center to sit off the ribbon
      const outward = p.clone().normalize().multiplyScalar(0.08 + Math.random() * 0.12);
      const pos = p.clone().add(outward);

      const size = 0.05 + Math.random() * 0.06;
      const dg = new THREE.IcosahedronGeometry(size, 4);
      const dm = new THREE.Mesh(dg, makeChromeMaterial());
      dm.position.copy(pos);
      dm.userData.baseY = pos.y;
      dm.userData.phase = Math.random() * Math.PI * 2;
      dropGroup.add(dm);
    }

    const group = new THREE.Group();
    group.add(spiralMesh);
    group.add(dropGroup);
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
      // Intersect against the z=0 plane of the group (accounting for its rotation)
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      plane.applyMatrix4(group.matrixWorld);
      const hitPoint = new THREE.Vector3();
      const hit = raycaster.ray.intersectPlane(plane, hitPoint);
      if (hit) {
        const local = group.worldToLocal(hitPoint.clone());
        targetMouse.copy(local);
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

      // Slow spin + slight tilt "breathing" of the whole disc, camera locked
      group.rotation.z = t * 0.15;
      group.rotation.x = Math.sin(t * 0.4) * 0.06;
      group.rotation.y = Math.cos(t * 0.35) * 0.06;

      // Drip bob
      dropGroup.children.forEach((c) => {
        const m = c as THREE.Mesh;
        m.position.z = Math.sin(t * 0.8 + (m.userData.phase || 0)) * 0.02;
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
      spiralGeo.dispose();
      (spiralMesh.material as THREE.Material).dispose();
      dropGroup.children.forEach((c) => {
        const m = c as THREE.Mesh;
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
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
