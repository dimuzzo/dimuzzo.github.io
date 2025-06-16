document.addEventListener('DOMContentLoaded', () => {

  // --- DOM Elements ---
  const canvas = document.getElementById('universe-canvas');
  const loader = document.getElementById('loader');
  const contentPanel = document.getElementById('content-panel');
  const contentDisplay = document.getElementById('content-display');
  const closeBtn = document.getElementById('close-btn');
  
  // --- 3D Scene Setup (THREE.JS) ---
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 15;
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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
    { name: 'About', color: 0x3498db, distance: 5, size: 0.5, contentFile: 'index.html' },
    { name: 'Projects', color: 0x9b59b6, distance: 7.5, size: 0.7, contentFile: 'projects.html' },
    { name: 'Tech Stack', color: 0x2ecc71, distance: 10, size: 0.6, contentFile: 'techstack.html' },
    { name: 'Socials', color: 0xf1c40f, distance: 12, size: 0.4, contentFile: 'socials.html' }
  ];

  planetData.forEach((data, index) => {
    const planetGeometry = new THREE.SphereGeometry(data.size, 32, 32);
    const planetMaterial = new THREE.MeshStandardMaterial({ color: data.color, roughness: 0.5 });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    
    // Create a "pivot" to make the planet orbit
    const pivot = new THREE.Object3D();
    scene.add(pivot);
    pivot.add(planet);

    planet.position.x = data.distance;
    planet.userData = { id: data.name, contentFile: data.contentFile };
    
    planets.push({ mesh: planet, pivot: pivot, speed: 0.005 + index * 0.002 });
  });

  // 3. Background Particles/Stars
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 5000;
  const posArray = new Float32Array(starCount * 3);
  for(let i = 0; i < starCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 200;
  }
  starGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const starMaterial = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff });
  const starMesh = new THREE.Points(starGeometry, starMaterial);
  scene.add(starMesh);

  // --- Interactivity ---
  
  // Load Content
  async function loadContent(planet) {
    const file = planet.userData.contentFile;
    if (!file) return;

    try {
      const response = await fetch(file);
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      
      let contentToLoad;
      // Special case for 'About' (taken from index.html)
      if (planet.userData.id === 'About') {
        contentToLoad = doc.querySelector('.about');
      } else {
        contentToLoad = doc.querySelector('main');
      }
      
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

  // Show Panel
  function showPanel(targetPlanet) {
    const targetPosition = new THREE.Vector3();
    targetPlanet.getWorldPosition(targetPosition);

    // Animate camera towards the planet
    gsap.to(camera.position, {
      duration: 1.5,
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z + 3, // A bit of distance to see it
      ease: 'power3.inOut'
    });
    
    // Animate panel
    gsap.to(contentPanel, {
      duration: 1,
      opacity: 1,
      delay: 0.5,
      onStart: () => {
        contentPanel.classList.add('visible');
        contentPanel.scrollTop = 0;
      }
    });
  }

  // Hide Panel
  function hidePanel() {
    gsap.to(contentPanel, {
      duration: 0.5,
      opacity: 0,
      onComplete: () => contentPanel.classList.remove('visible')
    });
    
    // Animate camera back to its original position
    gsap.to(camera.position, {
      duration: 1.5,
      x: 0,
      y: 0,
      z: 15,
      ease: 'power3.inOut'
    });
  }

  closeBtn.addEventListener('click', hidePanel);
  
  // Handle Clicks
  window.addEventListener('click', (event) => {
    // Do nothing if the panel is already open
    if (contentPanel.classList.contains('visible')) return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planets.map(p => p.mesh));

    if (intersects.length > 0) {
      const clickedPlanet = intersects[0].object;
      loadContent(clickedPlanet);
    }
  });

  // Mouse move camera control
  window.addEventListener('mousemove', (event) => {
    // Don't move the camera if the panel is visible
    if (contentPanel.classList.contains('visible')) return;
    
    const rotX = (event.clientY / window.innerHeight - 0.5) * 2;
    const rotY = (event.clientX / window.innerWidth - 0.5) * 2;
    
    // Use GSAP for smoother rotation
    gsap.to(camera.rotation, {
        duration: 0.5,
        x: -rotX * 0.2,
        y: -rotY * 0.2,
        ease: 'power1.out'
    });
  });

  // --- Window Management ---
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // --- Animation Loop ---
  function animate() {
    requestAnimationFrame(animate);

    // Animate Sun and Planets
    sun.rotation.y += 0.001;
    planets.forEach(p => {
      p.pivot.rotation.y += p.speed;
      p.mesh.rotation.y += 0.01;
    });

    renderer.render(scene, camera);
  }

  // --- Start ---
  // Hide the loader once the first render is likely ready
  setTimeout(() => {
    gsap.to(loader, { opacity: 0, onComplete: () => loader.style.display = 'none' });
  }, 1000); // A small delay to ensure everything is loaded
  
  animate();
});