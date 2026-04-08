# Stack Quirks

Platform and tool gotchas discovered through experience. Add entries as you find them.
One-liners preferred — link to the spec or commit where you hit it.

## Vercel

- **`routes` conflicts with `headers`, `rewrites`, `redirects`, `cleanUrls`, `trailingSlash`.**
  If both are present in vercel.json, production deployments fail silently — no build error,
  just no deployment triggered. Discovered in SPEC-016 (root cause: SPEC-015 added `headers`
  while SPEC-010 had `routes`). Fix: remove `routes`, use `rewrites` instead.

- **Silent deployment failures look like broken auto-deploy.** If Vercel config validation
  fails, the deployment is rejected before build — it never appears in the dashboard.
  Always check Vercel deployment logs for the specific commit, not just the project overview.

## GitHub Actions

- **`deployment_status` webhook requires Vercel GitHub App.** Post-deploy smoke tests
  trigger on this event. If Vercel's GitHub integration isn't connected, the webhook
  never fires and smoke tests silently don't run.

## CSS

- **Desktop CSS leaks into mobile breakpoints via specificity.** When a desktop rule
  like `.service-hero .hero-content { max-width: 600px }` has higher specificity than
  the generic mobile override `.hero-content { max-width: 100% }`, the desktop value
  wins even inside a media query. Every desktop rule with a compound selector needs a
  matching compound override in the mobile breakpoint. Discovered across PRs #44-46:
  hero order, max-width, and grid layout all needed explicit service-hero overrides.

- **`backdrop-filter` requires `-webkit-` prefix for Safari/iOS.** Always write both:
  `-webkit-backdrop-filter: blur(Xpx);` then `backdrop-filter: blur(Xpx);`.
  Without the prefix, blur effects silently don't render on Safari/iOS.
  Playwright WebKit on Linux does NOT catch this — it handles `backdrop-filter`
  without the prefix. Discovered in production via VS Code Edge Tools linter.

## Astro / ESM

- **`"type": "module"` in package.json breaks CommonJS test files.** Astro scaffolding
  adds `"type": "module"` but Playwright configs and test files use `require()`. Astro
  doesn't need `"type": "module"` — its config uses `.mjs` and source files are compiled
  by Vite. Remove it and keep config files as `.mjs`. Discovered in SPEC-023.

## Formspree / Serverless Forms

- **Vercel Forms doesn't exist (as of 2026-02).** SPEC-019 originally targeted "Vercel Forms"
  but the feature wasn't available. Pivoted to Resend API via Vercel serverless function.
  Always verify a platform feature exists before writing a spec around it.

- **FormData vs JSON in serverless functions.** HTML forms POST as `application/x-www-form-urlencoded`.
  Vercel serverless functions receive this as a parsed object in `req.body` — no manual
  parsing needed if you set the right content type header on the response.
