/* BUMAVIT — Three.js hero scene
   Particle sphere with organic noise displacement, mouse parallax
   and scroll-linked fade/scale. Degrades gracefully without WebGL. */

import * as THREE from '../vendor/three.module.min.js';

const canvas = document.getElementById('webgl');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

function supportsWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch (e) {
    return false;
  }
}

if (canvas && supportsWebGL()) {
  init();
} else if (canvas) {
  canvas.style.display = 'none';
}

function init() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 6;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setClearColor(0x000000, 0);

  // --- Particle sphere (fibonacci distribution) ---
  const isSmall = window.innerWidth < 768;
  const COUNT = isSmall ? 2600 : 6000;
  const RADIUS = 2.15;

  const positions = new Float32Array(COUNT * 3);
  const seeds = new Float32Array(COUNT);
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < COUNT; i++) {
    const y = 1 - (i / (COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    positions[i * 3] = Math.cos(theta) * r * RADIUS;
    positions[i * 3 + 1] = y * RADIUS;
    positions[i * 3 + 2] = Math.sin(theta) * r * RADIUS;
    seeds[i] = Math.random();
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uOpacity: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uPaper: { value: new THREE.Color('#efede6') },
      uAccent: { value: new THREE.Color('#c6f035') }
    },
    vertexShader: `
      uniform float uTime;
      uniform float uPixelRatio;
      attribute float aSeed;
      varying float vSeed;
      varying float vGlow;

      void main() {
        vSeed = aSeed;
        vec3 p = position;

        // organic breathing displacement (cheap layered trig noise)
        float n = sin(p.x * 1.6 + uTime * 0.55) * 0.5
                + sin(p.y * 2.1 + uTime * 0.42) * 0.35
                + sin(p.z * 1.8 + uTime * 0.65) * 0.4;
        p += normalize(p) * n * 0.18;

        // a few particles drift further out for depth
        p += normalize(p) * step(0.92, aSeed) * (0.4 + sin(uTime * 0.3 + aSeed * 40.0) * 0.25);

        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;

        float twinkle = 0.65 + 0.35 * sin(uTime * (1.2 + aSeed) + aSeed * 20.0);
        vGlow = twinkle;
        gl_PointSize = (1.4 + aSeed * 2.4) * twinkle * uPixelRatio * (5.2 / -mv.z);
      }
    `,
    fragmentShader: `
      uniform vec3 uPaper;
      uniform vec3 uAccent;
      uniform float uOpacity;
      varying float vSeed;
      varying float vGlow;

      void main() {
        // soft round point
        float d = length(gl_PointCoord - 0.5);
        float alpha = smoothstep(0.5, 0.05, d);

        vec3 color = mix(uPaper, uAccent, step(0.72, vSeed));
        gl_FragColor = vec4(color, alpha * vGlow * uOpacity);
      }
    `
  });

  const points = new THREE.Points(geometry, material);
  const group = new THREE.Group();
  group.add(points);

  // subtle wireframe core
  const coreGeo = new THREE.IcosahedronGeometry(RADIUS * 0.52, 1);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0xc6f035,
    wireframe: true,
    transparent: true,
    opacity: 0.05
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  group.add(core);

  scene.add(group);

  // --- Layout: sphere sits right-of-center on wide screens ---
  function layout() {
    const w = window.innerWidth;
    const h = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);

    if (w >= 900) {
      group.position.set(2.1, 0.4, 0);
      group.scale.setScalar(1);
    } else {
      group.position.set(0, 1.15, -0.5);
      group.scale.setScalar(0.72);
    }
  }
  layout();
  window.addEventListener('resize', layout);

  // --- Pointer parallax ---
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  if (!isTouch && !prefersReducedMotion) {
    window.addEventListener('pointermove', (e) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  // --- Render loop ---
  const clock = new THREE.Clock();
  let raf = null;
  const speed = prefersReducedMotion ? 0.12 : 1;

  function tick() {
    const t = clock.getElapsedTime() * speed;
    material.uniforms.uTime.value = t;

    // fade the intro in once the preloader releases the page
    const target = document.body.classList.contains('is-loading') ? 0 : 1;

    // fade out & sink as the hero scrolls away
    const vh = window.innerHeight || 1;
    const scrollFade = Math.max(0, 1 - (window.scrollY / (vh * 0.9)));
    material.uniforms.uOpacity.value +=
      ((target * scrollFade) - material.uniforms.uOpacity.value) * 0.05;
    coreMat.opacity = 0.05 * material.uniforms.uOpacity.value * 4;

    group.rotation.y = t * 0.08;
    group.rotation.z = t * 0.02;

    pointer.x += (pointer.tx - pointer.x) * 0.04;
    pointer.y += (pointer.ty - pointer.y) * 0.04;
    group.rotation.x = pointer.y * 0.18;
    group.rotation.y += pointer.x * 0.12;

    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  }
  tick();

  // pause when the tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (raf) cancelAnimationFrame(raf);
      raf = null;
    } else if (!raf) {
      clock.getDelta();
      tick();
    }
  });
}
