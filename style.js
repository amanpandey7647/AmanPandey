document.addEventListener('DOMContentLoaded', function() {
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
  });  
