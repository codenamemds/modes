class TextEffects {
  constructor() {
    this.initLetterHover();
    this.initWordScramble();
    this.initTypewriter();
  }

  // Split text into individual letters for hover effects
  initLetterHover() {
    const letterHoverElements = document.querySelectorAll('.letter-hover');
    
    letterHoverElements.forEach(element => {
      const text = element.textContent;
      element.innerHTML = '';
      
      [...text].forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.transition = `all 0.3s ease ${index * 0.05}s`;
        span.style.display = 'inline-block';
        
        span.addEventListener('mouseenter', () => {
          span.style.transform = 'translateY(-10px) rotateX(360deg)';
          span.style.color = 'var(--accent-color)';
          span.style.textShadow = '0 0 10px var(--accent-color)';
        });
        
        span.addEventListener('mouseleave', () => {
          span.style.transform = 'translateY(0) rotateX(0deg)';
          span.style.color = '';
          span.style.textShadow = '';
        });
        
        element.appendChild(span);
      });
    });
  }

  // Text scramble effect on hover
  initWordScramble() {
    const scrambleElements = document.querySelectorAll('.scramble-text');
    
    scrambleElements.forEach(element => {
      const originalText = element.textContent;
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
      
      element.addEventListener('mouseenter', () => {
        let iteration = 0;
        
        const interval = setInterval(() => {
          element.textContent = originalText
            .split('')
            .map((char, index) => {
              if (index < iteration) {
                return originalText[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
          
          if (iteration >= originalText.length) {
            clearInterval(interval);
            element.textContent = originalText;
          }
          
          iteration += 1/3;
        }, 30);
      });
    });
  }

  // Typewriter effect with cursor
  initTypewriter() {
    const typewriterElements = document.querySelectorAll('.typewriter-text');
    
    typewriterElements.forEach(element => {
      const text = element.textContent;
      element.innerHTML = '<span class="typewriter-cursor">|</span>';
      
      element.addEventListener('mouseenter', () => {
        if (element.classList.contains('typing')) return;
        
        element.classList.add('typing');
        element.innerHTML = '<span class="typewriter-cursor">|</span>';
        
        let i = 0;
        const typeInterval = setInterval(() => {
          if (i < text.length) {
            element.innerHTML = text.slice(0, i + 1) + '<span class="typewriter-cursor">|</span>';
            i++;
          } else {
            clearInterval(typeInterval);
            setTimeout(() => {
              element.classList.remove('typing');
            }, 1000);
          }
        }, 100);
      });
    });
  }
}

// Initialize text effects
document.addEventListener('DOMContentLoaded', () => {
  new TextEffects();
});