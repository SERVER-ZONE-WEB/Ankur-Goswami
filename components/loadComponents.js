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
    loadComponentWithRetry('header', '/components/header.html');
    loadComponentWithRetry('footer', '/components/footer.html');
});
