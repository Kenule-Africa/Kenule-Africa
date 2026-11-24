"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeShaderCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) return;
    } catch {
      return;
    }

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 22);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const africaGroup = new THREE.Group();
    scene.add(africaGroup);

    // High-Precision Africa Geographic Contour Coordinates
    const rawAfricaContour: [number, number][] = [
      [-5.8, 35.8],   // Tangier / Gibraltar
      [-0.6, 35.7],   // Oran
      [3.05, 36.75],  // Algiers
      [7.76, 36.9],   // Annaba
      [9.85, 37.34],  // Cape Angela, Tunisia (North tip)
      [11.04, 37.05], // Cape Bon
      [10.6, 35.8],   // Sousse
      [10.1, 33.88],  // Gulf of Gabes
      [11.1, 33.5],   // Djerba
      [13.19, 32.9],  // Tripoli
      [15.1, 32.38],  // Misrata
      [18.57, 30.5],  // Ras Lanuf
      [20.06, 32.1],  // Benghazi
      [22.64, 32.76], // Derna
      [25.15, 31.55], // Sallum, Egypt
      [29.92, 31.2],  // Alexandria
      [31.81, 31.52], // Nile Delta
      [32.3, 31.26],  // Port Said
      [32.55, 29.97], // Suez / Red Sea
      [33.81, 27.26], // Hurghada
      [35.65, 23.95], // Marsa Alam
      [37.22, 19.62], // Port Sudan
      [39.47, 15.61], // Massawa
      [43.32, 12.48], // Bab-el-Mandeb
      [43.14, 11.59], // Djibouti
      [45.01, 10.44], // Berbera
      [49.18, 11.28], // Bosaso
      [51.28, 11.83], // Cape Guardafui (Horn tip)
      [51.41, 10.43], // Ras Hafun
      [48.53, 5.35],  // Hobyo
      [45.34, 2.04],  // Mogadishu
      [42.55, -0.36], // Kismayo
      [40.9, -2.27],  // Lamu, Kenya
      [39.67, -4.05], // Mombasa
      [39.28, -6.82], // Dar es Salaam
      [40.18, -10.27],// Mtwara
      [40.52, -12.97],// Pemba, Mozambique
      [40.74, -15.03],// Mozambique Island
      [36.88, -17.88],// Quelimane
      [34.84, -19.83],// Beira
      [35.38, -23.87],// Inhambane
      [32.58, -25.97],// Maputo
      [31.03, -29.86],// Durban, South Africa
      [27.91, -33.02],// East London
      [25.62, -33.96],// Port Elizabeth
      [20.01, -34.83],// Cape Agulhas (South tip)
      [18.47, -34.35],// Cape of Good Hope
      [18.42, -33.92],// Cape Town
      [17.94, -33.01],// Saldanha Bay
      [15.16, -26.65],// Luderitz, Namibia
      [14.5, -22.95], // Walvis Bay
      [11.75, -17.26],// Kunene River mouth
      [13.23, -8.84], // Luanda, Angola
      [12.37, -6.13], // Congo River mouth
      [11.86, -4.78], // Pointe-Noire
      [8.78, -0.63],  // Cape Lopez, Gabon
      [9.45, 0.39],   // Libreville
      [9.7, 4.05],    // Douala, Cameroon
      [8.32, 4.96],   // Calabar, Nigeria
      [7.17, 4.45],   // Port Harcourt
      [5.35, 5.35],   // Niger Delta
      [3.39, 6.45],   // Lagos, Nigeria
      [2.43, 6.37],   // Cotonou, Benin
      [1.22, 6.13],   // Lome, Togo
      [-0.19, 5.55],  // Accra, Ghana
      [-2.09, 4.74],  // Cape Three Points
      [-3.98, 5.32],  // Abidjan, Ivory Coast
      [-7.71, 4.37],  // Cape Palmas, Liberia
      [-10.8, 6.31],  // Monrovia
      [-13.29, 8.49], // Freetown, Sierra Leone
      [-13.71, 9.51], // Conakry, Guinea
      [-15.58, 11.86],// Bissau
      [-16.58, 13.45],// Banjul, Gambia
      [-17.52, 14.72],// Dakar / Cap-Vert (West tip)
      [-16.5, 16.03], // Saint-Louis, Senegal
      [-16.03, 18.08],// Nouakchott, Mauritania
      [-17.04, 20.77],// Nouadhibou
      [-15.93, 23.72],// Dakhla
      [-13.27, 27.15],// Laayoune
      [-9.6, 30.42],  // Agadir, Morocco
      [-9.77, 31.51], // Essaouira
      [-7.59, 33.57], // Casablanca
      [-6.84, 34.02], // Rabat
      [-5.8, 35.8],   // Tangier
    ];

    const rawMadagascarContour: [number, number][] = [
      [49.3, -11.95],
      [50.28, -14.9],
      [49.74, -15.44],
      [49.41, -18.15],
      [48.01, -22.14],
      [46.99, -25.03],
      [45.16, -25.6],
      [43.67, -23.35],
      [44.28, -20.29],
      [44.02, -18.06],
      [46.31, -15.72],
      [48.45, -13.68],
      [49.3, -11.95],
    ];

    const centerLon = 18.0;
    const centerLat = 2.0;
    const mapScale = 0.125;

    const mapAfricaPoly = rawAfricaContour.map(([lon, lat]) => [
      (lon - centerLon) * mapScale,
      (lat - centerLat) * mapScale,
    ]);

    const mapMadaPoly = rawMadagascarContour.map(([lon, lat]) => [
      (lon - centerLon) * mapScale,
      (lat - centerLat) * mapScale,
    ]);

    function isInsidePoly(px: number, py: number, polygon: number[][]): boolean {
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i][0];
        const yi = polygon[i][1];
        const xj = polygon[j][0];
        const yj = polygon[j][1];

        const intersect = yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
      }
      return inside;
    }

    const positions: number[] = [];
    const scatterPositions: number[] = [];
    const scatterPhases: number[] = [];
    const colors: number[] = [];
    const sizes: number[] = [];
    const layerIndices: number[] = [];

    // Configuration for the 3D extruded dot-matrix pillars
    const GRID_STEP = 0.21;
    const EXTRUDE_LAYERS = 10;
    const LAYER_HEIGHT_STEP = 0.14; // Vertical height spacing of dot pillars

    // Helper to generate scattered 3D cloud coordinates around the target
    const getScatterCoord = (tx: number, ty: number, tz: number) => {
      // Broad 3D dispersion nebula
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.5 + Math.random() * 8.5;
      const sx = tx + Math.cos(angle) * radius + (Math.random() - 0.5) * 4.0;
      const sy = ty + Math.sin(angle) * radius + (Math.random() - 0.5) * 4.0;
      const sz = tz + (Math.random() - 0.5) * 10.0;
      return [sx, sy, sz];
    };

    // 1. Regular 2D Grid Extrusion over Africa & Madagascar
    const minX = -5.2;
    const maxX = 5.2;
    const minY = -5.0;
    const maxY = 5.0;

    for (let x = minX; x <= maxX; x += GRID_STEP) {
      for (let y = minY; y <= maxY; y += GRID_STEP) {
        const inAfrica = isInsidePoly(x, y, mapAfricaPoly);
        const inMada = isInsidePoly(x, y, mapMadaPoly);

        if (inAfrica || inMada) {
          // Extrude downward along Z
          for (let k = 0; k < EXTRUDE_LAYERS; k++) {
            const z = -k * LAYER_HEIGHT_STEP;
            positions.push(x, y, z);
            layerIndices.push(k);

            const [sx, sy, sz] = getScatterCoord(x, y, z);
            scatterPositions.push(sx, sy, sz);
            scatterPhases.push(Math.random() * Math.PI * 2);

            if (k === 0) {
              // Top surface layer: Jet black, solid dots
              colors.push(0.04, 0.04, 0.04);
              sizes.push(4.2);
            } else {
              // Extruded side pillars: Depth gradient fading to slate/gray
              const depthFrac = k / (EXTRUDE_LAYERS - 1);
              const tone = 0.12 + depthFrac * 0.48; // #1E1E1E down to #999999
              colors.push(tone, tone, tone);
              sizes.push(3.6 - depthFrac * 1.0);
            }
          }
        }
      }
    }

    // 2. High-Density Coastline Perimeter Extrusion Columns
    const addCoastlineColumns = (poly: number[][]) => {
      for (let i = 0; i < poly.length - 1; i++) {
        const p1 = poly[i];
        const p2 = poly[i + 1];
        const segDist = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
        const count = Math.max(3, Math.ceil(segDist / (GRID_STEP * 0.75)));

        for (let b = 0; b < count; b++) {
          const t = b / count;
          const cx = p1[0] + (p2[0] - p1[0]) * t;
          const cy = p1[1] + (p2[1] - p1[1]) * t;

          for (let k = 0; k < EXTRUDE_LAYERS; k++) {
            const z = -k * LAYER_HEIGHT_STEP;
            positions.push(cx, cy, z);
            layerIndices.push(k);

            const [sx, sy, sz] = getScatterCoord(cx, cy, z);
            scatterPositions.push(sx, sy, sz);
            scatterPhases.push(Math.random() * Math.PI * 2);

            if (k === 0) {
              colors.push(0.02, 0.02, 0.02);
              sizes.push(4.4);
            } else {
              const depthFrac = k / (EXTRUDE_LAYERS - 1);
              const tone = 0.1 + depthFrac * 0.45;
              colors.push(tone, tone, tone);
              sizes.push(3.8 - depthFrac * 1.0);
            }
          }
        }
      }
    };

    addCoastlineColumns(mapAfricaPoly);
    addCoastlineColumns(mapMadaPoly);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("scatterPos", new THREE.Float32BufferAttribute(scatterPositions, 3));
    geometry.setAttribute("scatterPhase", new THREE.Float32BufferAttribute(scatterPhases, 1));
    geometry.setAttribute("customColor", new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute("customSize", new THREE.Float32BufferAttribute(sizes, 1));
    geometry.setAttribute("layerIndex", new THREE.Float32BufferAttribute(layerIndices, 1));

    // Custom 3D Dot Matrix Shader with Scatter & Magnetic Cursor Coalescence
    const vertexShader = `
      attribute vec3 scatterPos;
      attribute float scatterPhase;
      attribute vec3 customColor;
      attribute float customSize;
      attribute float layerIndex;

      varying vec3 vColor;
      varying float vLayer;
      varying float vWave;
      varying float vCohesion;

      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uMouseActive;
      uniform float uCursorMode;

      void main() {
          vColor = customColor;
          vLayer = layerIndex;

          // 1. Calculate scattered organic 3D drift position
          vec3 floatingScatter = scatterPos;
          floatingScatter.x += sin(uTime * 0.7 + scatterPhase) * 0.85;
          floatingScatter.y += cos(uTime * 0.6 + scatterPhase * 1.4) * 0.85;
          floatingScatter.z += sin(uTime * 0.8 + scatterPhase * 0.8) * 0.65;

          // 2. Cursor Magnetic Field Calculation
          // Map mouse coordinates to Africa group local space
          vec2 localCursor = uMouse * vec2(4.8, 3.8);
          float distToCursor = distance(position.xy, localCursor);

          // Local attraction radius around cursor
          float localAttract = smoothstep(5.8, 0.4, distToCursor);

          // Desktop: scattered until the cursor pulls particles in.
          // Touch / mobile: always fully assembled (no cursor).
          float targetCohesion = clamp(uMouseActive * 0.45 + localAttract * 0.85, 0.0, 1.0);
          float cursorCohesion = smoothstep(0.0, 1.0, targetCohesion);
          float easedCohesion = mix(1.0, cursorCohesion, uCursorMode);
          vCohesion = easedCohesion;

          // 3. Smooth Magnetic Interpolation: Scatter -> Assembled Africa Structure
          vec3 assembled = mix(floatingScatter, position, easedCohesion);

          // 4. Kinetic Wave & Pulse Effects on Assembled Particles
          float w1 = sin(assembled.x * 0.85 + assembled.y * 0.65 + uTime * 1.6) * 0.22;
          float w2 = cos(assembled.x * 0.55 - assembled.y * 0.75 + uTime * 1.2) * 0.15;
          float autoWave = (w1 + w2) * easedCohesion;
          vWave = autoWave;

          float depthDamping = 1.0 - (layerIndex * 0.05);
          assembled.z += autoWave * depthDamping;

          // Cursor interactive ripple when assembled (desktop only)
          float cursorRipple = sin(distToCursor * 2.8 - uTime * 3.2) * 0.24 * localAttract * easedCohesion * uCursorMode;
          assembled.z += cursorRipple * depthDamping;

          vec4 mvPosition = modelViewMatrix * vec4(assembled, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          // 5. Dynamic particle sizing (subtle dust when scattered, bold defined dots when assembled)
          float activeSize = mix(customSize * 0.75, customSize * 1.08, easedCohesion);
          activeSize *= (1.0 + autoWave * 0.2);
          gl_PointSize = activeSize * (26.0 / -mvPosition.z);
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      varying float vLayer;
      varying float vWave;
      varying float vCohesion;

      void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.48) discard;

          // Crisp circular dot with smooth anti-aliased edge
          float alpha = smoothstep(0.48, 0.36, dist);

          // Particles become solid and bold as they come together
          float cohesionAlpha = mix(0.4, 1.0, vCohesion);
          float layerAlpha = 1.0 - (vLayer * 0.035);

          vec3 finalColor = vColor;
          if (vLayer < 0.5) {
            // Pure Obsidian black top
            finalColor = vec3(0.02, 0.02, 0.02);
          } else {
            float toneShift = vWave * 0.08;
            finalColor = clamp(vColor - vec3(toneShift), 0.05, 0.85);
          }

          gl_FragColor = vec4(finalColor, alpha * layerAlpha * cohesionAlpha);
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseActive: { value: 0.0 },
      uCursorMode: { value: 0.0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    africaGroup.add(points);

    // Exact 3D Perspective Rotation matching the reference image:
    africaGroup.rotation.x = 0.55;
    africaGroup.rotation.y = -0.32;
    africaGroup.rotation.z = -0.05;

    let time = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseActive = 0.0;
    let currentMouseActive = 0.0;
    let mouseIdleTimer: NodeJS.Timeout | null = null;

    const cursorQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const applyCursorMode = () => {
      const enabled = cursorQuery.matches;
      uniforms.uCursorMode.value = enabled ? 1.0 : 0.0;
      if (!enabled) {
        mouseX = 0;
        mouseY = 0;
        targetMouseActive = 0.0;
        currentMouseActive = 0.0;
        uniforms.uMouse.value.set(0, 0);
        uniforms.uMouseActive.value = 0.0;
        if (mouseIdleTimer) {
          clearTimeout(mouseIdleTimer);
          mouseIdleTimer = null;
        }
      }
    };

    applyCursorMode();
    cursorQuery.addEventListener("change", applyCursorMode);

    const handleMouseMove = (e: MouseEvent) => {
      if (uniforms.uCursorMode.value < 0.5) return;
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetMouseActive = 1.0;

      if (mouseIdleTimer) clearTimeout(mouseIdleTimer);
      // Keep active while cursor is moving / present
      mouseIdleTimer = setTimeout(() => {
        targetMouseActive = 0.4; // Soft resting cohesion
      }, 2500);
    };

    const handleMouseLeave = () => {
      if (uniforms.uCursorMode.value < 0.5) return;
      targetMouseActive = 0.0;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const adjustLayout = () => {
      const w = window.innerWidth;
      if (w < 768) {
        africaGroup.position.set(0.5, 0.5, -4);
        africaGroup.scale.set(0.75, 0.75, 0.75);
      } else if (w < 1200) {
        africaGroup.position.set(1.2, 0.8, -1.5);
        africaGroup.scale.set(0.9, 0.9, 0.9);
      } else {
        africaGroup.position.set(1.8, 0.6, 0);
        africaGroup.scale.set(1.05, 1.05, 1.05);
      }
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      adjustLayout();
    };

    window.addEventListener("resize", handleResize);
    adjustLayout();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const w = window.innerWidth;
      const baseY = w < 768 ? 0.5 : (w < 1200 ? 0.8 : 0.6);
      africaGroup.position.y = baseY - scrollY * 0.003;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    let animId: number;

    function animate() {
      animId = requestAnimationFrame(animate);
      time += 0.012;

      const cursorEnabled = uniforms.uCursorMode.value > 0.5;

      if (cursorEnabled) {
        currentMouseActive += (targetMouseActive - currentMouseActive) * 0.05;
      } else {
        mouseX = 0;
        mouseY = 0;
        currentMouseActive = 0;
      }

      // Subtle floating motion; cursor parallax is desktop-only
      africaGroup.rotation.y = -0.32 + Math.sin(time * 0.4) * 0.03 + mouseX * 0.12;
      africaGroup.rotation.x = 0.55 + Math.cos(time * 0.35) * 0.02 - mouseY * 0.1;

      uniforms.uTime.value = time;
      uniforms.uMouse.value.x = mouseX;
      uniforms.uMouse.value.y = mouseY;
      uniforms.uMouseActive.value = currentMouseActive;

      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.03;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (mouseIdleTimer) clearTimeout(mouseIdleTimer);
      cursorQuery.removeEventListener("change", applyCursorMode);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="canvas-container"
      className="fixed inset-0 z-0 opacity-100 pointer-events-none"
      aria-hidden="true"
    />
  );
}
