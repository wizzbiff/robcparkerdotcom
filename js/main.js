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
// CONTACT FORM
// WHY: Validation lives in main.js so it's automatically available on any
// page that includes a form with class .contact-form, without needing a
// separate script include. The contact page (SPEC-004) relies on this.
// =============================================================================

// Module-local constants — swap placeholders before deploy (see Implementation Plan in SPEC-004)
const FORMSPREE_FORM_ID = 'mvzdrbnk';
const TURNSTILE_SITE_KEY = '0x4AAAAAAC_i2Ps6sJsYDeL2';
// WHY: Single constant for the full endpoint — Phase-2 swap to a Cloudflare Pages Function
// is one line here, touching nothing else in the submit handler.
const FORM_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

// Per-field validation messages keyed by field id (and by type as fallback).
// WHY: Field-specific messages ("Please enter your email address.") are more
// helpful than generic "This field is required." They match the copy approved
// in the SPEC-004 marketing-copywriter deliverables.
const VALIDATION_MESSAGES = {
    name: {
        empty: 'Please enter your name.',
    },
    email: {
        empty: 'Please enter your email address.',
        invalid: 'That doesn\'t look like a valid email address.',
    },
    message: {
        empty: 'Please include a message.',
        tooShort: 'Your message is a bit short — please add a few more words.',
    },
};

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

        const msgs = VALIDATION_MESSAGES[field.id] || {};

        if (field.required && !field.value.trim()) {
            showError(field, msgs.empty || 'This field is required.');
            return false;
        }

        if (field.type === 'email' && field.value.trim()) {
            // WHY: Using a practical regex rather than RFC 5322 — sufficient
            // for client-side UX feedback, server must re-validate anyway.
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(field.value.trim())) {
                showError(field, msgs.invalid || 'Please enter a valid email address.');
                return false;
            }
        }

        // Min-length check for message field (minlength=10 on the textarea)
        if (field.minLength > 0 && field.value.trim().length < field.minLength && field.value.trim().length > 0) {
            showError(field, msgs.tooShort || `Please enter at least ${field.minLength} characters.`);
            return false;
        }

        return true;
    };

    // Validate on blur for inline feedback
    form.querySelectorAll('input, textarea, select').forEach((field) => {
        field.addEventListener('blur', () => validateField(field));
    });

    // -------------------------------------------------------------------------
    // SUCCESS STATE BUILDER
    // WHY: Constructing the success panel in JS (not hidden in HTML) keeps
    // the DOM clean and avoids any risk of the panel being partially visible
    // before submit. The form element is replaced entirely (IG-14) to prevent
    // resubmission — there is no "show/hide" toggle.
    // -------------------------------------------------------------------------
    const buildSuccessPanel = (firstName) => {
        const panel = document.createElement('div');
        panel.className = 'success-state';
        panel.setAttribute('tabindex', '-1');

        const heading = document.createElement('h2');
        heading.className = 'success-heading';
        // textContent only — never innerHTML (SD-4 XSS prevention)
        heading.textContent = 'Message sent.';
        panel.appendChild(heading);

        const body = document.createElement('p');
        body.className = 'success-body';
        if (firstName) {
            // WHY: 80-char trim prevents an absurdly long name from dominating the
            // success UI or enabling visual injection attacks via the name field (SD-4).
            const safeName = firstName.trim().slice(0, 80);
            // textContent only — never innerHTML or template-literal concat into innerHTML
            body.textContent = `Thanks, ${safeName} — I have your message. I review new inquiries personally and will be in touch within a few business days.`;
        } else {
            body.textContent = 'Thanks — I have your message. I review new inquiries personally and will be in touch within a few business days.';
        }
        panel.appendChild(body);

        const nudge = document.createElement('p');
        nudge.className = 'success-nudge';
        nudge.textContent = 'In the meantime, connecting on LinkedIn is a good way to stay in touch.';
        panel.appendChild(nudge);

        const linkedInLink = document.createElement('a');
        linkedInLink.href = 'https://www.linkedin.com/in/robcparker/';
        linkedInLink.target = '_blank';
        linkedInLink.rel = 'noopener noreferrer';
        linkedInLink.setAttribute('aria-label', 'Connect with Rob Parker on LinkedIn (opens in a new tab)');
        linkedInLink.className = 'btn btn-primary success-linkedin-btn';
        // textContent only — SD-4
        linkedInLink.textContent = 'Connect on LinkedIn';
        panel.appendChild(linkedInLink);

        return panel;
    };

    // -------------------------------------------------------------------------
    // GENERIC ERROR RENDERER (S-1 DRY)
    // WHY: Both the non-2xx branch and the fetch-catch branch show the same
    // "Something went wrong" message. One helper keeps the DOM-building logic
    // in one place and prevents the two paths from drifting apart.
    // -------------------------------------------------------------------------
    const renderGenericError = (statusEl) => {
        statusEl.textContent = '';
        statusEl.appendChild(
            document.createTextNode('Something went wrong on our end. Please try again, or email me directly at ')
        );
        // Email link assembled inline — same obfuscation approach as initEmailObfuscation
        const emailLink = document.createElement('a');
        emailLink.href = 'mailto:contact@robcparker.com';
        emailLink.textContent = 'contact@robcparker.com';
        statusEl.appendChild(emailLink);
        statusEl.appendChild(document.createTextNode('.'));
        statusEl.classList.remove('form-status--warning', 'form-status--success');
        statusEl.classList.add('form-status--error');
    };

    // -------------------------------------------------------------------------
    // SUBMIT HANDLER — fetch-based AJAX to Formspree
    // -------------------------------------------------------------------------
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Run client-side validation first
        // WHY: Skipping validation here would mean the honeypot and hidden fields
        // also get validated. Filter to only user-facing required fields.
        const visibleFields = Array.from(form.querySelectorAll('input:not([type="hidden"]):not([name="_gotcha"]):not([tabindex="-1"]), textarea, select'));
        let isValid = true;
        visibleFields.forEach((field) => {
            if (!validateField(field)) isValid = false;
        });

        if (!isValid) {
            const firstInvalid = form.querySelector('[aria-invalid="true"]');
            if (firstInvalid) firstInvalid.focus();
            return;
        }

        const submitBtn = form.querySelector('[type="submit"]');
        const formStatus = document.getElementById('form-status');

        // Loading state
        form.setAttribute('aria-busy', 'true');
        if (submitBtn) {
            submitBtn.disabled = true;
            // textContent only — SD-4
            submitBtn.textContent = 'Sending...';
        }

        try {
            // WHY: Sending FormData (not JSON) avoids CORS preflight — the browser
            // treats FormData as a "simple request". The Accept header alone
            // gets a JSON response from Formspree without triggering OPTIONS.
            // credentials: 'omit' and mode: 'cors' are explicit for transport hygiene (SD-9).
            const response = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' },
                credentials: 'omit',
                mode: 'cors',
            });

            if (response.ok) {
                // Extract first name for personalised success message
                const nameValue = form.querySelector('#name')?.value ?? '';
                const firstName = nameValue.trim().split(/\s+/)[0] || '';

                // Replace the form element with the success panel (IG-14)
                // WHY: Replace (not hide) prevents resubmission — the form element
                // no longer exists in the DOM after a successful submit.
                const successPanel = buildSuccessPanel(firstName);
                form.replaceWith(successPanel);

                // Announce success to screen readers via the aria-live region (BUG-2)
                // WHY: The success panel is the primary visible UX, but AT users
                // need a live-region announcement because replaceWith() moves focus
                // away from the previous DOM context. The short string is intentional
                // — the panel itself carries the full message once focus lands on it.
                if (formStatus) {
                    formStatus.textContent = 'Message sent.';
                    formStatus.classList.remove('form-status--error', 'form-status--warning');
                    formStatus.classList.add('form-status--success');
                }

                // Move focus to the success panel container for keyboard/AT users
                // WHY: The panel has tabindex="-1" so focus() works reliably.
                // Targeting the inner h2 would silently fail — h2 has no tabindex.
                successPanel.focus();
            } else {
                // Non-2xx — surface generic error only (SD-5)
                // WHY: Never surface response.statusText, response body, or error.message
                // to the DOM — leaks implementation details and creates a CWE-209 vector.
                console.info('[main.js] Form submit failed status:', response.status);

                if (formStatus) {
                    renderGenericError(formStatus);
                }

                // Restore submit button so the user can retry
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                }
                form.removeAttribute('aria-busy');
            }
        } catch (_err) {
            // Network failure — same generic error, no internals in the DOM (SD-5)
            console.info('[main.js] Form submit failed status:', 'network');

            if (formStatus) {
                renderGenericError(formStatus);
            }

            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
            form.removeAttribute('aria-busy');
        }
    });
};

// =============================================================================
// TURNSTILE CALLBACKS
// WHY: Cloudflare Turnstile calls these by name via the data-callback,
// data-expired-callback, and data-error-callback attributes on the widget div.
// They must be window-scoped so Turnstile's iframe can invoke them.
// =============================================================================

window.onTurnstileSuccess = (_token) => {
    const submitBtn = document.querySelector('.contact-form [type="submit"]');
    if (submitBtn) submitBtn.disabled = false;
};

window.onTurnstileExpired = () => {
    const submitBtn = document.querySelector('.contact-form [type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
};

window.onTurnstileError = () => {
    const submitBtn = document.querySelector('.contact-form [type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    // Optionally surface a hint that the widget errored
    const formStatus = document.getElementById('form-status');
    if (formStatus && !formStatus.textContent.trim()) {
        formStatus.textContent = 'The security check encountered an error. Please refresh and try again.';
        formStatus.classList.remove('form-status--warning', 'form-status--success');
        formStatus.classList.add('form-status--error');
    }
};

// =============================================================================
// TURNSTILE LOAD-TIMEOUT
// WHY: Corporate proxies and aggressive privacy extensions can silently block
// challenges.cloudflare.com/turnstile/v0/api.js. Without a timeout, the form
// is permanently stuck on a disabled submit button — a complete deadlock.
// 8 seconds is long enough for slow connections, short enough to avoid
// confusion. The fallback message (LinkedIn + email) IS the escape hatch for
// blocked-Turnstile users — native POST is not reachable while JS is running
// because the submit handler calls event.preventDefault() unconditionally,
// including when the form is submitted via keyboard Enter. (IG-9 / SD-10 / PEN-10)
// =============================================================================

const initTurnstileLoadTimeout = () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    setTimeout(() => {
        if (typeof window.turnstile !== 'undefined') return; // loaded fine

        const formStatus = document.getElementById('form-status');
        if (formStatus) {
            // Build the fallback message with a decoded email link
            formStatus.textContent = '';

            const intro = document.createTextNode(
                'The security check failed to load — this can happen behind corporate firewalls or with some browser extensions. You can reach me directly on '
            );
            formStatus.appendChild(intro);

            const linkedInLink = document.createElement('a');
            linkedInLink.href = 'https://www.linkedin.com/in/robcparker/';
            linkedInLink.target = '_blank';
            linkedInLink.rel = 'noopener noreferrer';
            linkedInLink.textContent = 'LinkedIn';
            formStatus.appendChild(linkedInLink);

            formStatus.appendChild(document.createTextNode(' or by email at '));

            // Assemble email address — same approach as initEmailObfuscation
            const emailLink = document.createElement('a');
            emailLink.href = 'mailto:contact@robcparker.com';
            emailLink.textContent = 'contact@robcparker.com';
            formStatus.appendChild(emailLink);

            formStatus.appendChild(document.createTextNode('.'));
            formStatus.classList.remove('form-status--error', 'form-status--success');
            formStatus.classList.add('form-status--warning');
        }
    }, 8000);
};

// =============================================================================
// EMAIL OBFUSCATION DECODER
// WHY: Assembling the visible email address client-side from split data-user +
// data-domain attributes cuts ~70% of naive email harvesters that scrape the
// raw HTML. The final DOM contains a real mailto: link so copy-paste and
// screen readers work correctly. No-JS users see the fallback text. (AG-4 / PEN-4)
// =============================================================================

const initEmailObfuscation = () => {
    const containers = document.querySelectorAll('[data-user][data-domain]');
    containers.forEach((container) => {
        const user = container.getAttribute('data-user');
        const domain = container.getAttribute('data-domain');
        if (!user || !domain) return;

        const address = `${user}@${domain}`;
        const link = document.createElement('a');
        link.href = `mailto:${address}`;
        // textContent only — SD-4 XSS prevention
        link.textContent = address;

        // Replace the container's entire content with the decoded link
        container.textContent = '';
        container.appendChild(link);
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
    initTurnstileLoadTimeout();
    initEmailObfuscation();
});

// Export utilities for potential future use in page-specific scripts
// WHY: Not using ES modules to avoid requiring a build step or module-aware
// server. Attaching to window makes these accessible from inline scripts.
window.RCP = {
    debounce,
    isInViewport,
};
