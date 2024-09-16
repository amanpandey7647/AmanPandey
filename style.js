document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registrationForm = document.getElementById('registrationForm');
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const navbar = document.querySelector('header');

  // Function to check scroll position and update header
  function updateHeaderOnScroll() {
    if (window.scrollY > 0) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeaderOnScroll);


  if (localStorage.getItem('loggedIn') === 'true') {
    showLogout();
  }

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'testuser' && password === 'password') {
      localStorage.setItem('loggedIn', 'true');
      showLogout();
    } else {
      alert('Incorrect username or password.');
    }
  });

  registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // In a real app, you'd send registration data to the server here
    localStorage.setItem('loggedIn', 'true');
    showLogout();
  });

  function showLogout() {
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
  }

  function logout() {
    localStorage.setItem('loggedIn', 'false');
    loginBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
  }

  function showRegistration() {
    loginForm.style.display = 'none';
    registrationForm.style.display = 'block';
  }

  function showLogin() {
    loginForm.style.display = 'block';
    registrationForm.style.display = 'none';
  }
});
