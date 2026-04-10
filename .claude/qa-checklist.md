# QA Checklist for RobCParker Website

## Pre-Commit Checks

### Test Coverage Impact
- [ ] Identify test files covering modified/removed features
- [ ] Update or remove affected test files
- [ ] Verify no orphaned test fixtures or mocks
- [ ] **Start local dev server** (`npx serve -l 3000 .`) before running Playwright tests
  - If 188+ tests fail but visual regression passes, the server is not running (see GAP-021-001)
- [ ] Run full test suite locally before pushing (`npm test`)

### Forms
- [ ] **Test in actual browser** (not just curl) before marking QA complete
- [ ] Test with both automated tests (Playwright mocked) AND manual browser testing
- [ ] Verify Content-Type headers match what API expects (FormData vs JSON vs URL-encoded)
- [ ] Curl test passes with actual API endpoint (if applicable)
- [ ] Test form submission on local/staging environment
- [ ] Verify third-party service URLs match documented format (e.g., Formspree)
- [ ] Confirm form data is actually received (check email/dashboard)
- [ ] Test validation messages (required fields, email format)
- [ ] Test error handling (network failure, service down)
- [ ] **Verify deployment completed via Cloudflare dashboard BEFORE asking user to test**

### Links
- [ ] All internal links resolve correctly
- [ ] External links have `target="_blank"` and `rel="noopener noreferrer"`
- [ ] LinkedIn URLs are correct (personal vs company)
- [ ] No broken anchor links

### Assets
- [ ] No double file extensions (e.g., `.jpg.jpg`)
- [ ] Images load correctly
- [ ] Favicon displays

### Accessibility
- [ ] Skip link works
- [ ] Hamburger menu has ARIA attributes
- [ ] Form labels are associated with inputs
- [ ] Color contrast meets WCAG AA

### Security
- [ ] CSP header allows all required resources
- [ ] No sensitive data in frontend code
- [ ] External services are allowlisted in CSP `connect-src`
- [ ] **API keys: Never ask users for keys directly - instruct to set in environment variables**
- [ ] Documentation shows placeholder values only, never real keys
- [ ] .env.example created with clear placeholders (if applicable)

### Third-Party Integrations
- [ ] Third-party feature claims verified in vendor documentation
- [ ] Documentation link included in spec for feature verification
- [ ] Architecture review completed BEFORE implementation starts (cannot be skipped for integrations)

### Deployment Configuration
- [ ] Run visual regression tests locally if any UI/script changes
- [ ] Test staging deployment before marking complete
- [ ] Architecture review includes deployment config impact (observability tools, analytics, etc.)
- [ ] CSP and routing rules verified for new scripts
- [ ] Verify Cloudflare Pages deployment completes successfully after merge

## Post-Deploy Checks

### Critical Path Testing
1. [ ] Load homepage - verify no console errors
2. [ ] Navigate to all pages via menu
3. [ ] Submit contact form with test data
4. [ ] Verify form submission received
5. [ ] Test on mobile (hamburger menu)

### Third-Party Integrations
- [ ] Formspree: Submit test, confirm email received
- [ ] Google Fonts: Verify fonts load
- [ ] CalendarBridge: Test booking link

## Form Change Specific

When modifying contact forms:
1. Check service documentation for correct URL format
2. Test submission locally if possible
3. After deploy, submit a real test message
4. Verify you receive the submission before marking complete
