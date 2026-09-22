// ===== Portfolio projects =====
const projects = [
  {
    title: "CareerBridge",
    image: "images/project_8.png",
    url: "https://careerbridge-2026.netlify.app",
  },
  {
    title: "GenBoard",
    image: "images/screenshot_1.png",
    url: "https://new-project-at-kali.netlify.app/",
  },
  {
    title: "Coffee Shop",
    image: "images/screenshot_2.png",
    url: "https://agent-6ab266894d797552be5efa12--cafi-cofi.netlify.app",
  },
  {
    title: "Rock Paper Scissor",
    image: "images/project_6.png",
    url: "https://rock-paper-scissor-131.netlify.app",
  },
  {
    title: "Weather App",
    image: "images/project_5.png",
    url: "https://project-four.netlify.app",
  },
  {
    title: "GaanHub",
    image: "images/image.png",
    url: "https://gaanhub.vercel.app/",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  // ----- Populate the portfolio grid -----
  const grid = document.querySelector(".portfolio-grid");
  if (grid) {
    grid.innerHTML = projects
      .map(
        (project) => `
      <div class="portfolio-item padd-15">
        <div class="portfolio-item-inner shadow-dark">
          <a href="${project.url}"
             target="_blank"
             rel="noopener noreferrer"
             aria-label="Open ${project.title} (opens in a new tab)">
            <div class="portfolio-img">
              <img src="${project.image}" alt="${project.title} preview" loading="lazy" />
            </div>
          </a>
        </div>
      </div>`,
      )
      .join("");
  }

  // ----- Close the mobile drawer whenever a nav link is tapped -----
  const check = document.getElementById("check");
  const navLinks = document.querySelectorAll(".nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (check) check.checked = false;
    });
  });

  // ----- Animate skill bars into view -----
  const skillBars = document.querySelectorAll(".progress-in");
  if (skillBars.length > 0 && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = "0";
            requestAnimationFrame(() => {
              entry.target.style.transition = "width 1.4s ease-out";
              entry.target.style.width = width;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    skillBars.forEach((bar) => observer.observe(bar));
  }

  // ----- Simple typing effect on the home hero -----
  const typingEl = document.querySelector(".typing");
  if (typingEl) {
    const roles = ["Web Developer", "EdTech Student", "Problem Solver"];
    let roleIndex = 0;
    let charIndex = typingEl.textContent.length;
    let deleting = false;

    function tick() {
      const current = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        if (charIndex > current.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        charIndex--;
        if (charIndex < 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          charIndex = 0;
        }
      }
      typingEl.textContent = current.slice(0, charIndex);
      setTimeout(tick, deleting ? 45 : 90);
    }

    setTimeout(tick, 1200);
  }
});
