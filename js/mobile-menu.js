document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const navigationLinks = document.querySelector(".navigation-links");
  const body = document.body;

  // Create overlay element
  const overlay = document.createElement("div");
  overlay.classList.add("mobile-menu-overlay");
  body.appendChild(overlay);

  function toggleMenu() {
    hamburgerMenu.classList.toggle("open");
    navigationLinks.classList.toggle("active");
    overlay.classList.toggle("active");
    body.classList.toggle("menu-open");
  }

  // Toggle menu on hamburger click
  hamburgerMenu.addEventListener("click", toggleMenu);

  // Close menu when clicking overlay
  overlay.addEventListener("click", toggleMenu);

  // Close menu when clicking navigation links
  navigationLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggleMenu();
    });
  });

  // Close menu on window resize (if open)
  window.addEventListener("resize", () => {
    if (
      window.innerWidth > 992 &&
      navigationLinks.classList.contains("active")
    ) {
      toggleMenu();
    }
  });

  // Prevent scrolling when menu is open
  function preventDefault(e) {
    e.preventDefault();
  }

  function disableScroll() {
    document.body.addEventListener("touchmove", preventDefault, {
      passive: false,
    });
  }

  function enableScroll() {
    document.body.removeEventListener("touchmove", preventDefault);
  }

  // Update scroll behavior when menu opens/closes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.target.classList.contains("menu-open")) {
        disableScroll();
      } else {
        enableScroll();
      }
    });
  });

  observer.observe(body, {
    attributes: true,
    attributeFilter: ["class"],
  });
});
