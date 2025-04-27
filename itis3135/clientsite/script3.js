window.addEventListener('load', async () => {
    const ph = document.getElementById('nav-placeholder');
    if (!ph) return;
  
    try {
      const res = await fetch('nav.html');
      ph.innerHTML = await res.text();
  
      const curr = window.location.pathname.split('/').pop() || 'index.html';
      const link = document.querySelector(`#main-nav a[href="${curr}"]`);
      if (link) {
        link.classList.add('active');
      }
  
    } catch (e) {
      console.error('Nav load failed:', e);
    }
  });
  