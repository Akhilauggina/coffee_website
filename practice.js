const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginClose = document.getElementById('loginClose');
const signupClose = document.getElementById('signupClose');

// Open modals
loginBtn.onclick = () => {
  loginModal.style.display = 'flex';
};
signupBtn.onclick = () => {
  signupModal.style.display = 'flex';
};

// Close modals
loginClose.onclick = () => {
  loginModal.style.display = 'none';
};
signupClose.onclick = () => {
  signupModal.style.display = 'none';
};

// Close modal if clicked outside content
window.onclick = (e) => {
  if (e.target == loginModal) {
    loginModal.style.display = 'none';
  }
  if (e.target == signupModal) {
    signupModal.style.display = 'none';
  }
};

// Login form submit
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  const loginMsg = document.getElementById('loginMsg');

  loginMsg.style.color = 'red';
  loginMsg.textContent = '';

  try {
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      loginMsg.style.color = 'green';
      loginMsg.textContent = data.message;
      // Close modal after success
      setTimeout(() => {
        loginModal.style.display = 'none';
        loginMsg.textContent = '';
        document.getElementById('loginForm').reset();
      }, 1500);
    } else {
      loginMsg.textContent = data.message || 'Login failed'; // Assuming backend sends 'message' or 'error'
    }
  } catch (error) {
    console.error('Login fetch error:', error); // Log the actual error
    loginMsg.textContent = 'Server error. Try again later.';
  }
});

// Signup form submit
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('signupUsername').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value.trim();
  const signupMsg = document.getElementById('signupMsg');

  signupMsg.style.color = 'red';
  signupMsg.textContent = '';

  try {
    // CORRECTED: Changed the endpoint from /api/register to /api/signup
    const res = await fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      signupMsg.style.color = 'green';
      signupMsg.textContent = data.message;
      setTimeout(() => {
        signupModal.style.display = 'none';
        signupMsg.textContent = '';
        document.getElementById('signupForm').reset();
      }, 1500);
    } else {
      // Assuming backend sends 'error' for failure or 'message'
      signupMsg.textContent = data.error || data.message || 'Sign up failed';
    }
  } catch (error) {
    console.error('Signup fetch error:', error); // Log the actual error
    signupMsg.textContent = 'Server error. Try again later.';
  }
});

// Contact form submit
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const contactMsg = document.getElementById('contactMsg');

  contactMsg.style.color = 'red';
  contactMsg.textContent = '';

  try {
    const res = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });
    const data = await res.json();

    if (res.ok) {
      contactMsg.style.color = 'green';
      contactMsg.textContent = data.message;
      form.reset();
    } else {
      contactMsg.textContent = data.error || data.message || 'Failed to send message';
    }
  } catch (error) {
    console.error('Contact fetch error:', error); // Log the actual error
    contactMsg.textContent = 'Server error. Try again later.';
  }
});
