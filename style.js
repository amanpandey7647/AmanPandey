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

  // Dark Mode Toggle (Corrected)
  const body = document.body;
  const toggle = document.querySelector('.dark-mode-toggle');

  if (toggle) { // Check if the button exists before adding the event listener
    toggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
    });
  }
}); 
