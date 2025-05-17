document.addEventListener('DOMContentLoaded', () => {

    // === Preloader ===
    const preloader = document.querySelector('.preloader');
    const body = document.body;

    // Hide preloader and enable scrolling after page load
    window.addEventListener('load', () => {
        preloader.classList.add('fade-out');
        body.classList.remove('stop-scrolling');
         // Optional: Remove preloader from DOM after transition
        preloader.addEventListener('transitionend', () => {
             preloader.style.display = 'none';
         });
    });

    // Initially prevent scrolling while preloader is visible
    body.classList.add('stop-scrolling');


    // === Dark Mode Toggle and Persistence ===
    const themeToggleBtn = document.querySelector('.dark-mode-toggle');
    const localStorageKey = 'theme-preference';

    // Function to set the theme
    function setTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
        // Update icons visibility explicitly based on class
         const sunIcon = themeToggleBtn.querySelector('.sun-icon');
         const moonIcon = themeToggleBtn.querySelector('.moon-icon');
         if (body.classList.contains('dark-mode')) {
             sunIcon.style.opacity = '0';
             sunIcon.style.transform = 'rotate(90deg)';
             moonIcon.style.opacity = '1';
             moonIcon.style.transform = 'rotate(0deg)';
         } else {
              sunIcon.style.opacity = '1';
             sunIcon.style.transform = 'rotate(0deg)';
             moonIcon.style.opacity = '0';
             moonIcon.style.transform = 'rotate(-90deg)';
         }
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem(localStorageKey);
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Default to light mode if no preference is saved
        setTheme('light');
    }

    // Add event listener to toggle button
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem(localStorageKey, newTheme); // Save preference
    });


    // === Scroll Animations using Intersection Observer ===
    const animateOnScrollElements = document.querySelectorAll('[data-animate-on-scroll]');

    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                     entry.target.classList.add('show');
                }, parseInt(delay));

                // If you only want the animation to happen once, uncomment the line below
                // observer.unobserve(entry.target);
            } else {
                 // Optional: remove 'show' class if animating repeatedly on scroll back
                 // entry.target.classList.remove('show');
            }
        });
    }, observerOptions);

    // Observe all elements with the data-animate-on-scroll attribute
    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });


    // === Skill Bar Animation using Intersection Observer ===
     const skillObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Trigger when 30% of the skills section is visible
     };

     const skillsSection = document.getElementById('skills');

     if (skillsSection) {
        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Skills section is visible, animate skill bars
                    document.querySelectorAll('.skill-level').forEach(skillBar => {
                         const delay = skillBar.parentElement.getAttribute('data-delay') || 0;
                          setTimeout(() => {
                             const level = skillBar.getAttribute('data-skill-level');
                             skillBar.style.width = level; // CSS transition handles the animation
                             skillBar.classList.add('animate'); // Add class if needed for specific styles during animation
                         }, parseInt(delay));
                    });
                    // Stop observing after skills section is animated
                    observer.unobserve(entry.target);
                }
            });
        }, skillObserverOptions);

        // Observe the skills section
        skillObserver.observe(skillsSection);
     }


    // === Smooth Scrolling for Navigation ===
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // This is now largely handled by CSS `scroll-behavior: smooth;` on the HTML element.
            // Keep this if you need specific offsets (like for fixed navbar) or if you remove the CSS property.
            // If keeping, uncomment the following lines and potentially adjust scrollIntoView options.
            /*
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                 targetElement.scrollIntoView({
                     behavior: 'smooth',
                     block: 'start' // or 'center' or 'nearest'
                 });
                 // Close navbar on mobile after clicking a link
                 if (window.innerWidth < 992) { // Adjust breakpoint as needed
                      $('#main-nav').collapse('hide'); // Requires Bootstrap/jQuery
                 }
            }
            */
        });
    });


    // === Contact Form Submission (using Formspree) ===
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

    if (contactForm && formStatus && submitButton) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission

            const formData = new FormData(contactForm);

            // Basic client-side validation check (redundant if using HTML5 required)
            // if (!contactForm.checkValidity()) {
            //     formStatus.textContent = 'Please fill out all required fields.';
            //      formStatus.className = 'mt-3 text-center error';
            //     return;
            // }

            // Show sending state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            formStatus.textContent = ''; // Clear previous status

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json' // Important for Formspree to return JSON
                    }
                });

                if (response.ok) {
                    // Success
                    formStatus.textContent = 'Message sent successfully!';
                    formStatus.className = 'mt-3 text-center success';
                    contactForm.reset(); // Clear the form
                } else {
                     // Error response from Formspree (e.g., rate limited)
                    const data = await response.json();
                     if (data.errors) {
                         formStatus.textContent = data.errors.map(error => error.message).join(', ');
                     } else {
                         formStatus.textContent = 'Oops! There was a problem sending your message.';
                     }
                     formStatus.className = 'mt-3 text-center error';
                }
            } catch (error) {
                // Network or other error
                formStatus.textContent = 'Oops! There was a problem sending your message.';
                formStatus.className = 'mt-3 text-center error';
                console.error('Form submission error:', error);
            } finally {
                // Reset button state
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        });
    }


    // === Copy Email to Clipboard ===
    const emailElement = document.getElementById('my-email');
    const copyEmailButton = document.querySelector('.copy-email-btn');

    if (emailElement && copyEmailButton) {
        // Initialize Clipboard.js
        const clipboard = new ClipboardJS(copyEmailButton);

        clipboard.on('success', function(e) {
            console.info('Action:', e.action);
            console.info('Text:', e.text);
            console.info('Trigger:', e.trigger);

            // Optional: Provide visual feedback
            const originalText = e.trigger.textContent;
            e.trigger.textContent = 'Copied!';
            setTimeout(() => {
                e.trigger.textContent = originalText;
            }, 2000); // Reset button text after 2 seconds

            e.clearSelection();
        });

        clipboard.on('error', function(e) {
            console.error('Action:', e.action);
            console.error('Trigger:', e.trigger);

             // Optional: Provide visual feedback or alternative
            e.trigger.textContent = 'Failed to copy';
            setTimeout(() => {
                e.trigger.textContent = 'Copy Email';
            }, 2000);
            // Fallback: Alert or manually instruct user to copy from the span
        });
    }
});
