// Boot Sequence with Typewriter Effect
document.addEventListener('DOMContentLoaded', function() {
  // Matrix rain effect during boot
  function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.1';
    document.getElementById('bootSequence').appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    for (let i = 0; i < columns; i++) { drops[i] = 1; }
    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#7BAF00';
      ctx.font = fontSize + 'px monospace';
      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    const matrixInterval = setInterval(draw, 35);
    // Clean up after boot sequence
    setTimeout(() => {
      clearInterval(matrixInterval);
      canvas.remove();
    }, 5000);
  }

  if (document.getElementById('bootSequence')) {
    createMatrixRain();
  }
  const bootSequence = document.getElementById('bootSequence');
  const bootText = document.getElementById('bootText');
  const mainContent = document.getElementById('mainContent');
  const mainFooter = document.getElementById('mainFooter');

  // Boot sequence with your preferred style
  const bootSteps = [
    { text: 'SYSTEM INITIALIZING...', delay: 800 },
    { text: 'LOADING PROTOCOLS...', delay: 1000 },
    { text: 'CONNECTING TO THE MDS TERMINAL...', delay: 1200 },
    { text: 'PROGRESS_BAR', delay: 100 } // Special flag for progress bar
  ];

  let currentStep = 0;

  function executeBootStep() {
    const step = bootSteps[currentStep];
    
    if (step.text === 'PROGRESS_BAR') {
      showProgressBar();
    } else {
      // Show the text with typewriter effect
      typeText(step.text, () => {
        setTimeout(() => {
          currentStep++;
          if (currentStep < bootSteps.length) {
            executeBootStep();
          }
        }, step.delay);
      });
    }
  }

  function typeText(text, callback) {
    let charIndex = 0;
    const currentContent = bootText.innerHTML.replace('<span class="terminal-cursor"></span>', '');
    
    function type() {
      if (charIndex < text.length) {
        const newContent = currentContent + (currentContent ? '<br>' : '') + text.substring(0, charIndex + 1);
        bootText.innerHTML = newContent + '<span class="terminal-cursor"></span>';
        charIndex++;
        setTimeout(type, 50); // Typing speed
      } else {
        callback();
      }
    }
    
    type();
  }

  function showProgressBar() {
    const currentContent = bootText.innerHTML.replace('<span class="terminal-cursor"></span>', '');
    let progress = 0;
    const progressBarLength = 20;
    
    function updateProgress() {
      if (progress <= 100) {
        const filledBars = Math.floor((progress / 100) * progressBarLength);
        const emptyBars = progressBarLength - filledBars;
        const progressBar = '█'.repeat(filledBars) + '░'.repeat(emptyBars);
        
        const progressText = currentContent + '<br>' + progressBar + ' ' + progress + '%';
        bootText.innerHTML = progressText + '<span class="terminal-cursor"></span>';
        
        progress += 5; // Increment by 5%
        
        if (progress <= 100) {
          setTimeout(updateProgress, 100); // Update every 100ms
        } else {
          setTimeout(() => {
            bootText.innerHTML = progressText.replace('<span class="terminal-cursor"></span>', '');
            setTimeout(showMainContent, 800);
          }, 500);
        }
      }
    }
    
    updateProgress();
  }

  function showMainContent() {
    // Fade out boot sequence
    bootSequence.style.animation = 'boot-fade-out 1s ease-out forwards';
    
    setTimeout(() => {
      bootSequence.style.display = 'none';
      document.body.classList.add('boot-complete');
      
      // Show main content with fade-in effect
      mainContent.style.display = 'block';
      mainContent.style.opacity = '0';
      mainContent.style.transform = 'translateY(20px)';
      mainContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      
      mainFooter.style.display = 'block';
      mainFooter.style.opacity = '0';
      mainFooter.style.transition = 'opacity 0.8s ease 0.2s';
      
      // Trigger fade-in
      setTimeout(() => {
        mainContent.style.opacity = '1';
        mainContent.style.transform = 'translateY(0)';
        mainFooter.style.opacity = '1';
      }, 50);
    }, 1000);
  }

  // Start the boot sequence
  setTimeout(() => {
    bootText.innerHTML = '<span class="terminal-cursor"></span>';
    executeBootStep();
  }, 500);

  // Optional: Skip boot sequence on click
  bootSequence.addEventListener('click', () => {
    showMainContent();
  });

  // Optional: Skip boot sequence on any key press
  document.addEventListener('keydown', (e) => {
    if (bootSequence.style.display !== 'none') {
      showMainContent();
    }
  });
});