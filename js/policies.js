document.addEventListener('DOMContentLoaded', () => {
    // Create overlay if it doesn't exist
    let overlay = document.querySelector('.overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
    }

    function showPolicy(policyId) {
        const policySection = document.getElementById(policyId);
        if (policySection) {
            // Hide all other policies first
            document.querySelectorAll('.policy-section').forEach(section => {
                section.style.display = 'none';
            });
            
            // Show selected policy and overlay
            overlay.style.display = 'block';
            policySection.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    function closeAllPolicies() {
        document.querySelectorAll('.policy-section').forEach(section => {
            section.style.display = 'none';
        });
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Handle policy link clicks
    document.addEventListener('click', (e) => {
        if (e.target.matches('.policy-link')) {
            e.preventDefault();
            const policyId = e.target.getAttribute('href').substring(1);
            
            // First check if we're on policies.html
            if (!window.location.pathname.includes('policies.html')) {
                window.location.href = `policies.html#${policyId}`;
                return;
            }
            
            showPolicy(policyId);
        }

        // Close when clicking overlay or close button
        if (e.target.matches('.overlay') || e.target.matches('.close-policy') || e.target.matches('.close-policy *')) {
            closeAllPolicies();
        }
    });

    // Add close buttons to policies if they don't exist
    document.querySelectorAll('.policy-section').forEach(section => {
        if (!section.querySelector('.close-policy')) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-policy';
            closeBtn.innerHTML = '<i class="fas fa-times"></i>';
            section.appendChild(closeBtn);
        }
    });

    // Close with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllPolicies();
        }
    });

    // Check URL hash on page load
    if (window.location.hash) {
        const policyId = window.location.hash.substring(1);
        showPolicy(policyId);
    }
});
