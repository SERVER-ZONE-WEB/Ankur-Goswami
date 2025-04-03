document.addEventListener('DOMContentLoaded', () => {
    // Show first policy by default
    showInitialPolicy();

    function showInitialPolicy() {
        // Show all sections
        document.querySelectorAll('.policy-section').forEach(section => {
            section.style.display = 'block';
        });

        // If hash exists, scroll to it
        if (window.location.hash) {
            const targetSection = document.querySelector(window.location.hash);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    function showPolicyFromUrl() {
        if (window.location.hash) {
            const policyId = window.location.hash.substring(1);
            showPolicy(policyId);
        }
    }

    function showPolicy(policyId) {
        // Show selected policy immediately
        const selectedPolicy = document.getElementById(policyId);
        if (selectedPolicy) {
            // Hide all policies first
            document.querySelectorAll('.policy-section').forEach(section => {
                section.style.display = 'none';
            });
            
            // Show selected policy
            selectedPolicy.style.display = 'block';
            selectedPolicy.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Show policy on page load
    showPolicyFromUrl();

    // Handle clicks on policy links
    document.addEventListener('click', (e) => {
        if (e.target.closest('.policy-link')) {
            const link = e.target.closest('.policy-link');
            const policyId = link.getAttribute('href').split('#')[1];
            showPolicy(policyId);
        }
    });

    // Handle browser back/forward
    window.addEventListener('hashchange', showPolicyFromUrl);
});
