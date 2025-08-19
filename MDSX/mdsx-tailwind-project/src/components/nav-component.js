// This file contains the JavaScript for the navigation component.
// It includes functions to handle navigation logic and rendering.

const navComponent = (() => {
    const renderNav = () => {
        const nav = document.createElement('nav');
        nav.className = 'bg-gray-800 p-4';
        
        const ul = document.createElement('ul');
        ul.className = 'flex space-x-4';

        const links = [
            { href: '#about', text: 'About' },
            { href: '#projects', text: 'Projects' },
            { href: '#contact', text: 'Contact' }
        ];

        links.forEach(link => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = link.href;
            a.textContent = link.text;
            a.className = 'text-white hover:text-gray-400';
            li.appendChild(a);
            ul.appendChild(li);
        });

        nav.appendChild(ul);
        document.body.prepend(nav);
    };

    return {
        renderNav
    };
})();

document.addEventListener('DOMContentLoaded', navComponent.renderNav);