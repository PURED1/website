// Vanilla JavaScript PillNav Component
class PillNav {
  constructor(options = {}) {
    this.options = {
      logo: options.logo || '',
      logoAlt: options.logoAlt || 'Logo',
      items: options.items || [],
      activeHref: options.activeHref || '',
      className: options.className || '',
      ease: options.ease || 'power3.easeOut',
      baseColor: options.baseColor || '#fff',
      pillColor: options.pillColor || '#060010',
      hoveredPillTextColor: options.hoveredPillTextColor || '#060010',
      pillTextColor: options.pillTextColor || null,
      onMobileMenuClick: options.onMobileMenuClick || null,
      initialLoadAnimation: options.initialLoadAnimation !== false
    };

    this.isMobileMenuOpen = false;
    this.circleRefs = [];
    this.tlRefs = [];
    this.activeTweenRefs = [];
    this.logoImgRef = null;
    this.logoTweenRef = null;
    this.hamburgerRef = null;
    this.mobileMenuRef = null;
    this.navItemsRef = null;
    this.logoRef = null;

    this.init();
  }

  init() {
    this.createNavbar();
    this.setupEventListeners();
    this.layout();
    this.setupInitialAnimation();
  }

  createNavbar() {
    const container = document.createElement('div');
    container.className = 'pill-nav-container';

    const nav = document.createElement('nav');
    nav.className = `pill-nav ${this.options.className}`;
    nav.setAttribute('aria-label', 'Primary');
    nav.style.setProperty('--base', this.options.baseColor);
    nav.style.setProperty('--pill-bg', this.options.pillColor);
    nav.style.setProperty('--hover-text', this.options.hoveredPillTextColor);
    nav.style.setProperty('--pill-text', this.options.pillTextColor || this.options.baseColor);

    // Navigation Items
    const navItems = this.createNavItems();
    nav.appendChild(navItems);

    // Mobile Menu Button
    const mobileButton = this.createMobileButton();
    nav.appendChild(mobileButton);

    container.appendChild(nav);

    // Mobile Menu Popover
    const mobileMenu = this.createMobileMenu();
    container.appendChild(mobileMenu);

    // Replace existing navbar
    const existingNavbar = document.querySelector('.navbar');
    if (existingNavbar) {
      existingNavbar.parentNode.replaceChild(container, existingNavbar);
    } else {
      document.body.insertBefore(container, document.body.firstChild);
    }

    // Store references
    this.navItemsRef = navItems;
    this.hamburgerRef = mobileButton;
    this.mobileMenuRef = mobileMenu;
  }

  // Logo creation method removed - no longer needed

  createNavItems() {
    const navItems = document.createElement('div');
    navItems.className = 'pill-nav-items desktop-only';

    const ul = document.createElement('ul');
    ul.className = 'pill-list';
    ul.setAttribute('role', 'menubar');

    this.options.items.forEach((item, i) => {
      const li = document.createElement('li');
      li.setAttribute('role', 'none');

      const link = document.createElement('a');
      link.href = item.href || '#';
      link.className = `pill${this.options.activeHref === item.href ? ' is-active' : ''}`;
      link.setAttribute('role', 'menuitem');
      link.setAttribute('aria-label', item.ariaLabel || item.label);
      link.addEventListener('mouseenter', () => this.handleEnter(i));
      link.addEventListener('mouseleave', () => this.handleLeave(i));

      const circle = document.createElement('span');
      circle.className = 'hover-circle';
      circle.setAttribute('aria-hidden', 'true');

      const labelStack = document.createElement('span');
      labelStack.className = 'label-stack';

      const label = document.createElement('span');
      label.className = 'pill-label';
      label.textContent = item.label;

      const labelHover = document.createElement('span');
      labelHover.className = 'pill-label-hover';
      labelHover.setAttribute('aria-hidden', 'true');
      labelHover.textContent = item.label;

      labelStack.appendChild(label);
      labelStack.appendChild(labelHover);
      link.appendChild(circle);
      link.appendChild(labelStack);
      li.appendChild(link);
      ul.appendChild(li);

      this.circleRefs[i] = circle;
    });

    navItems.appendChild(ul);
    return navItems;
  }

  createMobileButton() {
    const button = document.createElement('button');
    button.className = 'mobile-menu-button mobile-only';
    button.setAttribute('aria-label', 'Toggle menu');
    button.addEventListener('click', () => this.toggleMobileMenu());

    const line1 = document.createElement('span');
    line1.className = 'hamburger-line';

    const line2 = document.createElement('span');
    line2.className = 'hamburger-line';

    button.appendChild(line1);
    button.appendChild(line2);

    return button;
  }

  createMobileMenu() {
    const menu = document.createElement('div');
    menu.className = 'mobile-menu-popover mobile-only';
    menu.style.setProperty('--base', this.options.baseColor);
    menu.style.setProperty('--pill-bg', this.options.pillColor);
    menu.style.setProperty('--hover-text', this.options.hoveredPillTextColor);
    menu.style.setProperty('--pill-text', this.options.pillTextColor || this.options.baseColor);

    const ul = document.createElement('ul');
    ul.className = 'mobile-menu-list';

    this.options.items.forEach((item, i) => {
      const li = document.createElement('li');

      const link = document.createElement('a');
      link.href = item.href || '#';
      link.className = `mobile-menu-link${this.options.activeHref === item.href ? ' is-active' : ''}`;
      link.textContent = item.label;
      link.addEventListener('click', () => {
        this.isMobileMenuOpen = false;
        this.toggleMobileMenu();
      });

      li.appendChild(link);
      ul.appendChild(li);
    });

    menu.appendChild(ul);
    return menu;
  }

  setupEventListeners() {
    window.addEventListener('resize', () => this.layout());
    
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => this.layout()).catch(() => {});
    }
  }

  layout() {
    this.circleRefs.forEach((circle, i) => {
      if (!circle?.parentElement) return;

      const pill = circle.parentElement;
      const rect = pill.getBoundingClientRect();
      const { width: w, height: h } = rect;
      const R = ((w * w) / 4 + h * h) / (2 * h);
      const D = Math.ceil(2 * R) + 2;
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      const originY = D - delta;

      circle.style.width = `${D}px`;
      circle.style.height = `${D}px`;
      circle.style.bottom = `-${delta}px`;

      gsap.set(circle, {
        xPercent: -50,
        scale: 0,
        transformOrigin: `50% ${originY}px`,
      });

      const label = pill.querySelector('.pill-label');
      const white = pill.querySelector('.pill-label-hover');

      if (label) gsap.set(label, { y: 0 });
      if (white) gsap.set(white, { y: h + 12, opacity: 0 });

      this.tlRefs[i]?.kill();
      const tl = gsap.timeline({ paused: true });

      tl.to(
        circle,
        { scale: 1.2, xPercent: -50, duration: 2, ease: this.options.ease, overwrite: 'auto' },
        0
      );

      if (label) {
        tl.to(
          label,
          { y: -(h + 8), duration: 2, ease: this.options.ease, overwrite: 'auto' },
          0
        );
      }

      if (white) {
        gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
        tl.to(
          white,
          { y: 0, opacity: 1, duration: 2, ease: this.options.ease, overwrite: 'auto' },
          0
        );
      }

      this.tlRefs[i] = tl;
    });
  }

  setupInitialAnimation() {
    const menu = this.mobileMenuRef;
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1 });
    }

    if (this.options.initialLoadAnimation) {
      const navItems = this.navItemsRef;

      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: 'hidden' });
        gsap.to(navItems, {
          width: 'auto',
          duration: 0.6,
          ease: this.options.ease,
        });
      }
    }
  }

  handleEnter(i) {
    const tl = this.tlRefs[i];
    if (!tl) return;
    this.activeTweenRefs[i]?.kill();
    this.activeTweenRefs[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease: this.options.ease,
      overwrite: 'auto',
    });
  }

  handleLeave(i) {
    const tl = this.tlRefs[i];
    if (!tl) return;
    this.activeTweenRefs[i]?.kill();
    this.activeTweenRefs[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease: this.options.ease,
      overwrite: 'auto',
    });
  }

  // Logo functionality removed - no longer needed

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    const hamburger = this.hamburgerRef;
    const menu = this.mobileMenuRef;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (this.isMobileMenuOpen) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease: this.options.ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease: this.options.ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease: this.options.ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease: this.options.ease });
      }
    }

    if (menu) {
      if (this.isMobileMenuOpen) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease: this.options.ease,
            transformOrigin: 'top center',
          }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease: this.options.ease,
          transformOrigin: 'top center',
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          },
        });
      }
    }

    this.options.onMobileMenuClick?.();
  }
}

// Export for use
window.PillNav = PillNav;
