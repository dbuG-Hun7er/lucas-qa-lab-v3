const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (navLinks) {
  const activeLink = navLinks.querySelector("a.active");

  if (activeLink) activeLink.setAttribute("aria-current", "page");
}

if (toggle && navLinks) {
  navLinks.id = navLinks.id || "site-navigation";
  toggle.setAttribute("aria-controls", navLinks.id);

  const closeMenu = () => {
    navLinks.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
