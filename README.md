# HATCIL Website

**HATCIL** is a corporate institutional website focused on presenting the organisation, its services, values, team, partners, and contact information through a polished responsive web experience.

## 🌐 Project

- **Repository:** https://github.com/Anthony-1532/hatcil-website
- **Primary entry point:** `index.html`

> This README documents the implementation currently present in the repository. It does not assume backend functionality or framework infrastructure that is not part of the project.

---

## ✨ What the Website Contains

The current site is structured as a single-page corporate website with sections for:

- Hero / company introduction
- Key organisation statistics
- Services
- About / company information
- Values
- Team
- Partners
- Contact information
- Contact form
- Footer

The page is designed around a corporate visual language using dark navy, cyan, and gold accents.

---

## 🧱 Technology Stack

The project is intentionally lightweight and does **not** use React, Next.js, Vue, or another frontend framework.

### Core

- HTML5
- CSS3
- JavaScript

### Styling

- Custom CSS
- Tailwind CSS CDN
- Responsive CSS media queries
- CSS custom properties for the site's colour system

### Animation

- GSAP 3.12.2
- GSAP ScrollTrigger
- `motion.js` — restrained motion layer inspired by spring/crossfade interaction patterns

### Typography

- Montserrat via Google Fonts
- System font fallbacks for body text

### Package tooling

The repository contains a `package.json` and Bun lockfile for the project's frontend tooling/dependencies.

---

## 📁 Project Structure

```text
hatcil-website/
├── index.html          # Main website document and page structure
├── styles.css          # External styling and responsive rules
├── motion.js           # Progressive motion/interaction layer
├── assets/             # Local images and other static assets, when present
├── package.json        # Development dependencies/scripts
├── bun.lock            # Bun dependency lockfile
└── README.md           # Project documentation
```

The exact asset structure may change as the website evolves.

---

## 🎨 Design System

The site uses CSS custom properties to keep its primary visual language consistent.

```css
--primary-color: #0A1931;
--accent-color: #00A8E8;
--secondary-color: #FFC947;
--text-light: #F5F5F5;
--text-dark: #1F2937;
```

The primary design direction is:

- **Navy:** corporate foundation and navigation
- **Cyan:** interactive/accent elements
- **Gold:** highlights and calls to action
- **White/light surfaces:** readable content areas

---

## 📱 Responsive Design

The website includes responsive behaviour for smaller screens.

The mobile implementation is intended to address:

- Collapsed navigation
- Mobile menu interaction
- Reduced hero typography
- Responsive hero spacing
- Single-column content layouts
- Mobile-friendly service cards
- Responsive team cards/images
- Full-width or appropriately sized mobile buttons
- Responsive contact forms
- Prevention of horizontal page overflow
- Small-screen spacing adjustments
- Reduced-motion preferences

The main mobile breakpoint is around `768px`, with additional small-screen handling for narrower devices.

### Mobile engineering principle

Desktop layout should not simply be scaled down. Important components should change layout when screen width becomes constrained:

```text
Desktop
┌──────────────┬──────────────┐
│   Content    │    Content   │
└──────────────┴──────────────┘

Mobile
┌──────────────────────────────┐
│           Content            │
├──────────────────────────────┤
│           Content            │
└──────────────────────────────┘
```

---

## 🧭 Navigation

The site uses a fixed navigation bar on desktop and a mobile navigation pattern for smaller screens.

The mobile menu is intended to keep navigation accessible without allowing the full desktop navigation row to overflow the viewport.

When adding a new navigation item:

1. Add the desktop link.
2. Ensure it appears in the mobile menu.
3. Verify the target section/URL exists.
4. Test direct navigation on both desktop and mobile widths.

---

## 🎬 Motion Architecture

HATCIL uses GSAP and ScrollTrigger for a restrained interaction layer. The approach is inspired by spring/crossfade UI patterns rather than continuous decorative animation.

`motion.js` provides:

- Spring-like navbar and card interactions
- Staggered hero entrance
- Scroll-triggered section/card reveals
- Subtle statistic emphasis
- Team image hover motion
- Partner card transitions
- Form focus movement
- Contact submit-state crossfades
- `prefers-reduced-motion` support

The motion layer is deliberately progressive: the page remains usable when JavaScript is unavailable or reduced motion is requested.

---

## 🖼️ Assets

The website uses images for branding, the hero presentation, team imagery, and other visual content.

Where possible, production-critical assets should be stored locally in the repository rather than depending on third-party image hosts.

For external assets, consider:

- Availability of the external host
- Caching behaviour
- Image dimensions and compression
- Mobile bandwidth usage
- Copyright/licensing requirements

---

## 🚀 Running Locally

Because this is a static frontend, it can be previewed without a backend service.

### Option 1 — Open directly

Open `index.html` in a browser.

For the most reliable behaviour, however, use a local HTTP server because browser security rules can affect some resources when HTML is opened using `file://`.

### Option 2 — Use a local development server

If the project's tooling is installed:

```bash
npm install
```

Then use the project's configured development tooling.

If no development script is available, a simple static server can be used instead, for example:

```bash
npx serve .
```

---

## 🛠️ Development Workflow

A simple workflow for changes is:

```text
Edit
  ↓
Run locally
  ↓
Test desktop
  ↓
Test mobile
  ↓
Check console
  ↓
Check layout overflow
  ↓
Commit
  ↓
Push
```

Before pushing a significant UI change, test at least:

- Desktop width
- Tablet width
- 390px-class phone width
- 360px-class phone width

---

## 🔍 Browser Testing Checklist

### Desktop

- [ ] Navigation is aligned correctly
- [ ] Hero content is readable
- [ ] Hero image/background loads
- [ ] Statistics display correctly
- [ ] Service cards align correctly
- [ ] About section is balanced
- [ ] Team cards display correctly
- [ ] Partner cards display correctly
- [ ] Contact form is usable
- [ ] Footer is centered and readable

### Mobile

- [ ] No horizontal scrolling
- [ ] Navigation fits the viewport
- [ ] Mobile menu opens/closes correctly
- [ ] Hero heading does not overflow
- [ ] Hero buttons fit the screen
- [ ] Statistics stack appropriately
- [ ] Cards become single-column where necessary
- [ ] Team images retain sensible cropping
- [ ] Contact fields fit the viewport
- [ ] Footer remains readable
- [ ] Touch targets are large enough to use comfortably

---

## ⚡ Performance Considerations

Although the project is lightweight, the initial page can still be affected by external resources and large images.

Important performance considerations include:

### External JavaScript

The site loads GSAP/ScrollTrigger from a CDN. Third-party scripts should be kept to the minimum required for the experience.

### Tailwind CDN

Tailwind is currently loaded through the browser CDN approach. This is convenient for a static prototype/site, but a production build pipeline could generate a smaller CSS payload by compiling only the utilities actually used.

### Images

Large hero/team images should be compressed and appropriately sized for their display dimensions.

### External fonts

Google Fonts introduces an external request. `preconnect` can reduce connection overhead, but production performance should still be measured on a realistic mobile connection.

### Animation

Heavy animation should not block the initial rendering of the website.

---

## ♿ Accessibility

When modifying the site, maintain the following basics:

- Use semantic HTML elements where possible.
- Give meaningful images useful `alt` text.
- Ensure links have descriptive text.
- Keep keyboard navigation functional.
- Maintain sufficient colour contrast.
- Do not communicate important information through animation alone.
- Respect reduced-motion preferences.
- Ensure form labels are associated with their inputs.

---

## 🔐 Security Notes

This is currently a client-side/static website and should not contain private credentials.

Never commit:

- API secret keys
- Passwords
- Private tokens
- Service-account credentials
- Database credentials
- Private certificates

Any future backend or form-processing service should validate and sanitize all client-provided data server-side.

---

## 📬 Contact Form

The website contains a contact form in the frontend.

A static HTML form by itself does not constitute secure server-side form processing. If the form is later connected to an email provider, API, database, or serverless function:

1. Validate all fields server-side.
2. Apply rate limiting/spam protection.
3. Do not expose private API credentials in JavaScript.
4. Return safe error messages to users.
5. Log failures without storing unnecessary personal information.

---

## 🌍 Deployment

Because the project is a static HTML/CSS/JavaScript application, it can be deployed to any platform capable of serving static files.

Suitable deployment categories include:

- Static hosting
- CDN-backed hosting
- Firebase Hosting
- Vercel
- Netlify
- GitHub Pages
- Traditional web servers

For deployments using client-side routing in the future, configure the host's rewrite rules appropriately. The current site is primarily a single-page document, so this is not the same routing problem as a React SPA with multiple application routes.

---

## 🧪 Recommended Production Checks

Before publishing a release:

```text
HTML validation
     ↓
CSS inspection
     ↓
JavaScript console check
     ↓
Desktop test
     ↓
Mobile test
     ↓
Network/performance test
     ↓
Accessibility check
     ↓
Production deployment
```

Specifically check:

- No console errors
- No broken images
- No 404 assets
- No horizontal overflow on mobile
- Navigation works
- Forms behave correctly
- External resources load reliably
- Animations do not block content
- Mobile menu behaves correctly
- Page remains usable with reduced motion enabled

---

## 🧑‍💻 Contribution Guidelines

For future changes:

1. Keep the page structure in `index.html` understandable.
2. Prefer putting reusable styling in `styles.css` rather than creating additional large inline style blocks.
3. Keep JavaScript focused on behaviour and animation rather than presentation.
4. Avoid unnecessary dependencies.
5. Test both desktop and mobile before pushing.
6. Keep external resources to a minimum.
7. Do not commit secrets.
8. Use descriptive commit messages.

Example:

```bash
git add .
git commit -m "fix: improve mobile navigation"
git push origin main
```

---

## 📌 Current Project Status

HATCIL is an actively developed corporate website. The current implementation is a lightweight static frontend built around HTML, CSS, JavaScript, Tailwind CDN utilities, and GSAP animations.

The repository is suitable for continued visual, responsive, accessibility, and performance improvements without requiring a frontend framework migration.

---

## 📄 License

No explicit open-source license is currently documented for this repository. Until a license is added, the source code should be treated as **all rights reserved** and should not be assumed to be freely reusable or redistributable.
