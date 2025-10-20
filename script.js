// Portfolio Website JavaScript
// Advanced interactions, animations, and dynamic effects

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initNavigation();
  initScrollAnimations();
  initSkillBars();
  initParticleEffect();
  initTypingEffect();
  initFormHandling();
  initThemeToggle();
  initCursorEffect();
  initParallaxEffect();
  initResumeHandling();
});

// Navigation functionality
function initNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.querySelector('.navbar');

  // Mobile menu toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  // Close mobile menu when clicking on links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Active navigation link highlighting
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  }

  // Navbar background on scroll
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(10, 14, 26, 0.95)';
      navbar.style.backdropFilter = 'blur(20px)';
    } else {
      navbar.style.background = 'rgba(10, 14, 26, 0.9)';
      navbar.style.backdropFilter = 'blur(20px)';
    }
  }

  window.addEventListener('scroll', () => {
    updateActiveNavLink();
    handleNavbarScroll();
  });
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Add animation classes to elements
  const animatedElements = [
    { selector: '.hero-text', class: 'fade-in' },
    { selector: '.hero-visual', class: 'slide-in-right' },
    { selector: '.about-text', class: 'slide-in-left' },
    { selector: '.about-stats', class: 'slide-in-right' },
    { selector: '.skill-category', class: 'fade-in' },
    { selector: '.project-card', class: 'fade-in' },
    { selector: '.resume-card', class: 'fade-in' },
    { selector: '.cert-card', class: 'fade-in' },
    { selector: '.contact-item', class: 'slide-in-left' },
    { selector: '.contact-form', class: 'slide-in-right' }
  ];

  animatedElements.forEach(({ selector, class: animClass }) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
      element.classList.add(animClass);
      element.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(element);
    });
  });
}

// Skill bars animation
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const width = progressBar.getAttribute('data-width');
        
        setTimeout(() => {
          progressBar.style.width = width;
        }, 200);
        
        skillObserver.unobserve(progressBar);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => {
    skillObserver.observe(bar);
  });
}

// Particle effect for background
function initParticleEffect() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const particles = [];
  
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-1';
  canvas.style.opacity = '0.3';
  
  document.body.appendChild(canvas);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2
    };
  }

  function initParticles() {
    for (let i = 0; i < 50; i++) {
      particles.push(createParticle());
    }
  }

  function updateParticles() {
    particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
      ctx.fill();
    });

    // Draw connections between nearby particles
    particles.forEach((particle, i) => {
      particles.slice(i + 1).forEach(otherParticle => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - distance / 100)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    });
  }

  function animate() {
    updateParticles();
    drawParticles();
    requestAnimationFrame(animate);
  }

  resizeCanvas();
  initParticles();
  animate();

  window.addEventListener('resize', () => {
    resizeCanvas();
    particles.length = 0;
    initParticles();
  });
}

// Typing effect for hero title
function initTypingEffect() {
  const nameElement = document.querySelector('.name');
  if (!nameElement) return;

  const text = nameElement.textContent;
  nameElement.textContent = '';
  
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      nameElement.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };

  // Start typing effect after a delay
  setTimeout(typeWriter, 1000);
}

// Form handling
function initFormHandling() {
  const form = document.querySelector('.contact-form form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
      // Show success message
      submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
      submitBtn.style.background = 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)';
      
      // Reset form
      form.reset();
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
      }, 3000);
    }, 2000);
  });
}

// Theme toggle (for future enhancement)
function initThemeToggle() {
  // This can be expanded to include dark/light theme switching
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  if (prefersDark.matches) {
    document.body.classList.add('dark-theme');
  }
}

// Custom cursor effect
function initCursorEffect() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: rgba(0, 212, 255, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    mix-blend-mode: difference;
  `;
  
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
  });

  // Cursor hover effects
  const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item');
  
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
      cursor.style.background = 'rgba(0, 212, 255, 0.8)';
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.background = 'rgba(0, 212, 255, 0.5)';
    });
  });
}

// Parallax effect for hero section
function initParallaxEffect() {
  const heroVisual = document.querySelector('.hero-visual');
  const shapes = document.querySelectorAll('.shape');
  
  if (!heroVisual) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    heroVisual.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    
    shapes.forEach((shape, index) => {
      const speed = 0.1 + (index * 0.05);
      shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
  });
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Performance optimization
const optimizedScrollHandler = throttle(() => {
  // Scroll-based animations and effects
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Preload critical resources
function preloadResources() {
  const criticalImages = [
    // Add any critical images here
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Initialize preloading
preloadResources();

// Error handling
window.addEventListener('error', (e) => {
  console.error('Portfolio Error:', e.error);
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // navigator.serviceWorker.register('/sw.js')
    //   .then(registration => console.log('SW registered'))
    //   .catch(error => console.log('SW registration failed'));
  });
}

// Resume handling functionality
function initResumeHandling() {
  const downloadBtn = document.getElementById('download-resume');
  const viewBtn = document.getElementById('view-resume');
  
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
      // Show loading state
      const originalContent = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Preparing Download...</span>';
      this.disabled = true;
      
      // Simulate a brief loading time for better UX
      setTimeout(() => {
        // Reset button with success state
        this.innerHTML = '<i class="fas fa-check"></i><span>Download Started!</span>';
        this.style.background = 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)';
        
        // Reset after 2 seconds
        setTimeout(() => {
          this.innerHTML = originalContent;
          this.disabled = false;
          this.style.background = '';
        }, 2000);
      }, 800);
    });
  }
  
  if (viewBtn) {
    viewBtn.addEventListener('click', function(e) {
      // Add a subtle animation to the button
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  }
  
  // Add hover effects for resume card
  const resumeCard = document.querySelector('.resume-card');
  if (resumeCard) {
    resumeCard.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    resumeCard.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  }
}

// Export functions for potential external use
window.PortfolioApp = {
  initNavigation,
  initScrollAnimations,
  initSkillBars,
  initParticleEffect,
  initTypingEffect,
  initFormHandling,
  initThemeToggle,
  initCursorEffect,
  initParallaxEffect,
  initResumeHandling
};