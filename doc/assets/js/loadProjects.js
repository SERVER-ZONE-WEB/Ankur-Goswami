async function loadProjects(limit = null) {
    try {
        const response = await fetch('/data/projects.json');
        const data = await response.json();
        let projects = data.projects;
        
        if (limit) projects = projects.slice(0, limit);
        
        return projects.map(project => `
            <div class="project-card" data-category="${project.category}">
                <img src="${project.image}" alt="${project.title}">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-links">
                    <a href="${project.githubUrl}" target="_blank">GitHub</a>
                    <a href="${project.liveUrl}" target="_blank">Live Demo</a>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading projects:', error);
        return '<p>Error loading projects</p>';
    }
}
