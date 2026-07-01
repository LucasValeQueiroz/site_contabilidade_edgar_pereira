/**
 * CONTABILIDADE EDGAR PEREIRA - PREMIUM JS ENGINE
 * Ultra-premium interactions, animations, and effects
 */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 0. SCROLL PROGRESS BAR
    // ============================================================
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.prepend(progressBar);

    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });

    // ============================================================
    // 1. MOBILE MENU TOGGLE
    // ============================================================
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

            if (navLinks.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        };

        menuToggle.addEventListener('click', toggleMenu);
        navOverlay.addEventListener('click', toggleMenu);

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('open')) {
                    toggleMenu();
                }
            });
        });
    }

    // ============================================================
    // 2. NAVBAR SCROLL EFFECT
    // ============================================================
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            lastScroll = currentScroll;
        }, { passive: true });
    }

    // ============================================================
    // 3. SCROLL REVEAL ANIMATIONS (Enhanced)
    // ============================================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Don't unobserve — keeps it clean but one-time
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ============================================================
    // 4. BACK TO TOP BUTTON
    // ============================================================
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================================
    // 5. ACTIVE NAV LINK
    // ============================================================
    const setNavActive = () => {
        const currentPath = window.location.pathname;
        const navItems = document.querySelectorAll('.nav-links a:not(.btn-alterdata)');
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

    // ============================================================
    // 6. SMOOTH NUMBER COUNTER ANIMATION
    // ============================================================
    const animateNumbers = () => {
        const stats = document.querySelectorAll('.stat-number, .accent-number');
        if (stats.length === 0) return;

        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

        const startAnimation = (stat) => {
            const targetText = stat.innerText;
            const target = parseInt(targetText.replace(/\D/g, ''));
            const suffix = targetText.replace(/[0-9]/g, '');

            if (isNaN(target)) return;

            const duration = 2000; // 2 seconds
            const startTime = performance.now();

            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutCubic(progress);
                const current = Math.round(easedProgress * target);

                stat.innerText = current + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.innerText = target + suffix;
                }
            };

            requestAnimationFrame(updateCounter);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAnimation(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    };
    animateNumbers();

    // ============================================================
    // 7. TYPEWRITER EFFECT (Hero rotating words)
    // ============================================================
    const initTypewriter = () => {
        const element = document.querySelector('.typewriter-text');
        if (!element) return;

        const words = [
            'Fidelizar Clientes',
            'Crescer seu Negócio',
            'Reduzir Impostos',
            'Organizar sua Empresa'
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPausing = false;

        const type = () => {
            const currentWord = words[wordIndex];

            if (isPausing) return;

            if (isDeleting) {
                element.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                element.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typingSpeed = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentWord.length) {
                // Pause at end of word
                isPausing = true;
                setTimeout(() => {
                    isPausing = false;
                    isDeleting = true;
                    type();
                }, 2500);
                return;
            }

            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 300;
            }

            setTimeout(type, typingSpeed);
        };

        // Start after a short delay
        setTimeout(type, 1000);
    };
    initTypewriter();

    // ============================================================
    // 8. PARTICLES WITH CONNECTIONS (Hero)
    // ============================================================
    const initParticles = () => {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let animationId;

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
                this.size = Math.random() * 1.8 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.6;
                this.speedY = (Math.random() - 0.5) * 0.6;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.isGold = Math.random() > 0.6;
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
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                if (this.isGold) {
                    ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
                } else {
                    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.4})`;
                }
                ctx.fill();
            }
        }

        const createParticles = () => {
            particles = [];
            let numParticles = Math.min((width * height) / 18000, 80);

            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle());
            }
        };

        createParticles();

        const connectionDistance = 120;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        const opacity = (1 - dist / connectionDistance) * 0.12;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        // Pause animation when not visible
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!animationId) animate();
                } else {
                    if (animationId) {
                        cancelAnimationFrame(animationId);
                        animationId = null;
                    }
                }
            });
        });

        const heroSection = canvas.closest('.hero');
        if (heroSection) heroObserver.observe(heroSection);
    };

    setTimeout(initParticles, 100);

    // ============================================================
    // 9. TESTIMONIAL CAROUSEL
    // ============================================================
    const initTestimonialCarousel = () => {
        const track = document.querySelector('.testimonial-track');
        const dots = document.querySelectorAll('.testimonial-dot');
        if (!track || dots.length === 0) return;

        const slides = track.querySelectorAll('.testimonial-slide');
        let currentSlide = 0;
        let autoPlayTimer;

        const goToSlide = (index) => {
            currentSlide = index;
            track.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        };

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetAutoPlay();
            });
        });

        const nextSlide = () => {
            const next = (currentSlide + 1) % slides.length;
            goToSlide(next);
        };

        const startAutoPlay = () => {
            autoPlayTimer = setInterval(nextSlide, 5000);
        };

        const resetAutoPlay = () => {
            clearInterval(autoPlayTimer);
            startAutoPlay();
        };

        // Touch/Swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    // Swipe left → next
                    goToSlide((currentSlide + 1) % slides.length);
                } else {
                    // Swipe right → prev
                    goToSlide((currentSlide - 1 + slides.length) % slides.length);
                }
                resetAutoPlay();
            }
        }, { passive: true });

        startAutoPlay();
    };
    initTestimonialCarousel();

    // ============================================================
    // 10. SUBTLE PARALLAX ON HERO ELEMENTS
    // ============================================================
    const initParallax = () => {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const heroContent = hero.querySelector('.hero-content');
        const heroStats = hero.querySelector('.hero-stats');

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const heroHeight = hero.offsetHeight;

            if (scrolled < heroHeight) {
                const factor = scrolled / heroHeight;
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
                    heroContent.style.opacity = 1 - factor * 0.5;
                }
                if (heroStats) {
                    heroStats.style.transform = `translateY(${scrolled * 0.08}px)`;
                    heroStats.style.opacity = 1 - factor * 0.4;
                }
            }
        }, { passive: true });
    };
    initParallax();

    // ============================================================
    // 11. SMOOTH HOVER TILT ON CARDS (Desktop only)
    // ============================================================
    if (window.matchMedia('(hover: hover)').matches) {
        const tiltCards = document.querySelectorAll('.service-card, .trust-card, .stat-card');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / centerY * -3;
                const rotateY = (x - centerX) / centerX * 3;

                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

});
