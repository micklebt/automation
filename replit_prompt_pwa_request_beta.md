# PWA "Request" Page — Beta Build

## Prime Directive
Build a **completely separate beta** version of the Request/Contact page, optimized for **Progressive Web App (PWA) use on mobile phones**. This beta must have **ZERO impact** on the existing production forms. It lives at its own route (e.g., `/request-beta` or `request_beta.html`) and shares no state, no form endpoints, and no DOM with the current pages.

---

## Context: What Exists Today (DO NOT MODIFY THESE)

There are **two existing request forms** — leave both untouched:

1. **Desktop "Truck Request" / Contact Form** (`microofficeautomation/index.html`, around line 425):
   - Simple 3-field form: Name, Email, Message
   - Submits via POST to Formspree (`https://formspree.io/f/mblkboaz`)
   - Tracks `generate_lead` event in GA4
   - Minimal styling via shared CSS custom properties

2. **Phone / Mobile "Automation Survey" Form** (`microofficeautomation/micro_office_funnel_react_preview.jsx`):
   - React 18 multi-step wizard (3 steps with progress bar)
   - Step 1: Multi-select checkboxes (Leads & CRM, Scheduling, Documents & e-sign, Approvals & hand-offs, Follow-ups)
   - Step 2: Current tools (text), team size (number), industry (text)
   - Step 3: Name, email, phone → generates a personalized plan preview → "Email My Plan" opens mailto
   - Has A/B variant system: `?variant=a|b` with `localStorage` persistence
   - Uses Tailwind CSS responsive classes, Framer Motion available but lightly used

There is also a **Truck Walkaround Inspection** app (`archives_backup_files/ew_truck_walkaround_qr.html`) that demonstrates good mobile-first UX patterns: card-based UI, chip status indicators, toast notifications, GPS capture, progress tracking, and single-focus checkpoint mode via URL params. Use this as a **reference for mobile UX patterns**, not as a template.

---

## Tech Stack (match this)

- **React 18.2** with JSX
- **Vite 5.4** (build tool)
- **Tailwind CSS 3.4** (utility classes, responsive breakpoints at sm/md/lg)
- **Framer Motion 11** (animations — use meaningfully, not gratuitously)
- **Lucide React** (icon library)
- **Class Variance Authority** (component variants)
- Form backend: **Formspree** for submissions (create a NEW Formspree form ID or use a placeholder `YOUR_FORMSPREE_ID` — do NOT reuse `mblkboaz`)

---

## PWA Requirements

The current site has **no PWA support**. The beta must introduce:

1. **Web App Manifest** (`manifest.json`) with:
   - `name`, `short_name`, `start_url` pointing to the beta page
   - `display: "standalone"`, appropriate `theme_color` (#004aad) and `background_color`
   - Icon set (use placeholder paths, note sizes needed: 192x192, 512x512)

2. **Service Worker** for the beta page only:
   - Cache the beta page shell and critical assets for offline-capable form entry
   - Queue form submissions when offline, replay when back online (basic offline-first pattern)

3. **Install Prompt**: Detect and surface the `beforeinstallprompt` event with a subtle, dismissible banner — not a modal that blocks the form

---

## What the Beta Page Must Do

Collect the **same data** as the existing forms combined, but in a single, fluid experience optimized for **thumb-driven, one-handed phone use**:

- **Contact info**: Name, email, phone
- **Business context**: Industry, team size, current tools
- **Automation focus areas**: Leads & CRM, Scheduling, Documents & e-sign, Approvals & hand-offs, Follow-ups
- **Free-text message/notes** (the "message" field from the simple contact form)
- **Auto-generated plan preview** before submission (keep this — users like it)
- Submit to Formspree (NOT mailto — the mailto pattern is a known friction point on mobile)

---

## UX & Presentation Improvements to Explore

Research and consider these patterns. Implement the ones that genuinely reduce friction or improve the mobile form experience. Skip any that feel like novelty without purpose.

### Input Patterns
- **Bottom-sheet / drawer navigation** instead of traditional page-scroll steps — keeps the active input area in the thumb zone
- **Single-question-per-screen** (typeform-style) with smooth transitions, vs. the current cramped multi-field steps — test which feels better for 5-7 fields
- **Smart input types**: `inputmode="email"` for email, `inputmode="tel"` for phone, `inputmode="numeric"` for team size — triggers the right mobile keyboard
- **Haptic feedback** (`navigator.vibrate`) on step completion or submission — subtle, 50ms pulse, not buzzy
- **Voice input toggle** for the free-text message field using the Web Speech API — many field workers prefer talking over typing on a phone

### Visual & Interaction
- **Progress indicator**: Replace the thin bar with a step-dot indicator or a circular progress ring that also shows "Step 2 of 4" text — more informative on small screens
- **Card-based focus**: Each step renders as a card that animates in (use Framer Motion `AnimatePresence`). Previous steps collapse into summary chips above (like the truck walkaround's chip pattern) so users see what they already entered
- **Skeleton/placeholder states** during transitions so the UI never feels empty or jumpy
- **Floating submit button** fixed to the bottom of the viewport on the final step — always reachable without scrolling
- **Success state**: After submission, show a confirmation card with the plan summary, a "Save to Home Screen" prompt, and a "Call Us" shortcut button — not just a redirect

### Data & Intelligence
- **localStorage draft persistence**: Auto-save form state to localStorage on every change so users don't lose progress if they switch apps or lose connection
- **Industry-aware suggestions**: When the user types an industry, surface 2-3 pre-filled "common automation" chips they can tap to auto-select focus areas (e.g., typing "healthcare" suggests Scheduling + Documents & e-sign + Follow-ups)
- **Inline validation** with clear, friendly error messages positioned below each field (not alerts, not toasts) — validate as the user leaves each field, not on submit
- **Team size → complexity hint**: Show a small contextual note like "Teams of 10+ typically benefit from the Pro tier" when team size exceeds thresholds — subtle upsell without being pushy

### Accessibility & Performance
- **Focus management**: Auto-focus the first input on each new step. Manage focus correctly when navigating back
- **Reduced motion**: Respect `prefers-reduced-motion` — skip Framer Motion animations for users who set this
- **Touch targets**: All buttons and tappable areas must be at minimum 48x48px (per WCAG)
- **Color contrast**: Maintain WCAG AA contrast ratios. The existing orange-on-white (#f97316 on #fff) is borderline — verify and adjust if needed
- **Form should be fully usable without JavaScript** as a progressive enhancement goal (Formspree supports basic POST)

---

## File Structure

Create these files (all new, no modifications to existing files):

```
microofficeautomation/
  request-beta/
    index.html          ← Entry point, loads the React app
    manifest.json       ← PWA manifest
    sw.js               ← Service worker
    RequestBeta.jsx     ← Main React component
    components/         ← Sub-components (StepCard, ProgressRing, SummaryChip, etc.)
    styles/             ← Any additional CSS if Tailwind alone isn't sufficient
```

---

## Brand & Design Tokens (use these)

```
Primary:        #004aad (dark blue)
Primary Dark:   #00307d
Primary Light:  #2E5BBA
Accent:         #ffc107 (gold)
Accent Action:  #f97316 (orange — existing CTA color)
Success:        #10b981
Danger:         #ef4444
Font:           system-ui, -apple-system, sans-serif
Border Radius:  12px (cards), 10px (buttons), 999px (chips/pills)
Shadow:         0 1px 6px rgba(0,0,0,.06) (cards)
```

---

## What NOT to Do

- DO NOT modify any existing files (`index.html`, `micro_office_funnel_react_preview.jsx`, `shared/*`, etc.)
- DO NOT reuse the existing Formspree form ID
- DO NOT add a framework or dependency not already in `package.json` (React, Tailwind, Framer Motion, Lucide, CVA are all fair game)
- DO NOT build a full SPA router — this is a single-purpose page
- DO NOT add a chatbot, AI assistant widget, or conversational UI — the form itself is the interface
- DO NOT add dark mode — out of scope for this beta
- DO NOT over-animate. Transitions should feel quick and purposeful (200-300ms), not decorative

---

## Success Criteria

1. Page loads and is interactive in under 2 seconds on a 3G throttled connection
2. Full form completion is possible with one thumb on a phone held in one hand
3. Form state survives app-switching, closing the browser tab, and losing network
4. Submission works offline (queued) and online (immediate)
5. The PWA install flow works on Chrome Android and Safari iOS
6. All existing pages and forms remain completely untouched
7. Lighthouse PWA score of 90+ and Accessibility score of 90+
