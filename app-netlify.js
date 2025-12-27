// Main Application - Updated for Netlify CMS
class PortfolioApp {
    constructor() {
        this.projects = [];
        this.staticPages = {};
        this.currentProject = null;
        this.currentSlideIndex = 0;
        this.currentCategory = 'all';
        
        this.init();
    }
    
    async init() {
        await this.loadData();
        this.setupEventListeners();
        this.handleInitialRoute();
    }
    
    async loadData() {
        try {
            // Load projects from individual files (Netlify CMS structure)
            await this.loadProjectsFromNetlifyCMS();
            
            // Load static pages from individual files
            await this.loadPagesFromNetlifyCMS();
            
            this.renderProjects();
            this.renderStaticPages();
        } catch (error) {
            console.error('Error loading data:', error);
            this.showError();
        }
    }
    
    async loadProjectsFromNetlifyCMS() {
        try {
            // Fetch the projects directory listing
            const response = await fetch('data/projects/');
            const html = await response.text();
            
            // Parse file names from directory listing (if server supports it)
            // Otherwise, we'll need to maintain a manifest file
            
            // For now, let's try to fetch a manifest or list
            // If that fails, we'll fall back to the old structure
            
            let projectFiles = [];
            
            try {
                // Try to load from a manifest file that lists all projects
                const manifestResponse = await fetch('data/projects-manifest.json');
                if (manifestResponse.ok) {
                    projectFiles = await manifestResponse.json();
                }
            } catch (e) {
                console.log('No manifest found, trying individual load');
            }
            
            // Load each project file
            const projectPromises = projectFiles.map(async (filename) => {
                const response = await fetch(`data/projects/${filename}`);
                return await response.json();
            });
            
            this.projects = await Promise.all(projectPromises);
            
            // If no projects loaded, try the old single-file structure as fallback
            if (this.projects.length === 0) {
                try {
                    const oldResponse = await fetch('data/projects.json');
                    if (oldResponse.ok) {
                        this.projects = await oldResponse.json();
                    }
                } catch (e) {
                    console.log('No projects found in old structure either');
                }
            }
            
            // Sort by date (newest first)
            this.projects.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });
            
        } catch (error) {
            console.error('Error loading projects:', error);
            this.projects = [];
        }
    }
    
    async loadPagesFromNetlifyCMS() {
        try {
            const pageNames = ['bio', 'press', 'cv', 'contact'];
            
            for (const pageName of pageNames) {
                try {
                    const response = await fetch(`data/pages/${pageName}.json`);
                    if (response.ok) {
                        const data = await response.json();
                        // Convert markdown to HTML
                        this.staticPages[pageName] = this.markdownToHtml(data.body || '');
                    }
                } catch (e) {
                    console.error(`Error loading ${pageName}:`, e);
                    this.staticPages[pageName] = '<p>Content coming soon...</p>';
                }
            }
            
            // Fallback to old structure if no pages loaded
            if (Object.keys(this.staticPages).length === 0) {
                try {
                    const oldResponse = await fetch('data/pages.json');
                    if (oldResponse.ok) {
                        this.staticPages = await oldResponse.json();
                    }
                } catch (e) {
                    console.log('No pages found in old structure either');
                }
            }
        } catch (error) {
            console.error('Error loading pages:', error);
            this.staticPages = {};
        }
    }
    
    // Simple markdown to HTML converter
    markdownToHtml(markdown) {
        if (!markdown) return '';
        
        let html = markdown
            // Headers
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            // Bold
            .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.*?)\*/gim, '<em>$1</em>')
            // Links
            .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
            // Line breaks
            .replace(/\n\n/g, '</p><p>')
            // Lists
            .replace(/^\- (.*$)/gim, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
        
        // Wrap in paragraphs if not already wrapped
        if (!html.startsWith('<h') && !html.startsWith('<ul')) {
            html = '<p>' + html + '</p>';
        }
        
        return html;
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.main-nav a, .site-title').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page') || 'work';
                this.navigateToPage(page);
            });
        });
        
        // Category filtering
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.getAttribute('data-category');
                this.filterProjects(category);
            });
        });
        
        // Modal close
        const modal = document.getElementById('projectModal');
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        closeBtn.addEventListener('click', () => this.closeModal());
        overlay.addEventListener('click', () => this.closeModal());
        
        // Slideshow navigation
        modal.querySelector('.slideshow-arrow.prev').addEventListener('click', () => {
            this.changeSlide(-1);
        });
        
        modal.querySelector('.slideshow-arrow.next').addEventListener('click', () => {
            this.changeSlide(1);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (modal.classList.contains('active')) {
                if (e.key === 'Escape') this.closeModal();
                if (e.key === 'ArrowLeft') this.changeSlide(-1);
                if (e.key === 'ArrowRight') this.changeSlide(1);
            }
        });
        
        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.handleInitialRoute();
        });
    }
    
    handleInitialRoute() {
        const hash = window.location.hash.slice(1);
        const params = new URLSearchParams(window.location.search);
        
        if (hash.startsWith('project/')) {
            const slug = hash.replace('project/', '');
            const project = this.projects.find(p => p.slug === slug);
            if (project) {
                this.openProject(project);
            }
        } else if (hash) {
            this.navigateToPage(hash);
        } else {
            this.navigateToPage('work');
        }
        
        // Handle category filter from URL
        const category = params.get('category');
        if (category) {
            this.filterProjects(category);
        }
    }
    
    navigateToPage(pageId) {
        // Update active page
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId)?.classList.add('active');
        
        // Update active nav
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });
        
        // Update URL
        window.history.pushState({}, '', `#${pageId}`);
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
    
    filterProjects(category) {
        this.currentCategory = category;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-category') === category) {
                btn.classList.add('active');
            }
        });
        
        // Update URL
        const params = new URLSearchParams();
        if (category !== 'all') {
            params.set('category', category);
        }
        const queryString = params.toString();
        const newUrl = `#work${queryString ? '?' + queryString : ''}`;
        window.history.pushState({}, '', newUrl);
        
        this.renderProjects();
    }
    
    renderProjects() {
        const grid = document.getElementById('projectsGrid');
        const filteredProjects = this.currentCategory === 'all' 
            ? this.projects 
            : this.projects.filter(p => p.category === this.currentCategory);
        
        if (filteredProjects.length === 0) {
            grid.innerHTML = '<div class="empty-state">No projects in this category yet.</div>';
            return;
        }
        
        grid.innerHTML = filteredProjects.map(project => `
            <div class="project-tile" data-slug="${project.slug}">
                ${this.renderThumbnail(project)}
                <div class="project-tile-info">
                    <div class="project-tile-title">${this.escapeHtml(project.title)}</div>
                    <div class="project-tile-date">${this.escapeHtml(project.date)}</div>
                </div>
            </div>
        `).join('');
        
        // Add click handlers
        grid.querySelectorAll('.project-tile').forEach(tile => {
            tile.addEventListener('click', () => {
                const slug = tile.getAttribute('data-slug');
                const project = this.projects.find(p => p.slug === slug);
                if (project) {
                    this.openProject(project);
                }
            });
        });
    }
    
    renderThumbnail(project) {
        if (project.media && project.media.length > 0) {
            const firstMedia = project.media[0];
            
            if (firstMedia.type === 'youtube') {
                const videoId = this.extractYouTubeId(firstMedia.url);
                return `<img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" alt="${this.escapeHtml(project.title)}">`;
            } else if (firstMedia.type === 'image') {
                // Handle both direct URL and imageFile from Netlify CMS
                const imageUrl = firstMedia.imageFile || firstMedia.url;
                return `<img src="${this.escapeHtml(imageUrl)}" alt="${this.escapeHtml(project.title)}">`;
            } else if (firstMedia.type === 'audio') {
                // For audio, use a waveform image if provided, otherwise show a placeholder
                const audioImage = firstMedia.thumbnail || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect fill="%23f0f0f0" width="400" height="400"/><text x="50%" y="50%" text-anchor="middle" fill="%23999" font-family="Arial" font-size="20">Audio</text></svg>';
                return `<img src="${this.escapeHtml(audioImage)}" alt="${this.escapeHtml(project.title)}">`;
            }
        }
        
        return '<div style="width: 100%; height: 100%; background: #f0f0f0;"></div>';
    }
    
    openProject(project) {
        this.currentProject = project;
        this.currentSlideIndex = 0;
        
        // Update modal content
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDate').textContent = project.date;
        document.getElementById('modalDescription').textContent = project.description;
        
        // Render slideshow
        this.renderSlideshow();
        
        // Show modal
        document.getElementById('projectModal').classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update URL
        window.history.pushState({}, '', `#project/${project.slug}`);
    }
    
    closeModal() {
        document.getElementById('projectModal').classList.remove('active');
        document.body.style.overflow = '';
        
        // Return to work page
        window.history.pushState({}, '', '#work');
    }
    
    renderSlideshow() {
        const container = document.getElementById('slideshowContent');
        
        if (!this.currentProject.media || this.currentProject.media.length === 0) {
            container.innerHTML = '<div class="empty-state">No media available</div>';
            return;
        }
        
        container.innerHTML = this.currentProject.media.map((item, index) => {
            let content = '';
            
            if (item.type === 'youtube') {
                const videoId = this.extractYouTubeId(item.url);
                content = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
            } else if (item.type === 'image') {
                const imageUrl = item.imageFile || item.url;
                content = `<img src="${this.escapeHtml(imageUrl)}" alt="Slide ${index + 1}">`;
            } else if (item.type === 'audio') {
                const audioImage = item.thumbnail || '';
                content = `
                    ${audioImage ? `<img src="${this.escapeHtml(audioImage)}" alt="Audio visualization">` : ''}
                    <audio controls src="${this.escapeHtml(item.url)}"></audio>
                `;
            }
            
            return `<div class="slideshow-item ${index === 0 ? 'active' : ''}">${content}</div>`;
        }).join('');
        
        // Hide arrows if only one item
        const arrows = document.querySelectorAll('.slideshow-arrow');
        arrows.forEach(arrow => {
            arrow.style.display = this.currentProject.media.length > 1 ? 'flex' : 'none';
        });
    }
    
    changeSlide(direction) {
        if (!this.currentProject.media || this.currentProject.media.length <= 1) return;
        
        const slides = document.querySelectorAll('.slideshow-item');
        slides[this.currentSlideIndex].classList.remove('active');
        
        this.currentSlideIndex += direction;
        
        if (this.currentSlideIndex >= slides.length) {
            this.currentSlideIndex = 0;
        } else if (this.currentSlideIndex < 0) {
            this.currentSlideIndex = slides.length - 1;
        }
        
        slides[this.currentSlideIndex].classList.add('active');
    }
    
    renderStaticPages() {
        ['bio', 'press', 'cv', 'contact'].forEach(pageId => {
            const content = this.staticPages[pageId] || '<p>Content coming soon...</p>';
            document.getElementById(`${pageId}Content`).innerHTML = content;
        });
    }
    
    extractYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    showError() {
        document.getElementById('projectsGrid').innerHTML = 
            '<div class="empty-state">Error loading projects. Please try again later.</div>';
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PortfolioApp();
    });
} else {
    new PortfolioApp();
}
