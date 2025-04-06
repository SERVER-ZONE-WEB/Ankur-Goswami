// Base path utility
function getBasePath() {
    return window.location.hostname === 'github.io' ? '/SERVER-ZONE-WEB/Ankur-Goswami' : '';
}

function getResourcePath(path) {
    const basePath = getBasePath();
    return `${basePath}${path}`;
}

// Core typing animation
const titles = [
    "Cyber Security Expert",
    "Web Developer",
    "CEH Professional",
    "Founder of Server Zone"
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

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
    typingTimeout = setTimeout(typeEffect, typingSpeed);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Core configurations
// Removed duplicate declaration of typingTexts

// Core initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typing effect
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        initTypeWriter(typingElement);
    }

    // Initialize components
    initializeCore();
});

function initializeCore() {
    // Initialize navigation
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Initialize animations if AOS is loaded
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    }
}

function handleNavigation(e) {
    const href = this.getAttribute('href');
    if (href && (href.startsWith('http') || href.startsWith('mailto:'))) return;
    
    e.preventDefault();
    if (href && href.endsWith('.html')) {
        window.location.href = href;
        return;
    }
}

function initTypeWriter(element) {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    const texts = typingTexts[currentPage] || typingTexts['index'];
    let textIndex = 0;

    function updateText() {
        element.style.opacity = '0';
        setTimeout(() => {
            element.textContent = texts[textIndex];
            element.style.opacity = '1';
            textIndex = (textIndex + 1) % texts.length;
        }, 500);
    }

    updateText();
    setInterval(updateText, 3000);
}

// Cleanup function
function cleanupEventListeners() {
    if (typingTimeout) clearTimeout(typingTimeout);
}

// Enhanced scroll handling
let isLoading = false;
let hasMoreContent = true;

async function handleScroll() {
    if (isLoading || !hasMoreContent) return;

    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.offsetHeight;

    if (scrollPosition >= documentHeight - 1000) {
        try {
            isLoading = true;
            await loadMoreContent();
        } catch (error) {
            ErrorHandler.handleScrollError(error);
            hasMoreContent = false;
        } finally {
            isLoading = false;
        }
    }
}

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

// Improved stats animation with cleanup
function animateStats() {
    const statTimers = [];
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
        
        statTimers.push(timer);
    });

    // Cleanup function
    return () => statTimers.forEach(timer => clearInterval(timer));
}

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

// Improved Matrix effect with cleanup
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
    
    const drawInterval = setInterval(draw, 33);
    
    // Cleanup function
    return () => {
        clearInterval(drawInterval);
        if (canvas && matrixEffect) {
            matrixEffect.removeChild(canvas);
        }
    };
}

// Enhanced Project Search Functionality
function initProjectSearch() {
    const projectSearch = document.getElementById('projectSearch');
    const searchMessage = document.getElementById('searchMessage');
    
    if (!projectSearch || !searchMessage) {
        ErrorHandler.showError('Search functionality unavailable');
        return;
    }

    let searchTimeout;

    projectSearch.addEventListener('input', (e) => {
        try {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const searchTerm = e.target.value.toLowerCase().trim();
                performSearch(searchTerm, searchMessage);
            }, 300);
        } catch (error) {
            ErrorHandler.showError('Search error occurred');
            console.error('Search error:', error);
        }
    });
}

function performSearch(searchTerm, searchMessage) {
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

// Error handling utility
const ErrorHandler = {
    showError(message) {
        console.error(message);
        showNotification(message, 'error');
    },
    handleScrollError(error) {
        this.showError('Error loading content');
        console.error('Scroll error:', error);
    }
};

// About page specific animations
function initAboutPage() {
    if (!document.querySelector('.about-page')) return;

    // Animate stats
    animateStats();

    // Company info typing effect
    typeCompanyInfo();

    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 50) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', debounce(revealOnScroll, 50));
    revealOnScroll();
}

// Blog search and filter functionality
function initBlogFilter() {
    if (!document.querySelector('.blog-page')) return;
    
    const searchBar = document.getElementById('searchBar');
    if (searchBar) {
        searchBar.addEventListener('input', debounce(() => {
            filterPosts();
        }, 300));
    }
}

// Add spacing adjustment function
function adjustHeaderSpacing() {
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    const body = document.body;
    
    if (nav && header) {
        const navHeight = nav.offsetHeight;
        body.style.paddingTop = navHeight + 'px';
        header.style.minHeight = `calc(100vh - ${navHeight}px)`;
        header.style.marginTop = '0';
        header.style.paddingTop = '0';
    }
}

// Add window resize handler with debounce
window.addEventListener('resize', debounce(() => {
    adjustHeaderSpacing();
}, 150));

function adjustLayout() {
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    const mainContent = document.querySelector('main');
    
    if (nav && header) {
        const navHeight = nav.offsetHeight;
        
        // Adjust header
        header.style.height = `calc(100vh - ${navHeight}px)`;
        header.style.marginTop = `${navHeight}px`;
        
        // Adjust main content
        if (mainContent) {
            mainContent.style.marginTop = '0';
        }
    }
}

// Call on load and resize
document.addEventListener('DOMContentLoaded', adjustLayout);
window.addEventListener('resize', debounce(adjustLayout, 150));

// Project fetching and display
const fetchLatestProjects = () => {
    const projectsContainer = document.querySelector('#featured-projects .featured-grid');
    if (!projectsContainer) return;

    fetch('projects.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const projectsByCategory = {};

            // Get all projects and group by category
            doc.querySelectorAll('.project-card').forEach(project => {
                const category = project.dataset.category;
                if (!projectsByCategory[category]) {
                    projectsByCategory[category] = [];
                }
                projectsByCategory[category].push(project.outerHTML);
            });

            // Get latest 2 projects from each category
            let featuredHtml = '';
            for (const category in projectsByCategory) {
                const latestProjects = projectsByCategory[category].slice(0, 2);
                featuredHtml += latestProjects.join('');
            }

            projectsContainer.innerHTML = featuredHtml;
            initializeProjectCards();
        })
        .catch(error => console.error('Error fetching projects:', error));
};

// Initialize project cards with animations and interactions
const initializeProjectCards = () => {
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.add('reveal');
        // ...existing project card initialization code...
    });
};

// Page-specific typing text configurations
const typingTexts = {
    'index': [
        "Welcome to My Portfolio",
        "Full-Stack Developer",
        "Cybersecurity Enthusiast"
    ],
    'about': [
        "About Me",
        "Tech Explorer",
        "Passionate Developer"
    ],
    'projects': [
        "My Work",
        "Recent Projects",
        "Open Source Contributions"
    ]
};

function initTypeWriter() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    const element = document.querySelector('.typing-text');
    if (!element) return;

    const texts = typingTexts[currentPage] || typingTexts['index'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }

    type();
}

document.addEventListener('DOMContentLoaded', initTypeWriter);
