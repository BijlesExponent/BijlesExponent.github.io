// get CSS variable for breakpoint
const rootStyles = getComputedStyle(document.documentElement);
const breakpointValue = rootStyles.getPropertyValue("--menu-breakpoint").trim();
const breakpoint = parseInt(breakpointValue);

// get toggle button and nav links
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

// Open
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

// Close on link click
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= breakpoint) {
      navLinks.classList.remove("open");
    }
  });
});