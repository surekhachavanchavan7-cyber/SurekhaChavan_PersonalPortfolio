// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", open ? "true" : "false");
});
document
  .querySelectorAll("#menu a")
  .forEach((a) =>
    a.addEventListener("click", () => menu.classList.remove("open"))
  );

// Active nav highlight
const sections = document.querySelectorAll("main[id], section[id]");
const links = document.querySelectorAll(".navlink");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const id = e.target.id;
        links.forEach((l) =>
          l.classList.toggle("active", l.getAttribute("href") === `#${id}`)
        );
      }
    });
  },
  { threshold: 0.6 }
);
sections.forEach((s) => io.observe(s));

// Back-to-top button
const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => {
  topBtn.classList.toggle("show", window.scrollY > 700);
});

// Contact form validation (demo only)
const form = document.getElementById("contactForm");
const success = document.getElementById("success");

const show = (id, on) =>
  (document.getElementById(id).style.display = on ? "block" : "none");
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();

  let ok = true;
  show("err-name", name === "");
  if (name === "") ok = false;
  show("err-email", !emailOk(email));
  if (!emailOk(email)) ok = false;
  show("err-subject", subject === "");
  if (subject === "") ok = false;
  show("err-message", message.length < 10);
  if (message.length < 10) ok = false;

  if (ok) {
    success.style.display = "block";
    form.reset();
    setTimeout(() => (success.style.display = "none"), 3000);
  }
});
