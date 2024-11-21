// filepath: /Users/macbook/Documents/development/ia4devs/sessions/session_6/AI4Devs-videogame/smartyland-JLSO/src/scenes/GameScene.js
import { GAME_CONFIG } from '../utils/Constants.js';
import { HiddenObject } from '../objects/HiddenObject.js';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.currentLevel = 0;
        this.score = 0;
        this.timeLeft = 0;
        this.foundObjects = 0;
        this.hiddenObjects = [];
        this.objectsFound = 0;
    }

    create() {
        const levelConfig = GAME_CONFIG.LEVELS[this.currentLevel];
        this.timeLeft = levelConfig.timeLimit;
        
        // Create background
        this.add.image(0, 0, 'old-room')
            .setOrigin(0)
            .setDisplaySize(this.game.config.width, this.game.config.height);

        // Setup UI
        this.setupUI();
        
        // Setup timer
        this.timer = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        // Setup magnifying glass power-up
        this.setupMagnifyingGlass();

        // Create list of objects to find for level 1
        const objectsData = [
            { x: 200, y: 300, texture: 'candle' },
            { x: 500, y: 400, texture: 'feather' },
            { x: 700, y: 200, texture: 'hourglass' },
            { x: 900, y: 500, texture: 'pocket-watch' }
        ];

        // Create hidden objects
        objectsData.forEach(obj => {
            const hiddenObj = new HiddenObject(this, obj.x, obj.y, obj.texture);
            this.add.existing(hiddenObj);
            this.hiddenObjects.push(hiddenObj);
        });

        // Create object list UI
        this.createObjectList();
        
        // Initialize level
        this.initializeLevel();
    }

    setupUI() {
        // Score text
        this.scoreText = this.add.text(10, 10, `Score: ${this.score}`, {
            fontSize: '32px',
            fill: '#fff'
        });

        // Timer text
        this.timerText = this.add.text(10, 50, `Time: ${this.timeLeft}`, {
            fontSize: '32px',
            fill: '#fff'
        });

        // Hint button
        this.hintButton = this.add.image(this.game.config.width - 50, 50, 'hint-button')
            .setInteractive()
            .on('pointerdown', () => this.showHint()); // Changed to use arrow function
    }

    showHint() {
        // Randomly select a non-found object
        const nonFoundObjects = this.hiddenObjects.filter(obj => !obj.found);
        if (nonFoundObjects.length > 0) {
            const randomObject = Phaser.Math.RND.pick(nonFoundObjects);
            
            // Create highlight effect
            const highlight = this.add.circle(
                randomObject.x,
                randomObject.y,
                30,
                0xffff00,
                0.3
            );

            // Remove highlight after 1 second
            this.time.delayedCall(1000, () => {
                highlight.destroy();
            });
        }
    }

    getLevelBackground() {
        const backgrounds = ['messy-room', 'museum', 'dev-setup'];
        return backgrounds[this.currentLevel];
    }

    createObjectList() {
        const padding = 10;
        const listBg = this.add.rectangle(1080, 0, 200, 720, 0x000000, 0.7)
            .setOrigin(0);

        this.objectList = this.add.text(1090, padding, 'Objects to Find:', {
            fontSize: '24px',
            color: '#ffffff'
        });

        this.hiddenObjects.forEach((obj, index) => {
            this.add.text(1090, 50 + (index * 30), obj.texture.key, {
                fontSize: '20px',
                color: '#cccccc'
            });
        });
    }

    onObjectFound(object) {
        this.objectsFound++;
        // Update UI list
        const textItem = this.children.list.find(child => 
            child.type === 'Text' && child.text === object.texture.key
        );
        if (textItem) {
            textItem.setColor('#00ff00');
        }

        // Check if level complete
        if (this.objectsFound === this.hiddenObjects.length) {
            this.time.delayedCall(1000, () => {
                this.scene.start('MenuScene', { levelComplete: true });
            });
        }
    }

    initializeLevel() {
        const levelData = GAME_CONFIG.LEVELS[0]; // Using first level for now
        this.timeLeft = levelData.timeLimit;
        
        // Add timer text
        this.timerText = this.add.text(10, 10, `Time: ${this.timeLeft}`, {
            fontSize: '24px',
            color: '#ffffff'
        });

        // Start timer
        this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
    }

    updateTimer() {
        this.timeLeft--;
        this.timerText.setText(`Time: ${this.timeLeft}`);
        
        if (this.timeLeft <= 0) {
            this.scene.start('MenuScene', { gameOver: true });
        }
    }

    setupMagnifyingGlass() {
        // Magnifying glass power-up
        this.magnifyingGlassActive = false;
        this.magnifyingGlassCooldown = false;

        // Create magnifying glass button
        const magnifyingGlassBtn = this.add.text(this.game.config.width - 50, 100, '🔍', {
            fontSize: '32px'
        })
        .setOrigin(0.5)
        .setInteractive();

        magnifyingGlassBtn.on('pointerdown', () => {
            if (!this.magnifyingGlassActive && !this.magnifyingGlassCooldown) {
                this.activateMagnifyingGlass();
            }
        });
    }

    activateMagnifyingGlass() {
        this.magnifyingGlassActive = true;
        
        // Make all hidden objects slightly more visible
        this.hiddenObjects.forEach(obj => {
            if (!obj.found) {
                obj.setAlpha(0.8);
            }
        });

        // Reset after duration
        this.time.delayedCall(GAME_CONFIG.POWERUPS.MAGNIFYING_GLASS.duration, () => {
            this.hiddenObjects.forEach(obj => {
                if (!obj.found) {
                    obj.setAlpha(1);
                }
            });
            this.magnifyingGlassActive = false;
            this.magnifyingGlassCooldown = true;

            // Reset cooldown
            this.time.delayedCall(GAME_CONFIG.POWERUPS.MAGNIFYING_GLASS.cooldown, () => {
                this.magnifyingGlassCooldown = false;
            });
        });
    }

    // Add more methods as needed...
}