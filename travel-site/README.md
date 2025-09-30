# Wanderly — Travel Website

A modern, responsive travel landing site with featured destinations, packages, reviews, and newsletter signup.

## Features
- Semantic HTML with accessible navigation
- Responsive layout, CSS variables, and dark theme styling
- Hero with search panel and destination filtering
- Packages with clear pricing and CTA
- Testimonials and newsletter form with basic validation

## Getting Started
Open `index.html` in a browser:

```bash
xdg-open /workspace/travel-site/index.html 2>/dev/null || open /workspace/travel-site/index.html || start /workspace/travel-site/index.html
```

Or serve locally for best results:

```bash
cd /workspace/travel-site && python3 -m http.server 8080
```
Then visit `http://localhost:8080`.

## Customize
- Replace images in `assets/images` and icons in `assets/icons`.
- Update colors via CSS variables in `styles.css` under `:root`.
- Edit content sections in `index.html` (`#destinations`, `#packages`, `#reviews`).

## Structure
```
/travel-site
  ├── index.html
  ├── styles.css
  ├── app.js
  └── assets/
      ├── images/
      ├── icons/
      └── fonts/
```

## Notes
- Third-party photos use Unsplash placeholders. Replace for production use.
- No build step required; works as a static site.

