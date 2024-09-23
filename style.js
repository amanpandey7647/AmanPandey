document.addEventListener('DOMContentLoaded', function () {
  // Smooth Skill Bar Animations
  const skillBars = document.querySelectorAll('.skill-level');

  function checkScroll(el) {
    let rect = el.getBoundingClientRect();
    // Check if the element is in the viewport (with a small offset)
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 50 && // +50px offset
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }


  function fillSkillBars() {
    skillBars.forEach(bar => {
      if (checkScroll(bar)) {
        bar.style.width = bar.dataset.skillLevel; // Get width from data attribute
      }
    });
  }

  window.addEventListener('scroll', fillSkillBars);
  fillSkillBars(); // Initial check when the page loads

  // Dark Mode Toggle
  const body = document.body;
  const toggle = document.querySelector('.dark-mode-toggle');

  // Check if the toggle button exists on the page
  if (toggle) {
    toggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
    });
  }
}); 
