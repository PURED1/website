// PURED1 Golf Tech Dashboard JavaScript

// Sample data for leaderboards
const holeInOneData = [
    { rank: 1, player: "—", course: "—", hole: 16, date: "2024-01-15" },
    { rank: 2, player: "—", course: "—", hole: 7, date: "2024-01-12" },
    { rank: 3, player: "—", course: "—", hole: 18, date: "2024-01-10" },
    { rank: 4, player: "—", course: "—", hole: 5, date: "2024-01-08" },
    { rank: 5, player: "—", course: "—", hole: 12, date: "2024-01-05" },
    { rank: 6, player: "—", course: "—", hole: 17, date: "2024-01-03" },
    { rank: 7, player: "—", course: "—", hole: 11, date: "2024-01-01" },
    { rank: 8, player: "—", course: "—", hole: 8, date: "2023-12-28" },
    { rank: 9, player: "—", course: "—", hole: 13, date: "2023-12-25" },
    { rank: 10, player: "—", course: "—", hole: 4, date: "2023-12-22" }
];

const closestToPinData = [
    { rank: 1, player: "—", course: "—", hole: 16, distance: "2' 3\"" },
    { rank: 2, player: "—", course: "—", hole: 7, distance: "3' 1\"" },
    { rank: 3, player: "—", course: "—", hole: 18, distance: "3' 5\"" },
    { rank: 4, player: "—", course: "—", hole: 5, distance: "4' 2\"" },
    { rank: 5, player: "—", course: "—", hole: 12, distance: "4' 7\"" },
    { rank: 6, player: "—", course: "—", hole: 17, distance: "5' 1\"" },
    { rank: 7, player: "—", course: "—", hole: 11, distance: "5' 4\"" },
    { rank: 8, player: "—", course: "—", hole: 8, distance: "5' 8\"" },
    { rank: 9, player: "—", course: "—", hole: 13, distance: "6' 2\"" },
    { rank: 10, player: "—", course: "—", hole: 4, distance: "6' 5\"" }
];

// DOM Elements
const holeInOneList = document.getElementById('holeInOneList');
const closestToPinList = document.getElementById('closestToPinList');
const courseSelect = document.getElementById('courseSelect');

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializePillNav();
    initializeLeaderboards();
    initializeQuickActions();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeImageSlider();
});

// Initialize leaderboards
function initializeLeaderboards() {
    renderHoleInOneLeaderboard();
    renderClosestToPinLeaderboard();
    
    // Add course filter functionality
    courseSelect.addEventListener('change', function() {
        renderClosestToPinLeaderboard();
    });
}

// Render hole in one leaderboard
function renderHoleInOneLeaderboard() {
    holeInOneList.innerHTML = '';
    
    holeInOneData.forEach((entry, index) => {
        const row = document.createElement('div');
        row.className = 'leaderboard-row';
        
        // Add leader class for first place
        if (entry.rank === 1) {
            row.classList.add('leader');
        }
        
        row.innerHTML = `
            <span class="rank">${entry.rank}</span>
            <span class="player">${entry.player}</span>
            <span class="course">${entry.course}</span>
            <span class="hole">${entry.hole}</span>
            <span class="date">${formatDate(entry.date)}</span>
        `;
        
        // Add staggered animation delay
        row.style.animationDelay = `${index * 0.1}s`;
        
        holeInOneList.appendChild(row);
    });
}

// Render closest to pin leaderboard with filtering
function renderClosestToPinLeaderboard() {
    const selectedCourse = courseSelect.value;
    let filteredData = closestToPinData;
    
    if (selectedCourse !== 'all') {
        // Since all courses are now dashes, show all entries when filtering
        filteredData = closestToPinData;
    }
    
    closestToPinList.innerHTML = '';
    
    filteredData.forEach((entry, index) => {
        const row = document.createElement('div');
        row.className = 'leaderboard-row';
        
        // Add leader class for first place
        if (entry.rank === 1) {
            row.classList.add('leader');
        }
        
        row.innerHTML = `
            <span class="rank">${entry.rank}</span>
            <span class="player">${entry.player}</span>
            <span class="course">${entry.course}</span>
            <span class="hole">${entry.hole}</span>
            <span class="distance">${entry.distance}</span>
        `;
        
        // Add staggered animation delay
        row.style.animationDelay = `${index * 0.1}s`;
        
        closestToPinList.appendChild(row);
    });
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
}

// Initialize quick actions
function initializeQuickActions() {
    const actionButtons = document.querySelectorAll('.action-card .btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.closest('.action-card').querySelector('h3').textContent;
            handleQuickAction(action);
        });
    });

    // Initialize spotlight effect for action cards
    initializeSpotlightEffect();
}

// Initialize spotlight effect for action cards
function initializeSpotlightEffect() {
    const spotlightCards = document.querySelectorAll('.card-spotlight');
    
    spotlightCards.forEach(card => {
        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const spotlightColor = card.getAttribute('data-spotlight-color') || 'rgba(255, 255, 255, 0.25)';

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            card.style.setProperty('--spotlight-color', spotlightColor);
        };

        card.addEventListener('mousemove', handleMouseMove);
        
        // Reset spotlight when mouse leaves
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--mouse-x', '0px');
            card.style.setProperty('--mouse-y', '0px');
        });
    });
}

// Handle quick action button clicks
function handleQuickAction(action) {
    switch(action) {
        case 'Highlights':
            showNotification('Opening highlights...', 'info');
            // Simulate opening highlights
            setTimeout(() => {
                showNotification('Highlights loaded successfully!', 'success');
            }, 1500);
            break;
            
        case 'Scan QR Code':
            showNotification('Opening QR scanner...', 'info');
            // Simulate QR scanner
            setTimeout(() => {
                showNotification('QR code scanned!', 'success');
            }, 2000);
            break;
            
        case 'Hole in One Alerts':
            showNotification('Enabling hole in one alerts...', 'info');
            // Simulate enabling alerts
            setTimeout(() => {
                showNotification('Alerts enabled! You\'ll be notified of amazing shots.', 'success');
            }, 1500);
            break;
            
        default:
            showNotification('Action not implemented yet.', 'warning');
    }
}

// Initialize smooth scrolling for navigation
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.pill');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.pill-nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize PillNav component
function initializePillNav() {
    const pillNav = new PillNav({
        items: [
            { href: '#home', label: 'Home' },
            { href: '#leaderboards', label: 'Leaderboards' },
            { href: '#highlights', label: 'Highlights' },
            { href: '#about', label: 'About' }
        ],
        activeHref: '#home',
        baseColor: '#ffffff',
        pillColor: 'rgba(255, 255, 255, 0.1)',
        hoveredPillTextColor: '#ffffff',
        pillTextColor: '#ffffff',
        ease: 'power3.easeOut',
        initialLoadAnimation: true,
        onMobileMenuClick: () => {
            console.log('Mobile menu toggled');
        }
    });
}

// Initialize scroll animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(el => {
        observer.observe(el);
    });
    
    // Observe action cards with staggered animation
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Observe leaderboard sections
    const leaderboardSections = document.querySelectorAll('.leaderboard-section');
    leaderboardSections.forEach(el => {
        observer.observe(el);
    });
    
    // Observe social cards with staggered animation
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Initialize Image Slider
function initializeImageSlider() {
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    
    let currentSlide = 0;
    let isTransitioning = false;
    let autoplayInterval;

    // Initialize first slide
    updateSlider();

    // Auto-play functionality
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            if (!isTransitioning) {
                nextSlide();
            }
        }, 5000); // Change slide every 5 seconds
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
    }

    // Navigation functions
    function nextSlide() {
        if (isTransitioning) return;
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        if (isTransitioning) return;
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }

    function goToSlide(index) {
        if (isTransitioning || index === currentSlide) return;
        currentSlide = index;
        updateSlider();
    }

    function updateSlider() {
        isTransitioning = true;
        
        // Remove all classes
        slides.forEach(slide => {
            slide.classList.remove('active', 'prev', 'next');
        });
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        // Add prev class to previous slide
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        slides[prevIndex].classList.add('prev');

        // Add next class to next slide
        const nextIndex = (currentSlide + 1) % slides.length;
        slides[nextIndex].classList.add('next');

        // Add 3D transform effects
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.style.transform = 'translateX(0) rotateY(0deg) scale(1)';
                slide.style.zIndex = '10';
            } else if (index === prevIndex) {
                slide.style.transform = 'translateX(-100%) rotateY(15deg) scale(0.8)';
                slide.style.zIndex = '5';
            } else if (index === nextIndex) {
                slide.style.transform = 'translateX(100%) rotateY(-15deg) scale(0.8)';
                slide.style.zIndex = '5';
            } else {
                slide.style.transform = 'translateX(200%) rotateY(-30deg) scale(0.6)';
                slide.style.zIndex = '1';
            }
        });

        // Add entrance animation for active slide
        const activeSlide = slides[currentSlide];
        activeSlide.style.opacity = '0';
        activeSlide.style.transform = 'translateX(0) rotateY(0deg) scale(1.1)';
        
        setTimeout(() => {
            activeSlide.style.opacity = '1';
            activeSlide.style.transform = 'translateX(0) rotateY(0deg) scale(1)';
        }, 50);

        // Transition complete
        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }

    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoplay();
            startAutoplay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoplay();
            startAutoplay();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopAutoplay();
            startAutoplay();
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoplay();
            startAutoplay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoplay();
            startAutoplay();
        }
    });

    // Touch/swipe support
    let startX = 0;
    let endX = 0;

    sliderTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    sliderTrack.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            stopAutoplay();
            startAutoplay();
        }
    });

    // Mouse hover pause
    sliderTrack.addEventListener('mouseenter', stopAutoplay);
    sliderTrack.addEventListener('mouseleave', startAutoplay);

    // Start autoplay
    startAutoplay();

    // Add entrance animation for slider
    setTimeout(() => {
        const sliderSection = document.getElementById('image-slider');
        if (sliderSection) {
            sliderSection.style.opacity = '0';
            sliderSection.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                sliderSection.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                sliderSection.style.opacity = '1';
                sliderSection.style.transform = 'translateY(0)';
            }, 100);
        }
    }, 500);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--surface);
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: var(--card-radius);
        box-shadow: var(--card-shadow);
        border: 1px solid var(--accent);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease-out;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Add navbar scroll effect for PillNav
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.pill-nav');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.3)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Add hero button functionality
document.addEventListener('DOMContentLoaded', function() {
    const heroButtons = document.querySelectorAll('.hero-cta .btn');
    
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            
            if (buttonText === 'Get Notified') {
                showNotification('Notification preferences saved!', 'success');
            } else if (buttonText === 'Learn More') {
                // Scroll to quick actions section
                const quickActions = document.querySelector('.quick-actions');
                const navbarHeight = document.querySelector('.pill-nav').offsetHeight;
                const targetPosition = quickActions.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add social link functionality
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-card');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('span').textContent;
            showNotification(`Opening ${platform}...`, 'info');
            
            // Simulate opening social media
            setTimeout(() => {
                showNotification(`${platform} opened successfully!`, 'success');
            }, 1000);
        });
    });
});

// Add real-time updates simulation
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Randomly update closest to pin data
        if (Math.random() < 0.1) { // 10% chance every interval
            const randomIndex = Math.floor(Math.random() * closestToPinData.length);
            const newDistance = (Math.random() * 10 + 1).toFixed(1) + "' " + Math.floor(Math.random() * 12) + '"';
            const oldDistance = closestToPinData[randomIndex].distance;
            closestToPinData[randomIndex].distance = newDistance;
            
            // Re-render if current course filter allows it
            if (courseSelect.value === 'all' || 
                closestToPinData[randomIndex].course === '—') {
                renderClosestToPinLeaderboard();
                
                // Animate the score change
                setTimeout(() => {
                    const rows = closestToPinList.querySelectorAll('.leaderboard-row');
                    if (rows[randomIndex]) {
                        const distanceElement = rows[randomIndex].querySelector('.distance');
                        if (distanceElement) {
                            distanceElement.classList.add('score-change');
                            setTimeout(() => {
                                distanceElement.classList.remove('score-change');
                            }, 600);
                        }
                    }
                }, randomIndex * 100 + 100);
                
                showNotification('Leaderboard updated!', 'info');
            }
        }
    }, 30000); // Check every 30 seconds
}

// Start real-time updates
setTimeout(simulateRealTimeUpdates, 10000); // Start after 10 seconds

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus on course filter
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        courseSelect.focus();
    }
    
    // Escape to close any open notifications
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        });
    }
});

// Add loading states for buttons
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;
    
    return function() {
        button.textContent = originalText;
        button.disabled = false;
    };
}

// Export functions for potential external use
window.PURED1Dashboard = {
    showNotification,
    renderHoleInOneLeaderboard,
    renderClosestToPinLeaderboard,
    handleQuickAction
};
