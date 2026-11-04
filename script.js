
// Get the navigation menu and toggle button
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

// Function to open and close the mobile navigation menu
menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");

    // Update the accessibility state
    const isOpen = navLinks.classList.contains("active");
    menuToggle.setAttribute("aria-expanded", isOpen);
});

// Close the menu after selecting a navigation link
const navigationItems = document.querySelectorAll(".nav-links a");

navigationItems.forEach(function (item) {
    item.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// Select sections and cards that should animate
const animatedElements = document.querySelectorAll(
    ".section, .hero-content, .hero-image, .project-card, .achievement-card"
);

// Add the reveal class
animatedElements.forEach(function (element) {
    element.classList.add("reveal");
});

// Observe elements as they enter the screen
const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

// Start observing each element
animatedElements.forEach(function (element) {
    observer.observe(element);
});
