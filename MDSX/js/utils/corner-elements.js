class CornerElements {
  // Utility: Safely append child
  safeAppend(parent, child) {
    if (parent && child && !parent.contains(child)) {
      parent.appendChild(child);
    }
  }
  constructor() {
    // Prevent duplicate initialization
    if (window.__cornerElementsInitialized) return;
    window.__cornerElementsInitialized = true;
    this.createCornerBrackets();
    this.createFloatingElements();
    this.createAnimatedCorners();
    this.createGridCorners();
  }

  createCornerBrackets() {
    const corners = document.querySelectorAll('.section-brackets');
    corners.forEach(corner => {
      try {
        const topLeft = document.createElement('div');
        const bottomRight = document.createElement('div');
        const topRight = document.createElement('div');
        const bottomLeft = document.createElement('div');
        topLeft.className = 'corner-bracket top-left';
        bottomRight.className = 'corner-bracket bottom-right';
        topRight.className = 'corner-bracket top-right';
        bottomLeft.className = 'corner-bracket bottom-left';
        // ARIA for accessibility
        topLeft.setAttribute('aria-hidden', 'true');
        bottomRight.setAttribute('aria-hidden', 'true');
        topRight.setAttribute('aria-hidden', 'true');
        bottomLeft.setAttribute('aria-hidden', 'true');
        this.safeAppend(corner, topLeft);
        this.safeAppend(corner, bottomRight);
        this.safeAppend(corner, topRight);
        this.safeAppend(corner, bottomLeft);
        // Animate on scroll into view
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              topLeft.style.animation = 'bracketAppear 0.8s ease-out';
              bottomRight.style.animation = 'bracketAppear 0.8s ease-out 0.2s';
              topRight.style.animation = 'bracketAppear 0.8s ease-out 0.1s';
              bottomLeft.style.animation = 'bracketAppear 0.8s ease-out 0.3s';
            }
          });
        }, { threshold: 0.1 });
        observer.observe(corner);
      } catch (err) {
        console.warn('Corner bracket error:', err);
      }
    });
  }

  createAnimatedCorners() {
    // Only create one grid system
    if (document.querySelector('.corner-grid-system')) return;
    const cornerGridContainer = document.createElement('div');
    cornerGridContainer.className = 'corner-grid-system';
    document.body.appendChild(cornerGridContainer);
    // Create all four corner systems
    const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    positions.forEach(position => {
      this.createCornerGrid(position, cornerGridContainer);
    });
  }

  createCornerGrid(position, container) {
    const cornerElement = document.createElement('div');
    cornerElement.className = `corner-grid ${position}`;
    cornerElement.setAttribute('aria-hidden', 'true');
    // Create the grid pattern
    const gridPattern = document.createElement('div');
    gridPattern.className = 'corner-grid-pattern';
    // Create individual grid lines with proper dashed pattern
    for (let i = 0; i < 20; i++) {
      const line = document.createElement('div');
      line.className = `grid-line line-${i}`;
      line.style.animationDelay = `${i * 0.1}s`;
      if (i % 2 === 0) {
        line.classList.add('horizontal');
        line.style.top = `${(i / 2) * 20 + 10}px`;
      } else {
        line.classList.add('vertical');
        line.style.left = `${Math.floor(i / 2) * 20 + 10}px`;
      }
      gridPattern.appendChild(line);
    }
    // Create corner bracket
    const bracket = document.createElement('div');
    bracket.className = 'corner-bracket-main';
    bracket.setAttribute('aria-hidden', 'true');
    // Create scanning line
    const scanLine = document.createElement('div');
    scanLine.className = 'corner-scan-line';
    scanLine.setAttribute('aria-hidden', 'true');
    cornerElement.appendChild(gridPattern);
    cornerElement.appendChild(bracket);
    cornerElement.appendChild(scanLine);
    container.appendChild(cornerElement);
  }

  createGridCorners() {
    // Create animated corner connectors like NodeOps
    const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    
    corners.forEach((corner, index) => {
      const connector = document.createElement('div');
      connector.className = `corner-connector ${corner}`;
      
      // Create connector elements
      const horizontalLine = document.createElement('div');
      horizontalLine.className = 'connector-line horizontal';
      
      const verticalLine = document.createElement('div');
      verticalLine.className = 'connector-line vertical';
      
      const node = document.createElement('div');
      node.className = 'connector-node';
      
      const pulse = document.createElement('div');
      pulse.className = 'connector-pulse';
      
      connector.appendChild(horizontalLine);
      connector.appendChild(verticalLine);
      connector.appendChild(node);
      connector.appendChild(pulse);
      
      document.body.appendChild(connector);
      
      // Staggered animation activation
      setTimeout(() => {
        connector.classList.add('active');
      }, index * 200);
    });
  }

  createFloatingElements() {
    const container = document.querySelector('.geometric-elements');
    if (!container) return;
    
    // Create NodeOps-style floating tech elements
    for (let i = 0; i < 8; i++) {
      const element = document.createElement('div');
      element.className = 'floating-tech-element';
      element.style.left = Math.random() * 80 + 10 + '%';
      element.style.top = Math.random() * 80 + 10 + '%';
      element.style.animationDelay = Math.random() * 3 + 's';
      
      // Create core element
      const core = document.createElement('div');
      core.className = 'tech-element-core';
      
      // Create ring element
      const ring = document.createElement('div');
      ring.className = 'tech-element-ring';
      
      // Create scanner element
      const scanner = document.createElement('div');
      scanner.className = 'tech-element-scanner';
      
      element.appendChild(core);
      element.appendChild(ring);
      element.appendChild(scanner);
      
      container.appendChild(element);
    }
  }

  // Method to toggle corner elements visibility
  toggleCornerElements(visible = true) {
    const cornerSystem = document.querySelector('.corner-grid-system');
    const connectors = document.querySelectorAll('.corner-connector');
    
    if (cornerSystem) {
      cornerSystem.style.opacity = visible ? '1' : '0';
    }
    
    connectors.forEach(connector => {
      connector.style.opacity = visible ? '1' : '0';
    });
  }

  // Method to update corner elements based on scroll position
  updateOnScroll() {
    const scrollY = window.scrollY;
    const cornerSystem = document.querySelector('.corner-grid-system');
    
    if (cornerSystem) {
      // Fade out corners when scrolling down
      const opacity = Math.max(0, 1 - (scrollY / window.innerHeight) * 0.5);
      cornerSystem.style.opacity = opacity;
    }
  }
}

// Initialize corner elements when DOM is loaded
if (!window.__cornerElementsDomLoaded) {
  window.__cornerElementsDomLoaded = true;
  document.addEventListener('DOMContentLoaded', () => {
    const cornerElements = new CornerElements();
    // Optional: Update corners on scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        cornerElements.updateOnScroll();
      }, 10);
    });
  });
}

// Make the class available globally if needed
window.CornerElements = CornerElements;

