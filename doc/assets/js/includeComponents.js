document.addEventListener('DOMContentLoaded', function() {
    const basePath = window.location.hostname === 'github.io' ? '/SERVER-ZONE-WEB/Ankur-Goswami' : '';
    
    // Load components
    loadComponents();

    async function loadComponents() {
        try {
            // Load header
            const headerResponse = await fetch(`${basePath}/components/header.html`);
            const headerHtml = await headerResponse.text();
            document.getElementById('header-container').innerHTML = headerHtml;

            // Load footer
            const footerResponse = await fetch(`${basePath}/components/footer.html`);
            const footerHtml = await footerResponse.text();
            document.getElementById('footer-container').innerHTML = footerHtml;

            // Initialize active states
            setActiveNavLink();

        } catch (error) {
            console.error('Error loading components:', error);
        }
    }

    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath || 
                (currentPath.endsWith('/') && link.getAttribute('href') === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
});
