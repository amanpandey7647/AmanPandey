document.addEventListener('DOMContentLoaded', function () {
    // Smooth Skill Bar Animations
    const skillBars = document.querySelectorAll('.skill-level');

    function checkScroll(el) {
        let rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 50 &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function fillSkillBars() {
        skillBars.forEach(bar => {
            if (checkScroll(bar)) {
                bar.style.width = bar.dataset.skillLevel;
            }
        });
    }

    window.addEventListener('scroll', fillSkillBars);
    fillSkillBars();

    // Dark Mode Toggle
    const body = document.body;
    const toggle = document.querySelector('.dark-mode-toggle');

    toggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
    });

    // Animations
    const animatedElements = document.querySelectorAll('.animated-text, .animated-card');

    function handleScrollAnimation() {
        animatedElements.forEach((el) => {
            if (checkScroll(el)) {
                el.classList.add('show');
            }
        });
    }

    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation(); // Initial check on page load

    // Auto Background Change
    const gradients = [
        'linear-gradient(to bottom, #e0ffff, #cce0ff)', // Light blue
        'linear-gradient(to right, #f857a6, #ff5858)',   // Pink to red
        'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)', // Pastel pink/orange
        'linear-gradient(to bottom, #00c6ff, #0072ff)',  // Blue gradient
        'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)' // Purple gradient
    ];

    let currentGradient = 0;
    setInterval(function () {
        document.body.style.background = gradients[currentGradient];
        currentGradient = (currentGradient + 1) % gradients.length;
    }, 10000); // Change every 10 seconds (10000 milliseconds)
}); 
