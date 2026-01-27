# Northstar — Website Prototype

A modern, multi-page website built with Flask and a clean, minimal frontend. This prototype demonstrates high-quality interactions and layout patterns suitable for a human-augmentation research studio.

## Purpose

This website serves as a professional showcase of our capability in website building specifically for japanese businesses. Including a showcase (Demo Site) recruitment hub for Northstar, a research studio focused on human augmentation systems including advanced prosthetics, neural interfaces, and sensory enhancement technologies. The site features dedicated sections for the technology (Neural Mapping, Cybernetics, Adaptive Control), careers, and contact inquiries.

## Key Features

- Splash screen intro with smooth handoff to the main UI
- Scroll-triggered fade-ins via IntersectionObserver
- Header shrink and auto-hide on scroll
- Dual-track scrolling ticker synced to page scroll
- Custom 3-card carousel with auto-rotation and manual navigation
- Dynamic parallax effects on feature images
- Responsive mobile-first design with optimized viewport handling
- Dark-mode theme activation on feature section scroll
- Bilingual support: English and Japanese (language toggle persists to localStorage)
- Accessibility features: skip-to-main-content link, semantic HTML, aria labels
- Reduced-motion support for animations
- Lazy-loaded images for performance
- Optimized scroll event handling with RequestAnimationFrame throttling

## Project Structure
```
.
├── app.py
├── Procfile
├── requirements.txt
├── README.md
├── templates/
│   ├── base.html
│   ├── home.html
│   ├── careers.html
│   └── contact.html
└── static/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    └── images/
        ├── automation.jpg
        ├── design.jpg
        ├── hero.jpg
        └── vision.jpg
```

## Tech Stack
- Backend: Flask (Python), Jinja2 templates, Gunicorn (for deployment)
- Frontend: HTML5, CSS3, JavaScript (vanilla—no frameworks)
- Fonts: Poppins, Inter, Manrope via Google Fonts
- Accessibility: ARIA labels, semantic HTML, reduced-motion support
- Internationalization: English and Japanese with client-side language switching

## Responsive Design & Mobile
The site is fully mobile-responsive with:
- Fluid grid layout using CSS media queries
- Touch-optimized navigation and carousel controls
- Optimized font sizes and spacing for smaller viewports
- Mobile-friendly image handling with `lazy` loading attributes
- Viewport meta tag configured for all device types

## Internationalization (Japanese Support)
Full bilingual support via:
- Language toggle button in the header (EN/JP)
- `data-en` and `data-jp` attributes on translatable elements
- Client-side language switching with localStorage persistence
- Japanese font support (Noto Sans JP, Hiragino Sans) with adjusted line-height
- All page titles, nav links, and headings translated

## Accessibility
- Skip-to-main-content link for keyboard navigation
- Semantic HTML structure with proper heading hierarchy
- ARIA labels on interactive controls
- Respects `prefers-reduced-motion` media query (disables animations for users who opt in)
- Lazy-loaded images prevent unnecessary resource loading
- Optimized scroll performance with RequestAnimationFrame throttling

## Local Development
```bash
# Clone the repository
git clone https://github.com/MoejoMan/Northstar-Test-Website.git
cd Northstar-Test-Website

# Install dependencies
pip install -r requirements.txt

# Run the development server
python app.py

# Open in browser
http://127.0.0.1:5000
```

## Deployment (Render)
This project includes a `Procfile` for Render’s auto-detection:
```
gunicorn app:app
```
Connect the GitHub repository to Render; deployments will trigger on push.

## Roadmap
- Background video splash
- Additional parallax layers
- Light/dark theme toggle
- WebGL-based interactive effects (e.g., Three.js)
