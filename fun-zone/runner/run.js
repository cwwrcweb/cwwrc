const canvas=document.getElementById("gameCanvas");
const ctx=canvas.getContext("2d");

canvas.width=800;
canvas.height=300;

let gameState="READY";
let score=0;
let speed=6;
let bgMove=0;

let highScore=localStorage.getItem("wudangHighScore")||0;
document.getElementById("high-score").innerText=highScore;


const player={
x:80,
y:170,
w:80,
h:80,
v:0
};


let obstacles=[];
let herbs=[];
let timer=0;


const obs=[
"🗼","🚓","🚕","🚛","🚜",
"🏎️","🏍️","🛵","🚲","🛴","🚙"
];



function drawBackground(){

ctx.fillStyle="#111";
ctx.fillRect(0,0,800,300);

let p=bgMove%800;


ctx.font="90px Arial";
ctx.fillText("⛰️",50-p,140);
ctx.fillText("⛰️",700-p,140);


ctx.font="100px Arial";
ctx.fillText("🌲",120-p,230);
ctx.fillText("🌲",580-p,230);


ctx.font="85px Arial";
ctx.fillText("🏯",330-p,190);


ctx.font="55px Arial";
ctx.fillText("🚁",220-p,90);
ctx.fillText("☁️",500-p,110);


bgMove+=0.5;

}



function drawPlayer(){

ctx.font="60px Arial";
ctx.fillText("🧚",player.x,player.y+60);

}



function jump(){

if(player.y==170)
player.v=-14;

}


document.addEventListener("keydown",e=>{
if(e.code=="Space")jump();
});

canvas.addEventListener("touchstart",jump);



function createObstacle(){

obstacles.push({
x:800,
y:205,
w:55,
h:55,
e:obs[Math.floor(Math.random()*obs.length)]
});

}



function createHerb(){

herbs.push({
x:800,
y:130,
w:35,
h:35
});

}



function update(){

timer++;

if(timer>120){

createObstacle();
timer=0;

}


if(Math.random()<0.02)
createHerb();



obstacles.forEach(o=>o.x-=speed);
herbs.forEach(h=>h.x-=speed);



player.v+=0.8;
player.y+=player.v;


if(player.y>170){

player.y=170;
player.v=0;

}

}



function draw(){

obstacles.forEach(o=>{

ctx.font="50px Arial";
ctx.fillText(o.e,o.x,o.y+50);

});


herbs.forEach(h=>{

ctx.font="35px Arial";
ctx.fillText("✨️",h.x,h.y+30);

});

}



function collect(){

herbs.forEach((h,i)=>{

if(
player.x<h.x+h.w &&
player.x+player.w>h.x &&
player.y<h.y+h.h &&
player.y+player.h>h.y
){

herbs.splice(i,1);
score+=50;

}

});

}



function hit(){

return obstacles.some(o=>

player.x+15<o.x+o.w &&
player.x+player.w-15>o.x &&
player.y+15<o.y+o.h &&
player.y+player.h>o.y

);

}



function loop(){

if(gameState!="PLAYING")
return;


ctx.clearRect(0,0,800,300);


drawBackground();

update();

draw();

drawPlayer();

collect();


score++;
document.getElementById("restart-btn").onclick=()=>{

score=0;
highScore=0;

localStorage.removeItem("wudangHighScore");

document.getElementById("score").innerText=0;
document.getElementById("high-score").innerText=0;

obstacles=[];
herbs=[];

player.y=170;
player.v=0;

gameState="PLAYING";

loop();

};


alert("🧚 Training Complete!\nScore : "+score);

return;

}


requestAnimationFrame(loop);

}




document.getElementById("start-btn").onclick=()=>{

score=0;
obstacles=[];
herbs=[];

player.y=170;
player.v=0;

document.getElementById("score").innerText=0;

gameState="PLAYING";

loop();

};



document.getElementById("restart-btn").onclick=()=>{

score=0;
obstacles=[];
herbs=[];

player.y=170;
player.v=0;

gameState="PLAYING";

loop();

};

document.getElementById("pause-btn").onclick=()=>{

if(gameState==="PLAYING"){

gameState="PAUSED";
document.getElementById("pause-btn").innerText="Resume";

}else{

gameState="PLAYING";
document.getElementById("pause-btn").innerText="Pause";

loop();

}

};
