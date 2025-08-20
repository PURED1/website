// PURED1 Golf Video Capture App - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initAnimations();
    initFormHandling();
    initInteractiveElements();
    initMobileMenu();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animations and scroll effects
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .recording-card, .pricing-card, .trust-stat');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero::before');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Form handling
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Processing...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.textContent = 'Success!';
                    submitBtn.style.background = 'var(--primary-green)';
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        form.reset();
                    }, 2000);
                }, 1500);
            }
        });
    });
    
    // Input focus effects
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

// Interactive elements
function initInteractiveElements() {
    // Record button animation
    const recordBtn = document.querySelector('.record-btn');
    if (recordBtn) {
        recordBtn.addEventListener('click', function() {
            this.classList.add('recording');
            this.innerHTML = '<i class="fas fa-stop"></i>';
            
            setTimeout(() => {
                this.classList.remove('recording');
                this.innerHTML = '<i class="fas fa-circle"></i>';
            }, 3000);
        });
    }
    
    // Play button effects
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.add('playing');
            setTimeout(() => {
                this.classList.remove('playing');
            }, 1000);
        });
    });
    
    // Social sharing buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.add('shared');
            setTimeout(() => {
                this.classList.remove('shared');
            }, 2000);
        });
    });
    
    // Copy link functionality
    const copyBtn = document.querySelector('.share-link .btn-secondary');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const linkInput = this.parentElement.querySelector('input');
            linkInput.select();
            document.execCommand('copy');
            
            this.textContent = 'Copied!';
            setTimeout(() => {
                this.textContent = 'Copy Link';
            }, 2000);
        });
    }
    
    // QR Scanner simulation
    const scanBtn = document.querySelector('.scanner-controls .btn-primary');
    if (scanBtn) {
        scanBtn.addEventListener('click', function() {
            const scannerFrame = document.querySelector('.scanner-frame');
            scannerFrame.classList.add('scanning');
            
            setTimeout(() => {
                scannerFrame.classList.remove('scanning');
                scannerFrame.classList.add('scanned');
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'scan-success';
                successMsg.innerHTML = '<i class="fas fa-check-circle"></i> QR Code Scanned Successfully!';
                scannerFrame.appendChild(successMsg);
                
                setTimeout(() => {
                    successMsg.remove();
                    scannerFrame.classList.remove('scanned');
                }, 3000);
            }, 2000);
        });
    }
    
    // Timeline clip selection
    const clips = document.querySelectorAll('.clip');
    clips.forEach(clip => {
        clip.addEventListener('click', function() {
            clips.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // Editor controls
    const editorButtons = document.querySelectorAll('.editor-controls button');
    editorButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.add('active');
            setTimeout(() => {
                this.classList.remove('active');
            }, 500);
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Utility functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS for additional animations
const additionalStyles = `
    .navbar.scrolled {
        background: rgba(10, 10, 10, 0.98);
        backdrop-filter: blur(30px);
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--darker-bg);
        border-top: 1px solid var(--border-color);
        padding: var(--spacing-lg);
        gap: var(--spacing-md);
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .record-btn.recording {
        animation: pulse 1s infinite;
        background: #ff4444;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .play-button.playing {
        animation: playPulse 0.5s ease;
    }
    
    @keyframes playPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .social-btn.shared {
        background: var(--primary-green);
        color: var(--dark-bg);
    }
    
    .scanner-frame.scanning {
        animation: scanAnimation 2s ease;
    }
    
    @keyframes scanAnimation {
        0% { border-color: var(--border-color); }
        50% { border-color: var(--primary-green); }
        100% { border-color: var(--border-color); }
    }
    
    .scanner-frame.scanned {
        border-color: var(--primary-green);
    }
    
    .scan-success {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--primary-green);
        color: var(--dark-bg);
        padding: var(--spacing-md);
        border-radius: var(--radius-md);
        font-weight: var(--font-weight-semibold);
        z-index: 10;
        animation: successFade 3s ease;
    }
    
    @keyframes successFade {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
    
    .clip.selected {
        border-color: var(--primary-green);
        background: rgba(0, 255, 136, 0.1);
    }
    
    .editor-controls button.active {
        background: var(--primary-green);
        color: var(--dark-bg);
        transform: scale(0.95);
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--card-bg);
        color: var(--text-primary);
        padding: var(--spacing-md) var(--spacing-lg);
        border-radius: var(--radius-md);
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-lg);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        z-index: 10000;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        border-left: 4px solid var(--primary-green);
    }
    
    .notification.error {
        border-left: 4px solid #ff4444;
    }
    
    .form-group.focused label {
        color: var(--primary-green);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
        
        .nav-menu.active {
            display: flex;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Performance optimization
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

// Optimize scroll events
const optimizedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Initialize tooltips and other UI enhancements
function initUIEnhancements() {
    // Add tooltips to buttons
    const buttons = document.querySelectorAll('button[title]');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('title');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        });
        
        button.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Initialize UI enhancements
initUIEnhancements();

// Export functions for potential external use
window.PURED1 = {
    showNotification,
    initNavigation,
    initAnimations
};


