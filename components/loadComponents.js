// Function to load HTML components
async function loadComponent(elementId, componentPath) {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        element.innerHTML = html;
    } catch (error) {
        element.innerHTML = ErrorHandler.handleComponentError(error, elementId);
    }
}

// Enhanced component loading with retries
async function loadComponentWithRetry(elementId, componentPath, maxRetries = 3) {
    let retries = 0;
    while (retries < maxRetries) {
        try {
            await loadComponent(elementId, componentPath);
            return;
        } catch (error) {
            retries++;
            if (retries === maxRetries) {
                ErrorHandler.showError(`Failed to load ${elementId} after ${maxRetries} attempts`);
            }
            await new Promise(resolve => setTimeout(resolve, 1000 * retries));
        }
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Load header
        const headerResponse = await fetch('../components/header.html');
        const headerContent = await headerResponse.text();
        document.getElementById('header').innerHTML = headerContent;

        // Load footer
        const footerResponse = await fetch('../components/footer.html');
        const footerContent = await footerResponse.text();
        document.getElementById('footer').innerHTML = footerContent;

        // Initialize any component-specific scripts
        const headerScript = document.createElement('script');
        headerScript.src = '../components/header.js';
        document.body.appendChild(headerScript);

        const footerScript = document.createElement('script');
        footerScript.src = '../components/footer.js';
        document.body.appendChild(footerScript);
    } catch (error) {
        console.error('Error loading components:', error);
    }
});
