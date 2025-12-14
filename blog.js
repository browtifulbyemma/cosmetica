/* ==========================================
   BLOG JAVASCRIPT - Browtiful by Emma
   Handles blog data loading, filtering, rendering
   ========================================== */

// Blog State
const blogState = {
    articles: [],
    categories: [],
    currentCategory: 'all',
    isLoading: true
};

// Initialize Blog
document.addEventListener('DOMContentLoaded', async () => {
    await loadBlogData();
    initCategoryFilters();
    renderFeaturedArticles();
    renderAllArticles();
});

// Load Blog Data from JSON
async function loadBlogData() {
    try {
        const response = await fetch('blog-data.json');
        if (!response.ok) throw new Error('Failed to load blog data');
        
        const data = await response.json();
        blogState.articles = data.articles || [];
        blogState.categories = data.categories || [];
        blogState.isLoading = false;
        
        console.log('Blog data loaded:', blogState.articles.length, 'articles');
    } catch (error) {
        console.error('Error loading blog data:', error);
        blogState.isLoading = false;
        showEmptyState();
    }
}

// Initialize Category Filters
function initCategoryFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter articles
            const category = btn.dataset.category;
            blogState.currentCategory = category;
            
            // Re-render articles
            renderAllArticles();
            
            // Smooth scroll to articles section
            const articlesSection = document.querySelector('.blog-articles');
            if (articlesSection) {
                articlesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Check URL for category parameter (supports ?cat= and ?category=)
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('cat') || urlParams.get('category');
    if (categoryParam) {
        const targetBtn = document.querySelector(`[data-category="${categoryParam}"]`);
        if (targetBtn) targetBtn.click();
    }
}

// Render Featured Articles
function renderFeaturedArticles() {
    const featuredGrid = document.getElementById('featuredArticles');
    if (!featuredGrid) return;
    
    // Get featured articles
    const featured = blogState.articles.filter(a => a.featured).slice(0, 3);
    
    if (featured.length === 0) {
        featuredGrid.innerHTML = '<p class="text-center">Articole noi în curând!</p>';
        return;
    }
    
    featuredGrid.innerHTML = featured.map((article, index) => createFeaturedCard(article, index === 0)).join('');
}

// Render All Articles
function renderAllArticles() {
    const articlesGrid = document.getElementById('articlesGrid');
    if (!articlesGrid) return;
    
    // Filter by category
    let filteredArticles = blogState.articles;
    if (blogState.currentCategory !== 'all') {
        filteredArticles = blogState.articles.filter(a => a.category === blogState.currentCategory);
    }
    
    // Exclude featured from main grid
    const nonFeatured = filteredArticles.filter(a => !a.featured);
    
    if (nonFeatured.length === 0) {
        articlesGrid.innerHTML = `
            <div class="blog-empty">
                <span class="blog-empty__icon">📝</span>
                <p>Nu există articole în această categorie momentan.</p>
                <button class="btn btn--secondary" onclick="resetFilters()">Vezi toate articolele</button>
            </div>
        `;
        return;
    }
    
    articlesGrid.innerHTML = nonFeatured.map(article => createArticleCard(article)).join('');
}

// Create Featured Card HTML
function createFeaturedCard(article, isLarge = false) {
    const categoryInfo = getCategoryInfo(article.category);
    const formattedDate = formatDate(article.date);
    
    return `
        <article class="featured-card">
            <a href="article.html?id=${article.id}" class="featured-card__link">
                <div class="featured-card__image">
                    ${article.image 
                        ? `<img src="${article.image}" alt="${article.title}" loading="lazy">`
                        : `<div class="featured-card__placeholder">${categoryInfo.icon}</div>`
                    }
                    ${isLarge ? '<span class="featured-card__badge">Recomandat</span>' : ''}
                </div>
                <div class="featured-card__content">
                    <span class="featured-card__category">${categoryInfo.name}</span>
                    <h3 class="featured-card__title">${article.title}</h3>
                    <p class="featured-card__excerpt">${article.excerpt}</p>
                    <div class="featured-card__meta">
                        <span>📅 ${formattedDate}</span>
                        <span>⏱️ ${article.readTime}</span>
                    </div>
                </div>
            </a>
        </article>
    `;
}

// Create Article Card HTML
function createArticleCard(article) {
    const categoryInfo = getCategoryInfo(article.category);
    const formattedDate = formatDate(article.date);
    
    return `
        <article class="article-card" data-category="${article.category}">
            <a href="article.html?id=${article.id}" class="article-card__link">
                <div class="article-card__image">
                    ${article.image 
                        ? `<img src="${article.image}" alt="${article.title}" loading="lazy">`
                        : `<div class="article-card__placeholder">${categoryInfo.icon}</div>`
                    }
                </div>
                <div class="article-card__content">
                    <span class="article-card__category">${categoryInfo.name}</span>
                    <h3 class="article-card__title">${article.title}</h3>
                    <p class="article-card__excerpt">${article.excerpt}</p>
                    <div class="article-card__footer">
                        <span class="article-card__meta">${formattedDate} • ${article.readTime}</span>
                        <span class="article-card__read-more">Citește →</span>
                    </div>
                </div>
            </a>
        </article>
    `;
}

// Get Category Info
function getCategoryInfo(categoryName) {
    const category = blogState.categories.find(c => c.id === categoryName) || blogState.categories.find(c => c.name === categoryName);
    return category || { id: categoryName, name: categoryName, icon: '📄', color: '#D7A6A6' };
}

// Format Date
function formatDate(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('ro-RO', options);
}

// Reset Filters
function resetFilters() {
    blogState.currentCategory = 'all';
    
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === 'all');
    });
    
    renderAllArticles();
}

// Backward-compatible helper used by `blog.html` empty-state button
function filterByCategory(category) {
    blogState.currentCategory = category;
    const targetBtn = document.querySelector(`[data-category="${category}"]`);
    if (targetBtn) {
        targetBtn.click();
        return;
    }
    renderAllArticles();
}

// Show Empty State
function showEmptyState() {
    const featuredGrid = document.getElementById('featuredArticles');
    const articlesGrid = document.getElementById('articlesGrid');
    
    if (featuredGrid) {
        featuredGrid.innerHTML = '';
    }
    
    if (articlesGrid) {
        articlesGrid.innerHTML = `
            <div class="blog-empty">
                <span class="blog-empty__icon">🚧</span>
                <p>Blogul este în curs de dezvoltare. Revino curând!</p>
            </div>
        `;
    }
}

// Search Articles (for future implementation)
function searchArticles(query) {
    if (!query || query.length < 3) {
        blogState.currentCategory = 'all';
        renderAllArticles();
        return;
    }
    
    const searchLower = query.toLowerCase();
    const results = blogState.articles.filter(article => 
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt.toLowerCase().includes(searchLower) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
    
    renderSearchResults(results);
}

// Render Search Results
function renderSearchResults(results) {
    const articlesGrid = document.getElementById('articlesGrid');
    if (!articlesGrid) return;
    
    if (results.length === 0) {
        articlesGrid.innerHTML = `
            <div class="blog-empty">
                <span class="blog-empty__icon">🔍</span>
                <p>Nu am găsit articole care să corespundă căutării tale.</p>
                <button class="btn btn--secondary" onclick="resetFilters()">Vezi toate articolele</button>
            </div>
        `;
        return;
    }
    
    articlesGrid.innerHTML = results.map(article => createArticleCard(article)).join('');
}
