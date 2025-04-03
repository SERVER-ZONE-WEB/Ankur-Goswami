// Sample blog posts data
const blogPosts = [
    {
        id: 1,
        title: "Getting Started with Web Development",
        category: "web-dev",
        date: "2024-01-15",
        author: "John Doe",
        image: "images/blog/web-dev.jpg",
        summary: "Learn the fundamentals of web development and start your journey.",
        content: `<div class="post-content">
            <img src="images/blog/web-dev.jpg" alt="Web Development">
            <p>Complete guide to start web development...</p>
        </div>`,
        tags: ["HTML", "CSS", "JavaScript"]
    },
    {
        id: 2,
        title: "UI/UX Design Principles",
        category: "design",
        date: "2024-01-20",
        author: "Jane Smith",
        image: "images/blog/design.jpg",
        summary: "Essential principles of UI/UX design.",
        content: `<div class="post-content">
            <img src="images/blog/design.jpg" alt="UI/UX Design">
            <p>Learn about modern design principles...</p>
        </div>`,
        tags: ["UI", "UX", "Design"]
    },
    {
        id: 3,
        title: "Latest Tech Trends 2024",
        category: "technology",
        date: "2024-01-25",
        author: "Mike Johnson",
        image: "images/blog/tech.jpg",
        summary: "Explore the latest technology trends.",
        content: `<div class="post-content">
            <img src="images/blog/tech.jpg" alt="Technology">
            <p>Discover emerging technologies...</p>
        </div>`,
        tags: ["AI", "Blockchain", "IoT"]
    }
];

// Display blog posts
function displayPosts(posts) {
    const blogPostsDiv = document.getElementById('blogPosts');
    blogPostsDiv.innerHTML = '';
    
    // Display featured post first
    if (posts.length > 0) {
        const featured = posts[0];
        document.getElementById('featuredPost').innerHTML = `
            <div class="featured-card">
                <img src="${featured.image}" alt="${featured.title}">
                <div class="featured-content">
                    <span class="category">${featured.category}</span>
                    <h2>${featured.title}</h2>
                    <p>${featured.summary}</p>
                    <div class="post-meta">
                        <span><i class="far fa-user"></i> ${featured.author}</span>
                        <span><i class="far fa-calendar"></i> ${formatDate(featured.date)}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Display remaining posts
    posts.slice(1).forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-post';
        postElement.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <span class="category">${post.category}</span>
            <h2>${post.title}</h2>
            <p>${post.summary}</p>
            <div class="post-meta">
                <span><i class="far fa-user"></i> ${post.author}</span>
                <span><i class="far fa-calendar"></i> ${formatDate(post.date)}</span>
            </div>
            <div class="tags">
                ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        `;
        postElement.onclick = () => showPost(post);
        blogPostsDiv.appendChild(postElement);
    });
}

// Filter posts based on search
function filterPosts() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const activeCategory = document.querySelector('.category-btn.active').innerText.toLowerCase();
    
    let filteredPosts = blogPosts;
    
    // Apply category filter if not 'all'
    if (activeCategory !== 'all') {
        filteredPosts = filteredPosts.filter(post => 
            post.category === activeCategory
        );
    }
    
    // Apply search filter
    filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) || 
        post.summary.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    
    displayPosts(filteredPosts);
}

// Show individual post
function showPost(post) {
    document.getElementById('blogPosts').style.display = 'grid';
    document.getElementById('searchBar').style.display = 'block';
    
    document.getElementById('postData').innerHTML = `
        <h1>${post.title}</h1>
        <div>${post.content}</div>
    `;
}

// Filter posts by category
function filterByCategory(category) {
    // Hide post content if visible
    document.getElementById('postContent').style.display = 'none';
    document.getElementById('blogPosts').style.display = 'grid';
    document.getElementById('searchBar').style.display = 'block';
    
    // Filter posts
    const filteredPosts = category === 'all' 
        ? blogPosts 
        : blogPosts.filter(post => post.category === category);
    
    // Display filtered posts
    displayPosts(filteredPosts);
    
    // Update active category button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase() === category) {
            btn.classList.add('active');
        }
    });
}

// Format date
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Share post on social media
function sharePost(platform) {
    const url = window.location.href;
    const title = document.querySelector('#postData h1').innerText;
    
    const urls = {
        twitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`
    };
    
    window.open(urls[platform], '_blank');
}

// Initialize blog
document.addEventListener('DOMContentLoaded', () => {
    displayPosts(blogPosts);
});
