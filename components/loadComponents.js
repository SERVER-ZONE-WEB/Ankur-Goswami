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

document.addEventListener('DOMContentLoaded', () => {
    // Get the repository name for GitHub Pages
    const isGitHubPages = window.location.hostname.includes('github.io');
    const basePath = isGitHubPages ? '/SERVER-ZONE-WEB/Ankur-Goswami' : '';

    async function loadComponent(elementId, componentPath) {
        const element = document.getElementById(elementId);
        if (!element) return;

        try {
            const response = await fetch(`${basePath}${componentPath}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const html = await response.text();
            element.innerHTML = html;
        } catch (error) {
            console.error(`Error loading ${elementId}:`, error);
            element.innerHTML = `<div class="error-component">Failed to load ${elementId}</div>`;
        }
    }

    // Load header and footer with correct paths
    loadComponent('header', '/components/header.html');
    loadComponent('footer', '/components/footer.html');
});
