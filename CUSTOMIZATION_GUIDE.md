# Northstar Template - Customization Guide

## Quick Start Customization

This template is designed for easy client customization. Follow these simple steps to adapt it for any business.

---

## 1. Company Branding

### Change Company Name
**Files to edit:** `templates/base.html`, `templates/*.html`

1. Open `templates/base.html`
2. Find line ~41: `<span class="header-text">Northstar</span>`
3. Replace "Northstar" with client's company name
4. Update footer (line ~69): `<p>&copy; 2025 Northstar. All rights reserved.</p>`
5. Update page titles in each template file

### Change Logo/Star Icon
**File:** `templates/base.html` (line ~40)

Replace `✦` with client's logo image:
```html
<img src="{{ url_for('static', filename='images/logo.png') }}" alt="Company Logo" class="logo-img">
```

---

## 2. Color Scheme

**File:** `static/css/style.css` (lines 68-82)

Update CSS variables for instant theme change:

```css
:root {
  --primary-bg: #eef1ff;        /* Main background */
  --primary-text: #111;          /* Text color */
  --accent-color: #667eea;       /* Links, buttons */
  --dark-bg: #0a0a0a;            /* Dark mode background */
  --dark-text: #f5f5f7;          /* Dark mode text */
}
```

**Common color schemes:**
- **Tech Blue:** `--accent-color: #667eea;`
- **Corporate Green:** `--accent-color: #10b981;`
- **Finance Navy:** `--accent-color: #1e40af;`
- **Creative Purple:** `--accent-color: #8b5cf6;`

---

## 3. Content Updates

### Homepage Hero Text
**File:** `templates/home.html` (line ~14)

```html
<h1 class="typewriter typewriter-animation">Your Custom Tagline Here</h1>
```

### Main Description
**File:** `templates/home.html` (line ~18)

```html
<p>Your company's mission statement or value proposition.</p>
```

### Feature Cards (Showcase Section)
**File:** `templates/home.html` (lines 36-54)

Replace images in `static/images/` and update:
```html
<div class="showcase-card">
  <img src="{{ url_for('static', filename='images/your-image.jpg') }}" alt="Feature Name">
  <h3>Feature Title</h3>
  <p>Feature description here.</p>
</div>
```

---

## 4. Contact Information

**File:** `templates/contact.html` (lines 77-84)

```html
<div>
  <span class="contact-label">Email</span>
  <a href="mailto:client@example.com">client@example.com</a>
</div>

<div>
  <span class="contact-label">Phone</span>
  <a href="tel:+81XXXXXXXXXX">+81 XX-XXXX-XXXX</a>
</div>
```

---

## 5. Language Translation

### Add Japanese Translations
**Files:** All `templates/*.html` files

Elements with translations use `data-en` and `data-jp` attributes:

```html
<h2 data-en="Our Services" data-jp="私たちのサービス">Our Services</h2>
```

To add new translations:
1. Add both attributes to any element
2. JavaScript automatically handles the swap on language toggle

### Full Page Translation
For complete Japanese version, create separate templates:
- `templates/home_jp.html`
- `templates/careers_jp.html`
- `templates/contact_jp.html`

Update `app.py` to route based on language preference.

---

## 6. Forms & Email

### Update Email Destination
**File:** `app.py` (line ~19)

Currently shows flash message only. To send real emails:

**Option A: Formspree (no code)**
1. Sign up at [formspree.io](https://formspree.io)
2. Get your form endpoint
3. Update form action in `templates/contact.html`:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option B: Flask-Mail + Gmail**
Add to `requirements.txt`:
```
flask-mail==0.9.1
```

Update `app.py`:
```python
from flask_mail import Mail, Message

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'your-email@gmail.com'
app.config['MAIL_PASSWORD'] = 'your-app-password'
app.config['MAIL_USE_TLS'] = True

mail = Mail(app)

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        msg = Message('New Contact Form',
                      sender='your-email@gmail.com',
                      recipients=['client@example.com'])
        msg.body = f"From: {request.form.get('name')}\nEmail: {request.form.get('email')}\n\n{request.form.get('message')}"
        mail.send(msg)
        flash('Thank you! We received your message.', 'success')
        return redirect(url_for('contact'))
    return render_template('contact.html')
```

---

## 7. Images

**Location:** `static/images/`

Replace placeholder images with client's content:
- `automation.jpg` → First showcase card
- `vision.jpg` → Second showcase card
- `design.jpg` → Third showcase card
- `feature-neural.jpg` → Feature section 001
- `feature-cybernetics.jpg` → Feature section 002
- `feature-adaptive.jpg` → Feature section 003

**Recommended specs:**
- Format: JPG or WebP
- Size: 1200x800px (3:2 ratio)
- File size: < 200KB (optimized)

---

## 8. Deployment

### Environment Variables
**File:** Create `.env` in project root

```
SECRET_KEY=your-secret-key-here
PORT=5000
```

### Render Deployment
1. Push to GitHub
2. Connect Render to your repo
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `gunicorn app:app`
5. Add environment variables in Render dashboard

### Custom Domain
1. Purchase domain (Namecheap, Google Domains, etc.)
2. Add custom domain in Render settings
3. Update DNS records as instructed

---

## 9. Performance Tips

- Optimize images with [TinyPNG](https://tinypng.com)
- Use WebP format for better compression
- Enable CDN through Render or Cloudflare
- Lazy load images with `loading="lazy"` attribute (already implemented)

---

## 10. SEO Optimization

Update meta tags in `templates/base.html`:
```html
<meta name="description" content="Your company description here">
<meta property="og:title" content="Company Name">
<meta property="og:description" content="Your description">
<meta property="og:image" content="URL to social preview image">
```

---

## Tech Stack

Built with:
- **Backend:** Flask (Python)
- **Frontend:** Vanilla JavaScript, CSS3, HTML5
- **Animations:** CSS transforms, IntersectionObserver API
- **Responsive:** Mobile-first design, 3 breakpoints
- **Accessibility:** ARIA labels, semantic HTML, keyboard navigation

---

## Support

For questions or custom modifications, refer to:
- Flask documentation: https://flask.palletsprojects.com
- CSS Grid guide: https://css-tricks.com/snippets/css/complete-guide-grid/
- JavaScript MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript

---

**Build Time:** ~3 days  
**Last Updated:** January 2026  
**License:** MIT
