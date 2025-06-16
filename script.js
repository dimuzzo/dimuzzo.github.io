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


// Update Copyright Year
const yearSpan = document.getElementById("current-year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Active Nav Link Highlighter
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentPath = window.location.pathname.split("/").pop() || 'index.html';

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split("/").pop();
        if (linkPath === currentPath) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
});

// On-Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


// Card Tilt 3D Effect (APPLICATO SOLO ALLE SOCIAL CARDS)
document.querySelectorAll('.social-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const width = card.offsetWidth;
        const height = card.offsetHeight;

        const rotateX = (y / height - 0.5) * -20;
        const rotateY = (x / width - 0.5) * 20;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
});


// Hero Parallax Effect
const heroBg = document.querySelector('.hero-background-image');
if (heroBg) {
    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        heroBg.style.transform = `translateY(${scrollValue * 0.4}px)`;
    });
}