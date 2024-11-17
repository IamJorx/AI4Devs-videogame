class Game {
    constructor() {
        // Inicializar las pantallas primero
        this.startScreen = document.getElementById('start-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.pauseScreen = document.getElementById('pause-screen');
        this.gameoverScreen = document.getElementById('gameover-screen');

        // Asegurarse de que la pantalla de inicio sea visible y las demás ocultas
        this.startScreen.classList.remove('hidden');
        this.gameScreen.classList.add('hidden');
        this.pauseScreen.classList.add('hidden');
        this.gameoverScreen.classList.add('hidden');

        // Inicializar el resto de componentes
        this.player = new Player();
        this.obstacleManager = new ObstacleManager();
        this.score = 0;
        this.cansCollected = 0;
        this.level = 1;
        this.isRunning = false;
        this.lastTime = 0;
        
        // Inicializar los elementos del DOM
        this.scoreElement = document.getElementById('score');
        this.cansElement = document.getElementById('cans');
        this.levelElement = document.getElementById('level');

        // Configurar los event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Botón de inicio
        const startButton = document.getElementById('start-button');
        if (startButton) {
            startButton.addEventListener('click', () => this.start());
        }

        // Botón de pausa
        const resumeButton = document.getElementById('resume-button');
        if (resumeButton) {
            resumeButton.addEventListener('click', () => this.resume());
        }

        // Botón de reinicio
        const restartButton = document.getElementById('restart-button');
        if (restartButton) {
            restartButton.addEventListener('click', () => this.restart());
        }

        // Botón de reintentar
        const retryButton = document.getElementById('retry-button');
        if (retryButton) {
            retryButton.addEventListener('click', () => this.restart());
        }

        // Tecla de pausa (ESC)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isRunning) {
                this.pause();
            }
        });
    }

    start() {
        console.log('Iniciando juego...'); // Debug
        this.isRunning = true;
        this.startScreen.classList.add('hidden');
        this.gameScreen.classList.remove('hidden');
        this.lastTime = performance.now();
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    pause() {
        this.isRunning = false;
        this.pauseScreen.classList.remove('hidden');
    }

    resume() {
        this.isRunning = true;
        this.pauseScreen.classList.add('hidden');
        this.lastTime = performance.now();
        this.gameLoop(this.lastTime);
    }

    gameOver() {
        this.isRunning = false;
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('final-cans').textContent = this.cansCollected;
        this.gameoverScreen.classList.remove('hidden');
    }

    restart() {
        // Ocultar todas las pantallas excepto la de juego
        this.startScreen.classList.add('hidden');
        this.pauseScreen.classList.add('hidden');
        this.gameoverScreen.classList.add('hidden');
        this.gameScreen.classList.remove('hidden');

        // Reiniciar variables
        this.score = 0;
        this.cansCollected = 0;
        this.level = 1;
        
        // Actualizar UI
        this.updateScore();
        
        // Reiniciar obstáculos y jugador
        this.obstacleManager.reset();
        this.player.reset();

        // Iniciar el juego
        this.start();
    }

    gameLoop(currentTime) {
        if (!this.isRunning) return;

        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // Debug
        console.log('Game loop running...');

        // Actualizar obstáculos
        this.obstacleManager.update(deltaTime);

        // Actualizar jugador
        this.player.update(deltaTime);

        // Comprobar colisiones
        this.checkCollisions();

        // Actualizar puntuación
        this.updateScore();

        requestAnimationFrame((time) => this.gameLoop(time));
    }

    checkCollisions() {
        // Comprobar colisiones con obstáculos
        const obstacles = this.obstacleManager.getObstacles();
        for (const obstacle of obstacles) {
            if (this.player.checkCollision(obstacle.element)) {
                this.gameOver();
                return;
            }
        }

        // Comprobar colisiones con latas
        const cans = this.obstacleManager.getCans();
        for (let i = cans.length - 1; i >= 0; i--) {
            if (this.player.checkCollision(cans[i].element)) {
                cans[i].element.remove();
                cans.splice(i, 1);
                this.cansCollected++;
                this.score += 100;
            }
        }
    }

    updateScore() {
        this.scoreElement.textContent = this.score;
        this.cansElement.textContent = this.cansCollected;
        this.levelElement.textContent = this.level;
    }
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, inicializando juego...'); // Debug
    window.game = new Game(); // Hacer el juego accesible globalmente para debug
}); 