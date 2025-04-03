class ErrorHandler {
    static showError(message, type = 'error') {
        const errorDiv = document.createElement('div');
        errorDiv.className = `notification ${type}`;
        errorDiv.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-circle"></i>
                <p>${message}</p>
                <button onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        document.body.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 5000);
    }

    static handleComponentError(error, componentName) {
        console.error(`Error loading ${componentName}:`, error);
        return `
            <div class="error-component">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Failed to load ${componentName}. Please refresh the page.</p>
                <button onclick="window.location.reload()">Retry</button>
            </div>
        `;
    }

    static handleScrollError(error) {
        console.error('Scroll error:', error);
        this.showError('Error loading content. Please try again.');
    }
}
