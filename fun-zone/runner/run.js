<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>☯ Wudang Training</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
        }

        body {
            background: #0a0a0f;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            padding: 10px;
            margin: 0;
        }

        .game-wrapper {
            background: linear-gradient(145deg, #1a1a2e, #16213e);
            border-radius: 24px;
            padding: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 255, 255, 0.05);
            max-width: 850px;
            width: 100%;
        }

        canvas {
            display: block;
            width: 100%;
            height: auto;
            aspect-ratio: 800/300;
            border-radius: 16px;
            background: #111;
            box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.5);
            touch-action: none;
            cursor: pointer;
        }

        .game-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            gap: 10px;
            flex-wrap: wrap;
        }

        .game-title {
            color: #ffd700;
            font-size: 1.4rem;
            font-weight: bold;
            text-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
            letter-spacing: 1px;
        }

        .game-title span {
            color: #00ffff;
        }

        .game-controls {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        }

        .btn {
            padding: 8px 18px;
            border: none;
            border-radius: 12px;
            font-weight: bold;
            font-size: 0.85rem;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            letter-spacing: 0.5px;
            text-transform: uppercase;
            touch-action: manipulation;
            min-height: 44px;
            min-width: 44px;
        }

        .btn:active {
            transform: scale(0.92);
        }

        .btn-primary {
            background: linear-gradient(135deg, #ffd700, #f9a825);
            color: #1a1a2e;
            box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 25px rgba(255, 215, 0, 0.4);
        }

        .btn-danger {
            background: linear-gradient(135deg, #ff6b6b, #d63031);
            color: white;
            box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
        }

        .btn-danger:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 25px rgba(255, 107, 107, 0.4);
        }

        .btn-secondary {
            background: linear-gradient(135deg, #636e72, #2d3436);
            color: white;
            box-shadow: 0 4px 15px rgba(99, 110, 114, 0.3);
        }

        .btn-secondary:hover {
            transform: translateY(-2px);
        }

        .btn-info {
            background: linear-gradient(135deg, #00ffff, #00bcd4);
            color: #1a1a2e;
            box-shadow: 0 4px 15px rgba(0, 255, 255, 0.3);
        }

        .game-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 8px;
            margin-top: 12px;
            padding: 10px 15px;
            background: rgba(0, 0, 0, 0.4);
            border-radius: 16px;
            flex-wrap: wrap;
            min-height: 60px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .stat-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.9);
            padding: 4px 10px;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.05);
            white-space: nowrap;
        }

        .stat-item .label {
            font-size: 0.7rem;
            text-transform: uppercase;
            opacity: 0.6;
            letter-spacing: 0.5px;
        }

        .lives-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
            min-width: 100px;
        }

        #lives-display {
            font-size: 1.3rem;
            line-height: 1;
            letter-spacing: 1px;
        }

        #notification-msg {
            font-size: 0.6rem;
            font-weight: bold;
            padding: 2px 14px;
            border-radius: 20px;
            background: rgba(0, 0, 0, 0.8);
            border: 2px solid #00ffff;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.15);
            backdrop-filter: blur(8px);
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            opacity: 0;
            transform: scale(0.92) translateY(-4px);
            pointer-events: none;
            text-shadow: 0 0 10px currentColor;
            white-space: nowrap;
            text-align: center;
            color: #00ffff;
            min-width: 60px;
            max-width: 160px;
            height: 24px;
            line-height: 24px;
            overflow: visible;
        }

        #notification-msg.show {
            opacity: 1;
            transform: scale(1) translateY(0);
        }

        #notification-msg.shield { border-color: #00ffff; color: #00ffff; }
        #notification-msg.qi { border-color: #00ff88; color: #00ff88; }
        #notification-msg.life { border-color: #ff6b6b; color: #ff6b6b; }
        #notification-msg.speed { border-color: #ffd700; color: #ffd700; }
        #notification-msg.wave { border-color: #ff6bff; color: #ff6bff; }
        #notification-msg.destroy { border-color: #ffd700; color: #ffd700; }
        #notification-msg.error { border-color: #ff4444; color: #ff4444; }
        #notification-msg.attack { border-color: #ff6b6b; color: #ff6b6b; }

        .progress-bar {
            width: 100px;
            height: 6px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            overflow: hidden;
            position: relative;
        }

        .progress-bar .fill {
            height: 100%;
            border-radius: 4px;
            transition: width 0.3s ease;
            width: 0%;
        }

        .progress-bar .fill.qi-fill { background: linear-gradient(90deg, #00ffff, #00ff88); }
        .progress-bar .fill.shield-fill { background: linear-gradient(90deg, #ffd700, #ff6bff); }

        .mobile-controls {
            display: none;
            gap: 12px;
            margin-top: 12px;
            justify-content: center;
            flex-wrap: wrap;
        }

        .mobile-btn {
            padding: 14px 32px;
            border: none;
            border-radius: 16px;
            font-size: 1.4rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.15s ease;
            touch-action: manipulation;
            min-height: 60px;
            min-width: 80px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        .mobile-btn:active {
            transform: scale(0.92);
        }

        .mobile-btn.jump-btn {
            background: linear-gradient(135deg, #00b894, #00a381);
            color: white;
            box-shadow: 0 4px 20px rgba(0, 184, 148, 0.3);
        }

        .mobile-btn.attack-btn {
            background: linear-gradient(135deg, #ff6b6b, #d63031);
            color: white;
            box-shadow: 0 4px 20px rgba(255, 107, 107, 0.3);
        }

        @media (max-width: 700px) {
            .game-wrapper { padding: 12px; }
            .game-title { font-size: 1rem; }
            .game-info { gap: 4px; padding: 8px 10px; }
            .stat-item { font-size: 0.75rem; padding: 3px 6px; }
            .btn { padding: 6px 12px; font-size: 0.7rem; min-height: 36px; }
            #lives-display { font-size: 1rem; }
            .progress-bar { width: 60px; }
            .mobile-controls { display: flex !important; }
        }

        @media (max-width: 480px) {
            .game-title { font-size: 0.85rem; }
            .stat-item { font-size: 0.65rem; }
            .btn { font-size: 0.6rem; padding: 4px 10px; }
            #notification-msg { font-size: 0.5rem; height: 20px; line-height: 20px; }
            .mobile-btn { padding: 10px 20px; font-size: 1.1rem; min-height: 50px; min-width: 60px; }
        }

        @media (pointer: coarse) {
            .mobile-controls { display: flex !important; }
        }

        /* Scrollbar styling */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0f; }
        ::-webkit-scrollbar-thumb { background: #ffd700; border-radius: 4px; }
    </style>
</head>
<body>

    <div class="game-wrapper">
        <!-- Header -->
        <div class="game-header">
            <div class="game-title">
                ☯ Wudang <span>Training</span>
            </div>
            <div class="game-controls">
                <button class="btn btn-primary" id="start-btn">▶ Start</button>
                <button class="btn btn-secondary" id="pause-btn">⏸ Pause</button>
                <button class="btn btn-danger" id="restart-btn">↻ Restart</button>
            </div>
        </div>

        <!-- Canvas -->
        <canvas id="gameCanvas" width="800" height="300"></canvas>

        <!-- Game Info -->
        <div class="game-info">
            <!-- Left: Lives + Notification -->
            <div class="lives-container">
                <div id="lives-display">🧡💛💚</div>
                <div id="notification-msg"></div>
            </div>

            <!-- Stats -->
            <div class="stat-item">
                <span class="label">Score</span>
                <span id="score">0</span>
            </div>

            <div class="stat-item">
                <span class="label">⚡</span>
                <span id="speed-display">6.0</span>
            </div>

            <div class="stat-item">
                <span class="label">🗡️</span>
                <span id="attack-display">🗡️🗡️🗡️🗡️🗡️</span>
            </div>

            <div class="stat-item" style="flex-direction:column; gap:2px;">
                <span class="label">☯ Qi</span>
                <div class="progress-bar">
                    <div class="fill qi-fill" id="qi-bar" style="width:0%"></div>
                </div>
                <span id="qi-display" style="font-size:0.65rem;">0/100</span>
            </div>

            <div class="stat-item">
                <span class="label">🏆</span>
                <span id="high-score">0</span>
            </div>
        </div>

        <!-- Mobile Controls -->
        <div class="mobile-controls" id="mobile-controls">
            <button class="mobile-btn jump-btn" id="mobile-jump">⬆ Jump</button>
            <button class="mobile-btn attack-btn" id="mobile-attack">⚔️ Attack</button>
        </div>
    </div>

    <script>
        // ============================================================
        //  WUDANG TRAINING - Full Game
        //  All improvements implemented
        // ============================================================

        // --- Canvas Setup ---
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const W = 800,
            H = 300;

        // --- Constants ---
        const CONFIG = {
            QI_MAX: 100,
            QI_COLLECT: 20,
            SPEED_MIN: 6,
            SPEED_MAX: 14,
            ATTACK_DURATION: 30,
            ATTACK_COOLDOWN: 60,
            MAX_ATTACK_CHARGES: 5,
            SPAWN_BASE: 120,
            NOTIFICATION_DURATION: 90,
            INVINCIBLE_DURATION: 120,
        };

        const OBSTACLES = ['🗼', '🚓', '🚕', '🚛', '🚜', '🏎️', '🏍️', '🛵', '🚲', '🛴', '🚙'];

        // --- DOM Refs ---
        const $ = id => document.getElementById(id);
        const dom = {
            lives: $('lives-display'),
            notification: $('notification-msg'),
            score: $('score'),
            speed: $('speed-display'),
            attack: $('attack-display'),
            qi: $('qi-display'),
            qiBar: $('qi-bar'),
            highScore: $('high-score'),
            start: $('start-btn'),
            pause: $('pause-btn'),
            restart: $('restart-btn'),
            mobileJump: $('mobile-jump'),
            mobileAttack: $('mobile-attack'),
        };

        // --- Audio System ---
        class AudioSystem {
            constructor() {
                this.ctx = null;
                this.enabled = false;
                try {
                    this.ctx = new(window.AudioContext || window.webkitAudioContext)();
                    this.enabled = true;
                } catch (e) { /* no audio */ }
            }

            play(type) {
                if (!this.enabled || !this.ctx) return;
                try {
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    gain.gain.value = 0.08;

                    switch (type) {
                        case 'jump':
                            osc.frequency.setValueAtTime(400, this.ctx.currentTime);
                            osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.1);
                            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
                            osc.start(this.ctx.currentTime);
                            osc.stop(this.ctx.currentTime + 0.1);
                            break;
                        case 'attack':
                            osc.frequency.setValueAtTime(200, this.ctx.currentTime);
                            osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.15);
                            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
                            osc.start(this.ctx.currentTime);
                            osc.stop(this.ctx.currentTime + 0.15);
                            break;
                        case 'collect':
                            osc.frequency.setValueAtTime(600, this.ctx.currentTime);
                            osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.08);
                            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
                            osc.start(this.ctx.currentTime);
                            osc.stop(this.ctx.currentTime + 0.08);
                            break;
                        case 'hit':
                            osc.frequency.setValueAtTime(150, this.ctx.currentTime);
                            osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.2);
                            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
                            osc.start(this.ctx.currentTime);
                            osc.stop(this.ctx.currentTime + 0.2);
                            break;
                        case 'gameover':
                            osc.frequency.setValueAtTime(300, this.ctx.currentTime);
                            osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.5);
                            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);
                            osc.start(this.ctx.currentTime);
                            osc.stop(this.ctx.currentTime + 0.5);
                            break;
                    }
                } catch (e) { /* ignore */ }
            }
        }

        const audio = new AudioSystem();

        // --- Game State ---
        const state = {
            // Core
            status: 'READY', // READY | PLAYING | PAUSED | GAMEOVER
            score: 0,
            lives: 3,
            maxLives: 3,

            // Qi
            qiEnergy: 0,
            qiMax: CONFIG.QI_MAX,
            qiShield: false,
            qiReserveCount: 0,

            // Attack
            attackCharges: CONFIG.MAX_ATTACK_CHARGES,
            maxAttackCharges: CONFIG.MAX_ATTACK_CHARGES,
            attackActive: false,
            attackTimer: 0,
            attackCooldown: 0,
            energyWave: null,

            // Speed
            speed: CONFIG.SPEED_MIN,
            maxSpeed: CONFIG.SPEED_MAX,

            // Invincibility
            invincible: false,
            invincibleTimer: 0,

            // Timers
            bgMove: 0,
            timer: 0,
            scoreTimer: 0,
            lastTime: 0,
            lastSpeedUpdate: 0,
            notificationTimer: 0,

            // Player
            player: { x: 80, y: 170, w: 80, h: 80, v: 0 },

            // Arrays
            obstacles: [],
            herbs: [],
            qiItems: [],

            // High score
            highScore: 0,

            // Frame
            frameId: null,

            // Combo
            comboCount: 0,
            maxCombo: 0,
            comboDisplayTimer: 0,
        };

        // --- High Score Load ---
        try {
            state.highScore = parseInt(localStorage.getItem('wudangHighScore')) || 0;
        } catch (e) {
            state.highScore = 0;
        }

        // ============================================================
        //  UI UPDATES
        // ============================================================

        function updateUI() {
            updateLives();
            updateQi();
            updateAttackCharges();
            updateSpeedDisplay();
            updateScore();
            updateHighScore();
        }

        function updateLives() {
            const emojis = ['💔', '🧡', '🧡💛', '🧡💛💚'];
            const idx = Math.min(state.lives, 3);
            dom.lives.textContent = emojis[idx] || '💔';
        }

        function updateQi() {
            const pct = Math.min(100, (state.qiEnergy / state.qiMax) * 100);
            dom.qiBar.style.width = pct + '%';
            let txt = `${Math.floor(state.qiEnergy)}/${state.qiMax}`;
            if (state.qiShield) txt += ' 🛡️';
            if (state.qiReserveCount > 0) txt += ` ×${state.qiReserveCount}`;
            dom.qi.textContent = txt;
        }

        function updateAttackCharges() {
            let swords = '';
            for (let i = 0; i < state.attackCharges; i++) swords += '🗡️';
            dom.attack.textContent = swords || '⚠️';
        }

        function updateSpeedDisplay() {
            dom.speed.textContent = state.speed.toFixed(1);
        }

        function updateScore() {
            dom.score.textContent = state.score;
        }

        function updateHighScore() {
            dom.highScore.textContent = state.highScore;
        }

        // ============================================================
        //  NOTIFICATION SYSTEM
        // ============================================================

        function showNotification(msg, color = '#00ffff', duration = CONFIG.NOTIFICATION_DURATION) {
            const el = dom.notification;
            el.textContent = msg;
            el.style.color = color;
            el.style.borderColor = color;
            el.className = 'show';
            state.notificationTimer = duration;
            // Class-based styling
            if (msg.includes('Shield')) el.classList.add('shield');
            else if (msg.includes('Qi')) el.classList.add('qi');
            else if (msg.includes('Life') || msg.includes('Lost')) el.classList.add('life');
            else if (msg.includes('Speed')) el.classList.add('speed');
            else if (msg.includes('Wave')) el.classList.add('wave');
            else if (msg.includes('Destroyed')) el.classList.add('destroy');
            else if (msg.includes('⚠️') || msg.includes('No')) el.classList.add('error');
            else if (msg.includes('Attack')) el.classList.add('attack');
        }

        function updateNotification() {
            if (state.notificationTimer > 0 && state.status === 'PLAYING') {
                state.notificationTimer--;
                dom.notification.style.opacity = '1';
                dom.notification.style.transform = 'scale(1) translateY(0)';
            } else if (state.notificationTimer <= 0) {
                dom.notification.style.opacity = '0';
                dom.notification.style.transform = 'scale(0.92) translateY(-4px)';
                dom.notification.classList.remove('show');
            }
        }

        function clearNotification() {
            state.notificationTimer = 0;
            dom.notification.style.opacity = '0';
            dom.notification.style.transform = 'scale(0.92) translateY(-4px)';
            dom.notification.classList.remove('show');
            dom.notification.textContent = '';
        }

        // ============================================================
        //  QI SYSTEM
        // ============================================================

        function addQi(amount) {
            state.qiEnergy += amount;
            while (state.qiEnergy >= state.qiMax) {
                state.qiEnergy -= state.qiMax;
                if (!state.qiShield) {
                    state.qiShield = true;
                    showNotification('🛡️ Shield Active!', '#00ffff');
                    audio.play('collect');
                } else {
                    state.qiReserveCount++;
                    showNotification('📦 +1 Reserve', '#ffd700');
                    audio.play('collect');
                }
            }
            updateQi();
        }

        function useShield() {
            if (state.qiShield) {
                state.qiShield = false;
                state.invincible = true;
                state.invincibleTimer = CONFIG.INVINCIBLE_DURATION / 2;
                updateQi();
                showNotification('🛡️ Shield Used!', '#00ffff');
                return true;
            }
            if (state.qiReserveCount > 0) {
                state.qiReserveCount--;
                state.qiShield = true;
                state.invincible = true;
                state.invincibleTimer = CONFIG.INVINCIBLE_DURATION / 2;
                updateQi();
                showNotification('📦 Shield Activated!', '#ffd700');
                return true;
            }
            return false;
        }

        // ============================================================
        //  ATTACK SYSTEM
        // ============================================================

        function addAttackCharge() {
            if (state.attackCharges < state.maxAttackCharges) {
                state.attackCharges++;
                updateAttackCharges();
                showNotification('🗡️ +1 Attack!', '#ffd700');
                audio.play('collect');
            } else {
                showNotification('⚠️ Max Attacks!', '#ff6b6b');
            }
        }

        function useAttackCharge() {
            if (state.attackCharges <= 0) {
                showNotification('⚠️ No Attacks!', '#ff6b6b');
                return false;
            }
            state.attackCharges--;
            updateAttackCharges();
            return true;
        }

        function createEnergyWave() {
            const p = state.player;
            state.energyWave = {
                x: p.x + p.w,
                y: p.y + 15,
                w: 150,
                h: 45,
                speed: 12,
                active: true
            };
        }

        function updateEnergyWave() {
            const wave = state.energyWave;
            if (!wave || !wave.active) return;
            wave.x += wave.speed;

            // Check collisions with obstacles
            const obs = state.obstacles;
            for (let i = obs.length - 1; i >= 0; i--) {
                const o = obs[i];
                if (wave.x < o.x + o.w &&
                    wave.x + wave.w > o.x &&
                    wave.y < o.y + o.h &&
                    wave.y + wave.h > o.y) {
                    obs.splice(i, 1);
                    state.score += 100;
                    updateScore();
                    showNotification('💥 +100 Destroyed!', '#ffd700');
                    audio.play('collect');
                }
            }

            if (wave.x > 950) {
                wave.active = false;
            }
        }

        function drawEnergyWave() {
            const wave = state.energyWave;
            if (!wave || !wave.active) return;
            ctx.save();
            ctx.shadowColor = '#00ffff';
            ctx.shadowBlur = 40;
            const grad = ctx.createLinearGradient(wave.x, wave.y, wave.x + wave.w, wave.y + wave.h);
            grad.addColorStop(0, 'rgba(0,255,255,0.9)');
            grad.addColorStop(0.4, 'rgba(100,255,255,0.6)');
            grad.addColorStop(1, 'rgba(0,255,255,0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            const r = 20;
            ctx.moveTo(wave.x + r, wave.y);
            ctx.lineTo(wave.x + wave.w - r, wave.y);
            ctx.quadraticCurveTo(wave.x + wave.w, wave.y, wave.x + wave.w, wave.y + r);
            ctx.lineTo(wave.x + wave.w, wave.y + wave.h - r);
            ctx.quadraticCurveTo(wave.x + wave.w, wave.y + wave.h, wave.x + wave.w - r, wave.y + wave.h);
            ctx.lineTo(wave.x + r, wave.y + wave.h);
            ctx.quadraticCurveTo(wave.x, wave.y + wave.h, wave.x, wave.y + wave.h - r);
            ctx.lineTo(wave.x, wave.y + r);
            ctx.quadraticCurveTo(wave.x, wave.y, wave.x + r, wave.y);
            ctx.closePath();
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.font = '45px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 20;
            ctx.fillText('⚔️', wave.x + wave.w / 2, wave.y + 37);
            ctx.restore();
        }

        function performAttack() {
            if (state.status !== 'PLAYING') return;
            if (state.attackCooldown > 0) {
                showNotification('⏳ ' + Math.ceil(state.attackCooldown / 60) + 's', '#ff6b6b');
                return;
            }
            if (!useAttackCharge()) return;
            state.attackActive = true;
            state.attackTimer = CONFIG.ATTACK_DURATION;
            state.attackCooldown = CONFIG.ATTACK_COOLDOWN;
            createEnergyWave();
            showNotification('⚔️ Attack! (' + state.attackCharges + ' left)', '#00ffff');
            audio.play('attack');
        }

        // ============================================================
        //  SPEED SYSTEM
        // ============================================================

        function updateSpeed() {
            const newSpeed = CONFIG.SPEED_MIN + Math.floor(state.score / 300) * 0.5;
            if (newSpeed > state.speed) {
                state.speed = Math.min(newSpeed, CONFIG.SPEED_MAX);
                updateSpeedDisplay();
                showNotification('⚡ Speed: ' + state.speed.toFixed(1), '#ffd700');
                audio.play('collect');
            }
        }

        // ============================================================
        //  CREATE FUNCTIONS
        // ============================================================

        function createObstacle() {
            state.obstacles.push({
                x: 800,
                y: 205,
                w: 55,
                h: 55,
                e: OBSTACLES[Math.floor(Math.random() * OBSTACLES.length)]
            });
        }

        function createHerb() {
            state.herbs.push({
                x: 800,
                y: 130,
                w: 35,
                h: 35,
                collected: false
            });
        }

        function createQiItem() {
            state.qiItems.push({
                x: 800,
                y: 80 + Math.random() * 120,
                w: 35,
                h: 35,
                collected: false
            });
        }

        // ============================================================
        //  DRAW FUNCTIONS
        // ============================================================

        function drawBackground() {
            ctx.fillStyle = '#111';
            ctx.fillRect(0, 0, W, H);

            const p = state.bgMove % 800;
            ctx.font = '90px Arial';
            ctx.fillText('🏔️', 50 - p, 140);
            ctx.fillText('⛰️', 700 - p, 140);
            ctx.font = '100px Arial';
            ctx.fillText('🌳', 120 - p, 230);
            ctx.fillText('🌲', 580 - p, 230);
            ctx.font = '85px Arial';
            ctx.fillText('🏯', 330 - p, 190);
            ctx.font = '55px Arial';
            ctx.fillText('☁️', 500 - p, 110);
            ctx.font = '32px Arial';
            ctx.fillText('🛸', 500 + p, 110);

            state.bgMove += 0.5;
        }

        function drawPlayer() {
            const p = state.player;
            const blink = state.invincible && Math.floor(Date.now() / 150) % 2 === 0;
            ctx.globalAlpha = blink ? 0.4 : 1;

            let char = '🧚';
            if (state.qiShield) char = '🧚‍♀️';
            else if (state.qiEnergy > 70) char = '🧚‍♂️';
            else if (state.qiEnergy > 30) char = '🧚';

            // Glow effect
            if (state.qiShield) {
                ctx.shadowColor = '#00ffff';
                ctx.shadowBlur = 30;
            }
            ctx.font = '60px Arial';
            ctx.fillText(char, p.x, p.y + 60);
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;

            // Debug: show hitbox (remove in production)
            // ctx.strokeStyle = 'red';
            // ctx.lineWidth = 1;
            // ctx.strokeRect(p.x, p.y, p.w, p.h);
        }

        function drawObstacles() {
            state.obstacles.forEach(o => {
                ctx.font = '50px Arial';
                ctx.fillText(o.e, o.x, o.y + 50);
            });
        }

        function drawHerbs() {
            state.herbs.forEach(h => {
                ctx.font = '35px Arial';
                ctx.shadowColor = '#ffd700';
                ctx.shadowBlur = 15;
                ctx.fillText('✨', h.x, h.y + 30);
                ctx.shadowBlur = 0;
            });
        }

        function drawQiItems() {
            state.qiItems.forEach(q => {
                ctx.font = '35px Arial';
                ctx.shadowColor = '#00ffff';
                ctx.shadowBlur = 25;
                ctx.fillText('☯️', q.x, q.y + 30);
                ctx.shadowBlur = 0;
            });
        }

        function drawAttackButton() {
            if (state.status !== 'PLAYING') return;
            const bx = 680,
                by = 6,
                bw = 110,
                bh = 34;
            ctx.save();
            ctx.shadowColor = '#00ffff';
            ctx.shadowBlur = 15;

            let grad;
            if (state.attackCooldown > 0) {
                grad = ctx.createLinearGradient(bx, by, bx, by + bh);
                grad.addColorStop(0, '#2d3436');
                grad.addColorStop(1, '#1a1a2e');
            } else if (state.attackCharges <= 0) {
                grad = ctx.createLinearGradient(bx, by, bx, by + bh);
                grad.addColorStop(0, '#4a4a4a');
                grad.addColorStop(1, '#2d2d2d');
            } else {
                grad = ctx.createLinearGradient(bx, by, bx, by + bh);
                grad.addColorStop(0, '#e17055');
                grad.addColorStop(1, '#d63031');
            }
            ctx.fillStyle = grad;
            const r = 12;
            ctx.beginPath();
            ctx.moveTo(bx + r, by);
            ctx.lineTo(bx + bw - r, by);
            ctx.quadraticCurveTo(bx + bw, by, bx + bw, by + r);
            ctx.lineTo(bx + bw, by + bh - r);
            ctx.quadraticCurveTo(bx + bw, by + bh, bx + bw - r, by + bh);
            ctx.lineTo(bx + r, by + bh);
            ctx.quadraticCurveTo(bx, by + bh, bx, by + bh - r);
            ctx.lineTo(bx, by + r);
            ctx.quadraticCurveTo(bx, by, bx + r, by);
            ctx.closePath();
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.strokeStyle = state.attackCooldown > 0 ? '#ff6b6b' : state.attackCharges <= 0 ? '#636e72' : '#ff6b6b';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.font = 'bold 13px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            let text = '⚔️ Attack';
            let color = '#ffffff';
            if (state.attackCooldown > 0) {
                text = '⏳ ' + Math.ceil(state.attackCooldown / 60) + 's';
                color = '#ff6b6b';
            } else if (state.attackCharges <= 0) {
                text = '⚠️ No Attack';
                color = '#636e72';
            }
            ctx.fillStyle = color;
            ctx.shadowColor = color;
            ctx.shadowBlur = 10;
            ctx.fillText(text, bx + bw / 2, by + bh / 2 + 1);
            ctx.restore();
        }

        function drawPauseOverlay() {
            if (state.status !== 'PAUSED') return;
            ctx.fillStyle = 'rgba(0,0,0,0.75)';
            ctx.fillRect(0, 0, W, H);
            ctx.textAlign = 'center';
            ctx.font = '48px Arial';
            ctx.fillStyle = '#ffd700';
            ctx.shadowColor = '#ffd700';
            ctx.shadowBlur = 30;
            ctx.fillText('⏸ PAUSED', 400, 150);
            ctx.shadowBlur = 0;
            ctx.textAlign = 'start';
        }

        // ============================================================
        //  GAME LOGIC
        // ============================================================

        function update() {
            state.timer++;
            const spawnRate = Math.max(60, CONFIG.SPAWN_BASE - Math.floor(state.speed * 2));
            if (state.timer > spawnRate) {
                createObstacle();
                state.timer = 0;
            }
            if (Math.random() < 0.02) createHerb();
            if (Math.random() < 0.01 + state.speed * 0.001) createQiItem();

            // Move objects
            state.obstacles.forEach(o => o.x -= state.speed);
            state.herbs.forEach(h => h.x -= state.speed);
            state.qiItems.forEach(q => q.x -= state.speed);

            // Player physics
            const p = state.player;
            p.v += 0.8;
            p.y += p.v;
            if (p.y > 170) { p.y = 170;
                p.v = 0; }

            // Clean up off-screen
            state.obstacles = state.obstacles.filter(o => o.x + o.w > -20);
            state.herbs = state.herbs.filter(h => h.x + h.w > -20);
            state.qiItems = state.qiItems.filter(q => q.x + q.w > -20);

            // Invincibility timer
            if (state.invincible) {
                state.invincibleTimer--;
                if (state.invincibleTimer <= 0) state.invincible = false;
            }

            // Attack cooldown
            if (state.attackCooldown > 0) state.attackCooldown--;
            if (state.attackTimer > 0) state.attackTimer--;
            if (state.attackTimer <= 0) state.attackActive = false;

            updateEnergyWave();
            updateNotification();

            // Combo decay
            if (state.comboCount > 0 && state.comboDisplayTimer > 0) {
                state.comboDisplayTimer--;
                if (state.comboDisplayTimer === 0) {
                    state.comboCount = 0;
                }
            }
        }

        // ============================================================
        //  COLLISION & COLLECT
        // ============================================================

        function collectItems() {
            const p = state.player;

            // Herbs
            for (let i = state.herbs.length - 1; i >= 0; i--) {
                const h = state.herbs[i];
                if (p.x < h.x + h.w && p.x + p.w > h.x &&
                    p.y < h.y + h.h && p.y + p.h > h.y) {
                    state.herbs.splice(i, 1);
                    state.score += 50;
                    updateScore();
                    addAttackCharge();
                    // Combo
                    state.comboCount++;
                    state.comboDisplayTimer = 60;
                    if (state.comboCount > state.maxCombo) state.maxCombo = state.comboCount;
                    if (state.comboCount >= 5) {
                        showNotification('🔥 ' + state.comboCount + 'x Combo!', '#ffd700');
                    }
                    if (Math.floor(state.score / 300) > state.lastSpeedUpdate) {
                        state.lastSpeedUpdate = Math.floor(state.score / 300);
                        updateSpeed();
                    }
                    audio.play('collect');
                }
            }

            // Qi items
            for (let i = state.qiItems.length - 1; i >= 0; i--) {
                const q = state.qiItems[i];
                if (p.x < q.x + q.w && p.x + p.w > q.x &&
                    p.y < q.y + q.h && p.y + p.h > q.y) {
                    state.qiItems.splice(i, 1);
                    addQi(CONFIG.QI_COLLECT);
                    showNotification('☯ +' + CONFIG.QI_COLLECT + ' Qi', '#00ffff');
                    audio.play('collect');
                }
            }
        }

        function checkHit() {
            if (state.invincible) return false;
            const p = state.player;
            return state.obstacles.some(o =>
                p.x + 20 < o.x + o.w &&
                p.x + p.w - 20 > o.x &&
                p.y + 20 < o.y + o.h &&
                p.y + p.h > o.y
            );
        }

        function loseLife() {
            // Try shield first
            if (useShield()) return;

            // Then lose life
            state.lives--;
            updateLives();
            audio.play('hit');

            if (state.lives <= 0) {
                gameOver();
                return;
            }

            state.invincible = true;
            state.invincibleTimer = CONFIG.INVINCIBLE_DURATION;
            // Push obstacles away
            state.obstacles = state.obstacles.filter(o => o.x > 200);
            showNotification('💔 Life Lost!', '#ff0000');
        }

        // ============================================================
        //  GAME OVER
        // ============================================================

        function gameOver() {
            state.status = 'GAMEOVER';
            audio.play('gameover');

            if (state.score > state.highScore) {
                state.highScore = state.score;
                try {
                    localStorage.setItem('wudangHighScore', state.highScore);
                } catch (e) { /* ignore */ }
                updateHighScore();
            }

            if (state.frameId) {
                cancelAnimationFrame(state.frameId);
                state.frameId = null;
            }

            clearNotification();
            updateUI();

            // Draw game over screen
            ctx.fillStyle = 'rgba(0,0,0,0.85)';
            ctx.fillRect(0, 0, W, H);
            ctx.textAlign = 'center';
            ctx.fillStyle = '#ffd700';
            ctx.font = '50px Arial';
            ctx.shadowColor = '#ffd700';
            ctx.shadowBlur = 30;
            ctx.fillText('💀 GAME OVER 💀', 400, 120);
            ctx.shadowBlur = 0;
            ctx.fillStyle = 'white';
            ctx.font = '28px Arial';
            ctx.fillText('Score: ' + state.score, 400, 180);
            ctx.font = '32px Arial';
            ctx.fillText('Lives: ' + dom.lives.textContent, 400, 225);
            ctx.fillStyle = '#ff6b6b';
            ctx.font = '22px Arial';
            const attacks = state.attackCharges;
            let atxt = '⚔️ Attacks: ';
            for (let i = 0; i < attacks; i++) atxt += '🗡️';
            if (attacks === 0) atxt += '⚠️';
            ctx.fillText(atxt, 400, 270);
            ctx.fillStyle = '#ffd700';
            ctx.font = '20px Arial';
            ctx.fillText('⚡ Speed: ' + state.speed.toFixed(1), 400, 305);
            if (state.maxCombo > 0) {
                ctx.fillStyle = '#00ffff';
                ctx.font = '18px Arial';
                ctx.fillText('🔥 Max Combo: ' + state.maxCombo + 'x', 400, 340);
            }
            ctx.textAlign = 'start';

            dom.pause.textContent = '⏸ Pause';
        }

        // ============================================================
        //  MAIN LOOP
        // ============================================================

        function gameLoop(timestamp) {
            if (state.status !== 'PLAYING') return;

            if (state.lastTime === 0) state.lastTime = timestamp;
            const delta = Math.min((timestamp - state.lastTime) / 16.67, 2);
            state.lastTime = timestamp;

            // Clear and draw
            ctx.clearRect(0, 0, W, H);
            drawBackground();
            update();
            drawObstacles();
            drawHerbs();
            drawQiItems();
            drawEnergyWave();
            drawAttackButton();
            drawPlayer();
            drawPauseOverlay();

            // Score timer
            state.scoreTimer += delta * (state.speed / CONFIG.SPEED_MIN);
            if (state.scoreTimer >= 1) {
                state.scoreTimer = 0;
                state.score++;
                updateScore();
                // Speed check
                if (Math.floor(state.score / 300) > state.lastSpeedUpdate) {
                    state.lastSpeedUpdate = Math.floor(state.score / 300);
                    updateSpeed();
                }
            }

            collectItems();
            if (checkHit()) {
                loseLife();
                if (state.status === 'GAMEOVER') return;
            }

            state.frameId = requestAnimationFrame(gameLoop);
        }

        // ============================================================
        //  START / RESTART
        // ============================================================

        function resetGame() {
            if (state.frameId) {
                cancelAnimationFrame(state.frameId);
                state.frameId = null;
            }

            state.score = 0;
            state.lives = 3;
            state.qiEnergy = 0;
            state.qiShield = false;
            state.qiReserveCount = 0;
            state.attackCharges = CONFIG.MAX_ATTACK_CHARGES;
            state.speed = CONFIG.SPEED_MIN;
            state.obstacles = [];
            state.herbs = [];
            state.qiItems = [];
            state.timer = 0;
            state.scoreTimer = 0;
            state.lastTime = 0;
            state.lastSpeedUpdate = 0;
            state.attackCooldown = 0;
            state.attackActive = false;
            state.energyWave = null;
            state.notificationTimer = 0;
            state.player.y = 170;
            state.player.v = 0;
            state.bgMove = 0;
            state.invincible = false;
            state.comboCount = 0;
            state.maxCombo = 0;
            state.comboDisplayTimer = 0;

            updateUI();
            clearNotification();
            dom.pause.textContent = '⏸ Pause';
            state.status = 'PLAYING';
            state.lastTime = 0;
            state.frameId = requestAnimationFrame(gameLoop);
        }

        function startGame() {
            resetGame();
        }

        // ============================================================
        //  PAUSE / RESUME
        // ============================================================

        function togglePause() {
            if (state.status === 'PLAYING') {
                state.status = 'PAUSED';
                dom.pause.textContent = '▶ Resume';
                if (state.frameId) {
                    cancelAnimationFrame(state.frameId);
                    state.frameId = null;
                }
                // Draw pause overlay immediately
                ctx.fillStyle = 'rgba(0,0,0,0.75)';
                ctx.fillRect(0, 0, W, H);
                ctx.textAlign = 'center';
                ctx.font = '48px Arial';
                ctx.fillStyle = '#ffd700';
                ctx.shadowColor = '#ffd700';
                ctx.shadowBlur = 30;
                ctx.fillText('⏸ PAUSED', 400, 150);
                ctx.shadowBlur = 0;
                ctx.textAlign = 'start';
            } else if (state.status === 'PAUSED') {
                state.status = 'PLAYING';
                dom.pause.textContent = '⏸ Pause';
                state.lastTime = 0;
                state.frameId = requestAnimationFrame(gameLoop);
            }
        }

        // ============================================================
        //  INPUT HANDLING
        // ============================================================

        function jump() {
            if (state.status !== 'PLAYING') return;
            const p = state.player;
            if (p.y === 170) {
                p.v = -14;
                audio.play('jump');
            }
        }

        // Keyboard
        document.addEventListener('keydown', e => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (state.status === 'PLAYING') jump();
            }
            if ((e.code === 'KeyA' || e.code === 'KeyZ') && state.status === 'PLAYING') {
                e.preventDefault();
                performAttack();
            }
            if (e.code === 'KeyP' || e.code === 'Escape') {
                e.preventDefault();
                if (state.status === 'PLAYING' || state.status === 'PAUSED') {
                    togglePause();
                }
            }
        });

        // Canvas click/touch
        canvas.addEventListener('click', (e) => {
            if (state.status !== 'PLAYING') return;
            const rect = canvas.getBoundingClientRect();
            const scaleX = W / rect.width;
            const scaleY = H / rect.height;
            const x = (e.clientX - rect.left) * scaleX;
            const y = (e.clientY - rect.top) * scaleY;

            // Attack button area
            if (x >= 670 && x <= 790 && y >= 5 && y <= 45) {
                performAttack();
                return;
            }
            jump();
        });

        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (state.status !== 'PLAYING') return;
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            const scaleX = W / rect.width;
            const scaleY = H / rect.height;
            const x = (touch.clientX - rect.left) * scaleX;
            const y = (touch.clientY - rect.top) * scaleY;

            if (x >= 670 && x <= 790 && y >= 5 && y <= 45) {
                performAttack();
                return;
            }
            jump();
        }, { passive: false });

        // Mobile buttons
        dom.mobileJump.addEventListener('click', (e) => {
            e.preventDefault();
            jump();
        });

        dom.mobileJump.addEventListener('touchstart', (e) => {
            e.preventDefault();
            jump();
        }, { passive: false });

        dom.mobileAttack.addEventListener('click', (e) => {
            e.preventDefault();
            performAttack();
        });

        dom.mobileAttack.addEventListener('touchstart', (e) => {
            e.preventDefault();
            performAttack();
        }, { passive: false });

        // ============================================================
        //  BUTTON EVENTS
        // ============================================================

        dom.start.addEventListener('click', startGame);
        dom.restart.addEventListener('click', startGame);
        dom.pause.addEventListener('click', togglePause);

        // ============================================================
        //  INIT
        // ============================================================

        // Draw initial state
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#ffd700';
        ctx.font = '36px Arial';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 20;
        ctx.fillText('☯ Click Start Training ☯', 400, 150);
        ctx.shadowBlur = 0;
        ctx.textAlign = 'start';

        updateUI();
        console.log('☯ Wudang Training ready!');
        console.log('📱 Mobile controls available');
        console.log('⌨️  Space=Jump | A/Z=Attack | P/Escape=Pause');
    </script>
</body>
</html>
