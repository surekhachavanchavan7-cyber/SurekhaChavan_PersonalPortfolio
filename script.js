// =======================
// Footer Year
// =======================
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// =======================
// Mobile Menu Toggle
// =======================
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

if (burger && menu) {
  burger.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close menu on link click (mobile)
  document.querySelectorAll("#menu a").forEach((link) => {
    link.addEventListener("click", () => menu.classList.remove("open"));
  });
}

// =======================
// Active Navigation Highlight
// =======================
const sections = document.querySelectorAll("main[id], section[id]");
const navLinks = document.querySelectorAll(".navlink");

if (sections.length && navLinks.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${currentId}`
            );
          });
        }
      });
    },
    { threshold: 0.6 }
  );

  sections.forEach((section) => observer.observe(section));
}

// =======================
// Back to Top Button
// =======================
const topBtn = document.getElementById("topBtn");

if (topBtn) {
  window.addEventListener("scroll", () => {
    topBtn.classList.toggle("show", window.scrollY > 700);
  });
}

// =======================
// Contact Form Validation (Demo Only)
// =======================
const form = document.getElementById("contactForm");
const successMsg = document.getElementById("success");

// Utility functions
const showError = (id, show) => {
  const el = document.getElementById(id);
  if (el) el.style.display = show ? "block" : "none";
};

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    let isValid = true;

    showError("err-name", name === "");
    if (name === "") isValid = false;

    showError("err-email", !isValidEmail(email));
    if (!isValidEmail(email)) isValid = false;

    showError("err-subject", subject === "");
    if (subject === "") isValid = false;

    showError("err-message", message.length < 10);
    if (message.length < 10) isValid = false;

    if (isValid) {
      if (successMsg) {
        successMsg.style.display = "block";
        setTimeout(() => (successMsg.style.display = "none"), 3000);
      }
      form.reset();
    }
  });
}
