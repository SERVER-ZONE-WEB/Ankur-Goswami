// Handle project card clicks
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        const link = this.getAttribute('data-link');
        if (link) window.location.href = link;
    });

    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});

// Special animation for featured project
const featuredProject = document.querySelector('.project-card.featured');
if (featuredProject) {
    featuredProject.addEventListener('mouseenter', () => {
        featuredProject.style.transform = 'scale(1.02)';
    });
    
    featuredProject.addEventListener('mouseleave', () => {
        featuredProject.style.transform = 'scale(1)';
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Animate skill bars on scroll
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.progress;
        }
    });
};

const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.5
});

document.querySelectorAll('.skill-progress').forEach(bar => {
    observer.observe(bar);
});

// Form handling with validation
const form = document.querySelector('.contact-form form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    
    try {
        // Add your form submission logic here
        const response = await fetch('/submit', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            showNotification('Message sent successfully!', 'success');
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        showNotification(error.message, 'error');
    }
});

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
