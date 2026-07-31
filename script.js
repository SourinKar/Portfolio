const toggleButton = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const rotatingFocus = document.querySelector("#rotating-focus");
const year = document.querySelector("#year");

const focusMessages = [
    "Backend systems + AI integration",
    "DSA and core CS fundamentals",
    "Exploring AI x Cybersecurity",
    "Open source and hackathons",
    "Secure, scalable software"
];

let currentFocusIndex = 0;

function closeMenu() {
    navLinks.classList.remove("open");
    document.body.classList.remove("menu-open");
    toggleButton.setAttribute("aria-expanded", "false");
    toggleButton.setAttribute("aria-label", "Open menu");
    toggleButton.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
}

function openMenu() {
    navLinks.classList.add("open");
    document.body.classList.add("menu-open");
    toggleButton.setAttribute("aria-expanded", "true");
    toggleButton.setAttribute("aria-label", "Close menu");
    toggleButton.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
}

// Keep the mobile navigation accessible and easy to close.
toggleButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.contains("open");
    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }
});

navItems.forEach((navItem) => {
    navItem.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

// Rotate the small card over the portrait so it feels alive without being distracting.
setInterval(() => {
    currentFocusIndex = (currentFocusIndex + 1) % focusMessages.length;
    rotatingFocus.textContent = focusMessages[currentFocusIndex];
}, 2200);

year.textContent = new Date().getFullYear();

const sections = [...document.querySelectorAll("main section[id]")];

// Highlight the nav link for the section currently passing through the viewport.
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            navItems.forEach((navItem) => {
                const pointsToCurrentSection = navItem.getAttribute("href") === `#${entry.target.id}`;
                navItem.classList.toggle("active", pointsToCurrentSection);
            });
        });
    },
    {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
    }
);

sections.forEach((section) => observer.observe(section));
