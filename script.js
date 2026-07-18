/* ===================================
   CWWRC WEBSITE
   SCRIPT.JS
   CLEAN VERSION
=================================== */


/* ===================================
   PART 1
   SETUP + VARIABLES
=================================== */


const menuToggle = document.getElementById("menu-toggle");

const navMenu = document.getElementById("nav-menu");

const header = document.querySelector("header");



/* ===================================
   PART 2
   MOBILE MENU
=================================== */


if(menuToggle && navMenu){


    menuToggle.addEventListener("click", () => {


        navMenu.classList.toggle("active");


        const isActive = navMenu.classList.contains("active");


        menuToggle.innerHTML = isActive ? "✕" : "☰";


        menuToggle.setAttribute(
            "aria-expanded",
            isActive
        );


    });



    // Close menu after clicking link

    document.querySelectorAll("nav a").forEach(link => {


        link.addEventListener("click", () => {


            if(window.innerWidth <= 768){


                navMenu.classList.remove("active");


                menuToggle.innerHTML = "☰";


                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


            }


        });


    });


}



/* ===================================
   PART 3
   HEADER SCROLL EFFECT
=================================== */


if(header){


    window.addEventListener("scroll", () => {


        if(window.scrollY > 80){


            header.classList.add("scrolled");


        }else{


            header.classList.remove("scrolled");


        }


    });


}



/* ===================================
   PART 4
   BUTTON RIPPLE EFFECT
=================================== */


document.querySelectorAll(".btn").forEach(button => {


    button.addEventListener("click", function(e){



        // Android vibration

        if(navigator.vibrate){


            navigator.vibrate(30);


        }



        // Create ripple

        const circle = document.createElement("span");



        const diameter = Math.max(

            this.clientWidth,

            this.clientHeight

        );



        const radius = diameter / 2;



        circle.style.width = `${diameter}px`;

        circle.style.height = `${diameter}px`;



        circle.style.left =

        `${e.clientX - this.getBoundingClientRect().left - radius}px`;



        circle.style.top =

        `${e.clientY - this.getBoundingClientRect().top - radius}px`;



        circle.classList.add("ripple");



        const oldRipple = this.querySelector(".ripple");



        if(oldRipple){


            oldRipple.remove();


        }



        this.appendChild(circle);



    });


});



/* ===================================
   PART 5
   FUTURE ANIMATION READY
=================================== */


// Future:
// Scroll reveal animations
// Gallery lightbox
// Dark mode
// Counter animations
// Loading screen
