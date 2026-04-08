import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Global state
let lenis;
let heroTimeline = null;

// Initialize Lenis smooth scroll
function initLenis() {
  // Skip Lenis on mobile — native scroll is smoother on touch devices
  // and Lenis adds unnecessary overhead
  if (window.innerWidth < 768) {
    return;
  }

  if (lenis) {
    lenis.destroy();
  }
  
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    gestureOrientation: 'vertical',
    smoothTouch: false,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        lenis.scrollTo(target, { offset: -80 });
      }
    });
  });
}

// Hero entrance animation - DISABLED (showing immediately via CSS)
function initHeroAnimation() {
  // No animation needed - hero is visible by default
}

// Initialize scroll animations
function initScrollAnimations() {
  // Home page sections are visible immediately - no scroll animations
  const sections = document.querySelectorAll('.news-fullbleed, .video-cinematic, .quick-access-strip');

  sections.forEach((section) => {
    gsap.set(section, { opacity: 1 });
  });
}

// Video section interactions — desktop only
function initVideoAnimations() {
  if (window.innerWidth < 768) return;
  
  const videoWrapper = document.querySelector('.video-player-wrapper');
  if (!videoWrapper) return;

  const playButton = videoWrapper.querySelector('.play-button');

  videoWrapper.addEventListener('mouseenter', () => {
    gsap.to(playButton, { scale: 1.15, duration: 0.3, ease: 'back.out(2)' });
  });

  videoWrapper.addEventListener('mouseleave', () => {
    gsap.to(playButton, { scale: 1, duration: 0.3, ease: 'power2.out' });
  });
}

// Progress bar animation
function initProgressBar() {
  gsap.to('.progress-bar', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
    },
  });
}

// Magnetic buttons — desktop only (no hover on touch)
function initMagneticButtons() {
  if (window.innerWidth < 768) return;
  
  const magneticButtons = document.querySelectorAll('.magnetic, .nav-pill, .btn-magnetic');
  
  magneticButtons.forEach((button) => {
    const xTo = gsap.quickTo(button, 'x', { duration: 0.3, ease: 'power2.out' });
    const yTo = gsap.quickTo(button, 'y', { duration: 0.3, ease: 'power2.out' });

    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      xTo(x * 0.15);
      yTo(y * 0.15);
    });

    button.addEventListener('mouseleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}

// Stagger item hover effects
function initStaggerHover() {
  document.querySelectorAll('.stagger-item').forEach((item) => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item, { y: -4, scale: 1.02, duration: 0.25, ease: 'power2.out' });
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(item, { y: 0, scale: 1, duration: 0.25, ease: 'power2.out' });
    });
  });
}

// News section link hover — desktop only
function initNewsLinkHover() {
  if (window.innerWidth < 768) return;
  
  const newsLink = document.querySelector('#noticias .btn-magnetic');
  if (!newsLink) return;

  newsLink.addEventListener('mouseenter', () => {
    gsap.to(newsLink, { x: 5, duration: 0.3, ease: 'power2.out' });
  });
  newsLink.addEventListener('mouseleave', () => {
    gsap.to(newsLink, { x: 0, duration: 0.3, ease: 'power2.out' });
  });
}

// Master initialization function
function initAll() {
  // Kill all existing animations first
  gsap.killTweensOf('*');
  ScrollTrigger.getAll().forEach(st => st.kill());
  
  // Reset progress bar
  gsap.set('.progress-bar', { scaleX: 0 });

  // Initialize
  initLenis();
  initHeroAnimation();
  initScrollAnimations();
  initVideoAnimations();
  initProgressBar();
  initMagneticButtons();
  initStaggerHover();
  initNewsLinkHover();
}

// Initialize on first load
initAll();

// Handle View Transitions - reinitialize on page navigation
document.addEventListener('astro:page-load', () => {
  setTimeout(initAll, 50);
});

// Cleanup before page swap
document.addEventListener('astro:before-swap', () => {
  gsap.killTweensOf('*');
  ScrollTrigger.getAll().forEach(st => st.kill());
  
  if (heroTimeline) {
    heroTimeline.kill();
  }
});

// Fallback for browsers without view transitions
document.addEventListener('astro:after-swap', () => {
  setTimeout(initAll, 50);
});
