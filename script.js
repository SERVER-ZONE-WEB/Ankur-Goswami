// Add typing animation for the header
const titles = [
    "Cyber Security Expert",
    "Web Developer",
    "CEH Professional",
    "Founder of Server Zone"
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const typedTextSpan = document.querySelector(".typed-text");
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        typedTextSpan.textContent = currentTitle.substring(0, charIndex-1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentTitle.substring(0, charIndex+1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
        setTimeout(() => isDeleting = true, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
    }

    const typingSpeed = isDeleting ? 100 : 200;
    setTimeout(typeEffect, typingSpeed);
}

// Start the typing animation when page loads
document.addEventListener('DOMContentLoaded', typeEffect);

// Update navigation handling
document.querySelectorAll('nav a, .cta-primary, .cta-secondary, .view-project, .view-live, .view-code').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // If it's an external link or email, let it behave normally
        if (href.startsWith('http') || href.startsWith('mailto:')) {
            return;
        }
        
        e.preventDefault();
        
        // If it's a page navigation
        if (href.endsWith('.html')) {
            window.location.href = href;
            return;
        }
        
        // If it's a section navigation
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start'
            });
        }
    });
});

// Update project card click handling
document.querySelectorAll('.project-card').forEach(card => {
    const link = card.getAttribute('data-link');
    if (link) {
        card.addEventListener('click', function() {
            window.location.href = link;
        });
    }

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

// Add scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');
const elementInView = (el, offset = 150) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= window.innerHeight - offset;
};

const displayScrollElement = (element) => {
    element.classList.add('revealed');
};

const hideScrollElement = (element) => {
    element.classList.remove('revealed');
};

const handleScrollAnimation = () => {
    revealElements.forEach((el) => {
        if (elementInView(el, 150)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    });
}

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Update form submission
document.querySelectorAll('.contact-form form').forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        
        try {
            // For demonstration, show success message
            showNotification('Message sent successfully!', 'success');
            form.reset();
        } catch (error) {
            showNotification('Failed to send message', 'error');
        }
    });
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

// Add notification styles dynamically
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        z-index: 1000;
        animation: slideIn 0.5s ease-out;
    }
    
    .notification.success {
        background-color: #4CAF50;
    }
    
    .notification.error {
        background-color: #f44336;
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
`;
document.head.appendChild(style);

// Project Filter System
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('[data-category]');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter projects
        projectItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = '';
                setTimeout(() => item.classList.add('show'), 10);
            } else {
                item.classList.remove('show');
                item.style.display = 'none';
            }
        });
    });
});

// Dynamic Project Grid
const projectsData = [
    {
        title: "Security Scanner",
        description: "Advanced vulnerability assessment tool",
        category: "security",
        tech: ["Python", "Docker", "Security"],
        icon: "shield-alt"
    },
    // Add more projects here
];

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.category = project.category;
    
    const icon = document.createElement('i');
    icon.className = `fas fa-${project.icon}`;
    card.appendChild(icon);
    
    const title = document.createElement('h3');
    title.textContent = project.title;
    card.appendChild(title);
    
    const description = document.createElement('p');
    description.textContent = project.description;
    card.appendChild(description);
    
    const techList = document.createElement('ul');
    project.tech.forEach(tech => {
        const techItem = document.createElement('li');
        techItem.textContent = tech;
        techList.appendChild(techItem);
    });
    card.appendChild(techList);
    
    return card;
}

function loadProjects() {
    const grid = document.querySelector('.projects-grid');
    projectsData.forEach(project => {
        grid.appendChild(createProjectCard(project));
    });
}

document.addEventListener('DOMContentLoaded', loadProjects);
