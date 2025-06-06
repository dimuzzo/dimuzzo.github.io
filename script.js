// Dark/Light Mode Toggle
const toggleBtn = document.getElementById("toggle-theme");
const body = document.body;
const moonIcon = toggleBtn.querySelector('.fa-moon');
const sunIcon = toggleBtn.querySelector('.fa-sun');

function setTheme(theme) {
  if (theme === "light") {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    moonIcon.style.display = 'block';
    sunIcon.style.display = 'none';
    localStorage.setItem("theme", "light");
  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
    localStorage.setItem("theme", "dark");
  }
}

// Initialize theme based on localStorage or default to dark
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  setTheme(currentTheme);
} else {
  setTheme("dark"); // Default theme
}

toggleBtn.addEventListener("click", () => {
  if (body.classList.contains("dark-mode")) {
    setTheme("light");
  } else {
    setTheme("dark");
  }
});

// Animated Cursor
const cursor = document.querySelector(".cursor");
if (cursor) { // Check if cursor element exists
    document.addEventListener("mousemove", (e) => {
    cursor.style.top = `${e.pageY}px`; // Use pageY for correct positioning during scroll
    cursor.style.left = `${e.pageX}px`; // Use pageX
    });
}


// Update Copyright Year
const yearSpan = document.getElementById("current-year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Active Nav Link Highlighter (Optional, if you want to make sure it's robust)
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentPath = window.location.pathname.split("/").pop();

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split("/").pop();
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
});