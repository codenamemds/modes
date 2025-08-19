class FooterComponent extends HTMLElement {
  constructor() {
    super();
    this.currentYear = new Date().getFullYear();
    this.socialLinks = [
      { 
        name: 'GitHub', 
        url: 'https://github.com/codenamemds', 
        icon: 'bxl-github',
        color: '#6cc644',
        description: 'Code & Projects'
      },
      { 
        name: 'Twitter', 
        url: 'https://x.com/codename_mds', 
        icon: 'bxl-twitter',
        color: '#1da1f2',
        description: 'Latest Updates'
      },
      { 
        name: 'Facebook', 
        url: 'https://facebook.com/marsdsilver', 
        icon: 'bxl-facebook-circle',
        color: '#4267b2',
        description: 'Community'
      },
      { 
        name: 'LinkedIn', 
        url: 'https://www.linkedin.com/in/marsdsilver', 
        icon: 'bxl-linkedin',
        color: '#0077b5',
        description: 'Professional Network'
      },
      { 
        name: 'YouTube', 
        url: 'https://www.youtube.com/codename_mds', 
        icon: 'bxl-youtube',
        color: '#ff0000',
        description: 'Video Content'
      },
      { 
        name: 'Instagram', 
        url: 'https://instagram.com/', 
        icon: 'bxl-instagram',
        color: '#e4405f',
        description: 'Visual Stories'
      }
    ];
  }

  connectedCallback() {
    console.log('Footer component loaded successfully!');
    this.render();
    this.setupInteractions();
  }

  render() {
    this.innerHTML = `
      <div class="footer-content">
        <div class="footer-links">
          ${this.generateSocialLinks()}
        </div>  
        <p>&copy; ${this.currentYear} Mars D. Silver. All rights reserved.</p>
        <p>&copy; ${this.currentYear} MODES-X. All rights reserved.</p>
      </div>
    `;
  }

  generateSocialLinks() {
    return this.socialLinks.map(link => `
      <a href="${link.url}" 
         class="social-link" 
         data-color="${link.color}"
         aria-label="${link.name}"
         title="${link.description}"
         target="_blank"
         rel="noopener noreferrer">
        <i class='bx ${link.icon}'></i>
      </a>
    `).join('');
  }

  setupInteractions() {
    this.querySelectorAll('.social-link').forEach(link => {
      link.addEventListener('mouseenter', (e) => {
        const color = e.currentTarget.dataset.color;
        if (color) {
          e.currentTarget.style.setProperty('--hover-color', color);
        }
      });

      link.addEventListener('mouseleave', (e) => {
        e.currentTarget.style.removeProperty('--hover-color');
      });
    });
  }
}

customElements.define('footer-component', FooterComponent);