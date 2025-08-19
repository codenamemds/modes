class ParticleSystem {
  constructor(container) {
    this.container = container;
    this.particles = [];
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.init();
  }

  init() {
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.zIndex = '1';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.opacity = '0.6';
    
    this.container.appendChild(this.canvas);
    this.resize();
    this.createParticles();
    this.animate();
    
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
  }

  resize() {
    this.canvas.width = this.container.offsetWidth;
    this.canvas.height = this.container.offsetHeight;
  }

  createParticles() {
    const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 10000);
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 1.0, // doubled speed
        vy: (Math.random() - 0.5) * 1.0, // doubled speed
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
  }

  onMouseMove(e) {
    const rect = this.container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    this.particles.forEach(particle => {
      const dx = mouseX - particle.x;
      const dy = mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        particle.vx += dx * 0.00005;
        particle.vy += dy * 0.00005;
      }
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      // Boundary bouncing
      if (particle.x < 0) { particle.x = 0; particle.vx *= -1; }
      if (particle.x > this.canvas.width) { particle.x = this.canvas.width; particle.vx *= -1; }
      if (particle.y < 0) { particle.y = 0; particle.vy *= -1; }
      if (particle.y > this.canvas.height) { particle.y = this.canvas.height; particle.vy *= -1; }
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(223, 44, 20, ${particle.opacity})`;
      this.ctx.fill();
      // Connect nearby particles (limit to 5 per particle for perf)
      let connections = 0;
      for (let i = 0; i < this.particles.length && connections < 5; i++) {
        const otherParticle = this.particles[i];
        if (otherParticle === particle) continue;
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          this.ctx.strokeStyle = `rgba(223, 44, 20, ${0.1 * (1 - distance / 100)})`;
          this.ctx.stroke();
          connections++;
        }
      }
    });
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize particles on hero section
document.addEventListener('DOMContentLoaded', () => {
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    new ParticleSystem(heroSection);
  }
});