const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 300;

// ============ GAME STATE ============
let gameState = "READY";
let score = 0;
let lives = 3;
let maxLives = 3;
let qiEnergy = 0;
let qiMax = 100;
let qiShield = false;
let qiReserveCount = 0;

// 🆕 Attack Charges System
let attackCharges = 5;
let maxAttackCharges = 5;

let speed = 6;
let maxSpeed = 14;
let bgMove = 0;
let frameId = null;
let invincible = false;
let invincibleTimer = 0;
let lastTime = 0;
let scoreTimer = 0;
let lastSpeedUpdate = 0;

// ============ NOTIFICATION SYSTEM ============
let notificationText = "";
let notificationColor = "#00ffff";
let notificationTimer = 0;
const NOTIFICATION_DURATION = 90;

// ============ ATTACK SYSTEM ============
let attackActive = false;
let attackTimer = 0;
let attackCooldown = 0;
const ATTACK_DURATION = 30;
const ATTACK_COOLDOWN = 60;
let energyWave = null;

// ============ HIGH SCORE ============
let highScore = localStorage.getItem("wudangHighScore") || 0;
document.getElementById("high-score").innerText = highScore;

// ============ PLAYER ============
const player = {
    x: 80,
    y: 170,
    w: 80,
    h: 80,
    v: 0
};

// ============ ARRAYS ============
let obstacles = [];
let herbs = [];
let qiItems = [];
let timer = 0;

// ============ OBSTACLE TYPES ============
const obs = [
    "🗼", "🚓", "🚕", "🚛", "🚜",
    "🏎️", "🏍️", "🛵", "🚲", "🛴", "🚙"
];

// ============ UI FUNCTIONS ============
function updateLives() {
    let e = document.getElementById("lives-display");
    if (!e) return;
    e.innerText = lives == 3 ? "🧡💛💚" : lives == 2 ? "🧡💛" : lives == 1 ? "🧡" : "💔";
}

function updateQi() {
    let e = document.getElementById("qi-display");
    if (!e) return;
    
    let display = "☯ Qi " + qiEnergy + "/" + qiMax;
    if (qiShield) display += " 🛡️";
    if (qiReserveCount > 0) display += " x" + qiReserveCount;
    
    e.innerText = display;
}

// 🆕 Update Attack Charges Display
function updateAttackCharges() {
    let e = document.getElementById("attack-display");
    if (!e) return;
    
    let swords = "";
    for (let i = 0; i < attackCharges; i++) {
        swords += "🗡️";
    }
    if (attackCharges === 0) {
        swords = "⚠️";
    }
    e.innerText = swords || "⚠️";
}

// ============ NOTIFICATION ============
function showNotification(t, c = "#00ffff") {
    let e = document.getElementById("notification-msg");
    if (!e) return;
    
    notificationText = t;
    notificationColor = c;
    notificationTimer = NOTIFICATION_DURATION;
    
    e.innerText = t;
    e.style.color = c;
    e.style.borderColor = c;
    e.style.boxShadow = `0 0 20px ${c}44, inset 0 0 20px ${c}22`;
    e.style.opacity = 1;
    e.style.transform = "translateX(0) translateY(0)";
    
    // Add class for color styling
    e.className = "";
    if (t.includes("Shield")) e.classList.add("shield");
    else if (t.includes("Qi")) e.classList.add("qi");
    else if (t.includes("Life")) e.classList.add("life");
    else if (t.includes("Speed")) e.classList.add("speed");
    else if (t.includes("Wave")) e.classList.add("wave");
    else if (t.includes("Destroyed")) e.classList.add("destroy");
    else if (t.includes("⚠️")) e.classList.add("error");
}

function updateNotification() {
    let e = document.getElementById("notification-msg");
    if (!e) return;
    
    if (notificationTimer > 0) {
        notificationTimer--;
        e.style.opacity = 1;
        e.style.transform = "translateX(0) translateY(0)";
        e.classList.add("show");
    } else {
        e.style.opacity = 0;
        e.style.transform = "translateX(0) translateY(-8px)";
        e.classList.remove("show");
    }
}

// ============ QI SYSTEM ============
function addQi(n) {
    qiEnergy += n;
    
    while (qiEnergy >= qiMax) {
        qiEnergy -= qiMax;
        if (!qiShield) {
            qiShield = true;
            showNotification("🛡️ Shield Active!", "#00ffff");
        } else {
            qiReserveCount++;
            showNotification("📦 +1 Reserve", "#ffd700");
        }
    }
    updateQi();
}

// ============ 🆕 ATTACK CHARGE SYSTEM ============
function addAttackCharge() {
    if (attackCharges < maxAttackCharges) {
        attackCharges++;
        updateAttackCharges();
        showNotification("🗡️ +1 Attack!", "#ffd700");
    } else {
        showNotification("⚠️ Max Attacks!", "#ff6b6b");
    }
}

function useAttackCharge() {
    if (attackCharges <= 0) {
        showNotification("⚠️ No Attacks Left!", "#ff6b6b");
        return false;
    }
    attackCharges--;
    updateAttackCharges();
    return true;
}

// ============ SPEED SYSTEM ============
function updateSpeed() {
    let newSpeed = 6 + Math.floor(score / 300) * 0.5;
    if (newSpeed > speed) {
        speed = Math.min(newSpeed, maxSpeed);
        showNotification("⚡ Speed: " + speed.toFixed(1), "#ffd700");
    }
}

// ============ ATTACK SYSTEM ============
function createEnergyWave() {
    energyWave = {
        x: player.x + player.w,
        y: player.y + 15,
        w: 150,
        h: 45,
        speed: 12,
        active: true
    };
}

function drawEnergyWave() {
    if (!energyWave || !energyWave.active) return;
    
    ctx.shadowColor = '#00ffff';
    ctx.shadowBlur = 40;
    
    let gradient = ctx.createLinearGradient(
        energyWave.x, energyWave.y,
        energyWave.x + energyWave.w, energyWave.y + energyWave.h
    );
    gradient.addColorStop(0, 'rgba(0, 255, 255, 0.9)');
    gradient.addColorStop(0.4, 'rgba(100, 255, 255, 0.6)');
    gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    const r = 20;
    ctx.moveTo(energyWave.x + r, energyWave.y);
    ctx.lineTo(energyWave.x + energyWave.w - r, energyWave.y);
    ctx.quadraticCurveTo(energyWave.x + energyWave.w, energyWave.y, energyWave.x + energyWave.w, energyWave.y + r);
    ctx.lineTo(energyWave.x + energyWave.w, energyWave.y + energyWave.h - r);
    ctx.quadraticCurveTo(energyWave.x + energyWave.w, energyWave.y + energyWave.h, energyWave.x + energyWave.w - r, energyWave.y + energyWave.h);
    ctx.lineTo(energyWave.x + r, energyWave.y + energyWave.h);
    ctx.quadraticCurveTo(energyWave.x, energyWave.y + energyWave.h, energyWave.x, energyWave.y + energyWave.h - r);
    ctx.lineTo(energyWave.x, energyWave.y + r);
    ctx.quadraticCurveTo(energyWave.x, energyWave.y, energyWave.x + r, energyWave.y);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
    
    ctx.font = "45px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 20;
    ctx.fillText("⚔️", energyWave.x + energyWave.w/2, energyWave.y + 37);
    ctx.shadowBlur = 0;
    ctx.textAlign = "start";
}

function updateEnergyWave() {
    if (!energyWave || !energyWave.active) return;
    
    energyWave.x += energyWave.speed;
    
    obstacles.forEach((o, i) => {
        if (energyWave.x < o.x + o.w &&
            energyWave.x + energyWave.w > o.x &&
            energyWave.y < o.y + o.h &&
            energyWave.y + energyWave.h > o.y) {
            obstacles.splice(i, 1);
            score += 100;
            document.getElementById("score").innerText = score;
            showNotification("💥 +100 Destroyed!", "#ffd700");
        }
    });
    
    if (energyWave.x > 900) {
        energyWave.active = false;
    }
}

// 🆕 ATTACK FUNCTION - Uses Charges
function attack() {
    if (gameState != "PLAYING") return;
    if (attackCooldown > 0) {
        showNotification("⏳ " + Math.ceil(attackCooldown/60) + "s", "#ff6b6b");
        return;
    }
    
    // 🆕 Check attack charges
    if (!useAttackCharge()) {
        return;
    }
    
    attackActive = true;
    attackTimer = ATTACK_DURATION;
    attackCooldown = ATTACK_COOLDOWN;
    createEnergyWave();
    showNotification("⚔️ Attack! (" + attackCharges + " left)", "#00ffff");
}

// ============ UI CREATION ============
function createUI() {
    let box = document.querySelector(".game-info");
    if (!box) return;

    // Lives display
    if (!document.getElementById("lives-display")) {
        let d = document.createElement("div");
        d.id = "lives-display";
        d.style.cssText = "font-size:2rem;font-weight:bold;min-width:120px;";
        box.appendChild(d);
    }

    // 🆕 Attack Charges Display (after lives)
    if (!document.getElementById("attack-display")) {
        let d = document.createElement("div");
        d.id = "attack-display";
        d.style.cssText = `
            font-size: 1.3rem;
            font-weight: bold;
            min-width: 80px;
            text-align: center;
            color: #ff6b6b;
            text-shadow: 0 0 15px rgba(255, 107, 107, 0.3);
            letter-spacing: 2px;
        `;
        box.appendChild(d);
    }

    // Notification
    if (!document.getElementById("notification-msg")) {
        let d = document.createElement("div");
        d.id = "notification-msg";
        d.style.cssText = `
            font-size: 1.1rem;
            font-weight: bold;
            padding: 4px 18px;
            border-radius: 20px;
            background: rgba(0, 0, 0, 0.75);
            border: 1.5px solid #00ffff;
            box-shadow: 0 0 20px rgba(0,255,255,0.2);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            transition: all 0.4s ease;
            opacity: 0;
            transform: translateY(-8px);
            text-shadow: 0 0 15px currentColor;
            white-space: nowrap;
            min-width: 100px;
            text-align: center;
            color: #00ffff;
            margin: 0 5px;
            flex-shrink: 0;
        `;
        box.appendChild(d);
    }

    // Qi display
    if (!document.getElementById("qi-display")) {
        let d = document.createElement("div");
        d.id = "qi-display";
        d.style.cssText = "font-size:1.3rem;color:#00ffff;font-weight:bold;min-width:160px;text-shadow:0 0 15px rgba(0,255,255,0.3);";
        box.appendChild(d);
    }

    updateLives();
    updateQi();
    updateAttackCharges();
}

// ============ DRAW FUNCTIONS ============
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
    
    let char = "😃";
    if (qiShield) {
        char = "😀";
    } else if (qiEnergy > 70) {
        char = "😀";
    } else if (qiEnergy > 30) {
        char = "🤓";
    }
    
    ctx.fillText(char, player.x, player.y + 60);
    ctx.globalAlpha = 1;
}

// ============ INPUT CONTROLS ============
function jump() {
    if (player.y == 170) player.v = -14;
}

document.addEventListener("keydown", e => {
    if (e.code == "Space" && gameState == "PLAYING") {
        e.preventDefault();
        jump();
    }
    if ((e.code == "KeyA" || e.code == "KeyZ") && gameState == "PLAYING") {
        e.preventDefault();
        attack();
    }
});

canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    if (gameState == "PLAYING") {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        const touchX = (touch.clientX - rect.left) * scaleX;
        const touchY = (touch.clientY - rect.top) * scaleY;
        
        if (touchX >= 680 && touchX <= 790 && touchY >= 5 && touchY <= 40) {
            attack();
            return;
        }
        
        jump();
    }
});

// ============ CREATE FUNCTIONS ============
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

// ============ UPDATE ============
function update() {
    timer++;

    let spawnRate = Math.max(80, 120 - Math.floor(speed * 2));
    if (timer > spawnRate) {
        createObstacle();
        timer = 0;
    }

    if (Math.random() < 0.02) createHerb();
    if (Math.random() < 0.01 + speed * 0.001) createQi();

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

    if (attackCooldown > 0) attackCooldown--;
    if (attackTimer > 0) attackTimer--;
    if (attackTimer <= 0) attackActive = false;
    
    updateEnergyWave();
    updateNotification();
}

// ============ DRAW ============
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
        ctx.fillText("☯️", q.x, q.y + 30);
        ctx.shadowBlur = 0;
    });
    
    drawEnergyWave();
    drawAttackButton();
}

// ============ DRAW ATTACK BUTTON ============
function drawAttackButton() {
    if (gameState != "PLAYING") return;
    
    const btnX = 680;
    const btnY = 6;
    const btnW = 110;
    const btnH = 34;
    
    ctx.shadowColor = '#00ffff';
    ctx.shadowBlur = 15;
    
    let gradient = ctx.createLinearGradient(btnX, btnY, btnX, btnY + btnH);
    if (attackCooldown > 0) {
        gradient.addColorStop(0, '#2d3436');
        gradient.addColorStop(1, '#1a1a2e');
    } else if (attackCharges <= 0) {
        gradient.addColorStop(0, '#4a4a4a');
        gradient.addColorStop(1, '#2d2d2d');
    } else {
        gradient.addColorStop(0, '#e17055');
        gradient.addColorStop(1, '#d63031');
    }
    ctx.fillStyle = gradient;
    
    const r = 12;
    ctx.beginPath();
    ctx.moveTo(btnX + r, btnY);
    ctx.lineTo(btnX + btnW - r, btnY);
    ctx.quadraticCurveTo(btnX + btnW, btnY, btnX + btnW, btnY + r);
    ctx.lineTo(btnX + btnW, btnY + btnH - r);
    ctx.quadraticCurveTo(btnX + btnW, btnY + btnH, btnX + btnW - r, btnY + btnH);
    ctx.lineTo(btnX + r, btnY + btnH);
    ctx.quadraticCurveTo(btnX, btnY + btnH, btnX, btnY + btnH - r);
    ctx.lineTo(btnX, btnY + r);
    ctx.quadraticCurveTo(btnX, btnY, btnX + r, btnY);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
    
    ctx.strokeStyle = attackCooldown > 0 ? '#ff6b6b' : 
                      attackCharges <= 0 ? '#636e72' : '#ff6b6b';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    ctx.font = "bold 13px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    let text = "⚔️ Attack";
    let textColor = "#ffffff";
    
    if (attackCooldown > 0) {
        text = "⏳ " + Math.ceil(attackCooldown/60) + "s";
        textColor = "#ff6b6b";
    } else if (attackCharges <= 0) {
        text = "⚠️ No Attack";
        textColor = "#636e72";
    }
    
    ctx.fillStyle = textColor;
    ctx.shadowColor = textColor;
    ctx.shadowBlur = 10;
    ctx.fillText(text, btnX + btnW/2, btnY + btnH/2 + 1);
    ctx.shadowBlur = 0;
    ctx.textAlign = "start";
    ctx.textBaseline = "alphabetic";
}

// ============ COLLECT ============
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
            document.getElementById("score").innerText = score;
            
            // 🆕 Collecting herbs gives attack charge!
            addAttackCharge();
            
            if (Math.floor(score / 300) > lastSpeedUpdate) {
                lastSpeedUpdate = Math.floor(score / 300);
                updateSpeed();
            }
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
}

// ============ HIT DETECTION ============
function hit() {
    if (invincible) return false;

    return obstacles.some(o =>
        player.x + 20 < o.x + o.w &&
        player.x + player.w - 20 > o.x &&
        player.y + 20 < o.y + o.h &&
        player.y + player.h > o.y
    );
}

// ============ LOSE LIFE ============
function loseLife() {
    if (qiShield) {
        qiShield = false;
        invincible = true;
        invincibleTimer = 90;
        updateQi();
        showNotification("🛡️ Shield Saved!", "#ffd700");
        return;
    }
    
    if (qiReserveCount > 0) {
        qiReserveCount--;
        qiShield = true;
        invincible = true;
        invincibleTimer = 60;
        updateQi();
        showNotification("📦 Shield!", "#ffd700");
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
    obstacles = obstacles.filter(o => o.x > 200);
    showNotification("💔 Life Lost!", "#ff0000");
}

// ============ GAME OVER ============
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

    ctx.fillStyle = "rgba(0,0,0,.85)";
    ctx.fillRect(0, 0, 800, 300);

    ctx.textAlign = "center";
    
    ctx.fillStyle = "#ffd700";
    ctx.font = "50px Arial";
    ctx.shadowColor = "#ffd700";
    ctx.shadowBlur = 30;
    ctx.fillText("💀 GAME OVER 💀", 400, 120);
    ctx.shadowBlur = 0;

    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + score, 400, 180);

    ctx.font = "35px Arial";
    ctx.fillText(
        "Lives: " + (lives == 3 ? "🧡💛💚" : lives == 2 ? "🧡💛" : lives == 1 ? "🧡" : "💔"),
        400, 230
    );

    // 🆕 Show Attack Charges in Game Over
    ctx.fillStyle = "#ff6b6b";
    ctx.font = "25px Arial";
    let attackDisplay = "🗡️ Attacks: ";
    for (let i = 0; i < attackCharges; i++) {
        attackDisplay += "🗡️";
    }
    if (attackCharges === 0) attackDisplay += "⚠️";
    ctx.fillText(attackDisplay, 400, 275);

    ctx.textAlign = "start";
}

// ============ MAIN GAME LOOP ============
function loop(timestamp) {
    if (gameState != "PLAYING") return;

    if (lastTime === 0) {
        lastTime = timestamp;
    }
    let deltaTime = Math.min((timestamp - lastTime) / 16.67, 2);
    lastTime = timestamp;

    ctx.clearRect(0, 0, 800, 300);

    drawBackground();
    update();
    draw();
    drawPlayer();

    scoreTimer += deltaTime * (speed / 6);
    if (scoreTimer >= 1) {
        scoreTimer = 0;
        score++;
        document.getElementById("score").innerText = score;
    }

    collect();

    if (hit()) {
        loseLife();
        if (lives <= 0) {
            return;
        }
    }

    frameId = requestAnimationFrame(loop);
}

// ============ START GAME ============
function startGame() {
    if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = null;
    }

    score = 0;
    lives = 3;
    qiEnergy = 0;
    qiShield = false;
    qiReserveCount = 0;
    attackCharges = 5;  // 🆕 Start with 5 attacks
    speed = 6;
    obstacles = [];
    herbs = [];
    qiItems = [];
    timer = 0;
    scoreTimer = 0;
    lastTime = 0;
    lastSpeedUpdate = 0;
    attackCooldown = 0;
    attackActive = false;
    energyWave = null;
    notificationTimer = 0;

    player.y = 170;
    player.v = 0;
    bgMove = 0;
    invincible = false;

    updateLives();
    updateQi();
    updateAttackCharges();

    document.getElementById("score").innerText = 0;
    document.getElementById("pause-btn").innerText = "⏸ Pause";

    let notif = document.getElementById("notification-msg");
    if (notif) {
        notif.style.opacity = 0;
        notif.style.transform = "translateY(-8px)";
        notif.classList.remove("show");
    }

    gameState = "PLAYING";
    requestAnimationFrame(loop);
}

// ============ STYLES ============
function addStyles() {
    let s = document.createElement("style");
    s.textContent = `
        .game-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 8px;
            padding: 10px 20px;
        }
        
        #lives-display {
            font-size: 2rem;
            font-weight: bold;
            min-width: 120px;
        }
        
        #attack-display {
            font-size: 1.3rem;
            font-weight: bold;
            min-width: 80px;
            text-align: center;
            color: #ff6b6b;
            text-shadow: 0 0 15px rgba(255, 107, 107, 0.3);
            letter-spacing: 2px;
        }
        
        #qi-display {
            font-size: 1.3rem;
            color: #00ffff;
            font-weight: bold;
            min-width: 160px;
            text-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
        }
        
        #notification-msg {
            font-size: 1.1rem;
            font-weight: bold;
            padding: 4px 18px;
            border-radius: 20px;
            background: rgba(0, 0, 0, 0.75);
            border: 1.5px solid #00ffff;
            box-shadow: 0 0 20px rgba(0,255,255,0.2);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            transition: all 0.4s ease;
            opacity: 0;
            transform: translateY(-8px);
            text-shadow: 0 0 15px currentColor;
            white-space: nowrap;
            min-width: 100px;
            text-align: center;
            color: #00ffff;
            margin: 0 5px;
            flex-shrink: 0;
        }
        
        #notification-msg.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        #notification-msg.qi { border-color: #00ffff; color: #00ffff; }
        #notification-msg.shield { border-color: #ffd700; color: #ffd700; }
        #notification-msg.life { border-color: #ff6b6b; color: #ff6b6b; }
        #notification-msg.speed { border-color: #ffd700; color: #ffd700; }
        #notification-msg.wave { border-color: #a29bfe; color: #a29bfe; }
        #notification-msg.destroy { border-color: #ffd700; color: #ffd700; }
        #notification-msg.error { border-color: #ff4757; color: #ff4757; }
        
        .game-controls {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 8px;
        }
        
        @media(max-width: 600px) {
            #lives-display { font-size: 1.5rem; min-width: 80px; }
            #attack-display { font-size: 1rem; min-width: 60px; }
            #qi-display { font-size: 1rem; min-width: 100px; }
            #notification-msg {
                font-size: 0.85rem;
                padding: 3px 12px;
                min-width: 70px;
            }
            .game-info { gap: 5px; padding: 8px 12px; }
        }
    `;
    document.head.appendChild(s);
}

// ============ EVENT LISTENERS ============
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
        lastTime = 0;
        requestAnimationFrame(loop);
    }
};

// ============ INIT ============
window.onload = () => {
    addStyles();
    createUI();

    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, 800, 300);

    ctx.fillStyle = "#ffd700";
    ctx.font = "36px Arial";
    ctx.textAlign = "center";
    ctx.shadowColor = "#ffd700";
    ctx.shadowBlur = 20;
    ctx.fillText("☯ Click Start Training ☯", 400, 150);
    ctx.shadowBlur = 0;
    ctx.textAlign = "start";
};
