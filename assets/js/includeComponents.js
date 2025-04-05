async function includeHTML() {
    const header = await fetch('/components/header.html');
    const footer = await fetch('/components/footer.html');
    
    document.querySelector('#header-placeholder').innerHTML = await header.text();
    document.querySelector('#footer-placeholder').innerHTML = await footer.text();
    
    // Set active nav item
    const currentPage = window.location.pathname;
    document.querySelector(`[data-nav="${currentPage === '/' ? 'home' : currentPage.split('.')[0].slice(1)}"]`)
        ?.classList.add('active');
}

document.addEventListener('DOMContentLoaded', includeHTML);
