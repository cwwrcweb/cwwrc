/* ===================================
   CWWRC WEBSITE
   CULTURE.JS
   Sri Lankan Heritage Page
=================================== */


// ================================
// MOBILE MENU SUPPORT
// ================================

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if(menuToggle && navMenu){

    menuToggle.addEventListener("click", function(){

        navMenu.classList.toggle("active");

    });

}



// ================================
// SCROLL REVEAL ANIMATION
// ================================

const heritageBlocks = document.querySelectorAll(
    ".heritage-block, .culture-section, .heritage-grid-section, .culture-vision"
);


const revealOnScroll = () => {

    heritageBlocks.forEach(section => {

        const sectionTop = section.getBoundingClientRect().top;

        const windowHeight = window.innerHeight;


        if(sectionTop < windowHeight - 100){

            section.classList.add("show");

        }

    });

};


window.addEventListener(
    "scroll",
    revealOnScroll
);


revealOnScroll();



// ================================
// IMAGE LOADING EFFECT
// ================================

const images = document.querySelectorAll("img");


images.forEach(image => {


    image.addEventListener("load", function(){

        image.classList.add("loaded");

    });


});



// ================================
// CURRENT YEAR AUTO UPDATE
// ================================

const yearElement = document.querySelector("footer p");


if(yearElement){

    const currentYear = new Date().getFullYear();

    yearElement.innerHTML =
    yearElement.innerHTML.replace(
        "2026",
        currentYear
    );

}
