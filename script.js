// Global Variables
let isLoading = true;
let currentTheme = localStorage.getItem("theme") || "dark";
let animationObserver;
let skillProgressObserver;

// DOM Elements
const loadingScreen = document.getElementById("loading-screen");
const toggleBtn = document.getElementById("toggle-theme");
const body = document.body;
const moonIcon = toggleBtn?.querySelector('.fa-moon');
const sunIcon = toggleBtn?.querySelector('.fa-sun');
const navToggle = document.getElementById("nav-toggle");
const navContainer = document.querySelector(".nav-container");
const contactForm = document.getElementById("contact-form");
const socialsContactForm = document.getElementById("enhanced-contact-form"); 
const yearSpan = document.getElementById("current-year");

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeNavigation();
    initializeAnimations();
    initializeSkillBars();
    initializeCounters();
    initializeTypewriter();
    initializeForms();
    initializeProjectFilters();
    initializeModalSystem();
    updateCopyrightYear();

    setTimeout(() => {
        hideLoadingScreen();
    }, 1000);
});

// Theme Management
function initializeTheme() {
    if (!toggleBtn) return;

    setTheme(currentTheme);

    toggleBtn.addEventListener("click", () => {
        currentTheme = currentTheme === "dark" ? "light" : "dark";
        setTheme(currentTheme);
    });
}

function setTheme(theme) {
    if (theme === "light") {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        if (moonIcon && sunIcon) {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }
        localStorage.setItem("theme", "light");
    } else {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        if (moonIcon && sunIcon) {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        }
        localStorage.setItem("theme", "dark");
    }
}

// Loading Screen
function hideLoadingScreen() {
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 300);
    }
    isLoading = false;
}

// Navigation
function initializeNavigation() {
    if (navToggle && navContainer) {
        navToggle.addEventListener('click', () => {
            navContainer.classList.toggle('active');
        });
    }

    highlightActiveNavLink();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function highlightActiveNavLink() {
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
}

// Animations and Scroll Effects
function initializeAnimations() {
    animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => animationObserver.observe(el));

    initializeParallax();

    initializeTiltEffect();
}

function initializeParallax() {
    const heroBg = document.querySelector('.hero-background-image');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrollValue = window.scrollY;
            const speed = 0.5;
            heroBg.style.transform = `translateY(${scrollValue * speed}px)`;
        });
    }
}

function initializeTiltEffect() {
    const socialCards = document.querySelectorAll('.social-card');

    socialCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const width = card.offsetWidth;
            const height = card.offsetHeight;

            const rotateX = (y / height - 0.5) * -10;
            const rotateY = (x / width - 0.5) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
}

// Skill Bars Animation
function initializeSkillBars() {
    skillProgressObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress, .proficiency-fill');
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width') || bar.getAttribute('data-level');
                    if (width) {
                        setTimeout(() => {
                            bar.style.width = width + '%';
                        }, 200);
                    }
                });
                skillProgressObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    const skillSections = document.querySelectorAll('.skills, .tech-category, .skills-overview');
    skillSections.forEach(section => skillProgressObserver.observe(section));
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        if (width) {
            setTimeout(() => {
                bar.style.width = width + '%';
            }, index * 100);
        }
    });
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

// Typewriter Effect
function initializeTypewriter() {
    const typewriterElements = document.querySelectorAll('.typewriter');

    typewriterElements.forEach(element => {
        const text = element.textContent;
        const phrases = [text, 'AI Enthusiast', 'Problem Solver', 'Innovation Driver'];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeWriter() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                element.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                element.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }

            setTimeout(typeWriter, typeSpeed);
        }

        setTimeout(typeWriter, 1000);
    });
}

// Form Handling
function initializeForms() {
    const mainContactForm = document.getElementById("contact-form");
    const socialsContactForm = document.getElementById("contact-form");
    
    if (mainContactForm) {
        mainContactForm.addEventListener('submit', handleFormSubmit);
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.form-submit');
    
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://formspree.io/f/manjaqoj", {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        if (response.ok) {
            showFormSuccess(form);
            form.reset();
        } else {
            alert("Sorry, there was an error sending your message. Please try again later.");
        }

    } catch (error) {
        console.error("Form submission error:", error);
        alert("A network error occurred. Please check your connection and try again.");
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
}

function showFormSuccess(form) {
    const formContainer = form.closest('.form-container, .contact-grid');
    const successElement = formContainer.querySelector('.form-success');
    
    if (formContainer && successElement) {
        form.style.display = 'none';
        successElement.classList.add('show');

        setTimeout(() => {
            form.style.display = 'flex'; 
            successElement.classList.remove('show');
        }, 5000);
    } else {
        alert("Thank you for your message!");
    }
}

function initializeFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');

        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();

    field.classList.remove('error');

    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }

    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }

    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');

    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--color-accent)';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '0.25rem';

    field.parentNode.appendChild(errorElement);
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');

    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Project Filters
function initializeProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';

                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Modal System
function initializeModalSystem() {
    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

function showProjectDemo(projectId) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');

    if (!modal || !modalBody) return;

    const demoContent = getProjectDemoContent(projectId);
    modalBody.innerHTML = demoContent;

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

function getProjectDemoContent(projectId) {
    const demos = {
        'nba-prediction': `
            <h2>NBA Score Prediction - Live Demo</h2>
            <div style="text-align: center; padding: 2rem;">
                <div style="background: linear-gradient(135deg, #e74c3c, #c0392b); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">
                    <h3>Model Performance</h3>
                    <div class="modal-grid">
                        <div><strong>Accuracy:</strong><br>71%</div>
                        <div><strong>Precision:</strong><br>69%</div>
                        <div><strong>Recall:</strong><br>73%</div>
                    </div>
                </div>
                <p><strong>Note:</strong> This is a demonstration of the model's capabilities. The actual implementation includes comprehensive data preprocessing, feature engineering, and cross-validation techniques.</p>
                <div style="margin-top: 2rem;">
                    <a href="https://github.com/dimuzzo/nba-score-prediction" target="_blank" class="btn-primary">
                        <i class="fab fa-github"></i> View Full Implementation
                    </a>
                </div>
            </div>
        `,
        'spatial-db': `
            <h2>Spatial Database Benchmarking - Results</h2>
            <div style="text-align: center; padding: 2rem;">
                <div style="background: linear-gradient(135deg, #3498db, #2980b9); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">
                    <h3>Performance Comparison</h3>
                    <div class="modal-grid">
                        <div>
                            <h4>DuckDB Spatial</h4>
                            <ul style="text-align: left; margin-top: 0.5rem;">
                                <li>Query Time: 0.8s avg</li>
                                <li>Memory Usage: 512MB</li>
                                <li>Throughput: 1.2M rows/sec</li>
                            </ul>
                        </div>
                        <div>
                            <h4>PostGIS</h4>
                            <ul style="text-align: left; margin-top: 0.5rem;">
                                <li>Query Time: 2.4s avg</li>
                                <li>Memory Usage: 1.2GB</li>
                                <li>Throughput: 400K rows/sec</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <p>Comprehensive benchmarking revealed DuckDB's superior performance for analytical workloads, particularly in geospatial query processing.</p>
                <div style="margin-top: 2rem;">
                    <a href="https://github.com/dimuzzo/testing-project" target="_blank" class="btn-primary">
                        <i class="fab fa-github"></i> View Benchmarking Code
                    </a>
                </div>
            </div>
        `,
        'quiz-app': `
            <h2>Interactive Quiz Application - Preview</h2>
            <div style="text-align: center; padding: 2rem;">
                <div style="background: linear-gradient(135deg, #9b59b6, #8e44ad); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">
                    <h3>Features Demonstration</h3>
                    <div class="modal-grid">
                        <div>
                            <h4>Interactive Elements</h4>
                            <ul style="text-align: left; margin-top: 0.5rem;">
                                <li>Real-time score tracking</li>
                                <li>Progress indicators</li>
                                <li>Smooth transitions</li>
                            </ul>
                        </div>
                        <div>
                            <h4>Technical Features</h4>
                            <ul style="text-align: left; margin-top: 0.5rem;">
                                <li>Vanilla JavaScript</li>
                                <li>Local storage persistence</li>
                                <li>Responsive design</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <p>A fully interactive quiz application built with modern web technologies, featuring smooth animations and comprehensive state management.</p>
                <div style="margin-top: 2rem;">
                    <a href="https://github.com/dimuzzo/quiz-app" target="_blank" class="btn-primary">
                        <i class="fab fa-github"></i> View Source Code
                    </a>
                </div>
            </div>
        `
    };

    return demos[projectId] || '<p>Demo content not available.</p>';
}

// Utility Functions
function updateCopyrightYear() {
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance Optimization
function optimizePerformance() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    let ticking = false;
    const optimizedScrollHandler = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

document.addEventListener('DOMContentLoaded', optimizePerformance);

window.addEventListener('beforeunload', () => {
    if (animationObserver) {
        animationObserver.disconnect();
    }
    if (skillProgressObserver) {
        skillProgressObserver.disconnect();
    }
});

window.showProjectDemo = showProjectDemo;
window.closeModal = closeModal;