class ScreenManager {
    constructor() {
        this.screens = {
            start: document.getElementById('start-screen'),
            game: document.getElementById('game-screen'),
            pause: document.getElementById('pause-screen'),
            gameOver: document.getElementById('gameover-screen')
        };
        
        this.buttons = {
            start: document.getElementById('start-button'),
            resume: document.getElementById('resume-button'),
            restart: document.getElementById('restart-button'),
            retry: document.getElementById('retry-button')
        };

        this.scoreElements = {
            score: document.getElementById('score'),
            cans: document.getElementById('cans'),
            level: document.getElementById('level'),
            finalScore: document.getElementById('final-score'),
            finalCans: document.getElementById('final-cans')
        };

        this.bindEvents();
    }

    bindEvents() {
        this.buttons.start.addEventListener('click', () => this.showScreen('game'));
        this.buttons.resume.addEventListener('click', () => this.showScreen('game'));
        this.buttons.restart.addEventListener('click', () => this.restartGame());
        this.buttons.retry.addEventListener('click', () => this.restartGame());
    }

    showScreen(screenName) {
        Object.values(this.screens).forEach(screen => {
            screen.classList.add('hidden');
        });
        this.screens[screenName].classList.remove('hidden');
    }

    updateScore(score, cans, level) {
        this.scoreElements.score.textContent = score;
        this.scoreElements.cans.textContent = cans;
        this.scoreElements.level.textContent = level;
    }

    showGameOver(score, cans) {
        this.scoreElements.finalScore.textContent = score;
        this.scoreElements.finalCans.textContent = cans;
        this.showScreen('gameOver');
    }

    restartGame() {
        // Esta función será implementada en game.js
        window.game.restart();
    }
} 