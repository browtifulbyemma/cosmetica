/* ==========================================
   ARTICLE PAGE JAVASCRIPT - Browtiful by Emma
   Handles individual article rendering
   ========================================== */

// Article State
let articleData = null;
let allArticles = [];
let categories = [];

// Initialize Article Page
document.addEventListener('DOMContentLoaded', async () => {
    await loadArticleData();
    
    const articleId = getArticleId();
    if (!articleId) {
        showError('Articolul nu a fost găsit.');
        return;
    }
    
    const article = allArticles.find(a => a.id === articleId);
    if (!article) {
        showError('Articolul nu există sau a fost șters.');
        return;
    }
    
    articleData = article;
    renderArticle();
    renderRelatedArticles();
    updateMetaTags();
    initMobileNav();
});

// Get Article ID from URL
function getArticleId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Load Blog Data
async function loadArticleData() {
    try {
        const response = await fetch('blog-data.json');
        if (!response.ok) throw new Error('Failed to load data');
        
        const data = await response.json();
        allArticles = data.articles || [];
        categories = data.categories || [];
    } catch (error) {
        console.error('Error loading article data:', error);
        showError('Eroare la încărcarea articolului.');
    }
}

// Render Article Content
function renderArticle() {
    if (!articleData) return;
    
    // Update page title
    document.title = `${articleData.title} | Browtiful by Emma`;
    
    // Get category display name
    const categoryInfo = categories.find(c => c.id === articleData.category) || { name: articleData.category };
    
    // Update header elements
    document.getElementById('article-category').textContent = categoryInfo.name;
    document.getElementById('article-title').textContent = articleData.title;
    document.getElementById('article-author').textContent = articleData.author;
    document.getElementById('article-date').textContent = `📅 ${formatDate(articleData.date)}`;
    document.getElementById('article-read-time').textContent = `⏱️ ${articleData.readTime}`;
    document.getElementById('breadcrumb-category').textContent = categoryInfo.name;
    
    // Build article body
    const articleBody = document.getElementById('article-body');
    let contentHTML = '';
    
    // Intro
    if (articleData.content && articleData.content.intro) {
        contentHTML += `<p class="article-content__intro">${articleData.content.intro}</p>`;
    }
    
    // Sections
    if (articleData.content && articleData.content.sections) {
        articleData.content.sections.forEach(section => {
            contentHTML += `
                <div class="article-content__section">
                    <h2>${section.title}</h2>
                    <p>${section.content}</p>
                </div>
            `;
        });
    }
    
    // Conclusion
    if (articleData.content && articleData.content.conclusion) {
        contentHTML += `
            <div class="article-content__conclusion">
                <p>${articleData.content.conclusion}</p>
            </div>
        `;
    }
    
    // Tags
    if (articleData.tags && articleData.tags.length > 0) {
        contentHTML += `
            <div class="article-tags">
                ${articleData.tags.map(tag => `
                    <a href="blog.html?search=${encodeURIComponent(tag)}" class="article-tag">#${tag}</a>
                `).join('')}
            </div>
        `;
    }
    
    articleBody.innerHTML = contentHTML;
}

// Render Related Articles
function renderRelatedArticles() {
    const relatedGrid = document.getElementById('related-grid');
    if (!relatedGrid || !articleData) return;
    
    // Find related articles (same category, excluding current)
    let related = allArticles.filter(a => 
        a.category === articleData.category && a.id !== articleData.id
    ).slice(0, 3);
    
    // If not enough, add from other categories
    if (related.length < 3) {
        const others = allArticles.filter(a => 
            a.id !== articleData.id && !related.find(r => r.id === a.id)
        ).slice(0, 3 - related.length);
        related = [...related, ...others];
    }
    
    if (related.length === 0) {
        relatedGrid.innerHTML = '<p class="text-center">Mai multe articole în curând!</p>';
        return;
    }
    
    relatedGrid.innerHTML = related.map(article => createRelatedCard(article)).join('');
}

// Create Related Article Card
function createRelatedCard(article) {
    const categoryInfo = categories.find(c => c.id === article.category) || { name: article.category, icon: '📄' };
    
    return `
        <article class="article-card">
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
                    <div class="article-card__footer">
                        <span class="article-card__meta">${formatDate(article.date)}</span>
                        <span class="article-card__read-more">Citește →</span>
                    </div>
                </div>
            </a>
        </article>
    `;
}

// Update Meta Tags for SEO
function updateMetaTags() {
    if (!articleData) return;
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', articleData.metaDescription || articleData.excerpt);
    }
    
    // Update Open Graph
    updateMetaTag('og:title', articleData.title);
    updateMetaTag('og:description', articleData.metaDescription || articleData.excerpt);
    if (articleData.image) {
        updateMetaTag('og:image', articleData.image);
    }
    
    // Update Twitter Card
    updateMetaTag('twitter:title', articleData.title);
    updateMetaTag('twitter:description', articleData.metaDescription || articleData.excerpt);
    
    // Update Schema.org
    const schemaScript = document.getElementById('article-schema');
    if (schemaScript) {
        const schema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": articleData.title,
            "description": articleData.excerpt,
            "author": {
                "@type": "Person",
                "name": articleData.author
            },
            "publisher": {
                "@type": "Organization",
                "name": "Browtiful by Emma",
                "logo": {
                    "@type": "ImageObject",
                    "url": "assets/favicon.svg"
                }
            },
            "datePublished": articleData.date,
            "articleSection": articleData.category,
            "keywords": articleData.tags ? articleData.tags.join(', ') : ''
        };
        schemaScript.textContent = JSON.stringify(schema);
    }
}

// Helper: Update or create meta tag
function updateMetaTag(property, content) {
    let meta = document.querySelector(`meta[property="${property}"]`) || 
               document.querySelector(`meta[name="${property}"]`);
    
    if (meta) {
        meta.setAttribute('content', content);
    } else {
        meta = document.createElement('meta');
        if (property.startsWith('og:')) {
            meta.setAttribute('property', property);
        } else {
            meta.setAttribute('name', property);
        }
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
    }
}

// Format Date
function formatDate(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('ro-RO', options);
}

// Show Error
function showError(message) {
    const articleBody = document.getElementById('article-body');
    const articleTitle = document.getElementById('article-title');
    const articleCategory = document.getElementById('article-category');
    
    if (articleTitle) articleTitle.textContent = 'Articol negăsit';
    if (articleCategory) articleCategory.style.display = 'none';
    
    if (articleBody) {
        articleBody.innerHTML = `
            <div class="blog-empty">
                <span class="blog-empty__icon">😕</span>
                <p>${message}</p>
                <a href="blog.html" class="btn btn--primary">Înapoi la Blog</a>
            </div>
        `;
    }
    
    const relatedSection = document.querySelector('.related-articles');
    if (relatedSection) relatedSection.style.display = 'none';
}

// Initialize Mobile Navigation (same as main script)
function initMobileNav() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu on link click
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
        });
    }
}
