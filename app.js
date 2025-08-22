// FounderStack - Interactive JavaScript for Startup Founders
document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initTerminalAnimation();
    initInteractiveElements();
    initLinkTracking();

    console.log('🚀 FounderStack loaded - Ready to build your unicorn!');
});

// Mobile Navigation
function initMobileNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navList = document.querySelector('.nav__list');

    if (!navToggle || !navList) return;

    let isMenuOpen = false;

    navToggle.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        toggleMobileMenu(isMenuOpen);
    });

    // Close menu on nav link clicks
    const navLinks = navList.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isMenuOpen) {
                isMenuOpen = false;
                toggleMobileMenu(false);
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && isMenuOpen) {
            isMenuOpen = false;
            toggleMobileMenu(false);
        }
    });

    function toggleMobileMenu(open) {
        if (open) {
            // Create mobile menu overlay
            navList.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
                z-index: 200;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 2rem;
                backdrop-filter: blur(20px);
            `;

            // Style nav links for mobile
            navLinks.forEach((link, index) => {
                link.style.cssText = `
                    color: white;
                    font-size: 1.5rem;
                    font-weight: 600;
                    padding: 1rem 2rem;
                    border-radius: 1rem;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: all 0.3s ease;
                    opacity: 0;
                    transform: translateY(20px);
                    animation: slideInUp 0.4s ease forwards ${index * 0.1}s;
                `;
            });

            document.body.style.overflow = 'hidden';

            // Animate hamburger to X
            animateHamburgerToX(navToggle, true);

        } else {
            // Reset menu styles
            navList.style.cssText = '';
            navLinks.forEach(link => {
                link.style.cssText = '';
            });

            document.body.style.overflow = '';

            // Reset hamburger
            animateHamburgerToX(navToggle, false);
        }
    }

    function animateHamburgerToX(toggle, toX) {
        const spans = toggle.querySelectorAll('span');
        if (toX) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    }
}

// Smooth Scrolling with offset for sticky nav
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();

                const headerHeight = document.querySelector('.header').offsetHeight || 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        });
    });
}

// Scroll Animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Stagger animations for card grids
                const cards = entry.target.querySelectorAll('.stack-card, .tool-item, .infra-card, .scale-phase, .resource-block');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.style.filter = 'blur(0)';
                    }, index * 150);
                });

                // Animate tech icons
                const techIcons = entry.target.querySelectorAll('.tech-icon__symbol');
                techIcons.forEach((icon, index) => {
                    setTimeout(() => {
                        icon.style.transform = 'scale(1) rotate(0deg)';
                        icon.style.opacity = '1';
                    }, index * 100);
                });

                // Animate timeline stages
                const stages = entry.target.querySelectorAll('.timeline-stage');
                stages.forEach((stage, index) => {
                    setTimeout(() => {
                        stage.style.opacity = '1';
                        stage.style.transform = 'translateX(0)';
                    }, index * 200);
                });
            }
        });
    }, observerOptions);

    // Set initial styles and observe elements
    const elementsToAnimate = document.querySelectorAll('.section, .stack-card, .tool-item, .infra-card, .scale-phase, .resource-block, .timeline-stage');
    elementsToAnimate.forEach(el => {
        if (!el.closest('.hero')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.filter = 'blur(4px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        }
        observer.observe(el);
    });

    // Initialize tech icons
    const techIcons = document.querySelectorAll('.tech-icon__symbol');
    techIcons.forEach(icon => {
        icon.style.transform = 'scale(0.8) rotate(-10deg)';
        icon.style.opacity = '0';
        icon.style.transition = 'all 0.4s ease';
    });

    // Initialize timeline stages
    const stages = document.querySelectorAll('.timeline-stage');
    stages.forEach(stage => {
        stage.style.opacity = '0';
        stage.style.transform = 'translateX(-30px)';
        stage.style.transition = 'all 0.6s ease';
    });
}

// Terminal Animation
function initTerminalAnimation() {
    const terminal = document.querySelector('.terminal');
    if (!terminal) return;

    const terminalLines = terminal.querySelectorAll('.terminal__line');
    const cursor = terminal.querySelector('.cursor');

    // Initially hide all lines except the first one
    terminalLines.forEach((line, index) => {
        if (index > 0) {
            line.style.opacity = '0';
            line.style.transform = 'translateX(-10px)';
        }
    });

    // Observer for terminal
    const terminalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateTerminal();
                terminalObserver.unobserve(entry.target);
            }
        });
    });

    terminalObserver.observe(terminal);

    function animateTerminal() {
        terminalLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
                line.style.transition = 'all 0.4s ease';

                // Add typing sound effect (visual feedback)
                line.style.background = 'rgba(16, 185, 129, 0.1)';
                setTimeout(() => {
                    line.style.background = '';
                }, 200);
            }, index * 800);
        });

        // Cursor animation
        if (cursor) {
            cursor.style.animation = 'blink 1s infinite';
        }
    }
}

// Interactive Elements
function initInteractiveElements() {
    // Stack card hover effects
    const stackCards = document.querySelectorAll('.stack-card:not(.stack-card--featured)');
    stackCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const features = this.querySelectorAll('.feature');
            features.forEach((feature, index) => {
                setTimeout(() => {
                    feature.style.transform = 'translateX(5px)';
                    feature.style.color = 'var(--color-primary)';
                }, index * 50);
            });
        });

        card.addEventListener('mouseleave', function() {
            const features = this.querySelectorAll('.feature');
            features.forEach(feature => {
                feature.style.transform = '';
                feature.style.color = '';
            });
        });
    });

    // Tech icon interactions
    const techIcons = document.querySelectorAll('.tech-icon__symbol');
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.background = 'rgba(255, 255, 255, 0.2)';
        });

        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.background = 'rgba(255, 255, 255, 0.1)';
        });

        // Click to show tooltip
        icon.addEventListener('click', function() {
            const name = this.nextElementSibling.textContent;
            showTooltip(this, `${name} - Popular choice for startups`);
        });
    });

    // Tool item interactions
    const toolItems = document.querySelectorAll('.tool-item');
    toolItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const category = this.querySelector('.tool__category');
            const pricing = this.querySelector('.tool__pricing');

            if (category) {
                category.style.transform = 'scale(1.05)';
                category.style.background = 'var(--color-secondary)';
            }

            if (pricing) {
                pricing.style.color = 'var(--color-primary)';
                pricing.style.fontWeight = '600';
            }
        });

        item.addEventListener('mouseleave', function() {
            const category = this.querySelector('.tool__category');
            const pricing = this.querySelector('.tool__pricing');

            if (category) {
                category.style.transform = '';
                category.style.background = '';
            }

            if (pricing) {
                pricing.style.color = '';
                pricing.style.fontWeight = '';
            }
        });
    });

    // Infrastructure card tool tags
    const toolTags = document.querySelectorAll('.tool-tag');
    toolTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.background = 'var(--color-primary)';
            this.style.color = 'white';
            this.style.transform = 'scale(1.05)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.color = '';
            this.style.transform = '';
        });
    });

    // Phase icon rotation on hover
    const phaseIcons = document.querySelectorAll('.phase__icon');
    phaseIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(10deg) scale(1.05)';
            this.style.background = 'linear-gradient(135deg, var(--color-secondary), var(--color-accent))';
        });

        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.background = '';
        });
    });

    // Solution tag interactions
    const solutionTags = document.querySelectorAll('.solution-tag');
    solutionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Simulate "learning more" about this solution
            this.style.background = 'rgba(255, 255, 255, 0.2)';
            this.style.transform = 'scale(0.95)';

            setTimeout(() => {
                this.style.background = '';
                this.style.transform = '';
                showTooltip(this, 'Click to learn more about this solution');
            }, 150);
        });
    });
}

// Tooltip system
function showTooltip(element, message) {
    // Remove existing tooltips
    const existingTooltips = document.querySelectorAll('.tooltip');
    existingTooltips.forEach(tooltip => tooltip.remove());

    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = message;
    tooltip.style.cssText = `
        position: absolute;
        background: var(--color-dark);
        color: white;
        padding: 0.5rem 0.75rem;
        border-radius: 0.5rem;
        font-size: 0.75rem;
        white-space: nowrap;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.2s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
    tooltip.style.top = `${rect.bottom + 8}px`;

    // Animate in
    requestAnimationFrame(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(0)';
    });

    // Remove after 3 seconds
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(-10px)';
            setTimeout(() => tooltip.remove(), 200);
        }
    }, 3000);
}

// Link Tracking and Analytics
function initLinkTracking() {
    // Track external link clicks
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('🔗 External link clicked:', this.href);

            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Track which expert service was clicked
            if (this.href.includes('grahammiranda.com')) {
                console.log('📊 Strategic consulting interest detected');
            } else if (this.href.includes('tech.grahammiranda.com')) {
                console.log('🛠️ Technical implementation interest detected');
            } else if (this.href.includes('nexplus.grahammiranda.network')) {
                console.log('🏢 Enterprise solutions interest detected');
            } else if (this.href.includes('grahammiranda.network')) {
                console.log('🌐 Network optimization interest detected');
            }
        });
    });

    // Track internal navigation clicks
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('🧭 Navigation:', this.textContent.trim());
        });
    });

    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('🎯 CTA clicked:', this.textContent.trim());

            // Button animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });

    // Track which tech stack gets most attention
    const stackCards = document.querySelectorAll('.stack-card');
    stackCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            const title = this.querySelector('.stack-card__title')?.textContent || `Stack ${index + 1}`;
            console.log('📚 Tech stack interest:', title);
        });

        card.addEventListener('click', function() {
            const title = this.querySelector('.stack-card__title')?.textContent || `Stack ${index + 1}`;
            console.log('🎯 Tech stack selected:', title);
        });
    });

    // Track tool interest
    const toolItems = document.querySelectorAll('.tool-item');
    toolItems.forEach(item => {
        item.addEventListener('click', function() {
            const toolName = this.querySelector('.tool__name')?.textContent || 'Unknown Tool';
            const category = this.querySelector('.tool__category')?.textContent || 'General';
            console.log('🛠️ Tool interest:', `${toolName} (${category})`);
        });
    });
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Preload critical resources
    const criticalLinks = [
        '/portfolio',
        '/tutorials',
        '/solutions',
        '/network'
    ];

    criticalLinks.forEach(link => {
        const linkElement = document.createElement('link');
        linkElement.rel = 'prefetch';
        linkElement.href = link;
        document.head.appendChild(linkElement);
    });

    // Lazy load images if they exist
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize performance optimizations
initPerformanceOptimizations();

// Keyboard shortcuts for power users
document.addEventListener('keydown', function(e) {
    // ESC to close mobile menu
    if (e.key === 'Escape') {
        const navList = document.querySelector('.nav__list');
        if (navList && navList.style.position === 'fixed') {
            const navToggle = document.getElementById('navToggle');
            if (navToggle) navToggle.click();
        }
    }

    // Quick navigation shortcuts
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case '2':
                e.preventDefault();
                document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case '3':
                e.preventDefault();
                document.getElementById('infrastructure')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case '4':
                e.preventDefault();
                document.getElementById('scaling')?.scrollIntoView({ behavior: 'smooth' });
                break;
        }
    }
});

// Add enhanced focus styles for accessibility
const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--color-primary)';
        this.style.outlineOffset = '2px';
        this.style.borderRadius = '4px';
    });

    element.addEventListener('blur', function() {
        this.style.outline = '';
        this.style.outlineOffset = '';
    });
});

// Add custom CSS animations
const additionalStyles = `
@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}

.tooltip {
    animation: slideInUp 0.2s ease forwards;
}

.terminal:hover .cursor {
    animation: pulse 0.5s ease infinite;
}

@media (max-width: 767px) {
    .nav__link {
        animation: slideInUp 0.4s ease forwards;
    }
}
`;

const style = document.createElement('style');
style.textContent = additionalStyles;
document.head.appendChild(style);

// Console greeting for fellow founders
console.log(`
🚀 Welcome to FounderStack!
👨‍💼 Built by founders, for founders
💡 Technology guidance that actually works
⚡ Ready to scale your startup's tech foundation?

Fellow founder, you've got this! 💪

Need help with your tech decisions?
Check out our expert network for strategic guidance.
`);