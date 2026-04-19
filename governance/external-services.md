# External Services Inventory

This file is the canonical inventory of third-party services the site depends on.
Update it whenever a new service is introduced or an existing one is changed.
No secret values may appear here. Secret values live in the respective service dashboards only.

Established in SPEC-004.

---

## Service Inventory

| Service | Purpose | Public Value Location | Secret Value Location | Rotation Procedure |
|---------|---------|----------------------|-----------------------|-------------------|
| **Formspree** | Contact form backend — receives form submissions and delivers them to Rob's inbox. No storage in our systems; Formspree is a pass-through processor. | Form ID (the `{id}` in `https://formspree.io/f/{id}`) is in `js/main.js` as `FORMSPREE_FORM_ID` | Formspree account credentials (email + password). The Turnstile Secret Key is also pasted into the Formspree form settings dashboard — never in this repo. | Create a new form in Formspree dashboard, copy new form ID, replace `FORMSPREE_FORM_ID` in `js/main.js`, deploy. Old form can be archived. Notify if recipient email needs to change at the same time. |
| **Cloudflare Turnstile** | Bot defense on the contact form. Managed-mode widget; Cloudflare decides interactive vs. invisible challenge. The Formspree × Turnstile native integration (announced Nov 2025) verifies the token server-side inside Formspree — no custom verification code required. | Site Key is in `js/main.js` as `TURNSTILE_SITE_KEY` and in `contact.html` as `data-sitekey` on the widget div | Secret Key is pasted into the Formspree form settings → CAPTCHA → Cloudflare Turnstile. Never committed to this repo. | Create a new Turnstile widget in Cloudflare dashboard, copy new Site Key (public) and Secret Key (secret). Replace `TURNSTILE_SITE_KEY` in `js/main.js` and `data-sitekey` in `contact.html`. Paste new Secret Key into Formspree dashboard. Verify with a test submission before deploying. |

---

## Never Committed to This Repository

The following values must never appear in any file, commit message, PR description,
or AI agent prompt associated with this repository:

- Turnstile Secret Key (the value that goes in Formspree dashboard → CAPTCHA settings)
- Formspree account password
- Any value that begins with a pattern matching the `.gitignore` defensive rules
  (`.env`, `.env.*`, `*.secret`, `secrets/`, `*.key`)

If exposure is suspected, rotate immediately in the respective dashboards:
1. Cloudflare dashboard → Turnstile → rotate the Secret Key
2. Update the pasted Secret Key in Formspree dashboard
3. Optionally create a fresh Formspree form (new form ID) if the form endpoint itself was exposed

---

## Placeholder Strings (pre-deploy)

During development, the codebase uses these exact placeholder strings instead of real values.
Run `git grep '__REPLACE_WITH_'` before any deploy to confirm all four sites are swapped:

- `js/main.js` — `FORMSPREE_FORM_ID = '__REPLACE_WITH_FORMSPREE_FORM_ID__'`
- `js/main.js` — `TURNSTILE_SITE_KEY = '__REPLACE_WITH_TURNSTILE_SITE_KEY__'`
- `contact.html` — `action="https://formspree.io/f/__REPLACE_WITH_FORMSPREE_FORM_ID__"` (form fallback action)
- `contact.html` — `data-sitekey="__REPLACE_WITH_TURNSTILE_SITE_KEY__"`

See the Pre-Deploy Configuration Checklist in `specs/SPEC-004-contact-page.md` for the full
provisioning steps (create Formspree form, create Turnstile widget, paste Secret Key, test).
