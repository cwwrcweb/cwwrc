/* ===================================
   CWWRC WEBSITE
   SCRIPT.JS ALPHA v4.0
   PART 1/2
=================================== */



/* ================================
   ELEMENTS
================================ */


const menuToggle = document.getElementById(
    "menu-toggle"
);


const navMenu = document.getElementById(
    "nav-menu"
);


const header = document.getElementById(
    "header"
);









/* ================================
   MOBILE MENU
================================ */


if(menuToggle && navMenu){


menuToggle.addEventListener(
"click",
()=>{


navMenu.classList.toggle(
"active"
);



const opened =
navMenu.classList.contains(
"active"
);



menuToggle.innerHTML =
opened ? "✕" : "☰";



menuToggle.setAttribute(
"aria-expanded",
opened
);



}

);







/* CLOSE AFTER CLICK LINK */


document.querySelectorAll(
"nav a"
)
.forEach(link=>{


link.addEventListener(
"click",
()=>{


navMenu.classList.remove(
"active"
);



menuToggle.innerHTML =
"☰";



menuToggle.setAttribute(
"aria-expanded",
"false"
);



}

);


});







/* CLICK OUTSIDE CLOSE */


document.addEventListener(
"click",
(event)=>{


const inside =
navMenu.contains(
event.target
)
||
menuToggle.contains(
event.target
);



if(!inside){


navMenu.classList.remove(
"active"
);



menuToggle.innerHTML =
"☰";



menuToggle.setAttribute(
"aria-expanded",
"false"
);



}


}

);



}









/* ================================
   HEADER SCROLL EFFECT
================================ */


if(header){


window.addEventListener(
"scroll",
()=>{


if(window.scrollY > 60){


header.classList.add(
"scrolled"
);



}
else{


header.classList.remove(
"scrolled"
);



}


}

);



}









/* ================================
   ACTIVE NAVIGATION
================================ */


const sections =
document.querySelectorAll(
"section"
);



const navLinks =
document.querySelectorAll(
"nav a"
);






window.addEventListener(
"scroll",
()=>{


let current = "";



sections.forEach(
section=>{


const sectionTop =
section.offsetTop - 120;



if(
scrollY >= sectionTop
){


current =
section.getAttribute(
"id"
);



}


}

);






navLinks.forEach(
link=>{


link.style.color =
"white";



if(
link.getAttribute("href")
===
"#" + current
){


link.style.color =
"#d4af37";



}


}

);



}

);

/* ===================================
   CWWRC WEBSITE
   SCRIPT.JS ALPHA v4.0
   PART 2/2
=================================== */





/* ================================
   BUTTON RIPPLE EFFECT
================================ */


document.querySelectorAll(
".btn"
)
.forEach(button=>{


button.addEventListener(
"click",
function(event){



if(navigator.vibrate){

navigator.vibrate(30);

}






const ripple =
document.createElement(
"span"
);





const size =
Math.max(
this.offsetWidth,
this.offsetHeight
);





ripple.style.width =
size + "px";



ripple.style.height =
size + "px";





const rect =
this.getBoundingClientRect();





ripple.style.left =
event.clientX -
rect.left -
size / 2
+ "px";





ripple.style.top =
event.clientY -
rect.top -
size / 2
+ "px";





ripple.classList.add(
"ripple"
);






const oldRipple =
this.querySelector(
".ripple"
);





if(oldRipple){

oldRipple.remove();

}





this.appendChild(
ripple
);



}

);



});









/* ================================
   SCROLL REVEAL ANIMATION
================================ */


const revealItems =
document.querySelectorAll(
"section, .card, .gallery-item, .training-card, .highlight-box, .contact-card"
);





const revealObserver =
new IntersectionObserver(
(entries)=>{


entries.forEach(
entry=>{


if(entry.isIntersecting){


entry.target.classList.add(
"show"
);



}



}

);



},
{

threshold:0.15

}

);






revealItems.forEach(
item=>{


item.classList.add(
"reveal"
);



revealObserver.observe(
item
);



}

);









/* ================================
   ESC CLOSE MENU
================================ */


document.addEventListener(
"keydown",
(event)=>{


if(
event.key === "Escape"
){



if(navMenu){


navMenu.classList.remove(
"active"
);



}





if(menuToggle){


menuToggle.innerHTML =
"☰";



menuToggle.setAttribute(
"aria-expanded",
"false"
);



}



}



}

);









/* ================================
   IMAGE LOADING OPTIMIZATION
================================ */


document.querySelectorAll(
"img"
)
.forEach(
image=>{


image.loading =
"lazy";



}

);
