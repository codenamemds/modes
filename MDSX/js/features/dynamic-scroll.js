document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  
  // Simple scroll effects without parallax
  let ticking = false;

  function updateOnScroll() {
    const scrollY = window.scrollY;
    
    // Header background change
    if (scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Hide scroll indicator when scrolling
    if (scrollIndicator) {
      if (scrollY > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
      } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
      }
    }

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick);

  // Smooth scroll for scroll indicator
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      document.querySelector('.about-section').scrollIntoView({
        behavior: 'smooth'
      });
    });
  }

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.scrollDelay || 0;
        
        setTimeout(() => {
          entry.target.classList.add('scroll-visible');
        }, delay);
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all scroll animation elements
  const scrollElements = document.querySelectorAll('[data-scroll]');
  scrollElements.forEach(el => observer.observe(el));

  // Add staggered animation for composition cards
  const compositionCards = document.querySelectorAll('.composition-card');
  compositionCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
  });

  // Add loading animation for hero content
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    setTimeout(() => {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 300);
  }
});