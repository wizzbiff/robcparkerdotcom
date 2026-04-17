/**
 * main.js — Shared JavaScript for RobCParker.com
 * Vanilla ES6+, no dependencies, no build process required.
 */

// =============================================================================
// PROGRESSIVE ENHANCEMENT GUARD
// WHY: Adding .js-enabled to body lets CSS show the hamburger button ONLY when
// JS is available. Without this, mobile users without JS still see a full nav
// list rather than a broken toggle button. See IG-4 in architecture review.
// =============================================================================
document.body.classList.add('js-enabled');

// =============================================================================
// MOBILE NAVIGATION TOGGLE
// =============================================================================

const initMobileNav = () => {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!toggle || !navLinks) return;

    const openNav = () => {
        navLinks.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
    };

    const closeNav = () => {
        navLinks.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        isOpen ? closeNav() : openNav();
    });

    // Close nav when clicking outside header
    // WHY: Tapping the page content to dismiss a mobile menu is a standard UX
    // pattern. Using document-level listener avoids needing an overlay element.
    document.addEventListener('click', (event) => {
        const header = document.querySelector('.site-header');
        if (header && !header.contains(event.target)) {
            closeNav();
        }
    });

    // Close nav on Escape key
    // WHY: Guard prevents stealing focus to the (invisible) hamburger on
    // desktop or when the nav is already closed.
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
            closeNav();
            toggle.focus();
        }
    });

    // Close nav when a nav link is activated (SPA-style navigation feel)
    // WHY: Without this, the menu stays open after the user taps a link on
    // mobile, then the new page loads with the menu visible before the nav
    // re-initializes. Closing immediately gives a cleaner feel.
    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeNav);
    });
};

// =============================================================================
// ACTIVE PAGE HIGHLIGHTING
// WHY: Using pathname comparison instead of href equality handles both
// absolute and relative URLs reliably across file:// and https:// origins.
// =============================================================================

const initActiveNav = () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    if (!navLinks.length) return;

    const currentPath = window.location.pathname;

    // Normalize trailing slashes and index.html for comparison
    const normalizePath = (p) =>
        p.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';

    const normalizedCurrent = normalizePath(currentPath);

    navLinks.forEach((link) => {
        const linkPath = new URL(link.href, window.location.origin).pathname;
        const normalizedLink = normalizePath(linkPath);

        if (normalizedCurrent === normalizedLink) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
};

// =============================================================================
// SMOOTH SCROLLING
// WHY: CSS scroll-behavior: smooth covers most cases, but this JS handler
// supports browsers that don't respect the CSS property and handles hash
// links with offset for the sticky header.
// =============================================================================

const initSmoothScroll = () => {
    document.addEventListener('click', (event) => {
        const anchor = event.target.closest('a[href^="#"]');
        if (!anchor) return;

        const targetId = anchor.getAttribute('href').slice(1);
        if (!targetId) return;

        const target = document.getElementById(targetId);
        if (!target) return;

        event.preventDefault();

        // Account for sticky header height
        const header = document.querySelector('.site-header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

        window.scrollTo({ top: targetTop, behavior: 'smooth' });
        target.focus({ preventScroll: true });
    });
};

// =============================================================================
// UTILITY: DEBOUNCE
// WHY: Wrapping resize/scroll handlers in debounce prevents excessive function
// calls during continuous events, reducing layout thrash and CPU usage.
// =============================================================================

const debounce = (fn, delay = 200) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};

// =============================================================================
// UTILITY: IS ELEMENT IN VIEWPORT
// WHY: IntersectionObserver is more performant than scroll-based detection,
// but this utility exists for simple one-time checks where an Observer
// would be overkill. Future animation/reveal features can build on this.
// =============================================================================

const isInViewport = (element, threshold = 0) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) - threshold &&
        rect.bottom >= threshold &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) - threshold &&
        rect.right >= threshold
    );
};

// =============================================================================
// CONTACT FORM VALIDATION
// WHY: Validation lives in main.js so it's automatically available on any
// page that includes a form with class .contact-form, without needing a
// separate script include. The contact page (SPEC-004) will rely on this.
// =============================================================================

const initContactForm = () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const showError = (field, message) => {
        const errorEl = document.getElementById(`${field.id}-error`);
        field.setAttribute('aria-invalid', 'true');
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.hidden = false;
        }
    };

    const clearError = (field) => {
        const errorEl = document.getElementById(`${field.id}-error`);
        field.removeAttribute('aria-invalid');
        if (errorEl) {
            errorEl.textContent = '';
            errorEl.hidden = true;
        }
    };

    const validateField = (field) => {
        clearError(field);

        if (field.required && !field.value.trim()) {
            showError(field, 'This field is required.');
            return false;
        }

        if (field.type === 'email' && field.value.trim()) {
            // WHY: Using a practical regex rather than RFC 5322 — sufficient
            // for client-side UX feedback, server must re-validate anyway.
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(field.value.trim())) {
                showError(field, 'Please enter a valid email address.');
                return false;
            }
        }

        return true;
    };

    // Validate on blur for inline feedback
    form.querySelectorAll('input, textarea, select').forEach((field) => {
        field.addEventListener('blur', () => validateField(field));
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const fields = form.querySelectorAll('input, textarea, select');
        let isValid = true;

        fields.forEach((field) => {
            if (!validateField(field)) isValid = false;
        });

        if (!isValid) {
            // Move focus to first invalid field
            const firstInvalid = form.querySelector('[aria-invalid="true"]');
            if (firstInvalid) firstInvalid.focus();
            return;
        }

        // Backend integration point — SPEC-004 will wire this up
        // WHY: Stubbing submit handler here keeps the form non-functional
        // until the backend is ready, rather than silently swallowing input.
        console.info('[main.js] Form valid — backend integration pending (SPEC-004)');
    });
};

// =============================================================================
// INIT
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initActiveNav();
    initSmoothScroll();
    initContactForm();
});

// Export utilities for potential future use in page-specific scripts
// WHY: Not using ES modules to avoid requiring a build step or module-aware
// server. Attaching to window makes these accessible from inline scripts.
window.RCP = {
    debounce,
    isInViewport,
};
