class NavComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="navbar">
                <div class="nav-container">
                    <div class="nav-logo">
                        <a href="/MDSX/Pages/home.html">
                            <img src="../assets/logos/Codename.Site.Logo.svg" alt="CODENAME_MDS Logo" class="logo-svg" style="height:40px; width:auto; display:inline-block; vertical-align:middle;" />
                        </a>
                    </div>
                    <div class="nav-links">
                        <ul class="nav-menu">
                            <li class="nav-item">
                                <a href="/MDSX/Pages/home.html" class="nav-link">Home</a>
                            </li>
                            <li class="nav-item has-dropdown">
                                <a href="/MDSX/Pages/projects.html" class="nav-link">
                                    Projects
                                    <i class='bx bx-chevron-down nav-arrow'></i>
                                </a>
                                <div class="nav-dropdown">
                                    <a href="#" class="dropdown-item">
                                        <i class='bx bx-leaf'></i>
                                        <div class="dropdown-content">
                                            <span class="dropdown-title">CYBERPLANT</span>
                                            <span class="dropdown-desc">Project I: CYBERPLANT</span>
                                        </div>
                                        <i class='bx bx-right-arrow-alt dropdown-arrow'></i>
                                    </a>
                                    <a href="#" class="dropdown-item">
                                        <i class='bx bx-planet'></i>
                                        <div class="dropdown-content">
                                            <span class="dropdown-title">NEXUS BLACK</span>
                                            <span class="dropdown-desc">Project II: NEXUS BLACK COLLECTION</span>
                                        </div>
                                        <i class='bx bx-right-arrow-alt dropdown-arrow'></i>
                                    </a>
                                    <a href="/MDSX/Pages/projects.html" class="dropdown-item">
                                        <i class='bx bx-grid-alt'></i>
                                        <div class="dropdown-content">
                                            <span class="dropdown-title">All Projects</span>
                                            <span class="dropdown-desc">Design & Development Portfolio</span>
                                        </div>
                                        <i class='bx bx-right-arrow-alt dropdown-arrow'></i>
                                    </a>
                                </div>
                            </li>
                            <li class="nav-item has-dropdown">
                                <a href="/MDSX/Pages/compositions.html" class="nav-link">
                                    Compositions
                                    <i class='bx bx-chevron-down nav-arrow'></i>
                                </a>
                                <div class="nav-dropdown">
                                    <div class="nav-item has-dropdown nav-submenu">
                                        <a href="/MDSX/Pages/compositions.html" class="dropdown-item">
                                            <i class='bx bx-album'></i>
                                            <div class="dropdown-content">
                                                <span class="dropdown-title">Volume I</span>
                                                <span class="dropdown-desc">All compositions in Volume I</span>
                                            </div>
                                            <i class='bx bx-chevron-right nav-arrow submenu-arrow'></i>
                                        </a>
                                        <div class="nav-dropdown nav-dropdown-right">
                                            <a href="/MDSX/Pages/compositions/i.c.stars.html" class="dropdown-item">
                                                <i class='bx bx-file'></i>
                                                <div class="dropdown-content">
                                                    <span class="dropdown-title">i.c.stars - Mars in a New Galaxy</span>
                                                    <span class="dropdown-desc">Exploring new galaxies through sound and vision.</span>
                                                </div>
                                            </a>
                                            <a href="/MDSX/Pages/compositions/meditrack.html" class="dropdown-item">
                                                <i class='bx bx-file'></i>
                                                <div class="dropdown-content">
                                                    <span class="dropdown-title">MedTrack | Journey to the Solutions Presentations</span>
                                                    <span class="dropdown-desc">Music for the journey of innovation and healing.</span>
                                                </div>
                                            </a>
                                            <a href="/MDSX/Pages/compositions/phishing.html" class="dropdown-item">
                                                <i class='bx bx-file'></i>
                                                <div class="dropdown-content">
                                                    <span class="dropdown-title">Phishing: No Bait, No Bite</span>
                                                    <span class="dropdown-desc">Cybersecurity awareness through creative sound.</span>
                                                </div>
                                            </a>
                                            <a href="/MDSX/Pages/compositions/rebuilding-self.html" class="dropdown-item">
                                                <i class='bx bx-file'></i>
                                                <div class="dropdown-content">
                                                    <span class="dropdown-title">Rebuilding Self</span>
                                                    <span class="dropdown-desc">Break. Build. Become. A sonic journey of transformation.</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <a href="/MDSX/Pages/compositions.html" class="dropdown-item">
                                        <i class='bx bx-collection'></i>
                                        <div class="dropdown-content">
                                            <span class="dropdown-title">All Volumes</span>
                                            <span class="dropdown-desc">View all article volumes</span>
                                        </div>
                                    </a>
                                </div>
                            </li>
                            <li class="nav-item">
                                <a href="/MDSX/Pages/about.html" class="nav-link">About</a>
                            </li>
                            <li class="nav-item">
                                <a href="/MDSX/Pages/connect.html" class="nav-link">Connect</a>
                            </li>
                        </ul>
                        <button class="mobile-menu-toggle" id="mobileMenuToggle">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </nav>
        `;

        this.setActiveNavItem();
        this.bindEvents();
        this.initDropdowns();
        this.initScrollEffect();
    }

    setActiveNavItem() {
        const currentPath = window.location.pathname;
        const navLinks = this.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && currentPath.includes(href.split('/').pop())) {
                link.classList.add('active');
            }
        });
    }

    bindEvents() {
        const mobileToggle = this.querySelector('#mobileMenuToggle');
        const navMenu = this.querySelector('.nav-menu');
        
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                mobileToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking nav links
        const navLinks = this.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle?.classList.remove('active');
                navMenu?.classList.remove('active');
            });
        });
    }

    initDropdowns() {
        const dropdownItems = this.querySelectorAll('.has-dropdown');
        dropdownItems.forEach(item => {
            const dropdown = item.querySelector('.nav-dropdown');
            item.addEventListener('mouseenter', () => {
                dropdown.style.display = 'block';
                dropdown.classList.add('active');
            });
            item.addEventListener('mouseleave', () => {
                dropdown.classList.remove('active');
                dropdown.style.display = 'none';
            });
        });
        // Also handle submenus
        const submenus = this.querySelectorAll('.nav-submenu');
        submenus.forEach(submenu => {
            const subDropdown = submenu.querySelector('.nav-dropdown-right');
            submenu.addEventListener('mouseenter', () => {
                if(subDropdown) {
                    subDropdown.style.display = 'block';
                    subDropdown.classList.add('active');
                }
            });
            submenu.addEventListener('mouseleave', () => {
                if(subDropdown) {
                    subDropdown.classList.remove('active');
                    subDropdown.style.display = 'none';
                }
            });
        });
    }

    initScrollEffect() {
        if (document.body.classList.contains('home-page')) {
            const header = this.querySelector('nav');
            
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    header.parentElement.classList.add('scrolled');
                } else {
                    header.parentElement.classList.remove('scrolled');
                }
            });
        }
    }
}

customElements.define('nav-component', NavComponent);
