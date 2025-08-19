// Immediate theme application to prevent flash
(function() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  let themeToApply = 'dark'; // default
  if (savedTheme) {
    themeToApply = savedTheme;
  } else if (!prefersDark) {
    themeToApply = 'light';
  }
  
  if (themeToApply === 'light') {
    document.documentElement.classList.add('light-mode');
  }
})();

// Theme Toggle Functionality
class ThemeToggle {

  constructor() {
    this.init();
  }

  init() {
    // Apply saved theme immediately to prevent flash
    this.applyThemeImmediately();
    
    // Create the toggle button
    this.createToggleButton();
    
    // Load saved theme or detect user preference
    this.loadTheme();
    
    // Add event listeners
    this.addEventListeners();
  }

  applyThemeImmediately() {
    // Apply theme before DOM is fully loaded to prevent flash
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let themeToApply = 'dark'; // default
    if (savedTheme) {
      themeToApply = savedTheme;
    } else if (!prefersDark) {
      themeToApply = 'light';
    }
    
    if (themeToApply === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }

  createToggleButton() {
    const toggleButton = document.createElement('button');
    toggleButton.className = 'theme-toggle';
    toggleButton.setAttribute('aria-label', 'Toggle light/dark mode');
    toggleButton.setAttribute('title', 'Toggle light/dark mode');
    
    // Create icon wrapper for animations
    const iconWrapper = document.createElement('span');
    iconWrapper.className = 'icon';
    iconWrapper.innerHTML = '🌙'; // Default to moon icon (dark mode active)
    
    toggleButton.appendChild(iconWrapper);
    document.body.appendChild(toggleButton);
    
    this.toggleButton = toggleButton;
    this.iconWrapper = iconWrapper;
  }

  loadTheme() {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else if (prefersDark) {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
  }

  setTheme(theme) {
    const root = document.documentElement;
    
    // Add subtle animation classes
    this.toggleButton.classList.add('rotating', 'theme-changing');
    
    setTimeout(() => {
      if (theme === 'light') {
        root.classList.add('light-mode');
        this.iconWrapper.innerHTML = '☀️';
        this.toggleButton.setAttribute('aria-label', 'Switch to dark mode');
        this.toggleButton.setAttribute('title', 'Switch to dark mode');
      } else {
        root.classList.remove('light-mode');
        this.iconWrapper.innerHTML = '🌙';
        this.toggleButton.setAttribute('aria-label', 'Switch to light mode');
        this.toggleButton.setAttribute('title', 'Switch to light mode');
      }
      
      // Remove animation classes after completion
      setTimeout(() => {
        this.toggleButton.classList.remove('rotating');
      }, 400);
      
      setTimeout(() => {
        this.toggleButton.classList.remove('theme-changing');
      }, 400);
    }, 200);
    
    // Save theme preference
    localStorage.setItem('theme', theme);
    this.currentTheme = theme;
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  addEventListeners() {
    // Toggle button click
    this.toggleButton.addEventListener('click', () => {
      this.toggleTheme();
    });

    // Keyboard accessibility
    this.toggleButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggleTheme();
      }
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}

// Initialize theme toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeToggle();
});
