/* ===================================
   CWWRC WEBSITE v0.6
=================================== */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const header = document.querySelector("header");

// ===============================
// HAMBURGER MENU
// ===============================

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    if (navMenu.classList.contains("active")) {
        menuToggle.innerHTML = "✕";
    } else {
        menuToggle.innerHTML = "☰";
    }

});

// ===============================
// CLOSE MENU AFTER CLICK
// ===============================

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {

        if (window.innerWidth <= 768) {

            navMenu.classList.remove("active");
            menuToggle.innerHTML = "☰";

        }

    });

});

// ===============================
// HEADER SCROLL EFFECT
// ===============================

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.style.background = "rgba(0,0,0,0.95)";
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,.35)";

    } else {

        header.style.background = "rgba(0,0,0,0.75)";
        header.style.boxShadow = "none";

    }

});
