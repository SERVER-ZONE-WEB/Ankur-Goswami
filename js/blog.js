let blogPosts = [];

async function loadBlogList() {
    try {
        const response = await fetch('/posts/posts.json');
        if (!response.ok) throw new Error('Failed to load posts');
        
        blogPosts = await response.json();
        displayPosts(blogPosts);
        document.getElementById('blogList').style.display = 'block';
        document.getElementById('postView').style.display = 'none';
    } catch (error) {
        showError('Failed to load blog posts');
    }
}

async function loadPost(postId) {
    try {
        const post = blogPosts.find(p => p.id === postId);
        if (!post) throw new Error('Post not found');
        
        const response = await fetch(`/posts/${postId}/index.html`);
        if (!response.ok) throw new Error('Failed to load post content');
        
        const content = await response.text();
        document.getElementById('postContent').innerHTML = content;
        document.getElementById('blogList').style.display = 'none';
        document.getElementById('postView').style.display = 'block';
        
        // Update URL without reload
        history.pushState({ postId }, post.title, `/blog?post=${postId}`);
        document.title = `${post.title} - Blog`;
    } catch (error) {
        showError('Failed to load post');
    }
}

// Handle browser back/forward
window.addEventListener('popstate', (event) => {
    if (event.state?.postId) {
        loadPost(event.state.postId);
    } else {
        showBlogList();
    }
});

async function loadPosts() {
    try {
        const response = await fetch('./posts/index.json');
        if (!response.ok) throw new Error('Failed to load posts index');
        
        blogPosts = await response.json();
        displayPosts(blogPosts);
    } catch (error) {
        console.error('Error loading blog posts:', error);
        showNotification('Failed to load blog posts', 'error');
    }
}

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
async function showPost(post) {
    if (!post) return;
    
    try {
        // Load post content from HTML file
        const response = await fetch(post.path);
        if (!response.ok) throw new Error('Failed to load post content');
        const postContent = await response.text();
        
        // Hide blog list elements
        const elementsToHide = ['blogPosts', 'searchBar', 'categories', 'featuredPost'];
        elementsToHide.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.opacity = '0';
                setTimeout(() => element.style.display = 'none', 300);
            }
        });

        // Show post content
        setTimeout(() => {
            document.getElementById('postData').innerHTML = postContent;
            const postContent = document.getElementById('postContent');
            postContent.style.display = 'block';
            setTimeout(() => postContent.style.opacity = '1', 50);
        }, 300);
        
    } catch (error) {
        console.error('Error loading post:', error);
        showNotification('Failed to load post content', 'error');
    }
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

// Initialize blog with loading state
document.addEventListener('DOMContentLoaded', () => {
    const blogPostsDiv = document.getElementById('blogPosts');
    if (blogPostsDiv) {
        blogPostsDiv.innerHTML = '<div class="loading">Loading posts...</div>';
        loadPosts();
    }
});
