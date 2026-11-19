import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function InceptionTotem() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const width = container.clientWidth || 420;
    const height = container.clientHeight || 420;
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0.25, 4.9);
    camera.lookAt(0, 0.05, 0);

    renderer.setSize(width, height, false);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';

    // Iluminación de estudio limpia para cerámica blanca sobre fondo oscuro
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.1);
    keyLight.position.set(-3.2, 4.5, 4.2);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x94a3b8, 0.9);
    fillLight.position.set(3.5, -1.5, 2.5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x3b82f6, 1.4);
    rimLight.position.set(3.2, 2.2, -3.5);
    scene.add(rimLight);

    // Silueta orgánica redondeada y continua (estilo cerámica blanca de la referencia)
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.0, -0.76, 0),
      new THREE.Vector3(0.11, -0.73, 0),
      new THREE.Vector3(0.24, -0.58, 0),
      new THREE.Vector3(0.46, -0.40, 0),
      new THREE.Vector3(0.82, -0.26, 0),
      new THREE.Vector3(0.92, -0.14, 0),
      new THREE.Vector3(0.84, -0.02, 0),
      new THREE.Vector3(0.52, 0.09, 0),
      new THREE.Vector3(0.26, 0.24, 0),
      new THREE.Vector3(0.14, 0.54, 0),
      new THREE.Vector3(0.085, 0.90, 0),
      new THREE.Vector3(0.045, 1.15, 0),
      new THREE.Vector3(0.0, 1.21, 0),
    ]);

    const profilePoints = curve.getPoints(64).map((p) => new THREE.Vector2(p.x, p.y));
    const latheGeo = new THREE.LatheGeometry(profilePoints, 80);
    latheGeo.computeVertexNormals();

    const porcelainMaterial = new THREE.MeshStandardMaterial({
      color: 0xf4f7fb,
      metalness: 0.06,
      roughness: 0.28,
    });

    const pivotGroup = new THREE.Group();
    const spinGroup = new THREE.Group();

    const totemMesh = new THREE.Mesh(latheGeo, porcelainMaterial);
    spinGroup.add(totemMesh);

    // Aro sutil en la base para anclar la rotación espacial
    const baseRingGeo = new THREE.RingGeometry(0.46, 0.475, 64);
    const baseRingMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
    });
    const baseRing = new THREE.Mesh(baseRingGeo, baseRingMat);
    baseRing.rotation.x = -Math.PI / 2;
    baseRing.position.y = -1.06;
    pivotGroup.add(baseRing);

    pivotGroup.add(spinGroup);
    pivotGroup.rotation.z = -0.34;
    pivotGroup.rotation.x = 0.22;
    scene.add(pivotGroup);

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handlePointerMove = (e) => {
      pointer.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const w = container.clientWidth || 420;
      const h = container.clientHeight || 420;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    });
    resizeObserver.observe(container);

    if (prefersReducedMotion) {
      spinGroup.rotation.y = 0.6;
      renderer.render(scene, camera);
      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        resizeObserver.disconnect();
        latheGeo.dispose();
        baseRingGeo.dispose();
        porcelainMaterial.dispose();
        baseRingMat.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    }

    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      pointer.x += (pointer.targetX - pointer.x) * 0.05;
      pointer.y += (pointer.targetY - pointer.y) * 0.05;

      // Giro continuo alrededor de su eje
      spinGroup.rotation.y += 0.032;

      // Precesión sutil y reacción al mouse y scroll
      const scrollFactor = Math.min(window.scrollY / 600, 1);
      pivotGroup.rotation.z = -0.34 + Math.sin(elapsed * 1.1) * 0.045 + pointer.x * 0.14;
      pivotGroup.rotation.x = 0.22 + Math.cos(elapsed * 0.9) * 0.035 + pointer.y * 0.1 - scrollFactor * 0.25;
      pivotGroup.position.y = Math.sin(elapsed * 1.3) * 0.04 - scrollFactor * 0.35;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      resizeObserver.disconnect();
      latheGeo.dispose();
      baseRingGeo.dispose();
      porcelainMaterial.dispose();
      baseRingMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="w-full h-full pointer-events-none select-none"
    />
  );
}
