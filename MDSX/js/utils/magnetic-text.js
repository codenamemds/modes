class MagneticText {
  constructor(element) {
    this.element = element;
    this.boundingRect = element.getBoundingClientRect();
    this.init();
  }

  init() {
    this.element.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.element.addEventListener('mouseleave', () => this.onMouseLeave());
    window.addEventListener('resize', () => this.updateBounds());
  }

  updateBounds() {
    this.boundingRect = this.element.getBoundingClientRect();
  }

  onMouseMove(e) {
    const { clientX, clientY } = e;
    const { left, top, width, height } = this.boundingRect;
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const deltaX = (clientX - centerX) * 0.15;
    const deltaY = (clientY - centerY) * 0.15;
    
    this.element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
    this.element.style.color = 'var(--accent-color)';
    this.element.style.textShadow = `${deltaX * 0.5}px ${deltaY * 0.5}px 10px rgba(223, 44, 20, 0.3)`;
  }

  onMouseLeave() {
    this.element.style.transform = 'translate(0px, 0px) scale(1)';
    this.element.style.color = '';
    this.element.style.textShadow = '';
  }
}

// Initialize magnetic text
document.addEventListener('DOMContentLoaded', () => {
  const magneticTexts = document.querySelectorAll('.magnetic-text');
  magneticTexts.forEach(text => new MagneticText(text));
});