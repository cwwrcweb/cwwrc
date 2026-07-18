/* ===================================
CWWRC WEBSITE
SCRIPT.JS
=================================== */


/* ===================================
JS PART 1
SETUP + VARIABLES
=================================== */


const menuToggle = document.getElementById("menu-toggle");

const navMenu = document.getElementById("nav-menu");

const header = document.querySelector("header");




/* ===================================
JS PART 2
HAMBURGER MENU
=================================== */


menuToggle.addEventListener("click", () => {


    navMenu.classList.toggle("active");


    if (navMenu.classList.contains("active")) {


        menuToggle.innerHTML = "✕";


    } else {


        menuToggle.innerHTML = "☰";


    }


});




/* ===================================
JS PART 3
CLOSE MENU AFTER CLICK
=================================== */


document.querySelectorAll("nav a").forEach(link => {


    link.addEventListener("click", () => {


        if (window.innerWidth <= 768) {


            navMenu.classList.remove("active");

            menuToggle.innerHTML = "☰";


        }


    });


});




/* ===================================
JS PART 4
HEADER SCROLL EFFECT
=================================== */


window.addEventListener("scroll", () => {


    if (window.scrollY > 80) {


        header.style.background = "rgba(0,0,0,0.95)";

        header.style.boxShadow =
        "0 5px 20px rgba(0,0,0,.35)";


    } else {


        header.style.background = "rgba(0,0,0,0.75)";

        header.style.boxShadow = "none";


    }


});




/* ===================================
JS PART 5
BUTTON EFFECTS + RIPPLE EFFECT
=================================== */


document.querySelectorAll(".btn").forEach(button => {


    button.addEventListener("click", function(e) {


        // Android Haptic Feedback

        if (navigator.vibrate) {


            navigator.vibrate(30);


        }



        // Ripple Effect


        const circle = document.createElement("span");



        const diameter = Math.max(

            this.clientWidth,

            this.clientHeight

        );



        const radius = diameter / 2;



        circle.style.width = circle.style.height =

        `${diameter}px`;



        circle.style.left =

        `${e.clientX - this.getBoundingClientRect().left - radius}px`;



        circle.style.top =

        `${e.clientY - this.getBoundingClientRect().top - radius}px`;



        circle.classList.add("ripple");



        const ripple = this.querySelector(".ripple");



        if (ripple) {


            ripple.remove();


        }



        this.appendChild(circle);


    });


});
