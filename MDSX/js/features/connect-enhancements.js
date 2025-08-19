// connect-enhancements.js
// Adds interactive JS elements to the Connect page

document.addEventListener('DOMContentLoaded', () => {
    // 1. Animated highlight on widget placeholders on hover
    document.querySelectorAll('.widget-placeholder').forEach(widget => {
        widget.addEventListener('mouseenter', () => {
            widget.style.boxShadow = '0 0 16px 4px #df2c14, 0 0 32px 8px #fff2';
            widget.style.transform = 'scale(1.04)';
            widget.style.transition = 'box-shadow 0.3s, transform 0.3s';
        });
        widget.addEventListener('mouseleave', () => {
            widget.style.boxShadow = '';
            widget.style.transform = '';
        });
    });

    // 2. Animated floating icons for connection links
    document.querySelectorAll('.connection-links a').forEach(link => {
        const icon = document.createElement('span');
        icon.className = 'bx bx-link-external';
        icon.style.marginLeft = '8px';
        icon.style.transition = 'transform 0.3s';
        link.appendChild(icon);
        link.addEventListener('mouseenter', () => {
            icon.style.transform = 'translateY(-4px) scale(1.2)';
            icon.style.color = '#df2c14';
        });
        link.addEventListener('mouseleave', () => {
            icon.style.transform = '';
            icon.style.color = '';
        });
    });

    // 3. Subtle form input focus effect
    document.querySelectorAll('form input, form textarea').forEach(input => {
        input.addEventListener('focus', () => {
            input.style.outline = '2px solid #df2c14';
            input.style.background = '#fff8f6';
        });
        input.addEventListener('blur', () => {
            input.style.outline = '';
            input.style.background = '';
        });
    });

    // 4. Add particles background to the social-widgets section
    const widgetsSection = document.querySelector('.social-widgets');
    if (widgetsSection) {
        import('../js/utils/particles.js').then(() => {
            new ParticleSystem(widgetsSection);
        }).catch(() => {});
    }
});
