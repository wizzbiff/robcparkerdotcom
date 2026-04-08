# Stack Quirks

Platform and tool gotchas discovered through experience. Add entries as you find them.
One-liners preferred — link to the spec or commit where you hit it.


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
