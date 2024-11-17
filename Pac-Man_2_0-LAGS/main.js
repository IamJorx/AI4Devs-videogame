// Definición del mapa del laberinto
const MAZE_MAP = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 1],
    [1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1],
    [1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Posiciones iniciales
const INITIAL_POSITIONS = {
    pacman: { x: 7, y: 7 },
    blinky: { x: 7, y: 3 },
    pinky: { x: 6, y: 3 },
    inky: { x: 8, y: 3 },
    clyde: { x: 7, y: 5 }
};

// Primero definimos las escenas
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        // Título
        const title = this.add.text(this.game.config.width / 2, 150, 'PAC-MAN', {
            fontSize: '64px',
            fill: '#FFD700',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Texto de inicio
        const startText = this.add.text(this.game.config.width / 2, 300, 'Presiona ESPACIO para comenzar', {
            fontSize: '24px',
            fill: '#FFF',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Efecto de parpadeo
        this.tweens.add({
            targets: startText,
            alpha: 0,
            duration: 500,
            ease: 'Power2',
            yoyo: true,
            repeat: -1
        });

        // Detectar tecla de inicio
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('GameScene');
        });
    }
}

class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.finalScore = data.score || 0;
    }

    create() {
        // Texto de Game Over
        this.add.text(this.game.config.width / 2, 150, 'GAME OVER', {
            fontSize: '64px',
            fill: '#FF0000',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Mostrar puntuación final
        this.add.text(this.game.config.width / 2, 250, `Puntuación: ${this.finalScore}`, {
            fontSize: '32px',
            fill: '#FFF',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Texto para reiniciar
        const restartText = this.add.text(this.game.config.width / 2, 350, 'Presiona ESPACIO para jugar de nuevo', {
            fontSize: '24px',
            fill: '#FFF',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Efecto de parpadeo
        this.tweens.add({
            targets: restartText,
            alpha: 0,
            duration: 500,
            ease: 'Power2',
            yoyo: true,
            repeat: -1
        });

        // Detectar tecla para reiniciar
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('MenuScene');
        });
    }
}

// Modificar la clase GameScene para manejar vidas y game over
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.score = 0;
        this.lives = 3; // Añadir vidas
        this.powerMode = false;
        this.powerModeTime = 0;
        this.powerModeDuration = 7000;
        this.scoreText = null;
        this.livesText = null;
        
        this.POINTS = {
            DOT: 10,
            POWER_PELLET: 50,
            GHOST: 200
        };
    }

    preload() {
        // No necesitamos cargar sprites aquí ya que los tomaremos del CSS
    }

    create() {
        // Crear grupo de paredes
        this.walls = this.physics.add.staticGroup();
        
        // Crear el laberinto
        for (let y = 0; y < MAZE_MAP.length; y++) {
            for (let x = 0; x < MAZE_MAP[y].length; x++) {
                const cell = MAZE_MAP[y][x];
                if (cell === 1) {
                    // Crear una pared física usando un sprite invisible
                    const wall = this.add.rectangle(
                        x * 32 + 16, 
                        y * 32 + 16, 
                        32, 
                        32, 
                        0x2121ff
                    );
                    
                    // Convertir el rectángulo en un objeto físico
                    this.physics.world.enable(wall);
                    
                    // Agregar al grupo de paredes estáticas
                    this.walls.add(wall);
                    
                    // Hacer la pared inmóvil
                    const body = wall.body;
                    body.setImmovable(true);
                    body.moves = false;
                    
                } else if (cell === 2) {
                    // Crear punto
                    const dot = this.add.circle(
                        x * 32 + 16,
                        y * 32 + 16,
                        2,
                        0xFFFFFF
                    );
                } else if (cell === 3) {
                    // Crear power pellet
                    const powerPellet = this.add.circle(
                        x * 32 + 16,
                        y * 32 + 16,
                        6,
                        0xFFFFFF
                    );
                }
            }
        }

        // Crear un borde alrededor del laberinto
        const graphics = this.add.graphics();
        graphics.lineStyle(2, 0x2121ff, 1);
        graphics.strokeRect(0, 0, this.game.config.width, this.game.config.height);

        // Crear Pac-Man usando un sprite del DOM
        const pacmanElement = document.createElement('div');
        pacmanElement.className = 'sprite pacman frame1';
        document.getElementById('game').appendChild(pacmanElement);
        
        // Variables de control de movimiento
        this.pacmanPos = { 
            x: INITIAL_POSITIONS.pacman.x * 32, 
            y: INITIAL_POSITIONS.pacman.y * 32 
        };

        // Crear los fantasmas con posiciones iniciales
        this.ghosts = [];
        const ghostsConfig = [
            { className: 'ghost-blinky', position: { ...INITIAL_POSITIONS.blinky } },
            { className: 'ghost-pinky', position: { ...INITIAL_POSITIONS.pinky } },
            { className: 'ghost-inky', position: { ...INITIAL_POSITIONS.inky } },
            { className: 'ghost-clyde', position: { ...INITIAL_POSITIONS.clyde } }
        ];

        // Inicializar velocidades de los fantasmas
        this.ghostSpeed = 2;
        this.ghostStates = {
            CHASE: 'chase',
            SCATTER: 'scatter',
            FRIGHTENED: 'frightened'
        };

        // Configurar estados iniciales de los fantasmas con comportamientos específicos
        this.ghosts = ghostsConfig.map(ghostConfig => {
            return {
                element: document.createElement('div'),
                className: ghostConfig.className,
                position: {
                    x: ghostConfig.position.x,
                    y: ghostConfig.position.y
                },
                state: this.ghostStates.CHASE,
                target: { x: 0, y: 0 },
                direction: { x: 0, y: 0 },
                behavior: ghostConfig.className.split('-')[1], // blinky, pinky, inky, clyde
                previousMove: null,
                isVulnerable: false,
                wasEaten: false
            };
        });

        // Crear y posicionar los elementos DOM de los fantasmas
        this.ghosts.forEach(ghost => {
            ghost.element.className = `sprite ${ghost.className}`;
            document.getElementById('game').appendChild(ghost.element);
        });

        // Iniciar el movimiento de los fantasmas
        this.ghostMovementTimer = this.time.addEvent({
            delay: 50,  // Actualizar cada 50ms
            callback: this.updateGhostMovement,
            callbackScope: this,
            loop: true
        });

        // Posicionar Pac-Man y fantasmas
        this.updateSpritePositions();

        // Configurar controles
        this.cursors = this.input.keyboard.createCursorKeys();

        // Escalar el juego para que se vea mejor
        this.cameras.main.setZoom(1);

        // Crear texto de puntuación
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial'
        });
        this.scoreText.setDepth(1);

        // Añadir texto de vidas
        this.livesText = this.add.text(16, 50, 'Vidas: 3', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial'
        });
        this.livesText.setDepth(1);
    }

    updateGhostMovement() {
        this.ghosts.forEach(ghost => {
            if (ghost.state === this.ghostStates.CHASE) {
                // Calcular objetivo según el comportamiento específico
                const target = this.getGhostTarget(ghost);
                this.moveGhostTowardsTarget(ghost, target);
                
                // Verificar colisión con Pac-Man
                if (this.checkGhostCollision(ghost)) {
                    this.handlePacmanDeath();
                }
            }
        });
    }

    getGhostTarget(ghost) {
        const pacmanGridX = Math.floor(this.pacmanPos.x / 32);
        const pacmanGridY = Math.floor(this.pacmanPos.y / 32);
        
        switch (ghost.behavior) {
            case 'blinky':
                // Persigue directamente a Pac-Man
                return { x: pacmanGridX, y: pacmanGridY };
                
            case 'pinky':
                // Anticipa 4 casillas en la dirección de Pac-Man
                let targetX = pacmanGridX;
                let targetY = pacmanGridY;
                const pacmanElement = document.querySelector('.pacman');
                const rotation = pacmanElement.style.transform;
                
                if (rotation.includes('180')) { // izquierda
                    targetX -= 4;
                } else if (rotation.includes('0')) { // derecha
                    targetX += 4;
                } else if (rotation.includes('270')) { // arriba
                    targetY -= 4;
                } else if (rotation.includes('90')) { // abajo
                    targetY += 4;
                }
                return { x: targetX, y: targetY };
                
            case 'inky':
                // Combina posición de Pac-Man y Blinky
                const blinky = this.ghosts.find(g => g.behavior === 'blinky');
                if (blinky) {
                    const blinkyX = Math.floor(blinky.position.x);
                    const blinkyY = Math.floor(blinky.position.y);
                    return {
                        x: pacmanGridX + (pacmanGridX - blinkyX),
                        y: pacmanGridY + (pacmanGridY - blinkyY)
                    };
                }
                return { x: pacmanGridX, y: pacmanGridY };
                
            case 'clyde':
                // Movimiento aleatorio
                if (!ghost.previousMove || Math.random() < 0.1) {
                    const moves = this.getValidMoves(ghost.position.x, ghost.position.y);
                    ghost.previousMove = moves[Math.floor(Math.random() * moves.length)];
                }
                return {
                    x: ghost.position.x + ghost.previousMove.x,
                    y: ghost.position.y + ghost.previousMove.y
                };
        }
    }

    moveGhostTowardsTarget(ghost, target) {
        const moves = this.getValidMoves(ghost.position.x, ghost.position.y);
        const bestMove = this.getBestMove(moves, ghost.position.x, ghost.position.y, target.x, target.y);
        
        if (bestMove) {
            ghost.position.x += bestMove.x * this.ghostSpeed;
            ghost.position.y += bestMove.y * this.ghostSpeed;

            // Actualizar la dirección visual del fantasma
            if (bestMove.x < 0) ghost.element.style.transform = 'scaleX(-1)';
            else if (bestMove.x > 0) ghost.element.style.transform = 'scaleX(1)';
        }
    }

    checkGhostCollision(ghost) {
        const ghostX = ghost.position.x * 32;
        const ghostY = ghost.position.y * 32;
        const pacmanX = this.pacmanPos.x;
        const pacmanY = this.pacmanPos.y;
        
        const collisionDistance = 16;
        const distance = Math.sqrt(
            Math.pow(ghostX - pacmanX, 2) + 
            Math.pow(ghostY - pacmanY, 2)
        );
        
        if (distance < collisionDistance) {
            if (this.powerMode && ghost.isVulnerable) {
                // Comer fantasma
                this.eatGhost(ghost);
                return false;
            }
            return !ghost.wasEaten; // Solo colisión si el fantasma no ha sido comido
        }
        return false;
    }

    handlePacmanDeath() {
        this.lives--;
        this.livesText.setText(`Vidas: ${this.lives}`);

        if (this.lives <= 0) {
            // Game Over
            this.scene.start('GameOverScene', { score: this.score });
            return;
        }

        // Reiniciar posiciones
        this.pacmanPos = { 
            x: INITIAL_POSITIONS.pacman.x * 32, 
            y: INITIAL_POSITIONS.pacman.y * 32 
        };

        this.ghosts.forEach(ghost => {
            ghost.position = { ...INITIAL_POSITIONS[ghost.behavior] };
            ghost.wasEaten = false;
            ghost.isVulnerable = false;
            ghost.element.classList.remove('ghost-vulnerable');
            ghost.element.style.visibility = 'visible';
        });

        // Breve pausa antes de continuar
        this.scene.pause();
        setTimeout(() => {
            this.scene.resume();
        }, 1000);
    }

    updateSpritePositions() {
        // Actualizar posición de Pac-Man
        const pacmanElement = document.querySelector('.pacman');
        if (pacmanElement) {
            // Ajustamos la posición considerando el tamaño escalado
            pacmanElement.style.left = `${this.pacmanPos.x}px`;
            pacmanElement.style.top = `${this.pacmanPos.y}px`;
            // Aseguramos que el sprite esté por encima del laberinto
            pacmanElement.style.zIndex = '1';
        }

        // Actualizar posición de fantasmas
        this.ghosts.forEach(ghost => {
            if (ghost.element) {
                ghost.element.style.left = `${ghost.position.x * 32}px`;
                ghost.element.style.top = `${ghost.position.y * 32}px`;
                ghost.element.style.zIndex = '1';
            }
        });
    }

    update() {
        const SPEED = 4;
        let moved = false;

        // Manejo de movimiento
        if (this.cursors.left.isDown) {
            const nextX = this.pacmanPos.x - SPEED;
            const gridX = Math.floor(nextX / 32);
            const gridY = Math.floor(this.pacmanPos.y / 32);
            
            if (this.canMove(gridX, gridY)) {
                this.pacmanPos.x = nextX;
                moved = true;
                document.querySelector('.pacman').style.transform = 'rotate(180deg)';
            }
        }
        else if (this.cursors.right.isDown) {
            const nextX = this.pacmanPos.x + SPEED;
            const gridX = Math.floor(nextX / 32);
            const gridY = Math.floor(this.pacmanPos.y / 32);
            
            if (this.canMove(gridX, gridY)) {
                this.pacmanPos.x = nextX;
                moved = true;
                document.querySelector('.pacman').style.transform = 'rotate(0deg)';
            }
        }
        else if (this.cursors.up.isDown) {
            const nextY = this.pacmanPos.y - SPEED;
            const gridX = Math.floor(this.pacmanPos.x / 32);
            const gridY = Math.floor(nextY / 32);
            
            if (this.canMove(gridX, gridY)) {
                this.pacmanPos.y = nextY;
                moved = true;
                document.querySelector('.pacman').style.transform = 'rotate(270deg)';
            }
        }
        else if (this.cursors.down.isDown) {
            const nextY = this.pacmanPos.y + SPEED;
            const gridX = Math.floor(this.pacmanPos.x / 32);
            const gridY = Math.floor(nextY / 32);
            
            if (this.canMove(gridX, gridY)) {
                this.pacmanPos.y = nextY;
                moved = true;
                document.querySelector('.pacman').style.transform = 'rotate(90deg)';
            }
        }

        // Actualizar animación de Pac-Man
        if (moved) {
            const pacman = document.querySelector('.pacman');
            if (pacman) {
                // Alternar entre los frames de animación
                if (!pacman.classList.contains('frame2')) {
                    pacman.classList.remove('frame1', 'frame3');
                    pacman.classList.add('frame2');
                } else {
                    pacman.classList.remove('frame2');
                    pacman.classList.add(Math.random() > 0.5 ? 'frame1' : 'frame3');
                }
            }
        }

        // Actualizar posiciones de sprites
        this.updateSpritePositions();

        // Recolección de puntos
        const gridX = Math.floor(this.pacmanPos.x / 32);
        const gridY = Math.floor(this.pacmanPos.y / 32);
        this.collectItems(gridX, gridY);

        // Verificar si el power mode debe terminar
        if (this.powerMode && this.time.now - this.powerModeTime >= this.powerModeDuration) {
            this.deactivatePowerMode();
        }

        // Actualizar estado visual de los fantasmas vulnerables
        if (this.powerMode) {
            const timeLeft = (this.powerModeDuration - (this.time.now - this.powerModeTime)) / 1000;
            if (timeLeft < 2) {
                // Parpadeo cuando está por terminar el power mode
                this.ghosts.forEach(ghost => {
                    if (ghost.isVulnerable) {
                        ghost.element.style.opacity = Math.sin(this.time.now / 100) > 0 ? '1' : '0.5';
                    }
                });
            }
        }
    }

    // Función mejorada para verificar si puede moverse
    canMove(gridX, gridY) {
        // Verificar límites del mapa
        if (gridY < 0 || gridY >= MAZE_MAP.length || 
            gridX < 0 || gridX >= MAZE_MAP[0].length) {
            return false;
        }
        // Verificar si hay pared
        return MAZE_MAP[gridY][gridX] !== 1;
    }

    // Nueva función para recolectar items
    collectItems(gridX, gridY) {
        if (MAZE_MAP[gridY][gridX] === 2 || MAZE_MAP[gridY][gridX] === 3) {
            // Encontrar todos los elementos en la posición actual
            const items = this.children.list.filter(item => {
                const itemGridX = Math.floor(item.x / 32);
                const itemGridY = Math.floor(item.y / 32);
                return itemGridX === gridX && itemGridY === gridY &&
                       (item instanceof Phaser.GameObjects.Arc);
            });

            // Eliminar los items encontrados y actualizar puntuación
            items.forEach(item => {
                item.destroy();
                if (MAZE_MAP[gridY][gridX] === 2) {
                    // Punto normal
                    this.updateScore(this.POINTS.DOT);
                } else if (MAZE_MAP[gridY][gridX] === 3) {
                    // Power Pellet
                    this.updateScore(this.POINTS.POWER_PELLET);
                    this.activatePowerMode();
                }
            });

            // Actualizar el mapa
            MAZE_MAP[gridY][gridX] = 0;
        }
    }

    getValidMoves(x, y) {
        const gridX = Math.floor(x);
        const gridY = Math.floor(y);
        const possibleMoves = [
            { x: 0, y: -1 }, // arriba
            { x: 0, y: 1 },  // abajo
            { x: -1, y: 0 }, // izquierda
            { x: 1, y: 0 }   // derecha
        ];

        // Filtrar movimientos válidos (sin paredes)
        return possibleMoves.filter(move => {
            const newX = gridX + move.x;
            const newY = gridY + move.y;
            return this.canMove(newX, newY);
        });
    }

    getBestMove(moves, currentX, currentY, targetX, targetY) {
        let bestMove = null;
        let bestDistance = Infinity;

        moves.forEach(move => {
            const newX = Math.floor(currentX) + move.x;
            const newY = Math.floor(currentY) + move.y;
            const distance = this.getDistance(newX, newY, targetX, targetY);

            // Evitar que los fantasmas se queden atascados
            const isOppositeDirection = (
                (move.x === 1 && this.lastMove?.x === -1) ||
                (move.x === -1 && this.lastMove?.x === 1) ||
                (move.y === 1 && this.lastMove?.y === -1) ||
                (move.y === -1 && this.lastMove?.y === 1)
            );

            if (distance < bestDistance && !isOppositeDirection) {
                bestDistance = distance;
                bestMove = move;
            }
        });

        // Si no hay mejor movimiento, permitir el movimiento opuesto
        if (!bestMove && moves.length > 0) {
            bestMove = moves[0];
        }

        this.lastMove = bestMove;
        return bestMove;
    }

    getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    updateScore(points) {
        this.score += points;
        this.scoreText.setText(`Score: ${this.score}`);
    }

    activatePowerMode() {
        this.powerMode = true;
        this.powerModeTime = this.time.now;

        // Hacer vulnerables a los fantasmas
        this.ghosts.forEach(ghost => {
            if (!ghost.wasEaten) {
                ghost.isVulnerable = true;
                ghost.element.classList.add('ghost-vulnerable');
            }
        });

        // Programar el fin del power mode
        this.time.delayedCall(this.powerModeDuration, () => {
            this.deactivatePowerMode();
        });
    }

    deactivatePowerMode() {
        this.powerMode = false;
        
        // Restaurar fantasmas no comidos
        this.ghosts.forEach(ghost => {
            if (!ghost.wasEaten) {
                ghost.isVulnerable = false;
                ghost.element.classList.remove('ghost-vulnerable');
            }
        });
    }

    eatGhost(ghost) {
        ghost.wasEaten = true;
        ghost.isVulnerable = false;
        this.updateScore(this.POINTS.GHOST);
        
        // Ocultar temporalmente el fantasma
        ghost.element.style.visibility = 'hidden';
        
        // Restaurar el fantasma después de un tiempo
        this.time.delayedCall(3000, () => {
            this.respawnGhost(ghost);
        });
    }

    respawnGhost(ghost) {
        // Restaurar posición inicial
        ghost.position = { ...INITIAL_POSITIONS[ghost.behavior] };
        ghost.wasEaten = false;
        ghost.element.style.visibility = 'visible';
        ghost.element.classList.remove('ghost-vulnerable');
        
        // Verificar si aún está en power mode
        if (this.powerMode) {
            ghost.isVulnerable = true;
            ghost.element.classList.add('ghost-vulnerable');
        }
    }
}

// Actualizar la configuración del juego para incluir todas las escenas
const config = {
    type: Phaser.AUTO,
    width: 448,
    height: 496,
    backgroundColor: '#000000',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [MenuScene, GameScene, GameOverScene],
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

// Iniciar el juego
const game = new Phaser.Game(config); 