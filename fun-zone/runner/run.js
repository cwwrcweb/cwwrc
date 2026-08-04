const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 300;

let gameState = "READY";
let score = 0;
let lives = 3;
let maxLives = 3;
let qiEnergy = 0;
let qiMax = 100;
let qiShield = false;
let speed = 6;
let bgMove = 0;
let frameId = null;
let invincible = false;
let invincibleTimer = 0;

let highScore = localStorage.getItem("wudangHighScore") || 0;
document.getElementById("high-score").innerText = highScore;

const player = {
    x: 80,
    y: 170,
    w: 80,
    h: 80,
    v: 0
};

let obstacles = [];
let herbs = [];
let qiItems = [];
let timer = 0;

const obs = [
    "🗼", "🚓", "🚕", "🚛", "🚜",
    "🏎️", "🏍️", "🛵", "🚲", "🛴", "🚙"
];

function updateLives() {
    let e = document.getElementById("lives-display");
    if (!e) return;
    e.innerText = lives == 3 ? "🧡💛💚" : lives == 2 ? "🧡💛" : lives == 1 ? "🧡" : "💔";
}

function updateQi() {
    let e = document.getElementById("qi-display");
    if (!e) return;
    e.innerText = "☯ Qi " + qiEnergy + "/" + qiMax + (qiShield ? " 🛡️" : "");
}

function showNotification(t, c = "#00ffff") {
    let e = document.getElementById("notification");
    if (!e) return;
    e.innerText = t;
    e.style.color = c;
    e.style.opacity = 1;
    setTimeout(() => {
        e.style.opacity = 0;
    }, 1200);
}

function addQi(n) {
    qiEnergy += n;
    if (qiEnergy >= qiMax) {
        qiEnergy = 0;
        qiShield = true;
        showNotification("☯ Qi Shield Active! 🛡️", "#00ffff");
    }
    updateQi();
}

function createUI() {
    let box = document.querySelector(".game-info");
    if (!box) return;

    if (!document.getElementById("lives-display")) {
        let d = document.createElement("div");
        d.id = "lives-display";
        box.appendChild(d);
    }

    if (!document.getElementById("qi-display")) {
        let d = document.createElement("div");
        d.id = "qi-display";
        box.appendChild(d);
    }

    if (!document.getElementById("notification")) {
        let d = document.createElement("div");
        d.id = "notification";
        document.body.appendChild(d);
    }

    updateLives();
    updateQi();
}

function drawBackground() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, 800, 300);

    let p = bgMove % 800;

    ctx.font = "90px Arial";
    ctx.fillText("⛰️", 50 - p, 140);
    ctx.fillText("⛰️", 700 - p, 140);

    ctx.font = "100px Arial";
    ctx.fillText("🌲", 120 - p, 230);
    ctx.fillText("🌲", 580 - p, 230);

    ctx.font = "85px Arial";
    ctx.fillText("🏯", 330 - p, 190);

    ctx.font = "55px Arial";
    ctx.fillText("☁️", 500 - p, 110);

    bgMove += 0.5;
}

function drawPlayer() {
    ctx.globalAlpha = invincible && Math.floor(Date.now() / 150) % 2 == 0 ? 0.4 : 1;
    ctx.font = "60px Arial";
    ctx.fillText("🧚", player.x, player.y + 60);
    ctx.globalAlpha = 1;
}

function jump() {
    if (player.y == 170) player.v = -14;
}

document.addEventListener("keydown", e => {
    if (e.code == "Space" && gameState == "PLAYING") {
        e.preventDefault();
        jump();
    }
});

canvas.addEventListener("touchstart", () => {
    if (gameState == "PLAYING") jump();
});

function createObstacle() {
    obstacles.push({
        x: 800,
        y: 205,
        w: 55,
        h: 55,
        e: obs[Math.floor(Math.random() * obs.length)]
    });
}

function createHerb() {
    herbs.push({
        x: 800,
        y: 130,
        w: 35,
        h: 35
    });
}

function createQi() {
    qiItems.push({
        x: 800,
        y: 80 + Math.random() * 120,
        w: 35,
        h: 35
    });
}

function update() {
    timer++;

    if (timer > 120) {
        createObstacle();
        timer = 0;
    }

    if (Math.random() < 0.02) createHerb();
    if (Math.random() < 0.01) createQi();

    obstacles.forEach(o => o.x -= speed);
    herbs.forEach(h => h.x -= speed);
    qiItems.forEach(q => q.x -= speed);

    player.v += 0.8;
    player.y += player.v;

    if (player.y > 170) {
        player.y = 170;
        player.v = 0;
    }

    obstacles = obstacles.filter(o => o.x + o.w > 0);
    herbs = herbs.filter(h => h.x + h.w > 0);
    qiItems = qiItems.filter(q => q.x + q.w > 0);

    if (invincible) {
        invincibleTimer--;
        if (invincibleTimer <= 0)
            invincible = false;
    }
}

function draw() {
    obstacles.forEach(o => {
        ctx.font = "50px Arial";
        ctx.fillText(o.e, o.x, o.y + 50);
    });

    herbs.forEach(h => {
        ctx.font = "35px Arial";
        ctx.fillText("✨", h.x, h.y + 30);
    });

    qiItems.forEach(q => {
        ctx.font = "35px Arial";
        ctx.shadowColor = "#00ffff";
        ctx.shadowBlur = 20;
        ctx.fillText("☯", q.x, q.y + 30);
        ctx.shadowBlur = 0;
    });
}

function collect() {
    herbs.forEach((h, i) => {
        if (
            player.x < h.x + h.w &&
            player.x + player.w > h.x &&
            player.y < h.y + h.h &&
            player.y + player.h > h.y
        ) {
            herbs.splice(i, 1);
            score += 50;
        }
    });

    qiItems.forEach((q, i) => {
        if (
            player.x < q.x + q.w &&
            player.x + player.w > q.x &&
            player.y < q.y + q.h &&
            player.y + player.h > q.y
        ) {
            qiItems.splice(i, 1);
            addQi(20);
            showNotification("☯ +20 Qi", "#00ffff");
        }
    });

    document.getElementById("score").innerText = score;
}

function hit() {
    if (invincible) return false;

    return obstacles.some(o =>
        player.x + 20 < o.x + o.w &&
        player.x + player.w - 20 > o.x &&
        player.y + 20 < o.y + o.h &&
        player.y + player.h > o.y
    );
}

// ✅ FIXED: මෙතන තිබුණ syntax error එක නිවැරදි කළා
function loseLife() {
    if (qiShield) {
        qiShield = false;
        updateQi();
        showNotification("🛡️ Shield Saved You!", "#ffd700");
        return;
    }

    lives--;
    updateLives();

    if (lives <= 0) {
        gameOver();
        return;
    }

    invincible = true;
    invincibleTimer = 120;

    obstacles = obstacles.filter(o => o.x > 200);  // ✅ මෙතන හරි කළා
    showNotification("💔 Lost a life!", "#ff0000");
}

function gameOver() {
    gameState = "GAMEOVER";

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("wudangHighScore", highScore);
        document.getElementById("high-score").innerText = highScore;
    }

    if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = null;
    }

    ctx.fillStyle = "rgba(0,0,0,.8)";
    ctx.fillRect(0, 0, 800, 300);

    ctx.textAlign = "center";
    ctx.fillStyle = "#ffd700";
    ctx.font = "50px Arial";
    ctx.fillText("💀 GAME OVER 💀", 400, 120);

    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + score, 400, 180);

    ctx.font = "35px Arial";
    ctx.fillText(
        "Lives: " + (lives == 3 ? "🧡💛💚" : lives == 2 ? "🧡💛" : lives == 1 ? "🧡" : "💔"),
        400, 230
    );

    ctx.fillStyle = "#00ffff";
    ctx.font = "25px Arial";
    ctx.fillText("☯ Qi: " + qiEnergy + "/" + qiMax + (qiShield ? " 🛡️" : ""), 400, 280);

    ctx.textAlign = "start";
}

function loop() {
    if (gameState != "PLAYING") return;

    ctx.clearRect(0, 0, 800, 300);

    drawBackground();
    update();
    draw();
    drawPlayer();

    score++;
    collect();

    if (hit()) loseLife();

    document.getElementById("score").innerText = score;

    frameId = requestAnimationFrame(loop);
}

function startGame() {
    if (frameId) {
        cancelAnimationFrame(frameId);
    }

    score = 0;
    lives = 3;
    qiEnergy = 0;
    qiShield = false;
    obstacles = [];
    herbs = [];
    qiItems = [];
    timer = 0;

    player.y = 170;
    player.v = 0;

    bgMove = 0;
    invincible = false;

    updateLives();
    updateQi();

    document.getElementById("score").innerText = 0;
    document.getElementById("pause-btn").innerText = "⏸ Pause";

    gameState = "PLAYING";
    loop();
}

function addStyles() {
    let s = document.createElement("style");

    s.textContent = `
        #lives-display {
            font-size: 2rem;
            font-weight: bold;
            min-width: 120px;
        }
        #qi-display {
            font-size: 1.3rem;
            color: #00ffff;
            font-weight: bold;
            min-width: 140px;
            text-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
        }
        #notification {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            font-weight: bold;
            opacity: 0;
            transition: .4s;
            pointer-events: none;
            z-index: 10;
            background: rgba(0,0,0,0.7);
            padding: 20px 40px;
            border-radius: 20px;
            border: 2px solid rgba(0,255,255,0.3);
            text-shadow: 0 0 30px rgba(0,255,255,0.5);
        }
        .game-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
        }
        @media(max-width: 600px) {
            #lives-display { font-size: 1.5rem; }
            #qi-display { font-size: 1rem; }
            #notification { font-size: 2rem; padding: 15px 25px; }
        }
    `;

    document.head.appendChild(s);
}

document.getElementById("start-btn").onclick = startGame;
document.getElementById("restart-btn").onclick = startGame;

document.getElementById("pause-btn").onclick = () => {
    if (gameState == "PLAYING") {
        gameState = "PAUSED";
        document.getElementById("pause-btn").innerText = "▶ Resume";

        if (frameId) {
            cancelAnimationFrame(frameId);
            frameId = null;
        }
    } else if (gameState == "PAUSED") {
        gameState = "PLAYING";
        document.getElementById("pause-btn").innerText = "⏸ Pause";
        loop();
    }
};

window.onload = () => {
    addStyles();
    createUI();

    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, 800, 300);

    ctx.fillStyle = "#ffd700";
    ctx.font = "36px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
        "☯ Click Start Training ☯",
        400,
        150
    );

    ctx.textAlign = "start";
};
