document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for nav links
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(link.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Contact Form Submission (Fake for now)
    document.getElementById("contact-form").addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Message Sent!");
    });

    // Floating Particles Effect
    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1.5 - 0.75;
            this.speedY = Math.random() * 1.5 - 0.75;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.size > 0.2) this.size -= 0.01;
        }

        draw() {
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function handleParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particlesArray.forEach((particle, index) => {
            particle.update();
            particle.draw();

            if (particle.size <= 0.2) {
                particlesArray.splice(index, 1);
            }
        });

        requestAnimationFrame(handleParticles);
    }

    function createParticles() {
        for (let i = 0; i < 100; i++) {
            particlesArray.push(new Particle());
        }
    }

    createParticles();
    handleParticles();
});

