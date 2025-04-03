document.addEventListener('DOMContentLoaded', () => {
    function showPolicy(policyId) {
        // Hide all policies first
        document.querySelectorAll('.policy-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected policy
        const selectedPolicy = document.getElementById(policyId);
        if (selectedPolicy) {
            selectedPolicy.classList.add('active');
            selectedPolicy.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Handle initial load with hash
    if (window.location.hash) {
        const policyId = window.location.hash.substring(1);
        showPolicy(policyId);
    } else {
        // If no hash, show first policy by default
        showPolicy('privacy-policy');
    }

    // Handle clicks on policy links
    document.querySelectorAll('.policy-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const policyId = link.getAttribute('href').split('#')[1];
            showPolicy(policyId);
        });
    });
});
