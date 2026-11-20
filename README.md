# Fractionation Simulator

Progressive Web App interface for an oleochemical fractionation simulation workspace.

## Current scope

This repository contains the initial application shell:
- Responsive industrial dark-mode interface
- PWA manifest and service worker
- Dashboard and module navigation
- Draft input form and session-only history

## Important status

**This is a UI/PWA foundation, not a validated process simulator yet.**

The login form is intentionally not connected to an authentication backend. The simulation form only stores a temporary draft in the current browser session. No engineering calculation is performed.

Before operational use:
1. Inspect and map every source workbook formula, named range, lookup table, and Goal Seek setup.
2. Reproduce the calculation logic in a tested calculation engine.
3. Compare outputs against Excel test cases.
4. Implement backend authentication and database access. Never expose spreadsheet IDs, API secrets, or privileged credentials in frontend JavaScript.
5. Obtain company IT approval before publishing proprietary process information to an external cloud service.

## Files

- `index.html` — app shell and pages
- `styles.css` — responsive UI
- `app.js` — navigation and draft-only interactions
- `manifest.webmanifest` — PWA metadata
- `service-worker.js` — static asset caching
- `assets/icon.svg` — application icon

## Local preview

Serve this folder using a local HTTP server. Service workers do not work from `file://`.

## GitHub Pages

GitHub Pages is static hosting. It does not run server-side code. On GitHub Free, Pages generally requires a public repository. A private source repository therefore needs a separate deployment/hosting arrangement, or an eligible GitHub plan. Also remember that a deployed website is publicly reachable unless access control is implemented separately.
