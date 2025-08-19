document.addEventListener('DOMContentLoaded', function() {
  // Magnetic effect for buttons
  const magneticElements = document.querySelectorAll('.cta-button, .social-link');
  
  magneticElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.15;
      const deltaY = (e.clientY - centerY) * 0.15;
      element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
    }, { passive: true });
    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translate(0px, 0px) scale(1)';
    });
  });

  // Ripple effect on click
  const clickableElements = document.querySelectorAll('button, .cta-button, .nav-link');
  
  function createRipple(e, el) {
    // Remove any existing ripple
    el.querySelectorAll('.ripple-effect').forEach(r => r.remove());
    const ripple = document.createElement('span');
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    let x, y;
    if (e.touches && e.touches.length) {
      x = e.touches[0].clientX - rect.left - size / 2;
      y = e.touches[0].clientY - rect.top - size / 2;
    } else if (e.clientX !== undefined) {
      x = e.clientX - rect.left - size / 2;
      y = e.clientY - rect.top - size / 2;
    } else {
      // Keyboard event: center the ripple
      x = rect.width / 2 - size / 2;
      y = rect.height / 2 - size / 2;
    }
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.className = 'ripple-effect';
    if (getComputedStyle(el).position === 'static') {
      el.style.position = 'relative';
    }
    el.style.overflow = 'hidden';
    el.appendChild(ripple);
    setTimeout(() => {
      ripple.style.opacity = '0';
      ripple.style.transition = 'opacity 0.3s';
      setTimeout(() => ripple.remove(), 300);
    }, 300);
  }

  clickableElements.forEach(element => {
    element.addEventListener('click', function(e) {
      createRipple(e, this);
    });
    // Keyboard accessibility: Enter/Space
    element.addEventListener('keydown', function(e) {
      if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === this) {
        createRipple(e, this);
      }
    });
    // Add focus-visible for accessibility
    element.addEventListener('focus', function(e) {
      if (e.target === this) {
        this.classList.add('focus-visible');
      }
    });
    element.addEventListener('blur', function(e) {
      this.classList.remove('focus-visible');
    });
    // Touch support
    element.addEventListener('touchstart', function(e) {
      createRipple(e, this);
    }, { passive: true });
  });
});