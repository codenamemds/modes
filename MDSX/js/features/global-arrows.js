// Create a new file: js/global-arrows.js

class GlobalArrows {
  constructor() {
    this.init();
  }

  init() {
    this.addScrollArrows();
    this.bindScrollArrowEvents();
    this.observeScrollArrows();
  }

  addScrollArrows() {
    // Add arrows to sections that need them
    const sectionsNeedingArrows = [
      '.hero-section',
      '.about-hero-section',
      '.timeline-section'
    ];

    sectionsNeedingArrows.forEach(selector => {
      const section = document.querySelector(selector);
      if (section && !section.querySelector('.scroll-indicator')) {
        const arrow = this.createArrow();
        section.appendChild(arrow);
      }
    });
  }

  createArrow() {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = `
      <div class="dynamic-arrow">
        <div class="arrow-line"></div>
        <div class="arrow-head"></div>
        <div class="arrow-pulse"></div>
      </div>
    `;
    return scrollIndicator;
  }

  bindScrollArrowEvents() {
    document.addEventListener('click', (e) => {
      const scrollIndicator = e.target.closest('.scroll-indicator');
      if (scrollIndicator) {
        this.scrollToNext(scrollIndicator);
      }
    });
  }

  scrollToNext(indicator) {
    const currentSection = indicator.closest('section');
    const nextSection = currentSection.nextElementSibling;
    
    if (nextSection && nextSection.tagName === 'SECTION') {
      nextSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // If no next section, scroll to first section after hero
      const firstSection = document.querySelector('.about-section, .timeline-section, section:nth-of-type(2)');
      if (firstSection) {
        firstSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }

  observeScrollArrows() {
    const arrows = document.querySelectorAll('.scroll-indicator');
    
    arrows.forEach(arrow => {
      const section = arrow.closest('section');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            arrow.style.opacity = '1';
            arrow.style.pointerEvents = 'auto';
          } else {
            arrow.style.opacity = '0.3';
            arrow.style.pointerEvents = 'none';
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(section);
    });

    // Hide arrows when scrolled past their sections
    window.addEventListener('scroll', () => {
      arrows.forEach(arrow => {
        const section = arrow.closest('section');
        const sectionBottom = section.offsetTop + section.offsetHeight;
        const scrollPosition = window.pageYOffset + window.innerHeight;
        
        if (scrollPosition > sectionBottom + 100) {
          arrow.style.opacity = '0';
          arrow.style.pointerEvents = 'none';
        }
      });
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new GlobalArrows();
});