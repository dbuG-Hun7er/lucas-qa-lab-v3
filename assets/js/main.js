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
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  };

  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    document.body.classList.toggle("nav-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (!navLinks.classList.contains("open")) return;
    if (navLinks.contains(target) || toggle.contains(target)) return;
    closeMenu();
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
