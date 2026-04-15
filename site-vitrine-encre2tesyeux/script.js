/* =============================================
   L'Encre 2 Tes Yeux – JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ----- Navbar scroll effect ----- */
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----- Active nav link on scroll ----- */
  const sections   = document.querySelectorAll('section[id]');
  const navLinks   = document.querySelectorAll('.nav-link');
  const navHeight  = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;

  const observerOptions = {
    root: null,
    rootMargin: `-${navHeight}px 0px -40% 0px`,
    threshold: 0,
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  }, observerOptions);

  sections.forEach(s => sectionObserver.observe(s));

  /* ----- Mobile nav toggle ----- */
  const navToggle = document.getElementById('navToggle');
  const navList   = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
  });

  // Close on link click
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      navList.classList.remove('open');
      navToggle.classList.remove('open');
    }
  });

  /* ----- Gallery filter ----- */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      galleryItems.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hidden', !match);
      });
    });
  });

  /* ----- RDV Form ----- */
  const rdvForm    = document.getElementById('rdvForm');
  const formSuccess = document.getElementById('formSuccess');

  if (rdvForm) {
    rdvForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple validation
      const required = rdvForm.querySelectorAll('[required]');
      let valid = true;

      required.forEach(field => {
        field.style.borderColor = '';
        if (!field.value.trim() || (field.type === 'checkbox' && !field.checked)) {
          field.style.borderColor = '#e05252';
          valid = false;
        }
      });

      if (!valid) return;

      // Simulate sending (replace with real backend or mailto)
      const btn = rdvForm.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Envoi en cours…';

      setTimeout(() => {
        rdvForm.querySelectorAll('input, select, textarea').forEach(f => f.value = '');
        rdvForm.querySelector('#consent').checked = false;
        btn.style.display = 'none';
        formSuccess.classList.add('visible');
      }, 1000);
    });
  }

  /* ----- Smooth scroll for anchor links ----- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

  /* ----- Reveal on scroll géré par le CSS .reveal/.visible dans index.html ----- */

});
