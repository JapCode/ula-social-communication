import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  gestureOrientation: 'vertical',
  smoothTouch: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

ScrollTrigger.defaults({
  scroller: window,
});

ScrollTrigger.scrollerProxy(document.documentElement, {
  scrollTop(value) {
    return arguments.length ? lenis.scrollTo(value, { immediate: true }) : lenis.scroll;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      lenis.scrollTo(target, { offset: -80 });
    }
  });
});

if (prefersReducedMotion) {
  gsap.set(document.querySelectorAll('.reveal, .reveal-blur, .reveal-slide, .reveal-scale, .stagger-item, .line-reveal'), {
    opacity: 1,
    transform: 'none',
    filter: 'none',
    visibility: 'visible'
  });
} else {

  gsap.fromTo('.reveal-blur', 
    { autoAlpha: 0.3, filter: 'blur(8px)' },
    {
      autoAlpha: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.reveal-blur',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    }
  );

  gsap.fromTo('.reveal-slide',
    { autoAlpha: 0.3, y: 20 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.reveal-slide',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    }
  );

  gsap.fromTo('.reveal-scale',
    { autoAlpha: 0.3, scale: 0.97 },
    {
      autoAlpha: 1,
      scale: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.reveal-scale',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    }
  );

  document.querySelectorAll('.reveal').forEach((element) => {
    const direction = element.dataset.reveal || 'up';
    const delay = parseFloat(element.dataset.delay) || 0;
    const duration = parseFloat(element.dataset.duration) || 0.8;
    
    let fromConfig = { autoAlpha: 0.3, duration, ease: 'power3.out' };
    
    switch (direction) {
      case 'up': fromConfig.y = 30; break;
      case 'down': fromConfig.y = -30; break;
      case 'left': fromConfig.x = 30; break;
      case 'right': fromConfig.x = -30; break;
      case 'scale': fromConfig.scale = 0.9; break;
      default: fromConfig.y = 30;
    }
    
    gsap.fromTo(element, 
      { autoAlpha: 0.3 },
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

  document.querySelectorAll('[data-stagger]').forEach((group) => {
    const staggerAmount = parseFloat(group.dataset.stagger) || 0.1;
    const children = group.querySelectorAll('.stagger-item');
    
    gsap.fromTo(children,
      { autoAlpha: 0.3, y: 15 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: staggerAmount,
        scrollTrigger: {
          trigger: group,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  document.querySelectorAll('[data-line-stagger]').forEach((group) => {
    const children = group.querySelectorAll('.line-reveal');
    const lineDelay = parseFloat(group.dataset.lineStagger) || 0.08;
    
    gsap.fromTo(children,
      { autoAlpha: 0.3, y: 10 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
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

  const heroTimeline = gsap.timeline({ 
    defaults: { ease: 'power3.out' },
    delay: 0.3
  });
  
  heroTimeline
    .from('.floating-nav', {
      y: -20,
      opacity: 0,
      duration: 0.8,
    })
    .from('.floating-nav a', {
      x: -10,
      opacity: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: 'back.out(1.2)',
    }, '-=0.3')
    .from('#hero-title', {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
    }, '-=0.2')
    .from('#hero-title + p', {
      y: 20,
      opacity: 0,
      duration: 0.8,
    }, '-=0.4');

  gsap.utils.toArray('.layered-card').forEach((section) => {
    const content = section.querySelector('.card-content');
    if (content) {
      gsap.fromTo(content,
        { y: 40, opacity: 0.5 },
        {
          y: 0,
          opacity: 1,
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

  const magneticButtons = document.querySelectorAll('.magnetic, .glass-pill');
  
  magneticButtons.forEach((button) => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(button, {
        x: x * 0.1,
        y: y * 0.1,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    });
  });

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
        y: -20,
        ease: 'none',
      });
    }
  });

  const navLinks = document.querySelectorAll('.floating-nav a');
  navLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, {
        scale: 1.1,
        duration: 0.3,
        ease: 'back.out(1.7)',
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

  const videoPlayer = document.querySelector('.video-player');
  if (videoPlayer) {
    const playButton = videoPlayer.querySelector('.play-button');
    
    videoPlayer.addEventListener('mouseenter', () => {
      gsap.to(playButton, {
        scale: 1.15,
        duration: 0.4,
        ease: 'back.out(1.7)',
      });
    });
    
    videoPlayer.addEventListener('mouseleave', () => {
      gsap.to(playButton, {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    });
  }

  gsap.to('.central-glow', {
    scrollTrigger: {
      trigger: '#inicio',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
    background: 'radial-gradient(circle at center, rgba(0, 93, 170, 0.08) 0%, transparent 60%)',
    ease: 'none',
  });
}

ScrollTrigger.refresh();
