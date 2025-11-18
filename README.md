🌟 Northstar — AI Systems Website (Design Prototype)
A modern, animation-driven, multi-page website built with Flask and clean, minimalistic frontend design.
Created as a full design + interaction prototype to simulate the feel of a high-end AI/creative studio brand.
The project includes advanced UI features such as a splash-screen intro, scroll-synced text ticker, header shrink animations, fade-in sections, a custom 3-card rotating carousel, and optional parallax effects.

🚀 Features
✨ Modern UI + Animations


Splash-screen intro (“Northstar ✦”) that transitions smoothly into the header


Animated header logo with rotating star icon


Scroll-triggered fade-ins using IntersectionObserver


Auto-hiding / reappearing navigation bar


Smooth scroll-to-top on page reload


Gradient hero section


Scroll-synced dual-track ticker (NORTHSTAR + “ADAPTIVE INTELLIGENCE”)


Line-underline animation on scroll


A fully custom 3-card carousel with next/previous positioning and transitions


Optional background parallax (can toggle)


🖼️ Visual Elements


High-resolution image cards (Automation, Design, Vision, Hero bg)


Light, intentionally minimalistic layout inspired by modern agency sites


Clean typography (Poppins / Inter / Manrope)



🧱 Project Structure
KENS-WEBSITE/
├── app.py
├── Procfile
├── requirements.txt
├── README.md
│
├── templates/
│   ├── base.html
│   ├── home.html
│   ├── careers.html
│   └── contact.html
│
└── static/
    ├── css/
    │   └── style.css
    │
    ├── js/
    │   └── script.js
    │
    └── images/
        ├── automation.jpg
        ├── design.jpg
        ├── hero.jpg
        └── vision.jpg


🧰 Tech Stack
Backend


Flask (Python)


Jinja2 templates


Gunicorn for Render hosting


Frontend


HTML5, CSS3


JavaScript (custom animations + scroll logic)


Google Fonts (Poppins, Inter, Manrope)


Deployment


Render.com (free web service)


GitHub repo auto-deploy integration



🔧 Run the Project Locally
Clone the repo:
git clone https://github.com/MoejoMan/Northstar-Test-Website.git
cd Northstar-Test-Website

Install dependencies:
pip install -r requirements.txt

Run the server:
python app.py

Then open:
http://127.0.0.1:5000


🌐 Deployment (Render)
This project includes a Procfile, allowing Render to auto-detect and run:
gunicorn app:app

Just connect your GitHub repo → Render will auto-deploy on each push.

⚡ Future Ideas


Background video splash


More dynamic parallax layers


Light/dark theme toggle


Interactive 3D WebGL effects (Three.js)