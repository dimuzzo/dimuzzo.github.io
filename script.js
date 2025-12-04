document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth scrolling for navigation anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Real-time system clock set to Italian time
    function updateSystemTime() {
        const clockElement = document.getElementById('clock');
        if (clockElement) {
            const now = new Date();
            // Format time for Europe/Rome timezone
            const timeString = now.toLocaleTimeString('it-IT', { 
                timeZone: 'Europe/Rome',
                hour12: false 
            });
            clockElement.textContent = `[${timeString} ROME]`;
        }
    }

    // Initialize clock immediately and update every second
    updateSystemTime();
    setInterval(updateSystemTime, 1000);

    // Optional console logging for project interaction
    const projects = document.querySelectorAll('.project-row');
    projects.forEach((proj, index) => {
        proj.addEventListener('mouseenter', () => {
            console.log(`> Accessing Project_Index_0${index + 1}...`);
        });
    });
});