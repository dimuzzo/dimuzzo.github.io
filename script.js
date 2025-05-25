// Custom mouse cursor with smooth trailing effect and resize on click
(() => {
  const cursor = document.querySelector('.cursor');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let posX = mouseX;
  let posY = mouseY;
  let isClicked = false;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  window.addEventListener('mousedown', () => {
    isClicked = true;
    cursor.style.width = '40px';
    cursor.style.height = '40px';
  });

  window.addEventListener('mouseup', () => {
    isClicked = false;
    cursor.style.width = '20px';
    cursor.style.height = '20px';
  });

  function animate() {
    posX += (mouseX - posX) * 0.2;
    posY += (mouseY - posY) * 0.2;
    cursor.style.transform = `translate(${posX}px, ${posY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
  }
  animate();

  // Dark/light theme toggle with localStorage persistence
  const toggleBtn = document.getElementById('toggle-theme');
  toggleBtn.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
      document.body.classList.replace('dark-mode', 'light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.replace('light-mode', 'dark-mode');
      localStorage.setItem('theme', 'dark');
    }
  });

  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.classList.add(savedTheme + '-mode');
  }
})();
