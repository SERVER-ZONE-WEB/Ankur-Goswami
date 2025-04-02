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

document.addEventListener('DOMContentLoaded', () => {
    // Reveal animation
    const reveals = document.querySelectorAll('.reveal');
    
    function reveal() {
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', reveal);
    reveal(); // Initial check
    
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectLinks = document.querySelectorAll('.project-link');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            projectLinks.forEach(project => {
                if (filter === 'all' || project.dataset.category === filter) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCategories = document.querySelectorAll('.project-category');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show/hide projects based on category
            projectCategories.forEach(category => {
                const projects = category.querySelectorAll('.project-link');
                let hasVisibleProjects = false;
                
                projects.forEach(project => {
                    if (filter === 'all' || project.dataset.category === filter) {
                        project.style.display = 'block';
                        hasVisibleProjects = true;
                    } else {
                        project.style.display = 'none';
                    }
                });
                
                // Show/hide category heading
                category.style.display = hasVisibleProjects ? 'block' : 'none';
            });
        });
    });
});

// Glitch effect for hero text
function glitchEffect() {
    const glitchText = document.querySelector('.glitch-text');
    if (!glitchText) return;

    setInterval(() => {
        glitchText.style.transform = `translate(${Math.random() * 2}px, ${Math.random() * 2}px)`;
        setTimeout(() => {
            glitchText.style.transform = 'translate(0, 0)';
        }, 50);
    }, 3000);
}

// Animate stats counter
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            stat.textContent = Math.round(current) + '+';
        }, 40);
    });
}

// Initialize page-specific features
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.hero')) {
        glitchEffect();
    }
    if (document.querySelector('.about-page')) {
        animateStats();
    }
});

// Company information slideshow
const companyInfo = [
    "Server Zone is a leading cybersecurity research and development company.",
    "We specialize in penetration testing and secure web application development.",
    "Our team has successfully completed 50+ security projects.",
    "We provide comprehensive security training and certification programs.",
    "Server Zone is trusted by leading organizations for security solutions.",
    "We are committed to making the digital world more secure."
];

let companyIndex = 0;
let isTyping = true;
let textPosition = 0;

function typeCompanyInfo() {
    const companyText = document.querySelector('.company-text');
    if (!companyText) return;

    const currentText = companyInfo[companyIndex];

    if (textPosition < currentText.length) {
        companyText.textContent = currentText.substring(0, textPosition + 1);
        textPosition++;
        setTimeout(typeCompanyInfo, 50);
    } else {
        setTimeout(() => {
            textPosition = 0;
            companyIndex = (companyIndex + 1) % companyInfo.length;
            companyText.textContent = '';
            typeCompanyInfo();
        }, 3000);
    }
}

// Initialize company info animation when on about page
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.company-info')) {
        setTimeout(typeCompanyInfo, 1000);
    }
});

// Matrix Effect
function createMatrixEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const matrixEffect = document.querySelector('.matrix-effect');
    
    if (!matrixEffect) return;
    matrixEffect.appendChild(canvas);
    
    canvas.width = matrixEffect.offsetWidth;
    canvas.height = matrixEffect.offsetHeight;
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';
    const fontSize = 14;
    const columns = canvas.width/fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';
        
        for(let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i*fontSize, drops[i]*fontSize);
            
            if(drops[i]*fontSize > canvas.height && Math.random() > 0.975)
                drops[i] = 0;
            
            drops[i]++;
        }
    }
    
    setInterval(draw, 33);
}

// Initialize Matrix Effect
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.hero')) {
        createMatrixEffect();
    }
});

// Project Search Functionality
const projectSearch = document.getElementById('projectSearch');
if (projectSearch) {
    projectSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const projects = document.querySelectorAll('.project-card');
        
        projects.forEach(project => {
            const title = project.querySelector('h3').textContent.toLowerCase();
            const description = project.querySelector('p').textContent.toLowerCase();
            const tech = Array.from(project.querySelectorAll('.project-tech span'))
                .map(span => span.textContent.toLowerCase());
            
            const matches = title.includes(searchTerm) || 
                          description.includes(searchTerm) ||
                          tech.some(t => t.includes(searchTerm));
            
            project.style.display = matches ? 'block' : 'none';
        });
    });
}

// Enhanced Project Search Functionality
function initProjectSearch() {
    const projectSearch = document.getElementById('projectSearch');
    const searchMessage = document.getElementById('searchMessage');
    
    if (!projectSearch || !searchMessage) return;

    let searchTimeout;

    projectSearch.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        
        searchTimeout = setTimeout(() => {
            const searchTerm = e.target.value.toLowerCase().trim();
            if (searchTerm === '') {
                showAllProjects();
                searchMessage.style.display = 'none';
                return;
            }

            const projects = document.querySelectorAll('.project-card, .project-link');
            let matchFound = false;
            let visibleCount = 0;

            projects.forEach(project => {
                const title = project.querySelector('.project-name, h3').textContent.toLowerCase();
                const description = project.querySelector('p')?.textContent.toLowerCase() || '';
                const tech = Array.from(project.querySelectorAll('.project-tech span'))
                    .map(span => span.textContent.toLowerCase());
                
                const matches = title.includes(searchTerm) || 
                              description.includes(searchTerm) ||
                              tech.some(t => t.includes(searchTerm));
                
                if (matches) {
                    project.style.display = 'block';
                    matchFound = true;
                    visibleCount++;
                } else {
                    project.style.display = 'none';
                }
            });

            // Update search message
            searchMessage.style.display = 'block';
            if (matchFound) {
                searchMessage.textContent = `Found ${visibleCount} project${visibleCount !== 1 ? 's' : ''} matching "${searchTerm}"`;
                searchMessage.className = 'search-message success';
            } else {
                searchMessage.textContent = `No projects found matching "${searchTerm}"`;
                searchMessage.className = 'search-message error';
            }
            
            // Update category visibility
            updateCategoryVisibility();
        }, 300); // Debounce search for better performance
    });
}

function showAllProjects() {
    const projects = document.querySelectorAll('.project-card, .project-link');
    projects.forEach(project => {
        project.style.display = 'block';
    });
    updateCategoryVisibility();
}

function updateCategoryVisibility() {
    const categories = document.querySelectorAll('.project-category');
    categories.forEach(category => {
        const visibleProjects = category.querySelectorAll('.project-card[style*="display: block"], .project-link[style*="display: block"]');
        category.style.display = visibleProjects.length > 0 ? 'block' : 'none';
    });
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', () => {
    initProjectSearch();
});

// Project Demo Modal
document.querySelectorAll('.demo-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const project = e.target.closest('.project-card');
        const projectTitle = project.querySelector('h3').textContent;
        
        showModal(`
            <div class="demo-modal">
                <h3>${projectTitle} Demo</h3>
                <div class="demo-content">
                    <img src="images/demo-placeholder.jpg" alt="Project Demo">
                    <p>Live demo coming soon...</p>
                </div>
            </div>
        `);
    });
});

function showModal(content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            ${content}
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
}
