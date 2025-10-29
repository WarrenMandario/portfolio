document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for nav links
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            // Only smooth scroll for internal links
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value
            };

            // Simple validation
            if (!formData.name || !formData.email || !formData.message) {
                showNotification("Please fill in all fields.", "error");
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showNotification("Please enter a valid email address.", "error");
                return;
            }

            // Simulate form submission
            showNotification("Thank you for your message! I'll get back to you soon.", "success");
            contactForm.reset();
        });
    }

    // Notification system
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.custom-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `custom-notification alert alert-${type === 'error' ? 'danger' : 'success'} position-fixed`;
        notification.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // Navbar background change on scroll
    window.addEventListener("scroll", () => {
        const navbar = document.getElementById("navbar-top");
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
            navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
            navbar.style.backdropFilter = "blur(10px)";
        } else {
            navbar.style.backgroundColor = "white";
            navbar.style.boxShadow = "none";
            navbar.style.backdropFilter = "none";
        }
    });

    // Project card hover effects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Contact method hover effects
    document.querySelectorAll('.contact-method').forEach(method => {
        method.addEventListener('mouseenter', () => {
            method.style.transform = 'translateY(-3px)';
            method.style.transition = 'transform 0.2s ease';
        });
        
        method.addEventListener('mouseleave', () => {
            method.style.transform = 'translateY(0)';
        });
    });

    // Floating Particles Effect
    const canvas = document.getElementById("particles");
    if (canvas) {
        const ctx = canvas.getContext("2d");

        // Set canvas size
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        let particlesArray = [];

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 1.5 - 0.75;
                this.speedY = Math.random() * 1.5 - 0.75;
                this.alpha = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Bounce off edges
                if (this.x <= 0 || this.x >= canvas.width) this.speedX *= -1;
                if (this.y <= 0 || this.y >= canvas.height) this.speedY *= -1;

                // Fade in and out
                this.alpha += Math.random() * 0.02 - 0.01;
                this.alpha = Math.max(0.1, Math.min(0.8, this.alpha));
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        function initParticles() {
            particlesArray = [];
            const numberOfParticles = (canvas.width * canvas.height) / 10000;
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particlesArray.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Connect particles with lines
            connectParticles();
            
            requestAnimationFrame(animateParticles);
        }

        function connectParticles() {
            const maxDistance = 100;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    const dx = particlesArray[a].x - particlesArray[b].x;
                    const dy = particlesArray[a].y - particlesArray[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        ctx.save();
                        ctx.globalAlpha = 0.2 * (1 - distance / maxDistance);
                        ctx.strokeStyle = "white";
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                        ctx.restore();
                    }
                }
            }
        }

        // Initialize and start animation
        initParticles();
        animateParticles();
    }

    // Add loading animation
    window.addEventListener("load", () => {
        document.body.style.opacity = "0";
        document.body.style.transition = "opacity 0.5s ease-in-out";
        
        setTimeout(() => {
            document.body.style.opacity = "1";
        }, 100);
    });

    // Track external link clicks
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', (e) => {
            // You can add analytics tracking here
            console.log(`External link clicked: ${link.href}`);
        });
    });
});