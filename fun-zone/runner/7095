/* ===================================
   CWWRC FUN ZONE
   FUN.JS ALPHA v1.0
   PART 1A
=================================== */


/* ================================
   ENGINE
================================ */

"use strict";

const FUN = {

version : "1.0 Alpha",

particles : [],

fireworks : [],

stars : [],

mouse : {

x : 0,

y : 0

},

width : window.innerWidth,

height : window.innerHeight

};




/* ================================
   RANDOM WELCOME
================================ */

const greetings = [

"🥋 Welcome to CWWRC Fun Zone",

"🌿 Ancient Wisdom Begins Here",

"⚔️ Prepare For Adventure",

"🧘 Balance • Knowledge • Fun",

"🎮 Have A Great Time"

];


window.addEventListener(

"load",

()=>{

console.log(

"Fun Zone Loaded"

);

welcome();

createCanvas();

createStars();

animate();

}

);





function welcome(){

const box = document.createElement(

"div"

);

box.innerHTML=

greetings[

Math.floor(

Math.random()

*

greetings.length

)

];


box.style.position="fixed";

box.style.top="40px";

box.style.left="50%";

box.style.transform="translateX(-50%)";

box.style.background="#111";

box.style.color="#fff";

box.style.padding="15px 30px";

box.style.border="2px solid gold";

box.style.borderRadius="40px";

box.style.zIndex="99999";

box.style.fontWeight="bold";

box.style.boxShadow="0 0 30px gold";

box.style.transition="1s";

document.body.appendChild(

box

);

setTimeout(

()=>{

box.style.opacity="0";

},

3000

);

setTimeout(

()=>{

box.remove();

},

4500

);

}




/* ================================
   CANVAS
================================ */

let canvas;

let ctx;

function createCanvas(){

canvas=document.createElement(

"canvas"

);

ctx=canvas.getContext(

"2d"

);

canvas.width=FUN.width;

canvas.height=FUN.height;

canvas.style.position="fixed";

canvas.style.left="0";

canvas.style.top="0";

canvas.style.pointerEvents="none";

canvas.style.zIndex="1";

document.body.appendChild(

canvas

);

}




/* ================================
   STARS
================================ */

function createStars(){

for(

let i=0;

i<120;

i++

){

FUN.stars.push({

x:Math.random()*FUN.width,

y:Math.random()*FUN.height,

r:Math.random()*2,

a:Math.random(),

s:Math.random()*0.02

});

}

}




/* ================================
   ANIMATION LOOP
================================ */

function animate(){

requestAnimationFrame(

animate

);

ctx.clearRect(

0,

0,

FUN.width,

FUN.height

);

drawStars();

}




/* ================================
   DRAW STARS
================================ */

function drawStars(){

FUN.stars.forEach(

star=>{

star.a+=star.s;

if(

star.a>1||

star.a<0

){

star.s*=-1;

}

ctx.beginPath();

ctx.arc(

star.x,

star.y,

star.r,

0,

Math.PI*2

);

ctx.fillStyle=

"rgba(255,215,0,"+

star.a+

")";

ctx.fill();

}

);

}




/* ================================
   RESIZE
================================ */

window.addEventListener(

"resize",

()=>{

FUN.width=window.innerWidth;

FUN.height=window.innerHeight;

canvas.width=FUN.width;

canvas.height=FUN.height;

}

);




/* ================================
   MOUSE
================================ */

window.addEventListener(

"mousemove",

e=>{

FUN.mouse.x=e.clientX;

FUN.mouse.y=e.clientY;

}

);




/* ===================================
   END OF PART 1A
=================================== */
/* ===================================
   CWWRC FUN ZONE
   FUN.JS ALPHA v1.0
   PART 1B
   FIREWORKS + PARTICLES
=================================== */


/* ================================
   FIREWORK CLASS
================================ */

class Firework {

    constructor(){

        this.x = Math.random() * FUN.width;

        this.y = FUN.height;

        this.targetY =
        Math.random() *
        (FUN.height * 0.5);

        this.speed =
        Math.random()*4 + 3;

        this.color =
        "hsl("+
        Math.random()*360+
        ",100%,60%)";

        this.exploded = false;

        this.particles = [];

    }



    update(){

        if(!this.exploded){

            this.y -= this.speed;


            if(this.y <= this.targetY){

                this.explode();

            }

        }


        this.particles.forEach(

            p=>p.update()

        );

    }



    draw(){

        if(!this.exploded){

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                3,
                0,
                Math.PI*2
            );

            ctx.fillStyle=this.color;

            ctx.fill();

        }


        this.particles.forEach(

            p=>p.draw()

        );

    }



    explode(){

        this.exploded=true;


        for(let i=0;i<50;i++){

            this.particles.push(

                new Spark(
                    this.x,
                    this.y,
                    this.color
                )

            );

        }

    }

}




/* ================================
   SPARK CLASS
================================ */

class Spark{


    constructor(x,y,color){

        this.x=x;

        this.y=y;

        this.color=color;

        this.size=
        Math.random()*3+1;


        this.speedX=
        (Math.random()-0.5)*8;


        this.speedY=
        (Math.random()-0.5)*8;


        this.life=100;

    }



    update(){

        this.x += this.speedX;

        this.y += this.speedY;

        this.life--;

        this.speedY +=0.05;

    }



    draw(){

        ctx.globalAlpha =
        this.life/100;


        ctx.beginPath();


        ctx.arc(

            this.x,

            this.y,

            this.size,

            0,

            Math.PI*2

        );


        ctx.fillStyle=this.color;

        ctx.fill();


        ctx.globalAlpha=1;

    }


}




/* ================================
   CREATE FIREWORK
================================ */

function launchFirework(){

    FUN.fireworks.push(

        new Firework()

    );

}




setInterval(

()=>{

    launchFirework();

},

1800

);





/* ================================
   UPDATE FIREWORK LOOP
================================ */

function drawFireworks(){

    FUN.fireworks.forEach(

        (fire,index)=>{


            fire.update();

            fire.draw();



            if(

                fire.exploded &&
                fire.particles.length===0

            ){

                FUN.fireworks.splice(
                    index,
                    1
                );

            }


        }

    );

}



/* ================================
   ADD TO MAIN ANIMATION
================================ */


const oldAnimate = animate;


animate=function(){


    requestAnimationFrame(

        animate

    );


    ctx.clearRect(

        0,

        0,

        FUN.width,

        FUN.height

    );


    drawStars();


    drawFireworks();


};




/* ===================================
   END PART 1B
=================================== */
/* ===================================
   CWWRC FUN ZONE
   FUN.JS ALPHA v1.0
   PART 2
   CARD EFFECTS
=================================== */


/* ================================
   GAME CARD ANIMATION
================================ */


function initGameCards(){

    const cards =
    document.querySelectorAll(
        ".game-card"
    );


    cards.forEach(

        (card,index)=>{


            card.style.opacity="0";

            card.style.transform=
            "translateY(60px)";


            setTimeout(()=>{


                card.style.transition=
                "0.8s ease";


                card.style.opacity="1";


                card.style.transform=
                "translateY(0)";


            },

            index*200);


            card.addEventListener(

                "mousemove",

                e=>{


                    const rect =
                    card.getBoundingClientRect();


                    const x =
                    e.clientX -
                    rect.left;


                    const y =
                    e.clientY -
                    rect.top;



                    const rotateY =
                    ((x /
                    rect.width)-0.5)*20;


                    const rotateX =
                    ((y /
                    rect.height)-0.5)*-20;



                    card.style.transform =
                    `
                    perspective(700px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(1.05)
                    `;


                }

            );




            card.addEventListener(

                "mouseleave",

                ()=>{


                    card.style.transform=
                    "translateY(0)";


                }

            );


        }

    );

}




/* ================================
   BUTTON EFFECT
================================ */


function buttonGlow(){

    const buttons =
    document.querySelectorAll(
        ".play-btn"
    );


    buttons.forEach(

        btn=>{


            btn.addEventListener(

                "mouseenter",

                ()=>{

                    btn.style.boxShadow=
                    "0 0 25px gold";

                }

            );



            btn.addEventListener(

                "mouseleave",

                ()=>{

                    btn.style.boxShadow=
                    "none";

                }

            );


        }

    );

}




/* ================================
   RANDOM SPARKLES
================================ */


function createSparkle(){


    const sparkle =
    document.createElement(
        "div"
    );


    sparkle.innerHTML="✨";


    sparkle.style.position=
    "fixed";


    sparkle.style.left =
    Math.random()*100+"%";


    sparkle.style.top =
    "100%";


    sparkle.style.fontSize =
    Math.random()*20+10+"px";


    sparkle.style.zIndex=
    "999";


    sparkle.style.pointerEvents=
    "none";


    sparkle.style.animation=
    "sparkMove 5s linear";



    document.body.appendChild(
        sparkle
    );



    setTimeout(

        ()=>{

            sparkle.remove();

        },

        5000

    );

}



setInterval(

    createSparkle,

    700

);





/* ================================
   INIT
================================ */


window.addEventListener(

"load",

()=>{

    initGameCards();

    buttonGlow();

}

);





/* ===================================
   END PART 2
=================================== */



/* ===================================
   CWWRC FUN ZONE
   FUN.JS ALPHA v1.0
   PART 3
   TRANSITIONS + EXTRAS
=================================== */


/* ================================
   PAGE FADE OUT
================================ */


function createFadeScreen(){

    const fade =
    document.createElement(
        "div"
    );


    fade.id="fun-fade";


    fade.style.position=
    "fixed";

    fade.style.left="0";

    fade.style.top="0";

    fade.style.width="100%";

    fade.style.height="100%";

    fade.style.background="#000";

    fade.style.opacity="0";

    fade.style.pointerEvents="none";

    fade.style.transition=
    "opacity 0.8s ease";

    fade.style.zIndex="999999";


    document.body.appendChild(
        fade
    );


    return fade;

}




function enablePageTransition(){


    const links =
    document.querySelectorAll(
        "a"
    );


    const fade =
    createFadeScreen();



    links.forEach(

        link=>{


            link.addEventListener(

                "click",

                e=>{


                    const url =
                    link.href;



                    if(

                    url &&
                    url.includes(
                    "fun-zone"
                    )

                    ){


                        e.preventDefault();



                        fade.style.pointerEvents=
                        "all";



                        fade.style.opacity=
                        "1";



                        setTimeout(

                            ()=>{

                                window.location.href=
                                url;


                            },

                            800

                        );


                    }


                }

            );


        }

    );

}





/* ================================
   SOUND MANAGER
================================ */


const SoundManager = {


enabled:false,


play:function(){

    if(!this.enabled)
    return;


    // Future sound system

},



toggle:function(){

    this.enabled =
    !this.enabled;


}

};






/* ================================
   SECRET EASTER EGG
================================ */


let secretCode=[];


const secretKeys=[

"c",
"w",
"w",
"r",
"c"

];



window.addEventListener(

"keydown",

e=>{


    secretCode.push(

        e.key.toLowerCase()

    );



    secretCode.splice(

        -secretKeys.length-1,

        secretCode.length-secretKeys.length

    );



    if(

    secretCode.join("")
    ===
    secretKeys.join("")

    ){


        alert(

        "🥋 CWWRC Secret Mode Activated!"

        );


        launchFirework();


    }


}

);






/* ================================
   DAILY QUOTE
================================ */


const quotes=[

"🥋 Discipline creates mastery",

"🌿 Ancient wisdom lives forever",

"🧘 Balance creates strength",

"⚔️ Knowledge is the true weapon"

];



function showQuote(){


console.log(

quotes[

Math.floor(
Math.random()*
quotes.length
)

]

);


}



window.addEventListener(

"load",

()=>{


    enablePageTransition();

    showQuote();


}

);





/* ===================================
   END PART 3
=================================== */


