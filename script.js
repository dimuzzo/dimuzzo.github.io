import { CSS2DRenderer, CSS2DObject } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/renderers/CSS2DRenderer.js';

document.addEventListener('DOMContentLoaded', () => {

  // --- DOM Elements ---
  const canvas = document.getElementById('universe-canvas');
  const labelsContainer = document.getElementById('labels-container');
  const loader = document.getElementById('loader');
  const contentPanel = document.getElementById('content-panel');
  const contentDisplay = document.getElementById('content-display');
  const closeBtn = document.getElementById('close-btn');
  
  // --- 3D Scene Setup (THREE.JS) ---
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 15;
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // --- 2D Label Renderer ---
  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelsContainer.appendChild(labelRenderer.domElement);

  // --- Lights ---
  const pointLight = new THREE.PointLight(0xffffff, 1.5);
  pointLight.position.set(0, 0, 0);
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(pointLight, ambientLight);

  // --- Universe Objects ---
  let planets = [];
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // 1. Sun (Your brand)
  const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
  const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xe74c3c, wireframe: true });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  scene.add(sun);
  
  // 2. Create Planets (Site Sections)
  const planetData = [
    { name: 'Projects', color: 0x9b59b6, distance: 6, size: 0.7, contentFile: 'projects.html' },
    { name: 'Tech Stack', color: 0x2ecc71, distance: 9, size: 0.6, contentFile: 'techstack.html' },
    { name: 'Socials', color: 0xf1c40f, distance: 12, size: 0.5, contentFile: 'socials.html' },
    { name: 'News', color: 0x3498db, distance: 15, size: 0.4, contentFile: 'news.html' }
  ];

  planetData.forEach((data, index) => {
    const planetGeometry = new THREE.SphereGeometry(data.size, 32, 32);
    const planetMaterial = new THREE.MeshStandardMaterial({ color: data.color, roughness: 0.5 });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    
    // Create HTML label
    const labelDiv = document.createElement('div');
    labelDiv.className = 'planet-label';
    labelDiv.textContent = data.name;
    const label = new CSS2DObject(labelDiv);
    label.position.set(0, data.size + 0.3, 0); // Position label above the planet
    planet.add(label);

    const pivot = new THREE.Object3D();
    scene.add(pivot);
    pivot.add(planet);

    planet.position.x = data.distance;
    planet.userData = { id: data.name, contentFile: data.contentFile };
    
    // Reduced rotation speed
    planets.push({ mesh: planet, pivot: pivot, speed: 0.001 + index * 0.0005 });
  });

  // 3. Background Particles/Stars
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 5000;
  const posArray = new Float32Array(starCount * 3);
  for(let i = 0; i < starCount * 3; i++) posArray[i] = (Math.random() - 0.5) * 200;
  starGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const starMaterial = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff });
  const starMesh = new THREE.Points(starGeometry, starMaterial);
  scene.add(starMesh);

  // --- Interactivity ---
  
  async function loadContent(planet) {
    if (!planet.userData.contentFile) return;
    try {
      const response = await fetch(planet.userData.contentFile);
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const contentToLoad = (planet.userData.id === 'News') ? doc.querySelector('.explore') : doc.querySelector('main');
      if (contentToLoad) {
        contentDisplay.innerHTML = contentToLoad.innerHTML;
        showPanel(planet);
      }
    } catch (error) {
      console.error('Error loading content:', error);
      contentDisplay.innerHTML = `<p>Could not load the ${planet.userData.id} section.</p>`;
      showPanel(planet);
    }
  }

  function showPanel(targetPlanet) {
    const targetPosition = new THREE.Vector3();
    targetPlanet.getWorldPosition(targetPosition);
    gsap.to(camera.position, { duration: 1.5, x: targetPosition.x, y: targetPosition.y, z: targetPosition.z + 3, ease: 'power3.inOut' });
    gsap.to(contentPanel, { duration: 1, opacity: 1, delay: 0.5, onStart: () => { contentPanel.classList.add('visible'); contentPanel.scrollTop = 0; } });
  }

  function hidePanel() {
    gsap.to(contentPanel, { duration: 0.5, opacity: 0, onComplete: () => contentPanel.classList.remove('visible') });
    gsap.to(camera.position, { duration: 1.5, x: 0, y: 0, z: 15, ease: 'power3.inOut' });
  }

  closeBtn.addEventListener('click', hidePanel);
  
  window.addEventListener('click', (event) => {
    if (contentPanel.classList.contains('visible')) return;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planets.map(p => p.mesh));
    if (intersects.length > 0) loadContent(intersects[0].object);
  });

  // Camera control for mouse and touch
  function handleCameraMove(x, y) {
    if (contentPanel.classList.contains('visible')) return;
    const rotX = (y / window.innerHeight - 0.5) * 2;
    const rotY = (x / window.innerWidth - 0.5) * 2;
    gsap.to(camera.rotation, { duration: 0.5, x: -rotX * 0.2, y: -rotY * 0.2, ease: 'power1.out' });
  }
  window.addEventListener('mousemove', (event) => handleCameraMove(event.clientX, event.clientY));
  window.addEventListener('touchmove', (event) => {
    if (event.touches.length > 0) handleCameraMove(event.touches[0].clientX, event.touches[0].clientY);
  });

  // --- Window Management ---
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // --- Animation Loop ---
  function animate() {
    requestAnimationFrame(animate);
    sun.rotation.y += 0.001;
    planets.forEach(p => {
      p.pivot.rotation.y += p.speed;
      p.mesh.rotation.y += 0.01;
    });
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  }

  // --- Start ---
  setTimeout(() => {
    gsap.to(loader, { opacity: 0, onComplete: () => loader.style.display = 'none' });
  }, 1000);
  
  animate();
});