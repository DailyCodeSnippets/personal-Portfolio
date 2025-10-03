// Navbar section
// Glass navbar darker on scroll
window.addEventListener("scroll", function () {
	const navbar = document.querySelector(".navbar");
	navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// Hamburger toggle animation
const toggler = document.querySelector(".custom-toggler");
const navMenu = document.querySelector("#navbarSupportedContent");

toggler.addEventListener("click", () => {
	toggler.classList.toggle("active");
});

// Close hamburger when clicking a nav link
document.querySelectorAll(".nav-link").forEach((link) => {
	link.addEventListener("click", () => {
		toggler.classList.remove("active");
	});
});

//skills section

const counters = document.querySelectorAll(".counter");
const options = { threshold: 0.4 }; // Trigger when 40% visible

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      const skill = entry.target;
      skill.classList.add("visible"); // Fade + slide in

      setTimeout(() => {
        const counter = skill.querySelector(".counter");
        const bar = skill.querySelector(".progress-bar");
        const logo = skill.querySelector(".skill-logo");

        let target = +counter.getAttribute("data-target");
        let count = 0;
        const increment = target / 50;

        // Counter animation
        const updateCounter = () => {
          if (count < target) {
            count += increment;
            counter.textContent = `${Math.ceil(count)}%`;
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = `${target}%`;
          }
        };
        updateCounter();

        // Progress bar animation
        bar.style.width = `${target}%`;

        // Logo bounce + glow
        logo.classList.add("bounce-active");
        setTimeout(() => logo.classList.add("glow-active"), 800);

        observer.unobserve(skill);
      }, index * 150); // Stagger delay
    }
  });
}, options);

// Add skill-card class to each skill and observe
document.querySelectorAll("#skills .col-6").forEach((skill) => {
  skill.classList.add("skill-card");
  observer.observe(skill);
});


// Initialize Bootstrap tooltips
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
  new bootstrap.Tooltip(el);
});


//Certificate section
//Select all certificate cards and carousel
const certCards = document.querySelectorAll('[data-bs-target="#certCarouselModal"]');
const certCarousel = document.querySelector('#certCarousel');

certCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    const carousel = bootstrap.Carousel.getInstance(certCarousel) || new bootstrap.Carousel(certCarousel);
    carousel.to(index); // Jump to the clicked certificate's slide
  });
});

// Services section
// Smooth scroll from "Hire Me" buttons to Contact section
document.querySelectorAll('.hire-btn').forEach(button => {
  button.addEventListener('click', () => {
    const contactSection = document.querySelector('#contact');
    const modal = bootstrap.Modal.getInstance(button.closest('.modal'));
    modal.hide(); // Close the modal
    setTimeout(() => {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }, 400); // Delay to allow modal to fully close
  });
});

// Auto-update year in footer
document.getElementById("year").textContent = new Date().getFullYear();
