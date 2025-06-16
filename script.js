import { CSS2DRenderer, CSS2DObject } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/renderers/CSS2DRenderer.js';

document.addEventListener('DOMContentLoaded', () => {

  // --- TEMA GLOBALE (per tutte le pagine) ---
  function applyGlobalTheme(theme) {
    if (theme === 'white-space') {
      document.body.classList.add('white-space');
    } else {
      document.body.classList.remove('white-space');
    }
  }

  function initializeThemeToggle() {
    // Selettore universale per i pulsanti tema
    const themeToggle = document.getElementById('theme-toggle') || document.getElementById('toggle-theme');
    
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const newTheme = document.body.classList.contains('white-space') ? 'dark-space' : 'white-space';
        localStorage.setItem('theme', newTheme);
        applyGlobalTheme(newTheme);
        
        // Aggiorna colore stelle se presente (solo nella pagina principale)
        if (typeof starMesh !== 'undefined') {
          const starColor = getComputedStyle(document.body).getPropertyValue('--star-color').trim();
          starMesh.material.color.set(starColor);
        }
      });
    }
    
    // Applica tema salvato
    const savedTheme = localStorage.getItem('theme') || 'dark-space';
    applyGlobalTheme(savedTheme);
  }

  // Inizializza il tema per tutte le pagine
  initializeThemeToggle();

  // --- LOGICA SPECIFICA PER INDEX.HTML (3D Universe) ---
  const canvas = document.getElementById('universe-canvas');
  if (!canvas) {
    // Non siamo nella pagina principale, inizializza solo animazioni base
    initializePageAnimations();
    return;
  }

  // --- 3D Scene Setup ---
  const labelsContainer = document.getElementById('labels-container');
  const contentPanel = document.getElementById('content-panel');
  const contentDisplay = document.getElementById('content-display');
  const closeBtn = document.getElementById('close-btn');
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 15;
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelsContainer.appendChild(labelRenderer.domElement);

  // --- Universe Objects ---
  const pointLight = new THREE.PointLight(0xffffff, 1.5);
  scene.add(pointLight);
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);
  let planets = [];
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const sun = new THREE.Mesh(new THREE.SphereGeometry(2, 32, 32), new THREE.MeshBasicMaterial({ color: 0xe74c3c, wireframe: true }));
  scene.add(sun);
  
  const planetData = [
    { name: 'Projects', color: 0x9b59b6, distance: 6, size: 0.7, contentFile: 'projects.html' },
    { name: 'Tech Stack', color: 0x2ecc71, distance: 9, size: 0.6, contentFile: 'techstack.html' },
    { name: 'Socials', color: 0xf1c40f, distance: 12, size: 0.5, contentFile: 'socials.html' },
    { name: 'News', color: 0x3498db, distance: 15, size: 0.4, contentFile: 'news.html' }
  ];

  planetData.forEach((data, index) => {
    const planet = new THREE.Mesh( new THREE.SphereGeometry(data.size, 32, 32), new THREE.MeshStandardMaterial({ color: data.color, roughness: 0.5 }) );
    const labelDiv = document.createElement('div');
    labelDiv.className = 'planet-label';
    labelDiv.textContent = data.name;
    const label = new CSS2DObject(labelDiv);
    label.position.set(0, data.size + 0.3, 0);
    planet.add(label);
    const pivot = new THREE.Object3D();
    scene.add(pivot);
    pivot.add(planet);
    planet.position.x = data.distance;
    planet.userData = { id: data.name, contentFile: data.contentFile };
    planets.push({ mesh: planet, pivot: pivot, speed: 0.001 + index * 0.0005 });
  });

  const starMaterial = new THREE.PointsMaterial({ size: 0.05 });
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 5000;
  const posArray = new Float32Array(starCount * 3);
  for(let i = 0; i < starCount * 3; i++) posArray[i] = (Math.random() - 0.5) * 200;
  starGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const starMesh = new THREE.Points(starGeometry, starMaterial);
  scene.add(starMesh);

  // Applica colore stelle iniziale
  const starColor = getComputedStyle(document.body).getPropertyValue('--star-color').trim();
  starMesh.material.color.set(starColor);

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
        // Inizializza effetti per i contenuti caricati
        initializeLoadedContent();
      }
    } catch (error) { console.error('Error loading content:', error); }
  }
  
  // Inizializza contenuti caricati dinamicamente
  function initializeLoadedContent() {
    // Effetto tilt per project cards
    document.querySelectorAll('#content-display .project-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const { width, height } = rect;
        const rotateX = (y / height - 0.5) * -10; // Ridotto per un effetto più sottile
        const rotateY = (x / width - 0.5) * 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      });
    });

    // Assicura che i link nei progetti funzionino
    document.querySelectorAll('#content-display .btn-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.stopPropagation(); // Previene interferenze
      });
    });

    // Animazione di entrata per le card
    gsap.from('#content-display .project-card, #content-display .social-card, #content-display .tech-item, #content-display .blog-link-card', {
      duration: 0.6,
      y: 30,
      opacity: 0,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }

  function showPanel(targetPlanet) {
    const targetPosition = new THREE.Vector3();
    targetPlanet.getWorldPosition(targetPosition);
    gsap.to(camera.position, { duration: 1.5, x: targetPosition.x, y: targetPosition.y, z: targetPosition.z + 3, ease: 'power3.inOut' });
    gsap.to(contentPanel, { duration: 1, opacity: 1, delay: 0.5, onStart: () => contentPanel.classList.add('visible') });
  }

  function hidePanel() {
    gsap.to(contentPanel, { duration: 0.5, opacity: 0, onComplete: () => contentPanel.classList.remove('visible') });
    gsap.to(camera.position, { duration: 1.5, x: 0, y: 0, z: 15, ease: 'power3.inOut' });
  }

  closeBtn.addEventListener('click', hidePanel);
  
  window.addEventListener('click', (event) => {
    if (contentPanel.classList.contains('visible') || event.target.closest('#theme-toggle')) return;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planets.map(p => p.mesh));
    if (intersects.length > 0) loadContent(intersects[0].object);
  });

  function handleCameraMove(x, y) {
    if (contentPanel.classList.contains('visible')) return;
    const rotX = (y / window.innerHeight - 0.5) * 2;
    const rotY = (x / window.innerWidth - 0.5) * 2;
    gsap.to(camera.rotation, { duration: 0.5, x: -rotX * 0.2, y: -rotY * 0.2, ease: 'power1.out' });
  }
  window.addEventListener('mousemove', (e) => handleCameraMove(e.clientX, e.clientY));
  window.addEventListener('touchmove', (e) => { if (e.touches.length > 0) handleCameraMove(e.touches[0].clientX, e.touches[0].clientY); });

  // --- Window Management & Animation Loop ---
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
  });

  function animate() {
    requestAnimationFrame(animate);
    sun.rotation.y += 0.001;
    planets.forEach(p => { p.pivot.rotation.y += p.speed; p.mesh.rotation.y += 0.01; });
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  }

  // --- Start ---
  document.getElementById('loader').style.opacity = 0;
  document.getElementById('loader').style.display = 'none';
  
  animate();

  // --- FUNZIONI PER PAGINE SEPARATE ---
  function initializePageAnimations() {
    // Animazioni per le pagine separate
    const projectsGrid = document.querySelector('.projects-grid');
    const socialGrid = document.querySelector('.social-grid');
    const techGrid = document.querySelector('.tech-stack-grid');

    // Rimuovi classe hidden e anima
    [projectsGrid, socialGrid, techGrid].forEach(grid => {
      if (grid) {
        grid.classList.remove('hidden');
        gsap.from(grid.children, {
          duration: 0.8,
          y: 50,
          opacity: 0,
          stagger: 0.15,
          ease: 'power2.out',
          delay: 0.2
        });
      }
    });

    // Effetto hover per project cards nelle pagine separate
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const { width, height } = rect;
        const rotateX = (y / height - 0.5) * -8;
        const rotateY = (x / width - 0.5) * 8;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      });
    });

    // Aggiorna anno corrente nel footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
      currentYearSpan.textContent = new Date().getFullYear();
    }
  }
});