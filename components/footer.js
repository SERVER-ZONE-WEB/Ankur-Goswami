// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll to top functionality
const scrollBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.style.opacity = '1';
    scrollBtn.style.visibility = 'visible';
  } else {
    scrollBtn.style.opacity = '0';
    scrollBtn.style.visibility = 'hidden';
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Add hover effect to social links
document.querySelectorAll('.social-links a').forEach(link => {
  link.addEventListener('mouseenter', (e) => {
    e.target.style.transform = 'translateY(-5px) scale(1.1)';
  });
  
  link.addEventListener('mouseleave', (e) => {
    e.target.style.transform = 'translateY(0) scale(1)';
  });
});

// Animate footer sections on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.footer-section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'all 0.5s ease';
  observer.observe(section);
});
