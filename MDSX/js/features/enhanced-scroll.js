document.addEventListener('DOMContentLoaded', function() {
  // Add more sophisticated scroll animations
  const observerOptions = {
    threshold: [0, 0.25, 0.5, 0.75, 1],
    rootMargin: '-50px 0px'
  };

  const advancedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const element = entry.target;
      const ratio = entry.intersectionRatio;
      
      // Dynamic opacity and transform based on scroll position
      if (entry.isIntersecting) {
        element.style.opacity = Math.min(ratio * 2, 1);
        element.style.transform = `translateY(${(1 - ratio) * 30}px)`;
      }
    });
  }, observerOptions);

  // Apply to all sections
  document.querySelectorAll('section').forEach(section => {
    advancedObserver.observe(section);
  });

  // Parallax text movement
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.parallax || 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
});