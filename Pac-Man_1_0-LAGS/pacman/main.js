// Define la escena PreloadScene
class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    console.log('Iniciando carga de recursos...');

    // Cargar el sprite sheet con el tamaño exacto de los sprites
    this.load.spritesheet('pacman-sprites', 'assets/images/pacman-sprite.png', {
      frameWidth: 32,    // Ajustado al tamaño real del sprite
      frameHeight: 32,   // Los sprites son más grandes en la imagen
      spacing: 0,
      margin: 0
    });

    // Crear barra de progreso
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const loadingText = this.add.text(width / 2, height / 2 - 50, 'Cargando...', {
      font: '20px monospace',
      fill: '#ffffff'
    });
    loadingText.setOrigin(0.5, 0.5);

    this.load.on('complete', () => {
      console.log('Carga completada');
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();

      const startText = this.add.text(
        width / 2,
        height / 2,
        'Click para comenzar',
        {
          font: '32px monospace',
          fill: '#ffffff'
        }
      ).setOrigin(0.5);

      startText.setInteractive();
      startText.on('pointerdown', () => {
        console.log('Iniciando juego...');
        this.scene.start('GameScene');
      });
    });
  }

  create() {
    // Crear animación de Pac-Man usando los frames grandes amarillos
    this.anims.create({
      key: 'pacman-chomp',
      frames: [
        { key: 'pacman-sprites', frame: 0 },  // Pac-Man cerrado
        { key: 'pacman-sprites', frame: 1 },  // Pac-Man medio abierto
        { key: 'pacman-sprites', frame: 2 },  // Pac-Man abierto
      ],
      frameRate: 10,
      repeat: -1
    });

    // Crear animaciones para los fantasmas
    const ghostConfigs = {
      'blinky': {  // Fantasma rojo
        frames: [6, 7],
        tint: 0xff0000
      },
      'pinky': {   // Fantasma rosa
        frames: [8, 9],
        tint: 0xff69b4
      },
      'inky': {    // Fantasma cyan
        frames: [10, 11],
        tint: 0x00ffff
      },
      'clyde': {   // Fantasma naranja
        frames: [12, 13],
        tint: 0xffa500
      }
    };

    // Crear las animaciones de los fantasmas
    Object.entries(ghostConfigs).forEach(([ghost, config]) => {
      this.anims.create({
        key: `ghost-${ghost}`,
        frames: [
          { key: 'pacman-sprites', frame: config.frames[0] },
          { key: 'pacman-sprites', frame: config.frames[1] }
        ],
        frameRate: 5,
        repeat: -1
      });
    });
  }
}

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.sounds = {};
    this.tileSize = 30;
    this.offsetX = 0;
    this.offsetY = 0;
    this.speed = 150;
  }

  create() {
    // Crear un laberinto más grande
    const maze = [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,0,1,1,1,1,1,0,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,0,1,0,1,0,1,0,1,1,0,1],
      [1,0,0,0,0,1,0,1,0,1,0,0,0,0,1],
      [1,1,1,1,0,1,1,1,1,1,0,1,1,1,1],
      [1,1,1,1,0,1,0,0,0,1,0,1,1,1,1],
      [1,1,1,1,0,1,0,1,0,1,0,1,1,1,1],
      [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
      [1,1,1,1,0,1,0,1,0,1,0,1,1,1,1],
      [1,1,1,1,0,1,0,0,0,1,0,1,1,1,1],
      [1,1,1,1,0,1,1,1,1,1,0,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,1,1,0,1,1,1,1,1,0,1,1,0,1],
      [1,0,0,1,0,0,0,0,0,0,0,1,0,0,1],
      [1,1,0,1,0,1,0,1,0,1,0,1,0,1,1],
      [1,0,0,0,0,1,0,1,0,1,0,0,0,0,1],
      [1,0,1,1,1,1,0,1,0,1,1,1,1,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];

    // Calcular offsets
    this.offsetX = (this.sys.game.config.width - maze[0].length * this.tileSize) / 2;
    this.offsetY = (this.sys.game.config.height - maze.length * this.tileSize) / 2;

    // Crear las paredes con colisiones más pequeñas
    this.walls = this.physics.add.staticGroup();

    maze.forEach((row, y) => {
      row.forEach((cell, x) => {
        const posX = this.offsetX + x * this.tileSize + this.tileSize/2;
        const posY = this.offsetY + y * this.tileSize + this.tileSize/2;

        if (cell === 1) {
          const wall = this.walls.create(posX, posY, null);
          wall.setSize(this.tileSize - 4, this.tileSize - 4);
          const wallGraphics = this.add.rectangle(posX, posY, this.tileSize - 2, this.tileSize - 2, 0x0000ff);
        } else if (cell === 0) {
          const dot = this.add.circle(posX, posY, 3, 0xffffff);
        }
      });
    });

    // Crear Pac-Man
    const pacmanStartX = this.offsetX + 1 * this.tileSize + this.tileSize/2;
    const pacmanStartY = this.offsetY + 1 * this.tileSize + this.tileSize/2;
    
    this.pacman = this.physics.add.sprite(pacmanStartX, pacmanStartY, 'pacman-sprites', 0);
    this.pacman.setScale(this.tileSize/32);
    this.pacman.play('pacman-chomp');
    this.pacman.setCollideWorldBounds(true);
    
    const hitboxSize = this.tileSize - 8;
    this.pacman.body.setSize(hitboxSize, hitboxSize);
    this.pacman.body.setOffset(
      (this.pacman.width - hitboxSize) / 2,
      (this.pacman.height - hitboxSize) / 2
    );

    // Crear fantasmas
    this.ghosts = this.physics.add.group();
    const ghostConfigs = [
      { type: 'blinky', startFrame: 6, color: 0xff0000 },   // Rojo
      { type: 'pinky', startFrame: 8, color: 0xff69b4 },    // Rosa
      { type: 'inky', startFrame: 10, color: 0x00ffff },    // Cyan
      { type: 'clyde', startFrame: 12, color: 0xffa500 }    // Naranja
    ];

    const ghostStartPositions = [
      {x: 7, y: 7},
      {x: 7, y: 8},
      {x: 8, y: 7},
      {x: 8, y: 8}
    ];

    ghostConfigs.forEach((config, index) => {
      const ghost = this.ghosts.create(
        this.offsetX + ghostStartPositions[index].x * this.tileSize + this.tileSize/2,
        this.offsetY + ghostStartPositions[index].y * this.tileSize + this.tileSize/2,
        'pacman-sprites',
        config.startFrame
      );
      ghost.setScale(this.tileSize/32);
      ghost.play(`ghost-${config.type}`);
      ghost.setTint(config.color);
      ghost.type = config.type;
    });

    // Configurar colisiones
    this.physics.add.collider(this.pacman, this.walls);
    this.physics.add.collider(this.ghosts, this.walls);
    this.physics.add.overlap(this.pacman, this.ghosts, this.handleCollision, null, this);

    // Configurar controles
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // Sistema de movimiento simplificado
    let velocityX = 0;
    let velocityY = 0;

    // Detectar teclas presionadas
    if (this.cursors.left.isDown) {
      velocityX = -this.speed;
      this.pacman.setAngle(180);
    } else if (this.cursors.right.isDown) {
      velocityX = this.speed;
      this.pacman.setAngle(0);
    }

    if (this.cursors.up.isDown) {
      velocityY = -this.speed;
      this.pacman.setAngle(270);
    } else if (this.cursors.down.isDown) {
      velocityY = this.speed;
      this.pacman.setAngle(90);
    }

    // Aplicar velocidad
    this.pacman.setVelocity(velocityX, velocityY);

    // Si hay movimiento diagonal, normalizar la velocidad
    if (velocityX !== 0 && velocityY !== 0) {
      const normalizedSpeed = this.speed / Math.sqrt(2);
      this.pacman.setVelocity(
        velocityX > 0 ? normalizedSpeed : -normalizedSpeed,
        velocityY > 0 ? normalizedSpeed : -normalizedSpeed
      );
    }

    // Movimiento de los fantasmas
    this.ghosts.getChildren().forEach((ghost, index) => {
      if (index === 0) { // Blinky
        this.physics.moveToObject(ghost, this.pacman, 100);
      } else if (index === 1) { // Pinky
        const targetX = this.pacman.x + (this.pacman.body.velocity.x * 4);
        const targetY = this.pacman.y + (this.pacman.body.velocity.y * 4);
        this.physics.moveTo(ghost, targetX, targetY, 90);
      } else { // Inky y Clyde
        if (Phaser.Math.Between(0, 100) < 2) {
          ghost.setVelocity(
            Phaser.Math.Between(-100, 100),
            Phaser.Math.Between(-100, 100)
          );
        }
      }
    });
  }

  handleCollision(pacman, ghost) {
    this.scene.restart();
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 800,
  backgroundColor: '#000000',
  physics: {
    default: 'arcade',
    arcade: { 
      debug: false, // Cambiado a false para una mejor visualización
      gravity: { y: 0 }
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [PreloadScene, GameScene]
};

const game = new Phaser.Game(config);
