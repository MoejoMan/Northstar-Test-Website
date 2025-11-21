// =======================
// Scroll to top on reload
// =======================
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

window.addEventListener('load', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// =======================
// Main DOMContentLoaded
// =======================
document.addEventListener('DOMContentLoaded', () => {

  // -----------------------
  // Fade-in on scroll
  // -----------------------
  const fadeObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document
    .querySelectorAll('.fade-in')
    .forEach(el => fadeObserver.observe(el));


  // === Feature section fade-in ===
document.querySelectorAll('.feature-block').forEach(block => {
  fadeObserver.observe(block);
});

// === Title underline activation ===
const featuresTitle = document.querySelector('.features-title');
if (featuresTitle) fadeObserver.observe(featuresTitle);

// === Parallax for feature images ===
const parallaxImgs = document.querySelectorAll('.feature-image[data-parallax] img');

window.addEventListener('scroll', () => {
  parallaxImgs.forEach(img => {
    const rect = img.parentElement.getBoundingClientRect();
    const offset = (rect.top - window.innerHeight * 0.5) * -0.05;
    img.style.setProperty('--pY', `${offset}px`);
  });
});




  // -----------------------
  // Splash screen
  // -----------------------
  const splash = document.getElementById('splash');

  if (splash) {
    const logo = splash.querySelector('.splash-logo');
    let splashClosed = false;
    document.body.classList.add('splash-active');

    const closeSplash = () => {
      if (splashClosed) return;
      splashClosed = true;
      splash.classList.add('splash-hide');
      document.body.classList.remove('splash-active');
      document.body.classList.add('splash-done');

      setTimeout(() => {
        splash.remove();
      }, 650);
    };

    // Primary path: use the logo animation end to close the splash
    if (logo) {
      logo.addEventListener('animationend', closeSplash);
    }

    // Fallback: ensure the splash clears even if animations are disabled
    setTimeout(closeSplash, 2000);
  }



  // -----------------------
  // Header shrink + hide nav
  // -----------------------
  let lastScrollTop = 0;
  let ticking = false;
  const header = document.getElementById('main-header');
  const nav = document.getElementById('main-nav');

  if (header && nav) {
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;

          if (currentScroll > 100) {
            header.classList.add('shrink');
          } else {
            header.classList.remove('shrink');
          }

          if (currentScroll - lastScrollTop > 10 && currentScroll > 100) {
            nav.classList.add('hidden');
          } else if (lastScrollTop - currentScroll > 10 || currentScroll < 100) {
            nav.classList.remove('hidden');
          }

          lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }


  // -----------------------
  // Scroll-banner underline
  // -----------------------
  const banner = document.querySelector('.scroll-banner');
  if (banner) {
    let underlineActivated = false;

    const handleScroll = () => {
      if (underlineActivated) return;

      const rect = banner.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      const inView = rect.top < viewportHeight * 0.7;

      if (inView && window.scrollY > 50) {
        banner.classList.add('underline-active');
        underlineActivated = true;
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }


  // -----------------------
  // Scroll-reactive ticker (smooth)
  // -----------------------
  const tracks = document.querySelectorAll('[data-ticker-track]');
  if (tracks.length) {
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (!reduce) {
      let lastY   = window.scrollY;
      let targetX = 0;  
      let currentX = 0;  

      const update = () => {
        tracks.forEach(track => {
          const loop = track.querySelector('.loop');
          if (!loop) return;
          const loopW = loop.offsetWidth || 1;

          let localX = currentX;

          while (localX <= -loopW) localX += loopW;
          while (localX >= 0)      localX -= loopW;

          track.style.setProperty('--offset', `${localX}px`);
        });
      };

      const onScroll = () => {
        const y = window.scrollY;
        const delta = y - lastY;

        targetX -= delta * 0.6;  // tweak this factor for more/less reaction

        lastY = y <= 0 ? 0 : y;
      };

      const animate = () => {
        const smoothing = 0.12; // lower = smoother, higher = snappier
        currentX += (targetX - currentX) * smoothing;
        update();
        requestAnimationFrame(animate);
      };

      update();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', update);
      animate();
    }
  }



  // -----------------------
  // Showcase carousel (active / prev / next auto-rotate)
  // -----------------------
  const cards = document.querySelectorAll('.showcase-card');
  let current = 0;

  function updateCards() {
    cards.forEach(card =>
      card.classList.remove('active', 'prev', 'next')
    );

    if (!cards.length) return;

    const prev = (current - 1 + cards.length) % cards.length;
    const next = (current + 1) % cards.length;

    cards[current].classList.add('active');
    cards[prev].classList.add('prev');
    cards[next].classList.add('next');
  }

  if (cards.length > 0) {
    updateCards();

    setInterval(() => {
      current = (current + 1) % cards.length;
      updateCards();
    }, 10000);
  }


  // -----------------------
  // Showcase hover parallax
  // -----------------------
  const showcaseImages = document.querySelectorAll('.showcase-card img');

  showcaseImages.forEach(img => {
    img.addEventListener('mousemove', e => {
      const rect = img.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const moveX = x * 12;
      const moveY = y * 12;

      img.style.transform = `scale(1.12) translate(${moveX}px, ${moveY}px)`;
    });

    img.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
    });
  });


  // -----------------------
  // Feature suite activation + parallax
  // -----------------------
  const featureSection = document.querySelector('#feature-suite');

  if (featureSection) {
    const featureObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            featureSection.classList.add('is-active');
            document.body.classList.add('features-mode');
          } else {
            featureSection.classList.remove('is-active');
            document.body.classList.remove('features-mode');
          }
        });
      },
      { threshold: 0.35 }
    );

    featureObserver.observe(featureSection);

    const parallaxTargets = featureSection.querySelectorAll('[data-parallax] img');

    parallaxTargets.forEach(img => {
      img.addEventListener('mousemove', e => {
        const rect = img.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        img.style.transform = `scale(1.06) translate(${x * 16}px, ${y * 16}px)`;
      });

      img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1.03) translate(0, 0)';
      });
    });
  }

});
