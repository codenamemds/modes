// Create a new file: js/timeline.js

class InteractiveTimeline {
  constructor() {
    this.timelineContainer = document.getElementById('timelineContainer');
    this.timelineItems = document.querySelectorAll('.timeline-item');
    this.controls = document.querySelectorAll('.timeline-control');
    this.skillBars = document.querySelectorAll('.skill-bar');
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.observeTimelineItems();
    this.observeSkillBars();
    this.startTimelineAnimation();
  }

  bindEvents() {
    this.controls.forEach(control => {
      control.addEventListener('click', (e) => this.filterTimeline(e));
    });

    this.timelineItems.forEach(item => {
      const marker = item.querySelector('.timeline-marker');
      marker.addEventListener('click', () => this.highlightTimelineItem(item));
    });
  }

  filterTimeline(e) {
    const category = e.target.dataset.category;
    
    // Update active control
    this.controls.forEach(ctrl => ctrl.classList.remove('active'));
    e.target.classList.add('active');

    // Filter timeline items
    this.timelineItems.forEach(item => {
      const itemCategories = item.dataset.category;
      
      if (category === 'all' || itemCategories.includes(category)) {
        item.style.display = 'block';
        setTimeout(() => {
          item.classList.add('visible');
        }, 100);
      } else {
        item.classList.remove('visible');
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  }

  highlightTimelineItem(item) {
    // Remove previous highlights
    this.timelineItems.forEach(ti => ti.classList.remove('highlighted'));
    
    // Add highlight to clicked item
    item.classList.add('highlighted');
    
    // Create ripple effect
    const marker = item.querySelector('.timeline-marker');
    const ripple = document.createElement('div');
    ripple.classList.add('marker-ripple');
    marker.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 1000);
  }

  observeTimelineItems() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.3 });

    this.timelineItems.forEach(item => observer.observe(item));
  }

  observeSkillBars() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillBar = entry.target;
          const progressFill = skillBar.querySelector('.progress-fill');
          const skillLevel = skillBar.dataset.skill;
          
          setTimeout(() => {
            progressFill.style.width = skillLevel + '%';
          }, 500);
        }
      });
    }, { threshold: 0.5 });

    this.skillBars.forEach(bar => observer.observe(bar));
  }

  startTimelineAnimation() {
    // Add dynamic scanning effect
    setInterval(() => {
      this.createTimelinePulse();
    }, 3000);
  }

  createTimelinePulse() {
    const timelineLine = document.querySelector('.timeline-line');
    const pulse = document.createElement('div');
    pulse.classList.add('timeline-pulse');
    
    pulse.style.cssText = `
      position: absolute;
      left: -2px;
      top: 0;
      width: 6px;
      height: 6px;
      background: var(--accent-hover);
      border-radius: 50%;
      box-shadow: 0 0 15px var(--accent-hover);
      animation: pulsMove 4s ease-in-out forwards;
    `;
    
    timelineLine.appendChild(pulse);
    
    setTimeout(() => pulse.remove(), 4000);
  }
}

// CSS for additional animations
const additionalCSS = `
@keyframes pulsMove {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(600px); opacity: 0; }
}

.timeline-item.highlighted .timeline-content {
  border-color: var(--accent-color);
  box-shadow: 0 0 25px rgba(223, 44, 20, 0.3);
  transform: translateY(-5px) scale(1.02);
}

.marker-ripple {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 2px solid var(--accent-color);
  border-radius: 50%;
  animation: markerRipple 1s ease-out forwards;
}

@keyframes markerRipple {
  0% { 
    transform: scale(0); 
    opacity: 1; 
  }
  100% { 
    transform: scale(2); 
    opacity: 0; 
  }
}
`;

// Add CSS to head
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Initialize timeline when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new InteractiveTimeline();
});