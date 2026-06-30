/**
 * CONTABILIDADE EDGAR PEREIRA - MAIN JS
 * Premium interactions and animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.createElement('div');
    navOverlay.classList.add('nav-overlay');
    
    if (menuToggle && navLinks) {
        document.body.appendChild(navOverlay);
        
        const toggleMenu = () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
            navOverlay.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        };

        menuToggle.addEventListener('click', toggleMenu);
        navOverlay.addEventListener('click', toggleMenu);

        // Close menu on link click (useful for anchor links)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('open')) {
                    toggleMenu();
                }
            });
        });
    }

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 3. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 50;

        revealElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // 4. Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 5. Active Nav Link Based on Current Page
    const setNavActive = () => {
        const currentPath = window.location.pathname;
        const navItems = document.querySelectorAll('.nav-links a:not(.btn-alterdata)');
        
        // Default to home if no path (e.g. root URL)
        const currentFile = currentPath.split('/').pop() || 'index.html';
        
        navItems.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentFile) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };
    
    setNavActive();

    // 6. Number Counter Animation (for Home/Empresa stats)
    const animateNumbers = () => {
        const stats = document.querySelectorAll('.stat-number, .accent-number');
        let animated = false;

        const startAnimation = () => {
            if (animated) return;
            
            stats.forEach(stat => {
                const targetText = stat.innerText;
                // Parse number (handle +, etc)
                const target = parseInt(targetText.replace(/\D/g, ''));
                const suffix = targetText.replace(/[0-9]/g, '');
                
                if (isNaN(target)) return;

                let current = 0;
                const increment = target / 40; // speed
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.innerText = Math.ceil(current) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.innerText = target + suffix;
                    }
                };
                
                updateCounter();
            });
            animated = true;
        };

        // Check if stats are in view
        if (stats.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    startAnimation();
                    observer.disconnect();
                }
            }, { threshold: 0.5 });
            
            observer.observe(stats[0]);
        }
    };

    animateNumbers();

    // 7. Simple Particles Effect for Hero Background
    const initParticles = () => {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        const resize = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = Math.random() > 0.5 ? 'rgba(212, 175, 55, 0.4)' : 'rgba(255, 255, 255, 0.2)';
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const createParticles = () => {
            particles = [];
            let numParticles = (width * height) / 15000; // density
            if (numParticles > 100) numParticles = 100; // max particles
            
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle());
            }
        };

        createParticles();

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };

        animate();
    };

    // Initialize particles slightly after load for performance
    setTimeout(initParticles, 100);
});
