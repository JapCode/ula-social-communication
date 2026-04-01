import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Initialize Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  gestureOrientation: 'vertical',
  smoothTouch: false,
  __experimental__naiveDimensions: false,
});

// Sync Lenis scroll with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

// Debug: confirm Lenis is active
lenis.on('scroll', (e) => {
  console.log('[Lenis] scroll:', e.currentScroll.toFixed(1), 'target:', e.targetScroll.toFixed(1));
});

console.log('[Lenis] Initialized — smooth scroll active');

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

// Hero entrance timeline
const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

heroTl
  .from('.floating-nav', {
    y: -30,
    opacity: 0,
    duration: 0.8,
  })
  .from('.floating-nav a', {
    scale: 0,
    opacity: 0,
    duration: 0.4,
    stagger: 0.1,
    ease: 'back.out(1.7)',
  }, '-=0.4')
  .from('.hero-bg-element', {
    scale: 0,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: 'power2.out',
  }, '-=0.6')
  .from('#hero-title', {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  }, '-=0.5')
  .from('#hero-title + p', {
    y: 30,
    opacity: 0,
    duration: 0.8,
  }, '-=0.4')
  .from('.hero-cta', {
    y: 20,
    opacity: 0,
    duration: 0.6,
  }, '-=0.3');

// Floating elements ambient animation
gsap.to('.hero-floating', {
  y: -20,
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut',
});

// Background circles slow rotation
gsap.to('.hero-bg-circle', {
  scale: 1.2,
  rotation: 180,
  duration: 20,
  repeat: -1,
  yoyo: true,
  ease: 'none',
});

// Scroll reveal: blur
gsap.fromTo('.reveal-blur',
  { autoAlpha: 0.3, filter: 'blur(10px)', scale: 1.1 },
  {
    autoAlpha: 1,
    filter: 'blur(0px)',
    scale: 1,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.reveal-blur',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    }
  }
);

// Scroll reveal: slide
gsap.fromTo('.reveal-slide',
  { autoAlpha: 0, y: 40, scale: 0.95 },
  {
    autoAlpha: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.reveal-slide',
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    }
  }
);

// Scroll reveal: scale
gsap.fromTo('.reveal-scale',
  { autoAlpha: 0, scale: 0.8 },
  {
    autoAlpha: 1,
    scale: 1,
    duration: 1,
    ease: 'back.out(1.2)',
    scrollTrigger: {
      trigger: '.reveal-scale',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    }
  }
);

// Generic reveal elements
document.querySelectorAll('.reveal').forEach((element) => {
  const direction = element.dataset.reveal || 'up';
  const delay = parseFloat(element.dataset.delay) || 0;
  const duration = parseFloat(element.dataset.duration) || 0.8;

  let fromConfig = { autoAlpha: 0, duration, ease: 'power3.out' };

  switch (direction) {
    case 'up': fromConfig.y = 40; break;
    case 'down': fromConfig.y = -40; break;
    case 'left': fromConfig.x = 40; break;
    case 'right': fromConfig.x = -40; break;
    case 'scale': fromConfig.scale = 0.8; break;
    default: fromConfig.y = 40;
  }

  gsap.fromTo(element,
    { autoAlpha: 0 },
    {
      ...fromConfig,
      autoAlpha: 1,
      delay,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );
});

// Stagger groups
document.querySelectorAll('[data-stagger]').forEach((group) => {
  const staggerAmount = parseFloat(group.dataset.stagger) || 0.1;
  const children = group.querySelectorAll('.stagger-item');

  gsap.fromTo(children,
    { autoAlpha: 0, y: 30, scale: 0.9, rotationX: -15 },
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      rotationX: 0,
      duration: 0.6,
      ease: 'back.out(1)',
      stagger: staggerAmount,
      scrollTrigger: {
        trigger: group,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  );
});

// Line stagger groups
document.querySelectorAll('[data-line-stagger]').forEach((group) => {
  const children = group.querySelectorAll('.line-reveal');
  const lineDelay = parseFloat(group.dataset.lineStagger) || 0.08;

  gsap.fromTo(children,
    { autoAlpha: 0, y: 20 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
      stagger: lineDelay,
      scrollTrigger: {
        trigger: group,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );
});

// Progress bar
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

// Card entrance animations
gsap.utils.toArray('.layered-card').forEach((section) => {
  const content = section.querySelector('.card-content');
  if (content) {
    gsap.fromTo(content,
      { y: 60, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }
});

// Magnetic buttons
const magneticButtons = document.querySelectorAll('.magnetic, .nav-pill, .btn-magnetic');

magneticButtons.forEach((button) => {
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.15,
      y: y * 0.15,
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  button.addEventListener('mouseleave', () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    });
  });
});

// Stagger item hover effects
document.querySelectorAll('.stagger-item').forEach((item) => {
  item.addEventListener('mouseenter', () => {
    gsap.to(item, {
      y: -5,
      boxShadow: '0 20px 40px -10px rgba(0, 93, 170, 0.15)',
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  item.addEventListener('mouseleave', () => {
    gsap.to(item, {
      y: 0,
      boxShadow: 'none',
      duration: 0.3,
      ease: 'power2.out',
    });
  });
});

// Image parallax on scroll
const images = document.querySelectorAll('.reveal-blur img');
images.forEach((img) => {
  const card = img.closest('.layered-card');
  if (card) {
    gsap.to(img, {
      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      scale: 1.1,
      ease: 'none',
    });
  }
});

// Nav link hover scale
const navLinks = document.querySelectorAll('.floating-nav a');
navLinks.forEach((link) => {
  link.addEventListener('mouseenter', () => {
    gsap.to(link, {
      scale: 1.15,
      duration: 0.3,
      ease: 'back.out(2)',
    });
  });

  link.addEventListener('mouseleave', () => {
    gsap.to(link, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  });
});

// Video player hover effects
const videoPlayer = document.querySelector('.video-player');
if (videoPlayer) {
  const playButton = videoPlayer.querySelector('.play-button');

  videoPlayer.addEventListener('mouseenter', () => {
    gsap.to(playButton, {
      scale: 1.2,
      duration: 0.4,
      ease: 'back.out(2)',
    });
    gsap.to(videoPlayer.querySelector('img'), {
      scale: 1.05,
      duration: 0.5,
      ease: 'power2.out',
    });
  });

  videoPlayer.addEventListener('mouseleave', () => {
    gsap.to(playButton, {
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
    });
    gsap.to(videoPlayer.querySelector('img'), {
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
    });
  });
}

// Central glow intensity on scroll
gsap.to('.central-glow', {
  scrollTrigger: {
    trigger: '#inicio',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
  },
  opacity: 1.5,
  ease: 'none',
});

// News section parallax
const newsImage = document.querySelector('.news-image-container');
if (newsImage) {
  gsap.to(newsImage, {
    scrollTrigger: {
      trigger: '#noticias',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
    y: -30,
    scale: 1.05,
    ease: 'none',
  });
}

// Section slide-in from alternating sides
const sections = document.querySelectorAll('.layered-card');
sections.forEach((section, index) => {
  const isEven = index % 2 === 0;
  gsap.fromTo(section,
    {
      opacity: 0,
      x: isEven ? -50 : 50
    },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  );
});

ScrollTrigger.refresh();
