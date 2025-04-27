// script2.js



document.addEventListener('DOMContentLoaded', () => {
  const form   = document.getElementById('contactForm');
  const status = document.getElementById('form-status');
  console.log('DOMContentLoaded fired');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('form submit handler fired');

    alert('Thanks for reaching out!!!');

    status.textContent = '';
    status.className   = '';

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();

    // validation…
    if (!name || !email || !message) {
      status.textContent = 'All fields are required.';
      status.classList.add('error');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      status.textContent = 'Please enter a valid email address.';
      status.classList.add('error');
      return;
    }

    try {
      const response = await fetch('/submit-contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, email, message })
      });
      console.log('fetch response:', response.status);
      if (!response.ok) throw new Error(`Status ${response.status}`);

      status.textContent = 'Thanks for reaching out—message sent!';
      status.classList.add('success');
      alert('✅ Your message has been successfully sent.');
      form.reset();

    } catch (err) {
      console.error('Fetch error:', err);
      alert('🚨 Submission error: ' + err.message);
      status.textContent = 'Sorry, could not send message. Try again later.';
      status.classList.add('error');
    }
  });
});
