# SPEC-014: Contact Form Intent Routing

**Status:** Spec Gate approved 2026-04-27
**Tier:** Trivial (confirmed; see Tier Selection below)
**Author:** PM-Spec Agent (derived from `robcparker_com_audit.md` action #5, audit lines 312-314)
**Date:** 2026-04-25 (Spec Gate approved 2026-04-27)
**Branch:** `spec/SPEC-014-contact-form-intent-routing` (to be created at implementation start)

---

## Summary

Add a single required `<select>` field — *"Type of inquiry"* — to the contact form on `contact.html`, with five options: Hiring opportunity, Advisory inquiry, Networking, Press or speaking, Other. The field gives Rob immediate triage signal on every inbound message and lets him set up reply templates per type. Field value flows through the existing Formspree submission path so the value reaches Rob's inbox without changing any backend wiring. Additionally, the form's hidden `_subject` field is updated dynamically based on the chosen intent so Gmail filters can key off the subject line directly.

## Context

The audit (`robcparker_com_audit.md` Dimension 2 lines 55-57 and Prioritized Action #5 lines 312-314) flagged that the current contact form is one bucket — name, email, message — with no way to differentiate "I have a VP role to discuss" from "I'd like to hire you for a 4-week advisory engagement" from "Can we get coffee." A `<select>` field gives Rob the triage signal in 30-60 minutes of effort.

The form was built in SPEC-004 with Formspree as the backend (form ID `mvzdrbnk`, endpoint `https://formspree.io/f/mvzdrbnk`) and a fetch-based AJAX submission path in `js/main.js` that posts `FormData` per the established pattern (`governance/stack-quirks.md` "Third-Party Services"). Adding a named `<select>` field is mechanically additive — the field shows up as a key/value pair in the FormData and lands in Rob's inbox without any backend change.

**Backend verification (SPEC-Gate clarification — see below):** the form posts to `https://formspree.io/f/mvzdrbnk` (`contact.html:115`). `js/main.js` confirms this is a real, working Formspree integration (lines 166-170, 317-415). The recipient inbox was migrated from `rob.c.parker@gmail.com` to `contact@robcparker.com` in SPEC-007 R6, both at the Formspree dashboard and in any in-repo references. **Formspree IS the live backend; the placeholder framing in `project_third_party_tbd.md` is stale memory.** This means R3 (validation that the value reaches Rob's inbox) requires no backend reconfiguration, but does require a single submission test against the live Formspree endpoint at QA Gate.

## Requirements

### R1: Add the select field markup

**File:** `contact.html`
**Location:** insert a new `<div class="form-field">` block between the existing email field (`contact.html:138-151`) and the message field (`contact.html:154-166`). The intent field sits between Email and Message because (a) it logically pairs with name + email (intake metadata) and (b) it gates how the user composes the Message.

**Markup:**
```html
<!-- Intent field — SPEC-014 R1 -->
<div class="form-field">
    <label class="form-label" for="intent">Type of inquiry</label>
    <select
        class="form-select"
        id="intent"
        name="intent"
        required
        aria-describedby="intent-error"
    >
        <option value="" disabled selected>Choose an option…</option>
        <option value="hiring">Hiring opportunity</option>
        <option value="advisory">Advisory inquiry</option>
        <option value="networking">Networking</option>
        <option value="press_or_speaking">Press or speaking</option>
        <option value="other">Other</option>
    </select>
    <span id="intent-error" class="form-error" hidden></span>
</div>
```

**Notes:**
- `name="intent"` — Formspree uses the `name` attribute as the key in the email it sends. So Rob's inbox will receive a line `intent: hiring` (or whichever value) on each submission.
- `required` — HTML5 native validation forces the user to pick a non-default option before submit. The browser's native message ("Please select an item in the list") fires on submit.
- The first option `<option value="" disabled selected>Choose an option…</option>` provides the placeholder behavior. `disabled` prevents the empty value from being a valid selection; `selected` makes it the default display.
- `aria-describedby="intent-error"` mirrors the pattern used by the Name and Email fields (`contact.html:132`, `:148`). The companion `<span id="intent-error" class="form-error" hidden>` is the live region for any client-side validation message.
- `class="form-select"` is a NEW CSS class. The existing form CSS has `.form-input` and `.form-textarea` but no `.form-select`. R5 adds the styling.

### R2: Wire the select value into client-side validation

**File:** `js/main.js`
**Location:** the existing form-validation block in `js/main.js` validates `name`, `email`, and `message`. Add intent to the validation set.

**Changes:**
- In whichever validation function asserts required-field presence (the spec author locates the function during implementation — likely a `validateField(input)` helper or inline check inside the submit handler), add intent to the list of required fields. The check is mechanically: `if (intent.value === "") show "Please select a type of inquiry"`.
- The error message string: `"Please select a type of inquiry."` (matching the project's existing terse-but-friendly tone and the new field label).
- On valid selection, the error is cleared in the same way the name/email/message fields clear.

**Important:** the HTML5 `required` attribute on the `<select>` element provides browser-native validation as a backstop. The JS validation is for consistent UX with the other fields (e.g., showing `.form-error` text rather than the browser's bubble). Both layers exist together, same pattern as the other fields.

### R3: Verify the value flows through Formspree

**No code change.** The existing `js/main.js` submit handler at line ~317-360 sends the entire form via `new FormData(form)` (line ~355). Because the new `<select>` has a `name` attribute, its value is automatically included in the submitted FormData with no further wiring. This is the FormData-not-JSON pattern documented in `governance/stack-quirks.md` ("Third-Party Services").

**Verification at QA Gate:**
- Implementer submits a test message via the live form (selecting one option, e.g., "Networking") to confirm:
  - The Formspree dashboard's submission view shows the `intent` field with the chosen value.
  - The notification email delivered to `contact@robcparker.com` includes `intent: networking` in the body.
- This is the only end-to-end test. No automation; manual verification at QA.

### R4: Update the contact-page hero copy if needed

The current contact-hero subheadline at `contact.html:84` mentions "Director or VP of Engineering role" and "Advisory inquiries." With the new intent field, the copy could be tightened to lean on the form to do triage rather than stating it in prose. **Recommended:** no copy change in this spec. The contact-page subheadline is being rewritten in SPEC-011 R4 (full-time-search lead, advisory tail). SPEC-014 should not also rewrite that line — coordination risk if both ship in the same window.

If SPEC-011 has already shipped, SPEC-014 leaves the SPEC-011 copy untouched. The intent field is a concrete second triage layer below the rewritten subheadline.

### R5: Style the new `.form-select` class

**File:** `css/style.css`
**Approach:** add `.form-select` rules that inherit the existing `.form-input` styling for visual consistency (border, padding, font, focus ring), with the addition of a small CSS-arrow indicator on the right side (modern OS-native browser dropdown chrome is acceptable at this tier; no custom dropdown component).

**Recommended rule (final form decided by `frontend-developer` at implementation; `ui-designer` reviews if it doesn't trivially mirror `.form-input`):**

```css
.form-select {
    /* WHY (SPEC-014 R5): inherits .form-input visual treatment for consistency
       with the other form fields. Native browser dropdown chrome is acceptable
       at this scale; no custom dropdown introduced. */
    appearance: auto;
    /* If `.form-input` rules are reusable, declare .form-select alongside the
       existing .form-input selector list rather than duplicating the rule. */
    /* ... border, padding, font, focus, etc. matching .form-input ... */
}

.form-select:focus {
    /* match .form-input:focus */
}
```

**Implementation note:** the cleanest approach is to add `.form-select` to every existing `.form-input` selector list in `css/style.css` so the two share styling without duplication. `architect-reviewer` confirms approach. SPEC-014 must NOT introduce a new design language, new color, or new font — pure visual reuse.

**Mobile responsive:** the native dropdown is touch-friendly by default on iOS / Android. No additional responsive rules needed.

### R6: Honeypot and Turnstile compatibility

The form has two anti-spam layers: a honeypot field (`contact.html:172-180`) and Cloudflare Turnstile (`contact.html:186-192`). Both are field-name-based:

- The honeypot field is `name="_gotcha"`. Adding `name="intent"` does not collide.
- Turnstile generates a `cf-turnstile-response` field via its widget. No collision.

R6 has no implementation work — it's a verification step. Implementer confirms post-edit that:
- `_gotcha` field still inert (filled bots rejected at Formspree's side).
- Turnstile token still required for submit (existing IG-8 from SPEC-004 is preserved).
- New `intent` field neither bypasses nor breaks either layer.

### R7: Dynamic `_subject` based on intent value

**Files:** `contact.html`, `js/main.js`
**Goal:** the Formspree-delivered email's subject line varies by selected intent so Rob's Gmail filters can key off the subject directly (rather than parsing the body for `intent: hiring`).

**Subject map (one line each):**

| `intent` value | `_subject` |
|----------------|------------|
| `hiring` | `New hiring opportunity from robcparker.com` |
| `advisory` | `New advisory inquiry from robcparker.com` |
| `networking` | `New networking message from robcparker.com` |
| `press_or_speaking` | `New press/speaking inquiry from robcparker.com` |
| `other` | `New message from robcparker.com` |

**HTML change:** the existing `_subject` hidden input at `contact.html:119` keeps its current value as a fallback (matches the `other` row above) so the form still has a sensible default if JS is disabled.

**JS change in `js/main.js`:** add a `change` event listener on the `#intent` `<select>` that updates the `_subject` hidden input's `value` according to the map above. Implementation outline (~10 lines, exact wiring decided by `frontend-developer`):

```js
// WHY (SPEC-014 R7): Gmail filters key off subject lines, so we vary the
// _subject field by selected intent. Falls back to the static value if JS
// is disabled — Formspree still delivers with the default subject.
const SUBJECT_BY_INTENT = {
    hiring: "New hiring opportunity from robcparker.com",
    advisory: "New advisory inquiry from robcparker.com",
    networking: "New networking message from robcparker.com",
    press_or_speaking: "New press/speaking inquiry from robcparker.com",
    other: "New message from robcparker.com",
};

const intentSelect = document.getElementById("intent");
const subjectInput = document.querySelector('input[name="_subject"]');
if (intentSelect && subjectInput) {
    intentSelect.addEventListener("change", () => {
        const next = SUBJECT_BY_INTENT[intentSelect.value];
        if (next) subjectInput.value = next;
    });
}
```

**Notes:**
- **Belt-and-suspenders:** the submit handler may also re-apply the subject map immediately before sending FormData, in case the user opens DevTools and overrides the field — `frontend-developer` decides whether the re-apply is worth the extra few lines. Not load-bearing; the `change`-listener path is the primary mechanism.
- **No-JS fallback:** if a user has JS disabled, the subject stays at the static default and Formspree still delivers. Acceptable degradation.
- **Subject string voice:** marketing-copywriter is invoked to confirm the five subject lines fit Rob's inbox-triage voice. The drafts above are the recommended baseline; copywriter may tighten.

## Out of Scope

- **Backend reply-template setup.** Setting up Gmail / contact@ inbox filters and reply templates per intent value is Rob's operator workflow, not site code. Captured as an operator-level note (not in `OPERATOR-TODOS.md` because it's an inbox-management workflow Rob configures privately).
- **Formspree dashboard configuration.** No changes — the new field flows through automatically via FormData.
- **Renaming or restructuring the existing fields.** Name, Email, Message stay as-is.
- **Conditional fields based on intent value** (e.g., showing a "Company" field only for Hiring). Out of scope; YAGNI.
- **Analytics / event tracking** on intent value. Out of scope; project has no analytics yet.
- **Deletion of the contact-page hero copy update** (handled in SPEC-011 R4).
- **Routing different intents to different recipient inboxes** (e.g., advisory inquiries to a separate address). Formspree supports this via dashboard rules, but it's not in scope here.
- **A "How did you hear about Rob?" follow-up question.** Out of scope; would dilute the triage value of the single intent question.

## Dependencies

- **SPEC-004 (complete):** built the contact form, Formspree integration, honeypot, Turnstile. SPEC-014 layers onto that foundation.
- **SPEC-007 (complete):** SPEC-007 R6 migrated the recipient inbox from gmail to `contact@robcparker.com` at the Formspree dashboard. R3's verification step assumes that change is in place.
- **SPEC-009 (complete):** design tokens used by R5 styling.
- **SPEC-011 (recommended ships first):** SPEC-011 R4 rewrites the contact-page hero subheadline. SPEC-014 does not touch that line; coordinating sequence avoids merge conflicts.
- **No new third-party services.** Formspree integration unchanged. No new API keys.

## Non-Functional Requirements

### Accessibility

- `<label for="intent">` is associated with the `<select id="intent">` — screen readers announce "Type of inquiry" when the field receives focus.
- `aria-describedby="intent-error"` and the companion `<span id="intent-error" class="form-error" hidden>` mirror the existing field pattern; error messages are announced when shown.
- The first `<option>` is `disabled selected value=""` — screen readers announce "Choose an option…" as the default state, prompting selection.
- Keyboard navigation: Tab focuses the select, Space / Enter / arrow keys open and navigate options. All native; no custom JS needed.
- Visible focus ring: inherits `.form-input:focus` treatment via R5's selector co-listing.

### Performance

- One additional DOM element. Negligible.
- No new fonts, no new CSS files, no new JS files. Existing form-validation logic extended by one field.

### SEO

- Form fields are not crawled meaningfully by search engines. The field name `intent` and option labels appear in HTML source but do not affect SEO posture.

### Security

- No new attack surface. The new field is a finite-set `<select>` — input is constrained to five string values plus the empty default.
- Server-side, Formspree accepts arbitrary form fields; no schema-validation guarantee. A malicious actor who modifies the form's HTML in their browser could submit `intent=arbitrary_string`. Acceptable risk: the value is a triage hint, not a security boundary. The existing honeypot + Turnstile pair handle bot traffic; intent value is just signal.
- No PII tier escalation. The intent field collects a categorical value, not new PII. Per `governance/tier-selection-guidelines.md` PII handling note, this is a thin processor relationship — Formspree receives the field and delivers it; no local storage. Trivial tier holds.

### Responsive

- Native dropdown is responsive by default. iOS/Android render touch-friendly controls. No new breakpoint work.

## Acceptance Criteria

### Markup and validation

- **Given** the contact page is rendered, **When** the form is read top to bottom, **Then** a `<select id="intent" name="intent" required>` field is present between Email and Message.
- **Given** the select is rendered, **When** read by a screen reader, **Then** the label "Type of inquiry" is announced and the default option "Choose an option…" is announced as the current value.
- **Given** the user opens the dropdown, **When** the option list is read, **Then** five real options are present in order: Hiring opportunity, Advisory inquiry, Networking, Press or speaking, Other.
- **Given** the user submits the form without selecting an option, **When** submit is attempted, **Then** the form does not submit and an inline error message ("Please select a type of inquiry.") appears in the `#intent-error` span (and the browser's native validation also fires as a backstop).
- **Given** the user selects any non-default option, **When** the value changes, **Then** any previous error message is cleared.

### Submission flow

- **Given** the user has selected "Networking" and filled name/email/message, **When** the form is submitted, **Then** the FormData payload includes `intent=networking`.
- **Given** Formspree receives the submission, **When** the notification email is delivered to `contact@robcparker.com`, **Then** the email body includes the line `intent: networking` (or whichever value was selected).
- **Given** the Formspree dashboard's submission view, **When** the submission is inspected, **Then** the `intent` field is shown with the selected value.

### Anti-spam compatibility

- **Given** a bot fills the honeypot `_gotcha` field, **When** the form is submitted, **Then** Formspree drops it as spam (existing SPEC-004 behavior unchanged).
- **Given** a user has not solved the Turnstile challenge, **When** they attempt to submit, **Then** the submit button stays disabled (existing SPEC-004 IG-8 behavior unchanged).
- **Given** a real user with valid Turnstile + valid intent + valid name/email/message, **When** they submit, **Then** the message arrives.

### Dynamic subject (R7)

- **Given** the user selects "Hiring opportunity", **When** the `_subject` hidden input is inspected, **Then** its value is `New hiring opportunity from robcparker.com`.
- **Given** the user selects each of the five intent options in turn, **When** the `_subject` hidden input is inspected after each change, **Then** its value matches the R7 subject map.
- **Given** the user submits the form with intent="advisory", **When** the email arrives at `contact@robcparker.com`, **Then** the subject line is `New advisory inquiry from robcparker.com`.
- **Given** JS is disabled in the browser, **When** the form is submitted, **Then** the email's subject line falls back to the static `_subject` default (the `other`-equivalent baseline) and Formspree still delivers the message.

### Styling consistency

- **Given** the rendered form, **When** the user visually compares the new `<select>` field to the Name and Email fields, **Then** the visual treatment (border, padding, focus ring, font) matches the `.form-input` treatment.
- **Given** the rendered form on mobile (≤480px), **When** the user taps the select, **Then** the OS-native dropdown opens with full touch interaction.

## Tier Selection — Trivial (proposed)

**Tier:** Trivial. Per `governance/tier-selection-guidelines.md`:

| Trigger | Applies? | Notes |
|---------|----------|-------|
| Authentication / authorization changes | No | None |
| Payment or financial data | No | None |
| PII / PHI handling | **No (Trivial holds).** New field collects a categorical "intent" value, no new identity data. Existing processor-only Formspree relationship per `governance/tier-selection-guidelines.md` PII Handling note. | |
| New external API integration | No | Formspree integration is unchanged; SPEC-014 adds a field to an existing form. |
| Database schema change | No | None |
| Core domain model modification | No | Form field addition only. |
| Framework or platform migration | No | None |
| First implementation of new architectural pattern | No | `.form-select` mirrors `.form-input` — pattern reuse. |

**Decision flow:**
1. Does it change any code paths? Yes — but minor (HTML markup + small JS validation extension + small CSS rule).
2. Does it follow existing patterns? Yes — `.form-input` pattern reused; SPEC-004 form-validation pattern extended by one field.
3. Does it affect multiple components or introduce new patterns? No — single page, single form, single new field, additive CSS class.
4. Does it involve auth, payments, PII, or core domain models? No.

**Tier rationale:** Trivial holds. SPEC-014 is one new form field with HTML5 + existing-JS-pattern + existing-CSS-pattern reuse. The Formspree backend is verified live and requires no reconfiguration. CLAUDE.md explicitly lists "Styling/layout changes" and "New interactive feature" as borderline — this is a structured form-field addition that the SPEC-004 architecture already accommodates. Trivial is the right tier.

**Note on the original-prompt ambiguity:** the task brief raised whether this should escalate to Standard if it touches "form-handler integration." After verifying `js/main.js:166-170, 317-360` and `governance/stack-quirks.md` "Third-Party Services" entry, the form handler is a working Formspree-backed AJAX path. SPEC-014 changes nothing about that handler — it adds one field to the FormData payload, which Formspree forwards. No integration work. Trivial holds.

## Open Questions — Spec Gate resolutions

All questions resolved at Spec Gate on 2026-04-27.

| # | Question | Resolution |
|---|----------|------------|
| Q1 | Backend handler verification — Formspree placeholder or live? | **Formspree IS the live backend** with form ID `mvzdrbnk`. Verified at `contact.html:115` and `js/main.js:166-170, 317-360`. Recipient inbox is `contact@robcparker.com` per SPEC-007 R6. The "TBD" memory note is stale and is captured for cleanup as an operator todo (Q7). |
| Q2 | Field placement — between Email and Message? | **Between Email and Message** (default). Pairs with intake metadata; gates how the user composes the message body. |
| Q3 | Field copy — "What's this about?" vs. "Type of inquiry"? | **"Type of inquiry"** (Rob override). Reads more formally for an executive-candidate site. R1 markup, R2 error string, and ACs reflect this. |
| Q4 | Option order — Hiring → Advisory → Networking → Press/speaking → Other? | **Audit order** (default). Hiring first matches SPEC-011 FT-search posture; Advisory second; Other last. |
| Q5 | "Other" → free-text follow-up field? | **No** (default). Message body is the free-text channel; second free-text is friction without payoff. |
| Q6 | Dynamic `_subject` per intent value? | **Yes** (Rob override). R7 added — ~10 lines of JS that update the hidden `_subject` on `change` per a five-row map. Gives Gmail filters a clean subject-line signal out of the box. Static `_subject` retained as no-JS fallback. |
| Q7 | Memory hygiene — delete the stale `project_third_party_tbd.md` Formspree placeholder framing in this spec? | **No** (default). Captured as an operator todo to be batched at the end of the SPEC-010-014 family. SPEC-014 surfaces the discrepancy; the memory edit is one more deliberate cleanup step. |

## Effort Comparison

| | AI-Assisted | Human Solo |
|---|---|---|
| Spec creation | ~30 minutes wall-clock (audit pre-read; verification of contact form backend in `contact.html` + `js/main.js`; tier checklist; ambiguity surfacing) | 2–4 hours (PM would: research current form integration, decide field placement and option ordering, write Given/When/Then ACs, verify Formspree pass-through behavior empirically, surface tier ambiguity). |
| Assumptions | Formspree backend is live (verified). SPEC-009 design tokens stable. SPEC-011 R4 ships before or after this spec without conflict (SPEC-014 doesn't edit the contact-hero subheadline). |

---

## Spec-Gate Approval

**Decision:** Approved 2026-04-27
**Gate owner:** Rob Parker
**Approval note:** All seven requirements (R1 markup with "Type of inquiry" label, R2 client-side validation, R3 Formspree pass-through verification, R4 hero copy untouched, R5 `.form-select` styling, R6 anti-spam compatibility, R7 dynamic `_subject` per intent) ship in this spec. Q1–Q7 resolutions captured above. Tier remains Trivial despite R7 — the dynamic `_subject` is ~10 lines of additive JS that mirror the existing form-handler pattern; no integration change.

### Structured Review Checklist

- [x] Business intent confirmed (audit-derived contact-form intent triage + dynamic subject for Gmail filters)
- [x] Scope boundaries clear (single field + dynamic subject map; reply-template setup is operator workflow)
- [x] Acceptance criteria testable (Given/When/Then; QA submits test messages per intent option to verify subject + body pass-through)
- [x] Dependencies identified (SPEC-004 / SPEC-007 / SPEC-009; SPEC-011 sequencing noted)
- [x] Tier appropriate (Trivial — single form field + small additive JS for dynamic subject, all patterns reused, no integration change)
- [x] No mandatory escalation triggers (no auth, payments, new PII tier, integrations, DB, framework)
- [x] **Third-party features verified:** Formspree FormData pass-through behavior verified via `governance/stack-quirks.md` "Third-Party Services" entry and direct read of `js/main.js:317-360`. New named form field auto-flows; `_subject` field is a documented Formspree convention.
- [x] **Memory hygiene flag:** `project_third_party_tbd.md` Formspree placeholder framing is stale. Captured for operator todo.
- [x] Decision Rationale section — N/A at Trivial tier (per `pm-spec.md`); rationale folded into per-section text where load-bearing.

---

*Drafted 2026-04-25 from `robcparker_com_audit.md` Prioritized Action #5 (audit lines 312-314) and Dimension 2 (lines 55-57).*
