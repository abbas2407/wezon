import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/**
 * Smooth chrome torus centerpiece — no vertex spikes.
 *
 * - A single thick smooth torus (dense radial + tubular segments) rendered with
 *   MeshPhysicalMaterial (metalness 1, near-zero roughness) against a PMREM
 *   RoomEnvironment. Reflections do all the visual work — no shader displacement,
 *   so the surface can never spike.
 * - Cursor moves the torus with a broad, gentle offset (parallax feel), never
 *   deforms vertices. On leave, spring back home smoothly.
 * - Idle: slow rotation + subtle breathing scale so reflections drift.
 * - Camera locked.
 */
export const LiquidChrome: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    // ── Renderer ─────────────────────────────────────────────────
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

    // ── Scene & Camera ───────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    const FIT_R = 1.5; // world half-size to fit
    const fitCamera = () => {
      const aspect = width / height;
      const vFov = (camera.fov * Math.PI) / 180;
      const dV = FIT_R / Math.tan(vFov / 2);
      const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
      const dH = FIT_R / Math.tan(hFov / 2);
      camera.position.set(0, 0, Math.max(dV, dH) * 1.25);
    };
    fitCamera();

    // ── Environment (chrome reflections) ────────────────────────
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;

    const key = new THREE.DirectionalLight(0xffffff, 1.2);
    key.position.set(3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xbfd3ff, 0.6);
    rim.position.set(-4, -2, -3);
    scene.add(rim);

    // ── Chrome torus ─────────────────────────────────────────────
    // Dense segments = smooth silhouette. No shader displacement.
    const geo = new THREE.TorusGeometry(
      /* radius       */ 1.0,
      /* tube         */ 0.32,
      /* radialSeg    */ 200,
      /* tubularSeg   */ 400
    );
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 1.0,
      roughness: 0.03,
      envMapIntensity: 1.6,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
    });
    const torus = new THREE.Mesh(geo, mat);
    torus.rotation.x = 0.55;
    torus.rotation.y = 0.15;

    const group = new THREE.Group();
    group.add(torus);
    scene.add(group);

    // ── Pointer parallax (moves group, not vertices) ────────────
    const target = new THREE.Vector2(0, 0);
    const cur    = new THREE.Vector2(0, 0);

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      // Only respond when pointer is within (or near) the hero canvas
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      target.set(
        THREE.MathUtils.clamp(nx, -1.2, 1.2),
        THREE.MathUtils.clamp(ny, -1.2, 1.2)
      );
    };
    const onPointerLeave = () => target.set(0, 0);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);

    // ── Resize ───────────────────────────────────────────────────
    const onResize = () => {
      width  = mount.clientWidth;
      height = mount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      fitCamera();
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    // ── Render loop ──────────────────────────────────────────────
    const clock = new THREE.Clock();
    let raf = 0;

    const render = () => {
      const dt = clock.getDelta();
      const t  = clock.getElapsedTime();

      // Damped parallax follow (spring-like on release)
      cur.lerp(target, Math.min(1, dt * 2.5));

      // Idle motion
      const spin = 0.15;
      torus.rotation.y = t * spin;
      torus.rotation.x = 0.55 + Math.sin(t * 0.5) * 0.08;

      // Gentle group offset from cursor (parallax) + subtle tilt toward it
      group.position.x = cur.x * 0.22;
      group.position.y = cur.y * 0.14;
      group.rotation.y = cur.x * 0.15;
      group.rotation.x = -cur.y * 0.10;

      // Subtle breathing scale (organic feel without deforming geometry)
      const s = 1.0 + Math.sin(t * 1.2) * 0.008;
      group.scale.setScalar(s);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      geo.dispose();
      mat.dispose();
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
