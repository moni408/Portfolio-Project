// Mobile Menu Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const navToggler = document.querySelector(".nav-toggler");
  const aside = document.querySelector(".aside");
  const overlay = document.createElement("div");
  const navLinks = document.querySelectorAll(".nav a");

  // Create overlay
  overlay.className = "overlay";
  document.body.appendChild(overlay);

  // Toggle mobile menu
  function toggleMenu() {
    aside.classList.toggle("open");
    overlay.classList.toggle("active");

    if (aside.classList.contains("open")) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }

  // Close mobile menu
  function closeMenu() {
    aside.classList.remove("open");
    overlay.classList.remove("active");
    document.body.classList.remove("menu-open");
  }

  // Event Listeners
  if (navToggler) {
    navToggler.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleMenu();
    });
  }

  // Close menu when clicking overlay
  overlay.addEventListener("click", closeMenu);

  // Close menu when clicking nav links (on mobile)
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 991) {
        setTimeout(closeMenu, 300); // Small delay for smooth transition
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      window.innerWidth <= 991 &&
      aside.classList.contains("open") &&
      !aside.contains(e.target) &&
      e.target !== navToggler
    ) {
      closeMenu();
    }
  });

  // Update active link
  function updateActiveLink() {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");

      // Simple comparison
      if (
        href === currentPage ||
        (currentPage === "" && href === "index.html") ||
        (currentPage === "index.html" && href === "")
      ) {
        link.classList.add("active");
      }
    });
  }

  updateActiveLink();

  // Handle window resize
  function handleResize() {
    if (window.innerWidth > 991) {
      closeMenu(); // Ensure menu is closed on desktop
    }
  }

  window.addEventListener("resize", handleResize);

  // Animate skill bars on about page
  function animateSkillBars() {
    const skillBars = document.querySelectorAll(".progress-in");

    if (skillBars.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const width = entry.target.style.width;
              entry.target.style.animation = `progressFill 1.5s ease-out forwards`;
              entry.target.style.width = width;
            }
          });
        },
        { threshold: 0.5 }
      );

      skillBars.forEach((bar) => observer.observe(bar));
    }
  }

  animateSkillBars();
});

// Smooth page transitions
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('a[href$=".html"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Don't intercept if it's an external link or anchor
      if (
        this.getAttribute("href").startsWith("#") ||
        this.getAttribute("href").startsWith("http")
      ) {
        return;
      }

      // Add fade-out effect
      document.body.style.opacity = "0.8";
      document.body.style.transition = "opacity 0.3s ease";

      setTimeout(() => {
        document.body.style.opacity = "1";
      }, 300);
    });
  });
});

// Add progressFill animation to CSS
const style = document.createElement("style");
style.textContent = `
@keyframes progressFill {
    from { width: 0; }
    to { width: var(--progress-width, 100%); }
}
`;
document.head.appendChild(style);
