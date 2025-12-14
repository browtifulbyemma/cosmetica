/**
 * Browtiful by Emma - Premium Beauty Website
 * JavaScript - Vanilla JS (No dependencies)
 */

(function() {
    'use strict';

    // ==================== CONTENT MANAGER ====================
    let siteContent = null;

    // Gallery data - will be updated from content.json if available
    var galleryData = {
        'pensat': {
            title: 'Pensat sprâncene',
            images: [
                { src: 'assets/gallery/pensat-1.jpg', alt: 'Pensat sprâncene - rezultat 1' },
                { src: 'assets/gallery/pensat-2.jpg', alt: 'Pensat sprâncene - rezultat 2' },
                { src: 'assets/gallery/pensat-3.jpg', alt: 'Pensat sprâncene - rezultat 3' },
                { src: 'assets/gallery/pensat-4.jpg', alt: 'Pensat sprâncene - rezultat 4' },
                { src: 'assets/gallery/pensat-5.jpg', alt: 'Pensat sprâncene - rezultat 5' },
                { src: 'assets/gallery/pensat-6.jpg', alt: 'Pensat sprâncene - rezultat 6' },
                { src: 'assets/gallery/pensat-7.jpg', alt: 'Pensat sprâncene - rezultat 7' },
                { src: 'assets/gallery/pensat-8.jpg', alt: 'Pensat sprâncene - rezultat 8' }
            ]
        },
        'stilizare': {
            title: 'Masterclass Stilizare Sprâncene',
            images: [
                { src: 'assets/gallery/stilizare-1.jpg', alt: 'Stilizare sprâncene - rezultat 1' },
                { src: 'assets/gallery/stilizare-2.jpg', alt: 'Stilizare sprâncene - rezultat 2' },
                { src: 'assets/gallery/stilizare-3.jpg', alt: 'Stilizare sprâncene - rezultat 3' },
                { src: 'assets/gallery/stilizare-4.jpg', alt: 'Stilizare sprâncene - rezultat 4' },
                { src: 'assets/gallery/stilizare-5.jpg', alt: 'Stilizare sprâncene - rezultat 5' },
                { src: 'assets/gallery/stilizare-6.jpg', alt: 'Stilizare sprâncene - rezultat 6' },
                { src: 'assets/gallery/stilizare-7.jpg', alt: 'Stilizare sprâncene - rezultat 7' },
                { src: 'assets/gallery/stilizare-8.jpg', alt: 'Stilizare sprâncene - rezultat 8' }
            ]
        },
        'laminare-sprancene': {
            title: 'Laminare sprâncene',
            images: [
                { src: 'assets/gallery/laminare-sprancene-1.jpg', alt: 'Laminare sprâncene - rezultat 1' },
                { src: 'assets/gallery/laminare-sprancene-2.jpg', alt: 'Laminare sprâncene - rezultat 2' },
                { src: 'assets/gallery/laminare-sprancene-3.jpg', alt: 'Laminare sprâncene - rezultat 3' },
                { src: 'assets/gallery/laminare-sprancene-4.jpg', alt: 'Laminare sprâncene - rezultat 4' },
                { src: 'assets/gallery/laminare-sprancene-5.jpg', alt: 'Laminare sprâncene - rezultat 5' },
                { src: 'assets/gallery/laminare-sprancene-6.jpg', alt: 'Laminare sprâncene - rezultat 6' },
                { src: 'assets/gallery/laminare-sprancene-7.jpg', alt: 'Laminare sprâncene - rezultat 7' },
                { src: 'assets/gallery/laminare-sprancene-8.jpg', alt: 'Laminare sprâncene - rezultat 8' }
            ]
        },
        'laminare-gene': {
            title: 'Laminare gene + vopsire',
            images: [
                { src: 'assets/gallery/laminare-gene-1.jpg', alt: 'Laminare gene - rezultat 1' },
                { src: 'assets/gallery/laminare-gene-2.jpg', alt: 'Laminare gene - rezultat 2' },
                { src: 'assets/gallery/laminare-gene-3.jpg', alt: 'Laminare gene - rezultat 3' },
                { src: 'assets/gallery/laminare-gene-4.jpg', alt: 'Laminare gene - rezultat 4' },
                { src: 'assets/gallery/laminare-gene-5.jpg', alt: 'Laminare gene - rezultat 5' },
                { src: 'assets/gallery/laminare-gene-6.jpg', alt: 'Laminare gene - rezultat 6' },
                { src: 'assets/gallery/laminare-gene-7.jpg', alt: 'Laminare gene - rezultat 7' },
                { src: 'assets/gallery/laminare-gene-8.jpg', alt: 'Laminare gene - rezultat 8' }
            ]
        },
        'epilare': {
            title: 'Epilare pe zone',
            images: [
                { src: 'assets/gallery/epilare-1.jpg', alt: 'Epilare - rezultat 1' },
                { src: 'assets/gallery/epilare-2.jpg', alt: 'Epilare - rezultat 2' },
                { src: 'assets/gallery/epilare-3.jpg', alt: 'Epilare - rezultat 3' },
                { src: 'assets/gallery/epilare-4.jpg', alt: 'Epilare - rezultat 4' },
                { src: 'assets/gallery/epilare-5.jpg', alt: 'Epilare - rezultat 5' },
                { src: 'assets/gallery/epilare-6.jpg', alt: 'Epilare - rezultat 6' },
                { src: 'assets/gallery/epilare-7.jpg', alt: 'Epilare - rezultat 7' },
                { src: 'assets/gallery/epilare-8.jpg', alt: 'Epilare - rezultat 8' }
            ]
        }
    };

    async function loadContent() {
        try {
            const response = await fetch('content.json');
            if (!response.ok) throw new Error('Content file not found');
            siteContent = await response.json();
            console.log('✅ Content loaded from content.json');
            applyContent();
        } catch (error) {
            console.log('ℹ️ Using default content (content.json not found or error:', error.message + ')');
        }
    }

    function applyContent() {
        if (!siteContent) return;

        // Apply services gallery data
        if (siteContent.services) {
            siteContent.services.forEach(service => {
                if (galleryData[service.id]) {
                    galleryData[service.id].title = service.title;
                    galleryData[service.id].images = service.images.map((src, i) => ({
                        src: src,
                        alt: `${service.title} - rezultat ${i + 1}`
                    }));
                }
            });
        }

        // Apply testimonials if container exists
        const testimonialGrid = document.querySelector('.testimoniale__grid');
        if (testimonialGrid && siteContent.testimonials) {
            testimonialGrid.innerHTML = siteContent.testimonials.map((t, i) => `
                <article class="testimonial-card reveal ${i % 3 === 1 ? 'reveal--delay-1' : i % 3 === 2 ? 'reveal--delay-2' : ''}">
                    <div class="testimonial-card__rating">${'★'.repeat(t.rating)}</div>
                    <p class="testimonial-card__text">„${t.text}"</p>
                    <div class="testimonial-card__author">
                        <div class="testimonial-card__avatar">${t.avatar}</div>
                        <div>
                            <strong class="testimonial-card__name">${t.name}</strong>
                            <span class="testimonial-card__role">${t.role}</span>
                        </div>
                    </div>
                </article>
            `).join('');
        }

        console.log('✅ Content applied to page');
    }

    // ==================== DOM ELEMENTS ====================
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('section[id]');
    const revealElements = document.querySelectorAll('.reveal');

    // ==================== MOBILE MENU ====================
    function toggleMobileMenu() {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    }

    function closeMobileMenu() {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Mobile menu toggle click
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu on window resize (if desktop width)
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            closeMobileMenu();
        }
    });

    // ==================== HEADER SCROLL EFFECT ====================
    let lastScrollY = 0;
    let ticking = false;

    function updateHeader() {
        const scrollY = window.scrollY;
        
        // Add/remove scrolled class
        if (scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });

    // ==================== ACTIVE NAV LINK HIGHLIGHT ====================
    function setActiveNavLink() {
        const scrollY = window.scrollY;
        const headerHeight = header ? header.offsetHeight : 80;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                setActiveNavLink();
            });
        }
    });

    // ==================== SCROLL REVEAL ANIMATION ====================
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    }

    // Check reveal on scroll
    window.addEventListener('scroll', checkReveal);
    
    // Initial check on page load
    checkReveal();

    // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== LAZY LOADING FOR IMAGES ====================
    // Using native lazy loading, but adding a fallback for older browsers
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading is supported
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback for older browsers
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const lazyLoad = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    observer.unobserve(img);
                }
            });
        };

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(lazyLoad, {
                rootMargin: '100px'
            });
            
            lazyImages.forEach(img => observer.observe(img));
        }
    }

    // ==================== WHATSAPP LINK HANDLER ====================
    // Track WhatsApp clicks (can be extended for analytics)
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            // You can add analytics tracking here
            // Example: gtag('event', 'whatsapp_click', { ... });
            console.log('WhatsApp link clicked');
        });
    });

    // ==================== PHONE LINK HANDLER ====================
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // You can add analytics tracking here
            console.log('Phone link clicked');
        });
    });

    // ==================== ACCESSIBILITY IMPROVEMENTS ====================
    // Skip to main content functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const main = document.querySelector('main');
            if (main) {
                main.focus();
                main.scrollIntoView();
            }
        });
    }

    // Handle keyboard navigation for mobile menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            closeMobileMenu();
            menuToggle.focus();
        }
    });

    // ==================== FORM VALIDATION (if forms are added later) ====================
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^[\d\s\+\-\(\)]{10,}$/;
        return re.test(phone);
    }

    // ==================== UTILITY FUNCTIONS ====================
    // Debounce function for scroll events
    function debounce(func, wait = 20) {
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

    // Throttle function for scroll events
    function throttle(func, limit = 100) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ==================== PERFORMANCE OPTIMIZATION ====================
    // Optimize scroll event listeners
    const optimizedScrollHandler = throttle(() => {
        updateHeader();
        setActiveNavLink();
        checkReveal();
    }, 100);

    // Remove individual scroll listeners and use single optimized one
    window.removeEventListener('scroll', checkReveal);
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

    // ==================== INITIALIZE ====================
    async function init() {
        // Load content from JSON
        await loadContent();
        
        // Set initial header state
        updateHeader();
        
        // Set initial active nav link
        setActiveNavLink();
        
        // Initial reveal check
        checkReveal();
        
        // Initialize gallery
        initGallery();
        
        // Log initialization
        console.log('Browtiful by Emma website initialized successfully');
    }

    // ==================== GALLERY & LIGHTBOX ====================
    let currentGallery = null;
    let currentImageIndex = 0;

    function initGallery() {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) return;

        const expandBtns = document.querySelectorAll('.gallery-expand-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');
        const closeBtn = lightbox.querySelector('.lightbox__close');
        const overlay = lightbox.querySelector('.lightbox__overlay');
        const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
        const nextBtn = lightbox.querySelector('.lightbox__nav--next');

        // Open gallery from expand button
        expandBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const galleryId = btn.dataset.gallery;
                openLightbox(galleryId, 0);
            });
        });

        // Open gallery from gallery item click
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const placeholder = item.querySelector('.gallery-placeholder');
                if (placeholder) {
                    const galleryId = placeholder.dataset.service;
                    const index = Array.from(item.parentElement.children).indexOf(item);
                    openLightbox(galleryId, Math.min(index, galleryData[galleryId]?.images.length - 1 || 0));
                }
            });
        });

        // Close lightbox
        closeBtn?.addEventListener('click', closeLightbox);
        overlay?.addEventListener('click', closeLightbox);

        // Navigation
        prevBtn?.addEventListener('click', () => navigateGallery(-1));
        nextBtn?.addEventListener('click', () => navigateGallery(1));

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    navigateGallery(-1);
                    break;
                case 'ArrowRight':
                    navigateGallery(1);
                    break;
            }
        });

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    navigateGallery(1); // Swipe left = next
                } else {
                    navigateGallery(-1); // Swipe right = prev
                }
            }
        }
    }

    function openLightbox(galleryId, startIndex = 0) {
        const lightbox = document.getElementById('lightbox');
        const gallery = galleryData[galleryId];
        
        if (!lightbox || !gallery) return;

        currentGallery = galleryId;
        currentImageIndex = startIndex;

        // Update lightbox content
        updateLightboxContent();

        // Generate thumbnails
        generateThumbnails();

        // Show lightbox
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('lightbox-open');
    }

    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) return;

        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('lightbox-open');
        
        currentGallery = null;
        currentImageIndex = 0;
    }

    function navigateGallery(direction) {
        if (!currentGallery) return;
        
        const gallery = galleryData[currentGallery];
        const totalImages = gallery.images.length;
        
        currentImageIndex = (currentImageIndex + direction + totalImages) % totalImages;
        updateLightboxContent();
        updateThumbnailsActive();
    }

    function updateLightboxContent() {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox || !currentGallery) return;

        const gallery = galleryData[currentGallery];
        const image = gallery.images[currentImageIndex];
        
        const imageContainer = lightbox.querySelector('.lightbox__image-container');
        const title = lightbox.querySelector('.lightbox__title');
        const counter = lightbox.querySelector('.lightbox__counter');

        // Update title and counter
        title.textContent = gallery.title;
        counter.textContent = `${currentImageIndex + 1} / ${gallery.images.length}`;

        // Update image (with placeholder for now - replace with actual images)
        imageContainer.innerHTML = `
            <div class="lightbox__placeholder" style="background: linear-gradient(135deg, #E7D3C7 0%, #D7A6A6 100%);">
                <span>${image.alt}</span>
            </div>
        `;

        // When you have real images, use this instead:
        // imageContainer.innerHTML = `<img src="${image.src}" alt="${image.alt}" loading="lazy">`;
    }

    function generateThumbnails() {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox || !currentGallery) return;

        const gallery = galleryData[currentGallery];
        const thumbnailsContainer = lightbox.querySelector('.lightbox__thumbnails');
        
        thumbnailsContainer.innerHTML = gallery.images.map((img, index) => `
            <div class="lightbox__thumbnail ${index === currentImageIndex ? 'active' : ''}" data-index="${index}">
                <div class="lightbox__thumbnail-placeholder"></div>
            </div>
        `).join('');

        // Add click handlers to thumbnails
        thumbnailsContainer.querySelectorAll('.lightbox__thumbnail').forEach(thumb => {
            thumb.addEventListener('click', () => {
                currentImageIndex = parseInt(thumb.dataset.index);
                updateLightboxContent();
                updateThumbnailsActive();
            });
        });
    }

    function updateThumbnailsActive() {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) return;

        const thumbnails = lightbox.querySelectorAll('.lightbox__thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentImageIndex);
        });
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ==================== EXPORT FOR DEBUGGING (optional) ====================
    window.BrowtifulByEmma = {
        toggleMobileMenu,
        closeMobileMenu,
        updateHeader,
        checkReveal,
        validateEmail,
        validatePhone,
        openLightbox,
        closeLightbox
    };

})();
