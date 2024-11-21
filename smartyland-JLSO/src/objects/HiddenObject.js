export class HiddenObject extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        
        this.setInteractive();
        this.found = false;
        this.setScale(0.5); // Adjust scale as needed
        
        this.on('pointerdown', this.onObjectClick, this);
        this.on('pointerover', this.onHover, this);
        this.on('pointerout', this.onHoverOut, this);
    }

    onObjectClick() {
        if (!this.found) {
            this.found = true;
            this.scene.onObjectFound(this);
            this.setTint(0x00ff00); // Green tint when found
        }
    }

    onHover() {
        if (!this.found) {
            this.setScale(0.55); // Slightly larger on hover
        }
    }

    onHoverOut() {
        if (!this.found) {
            this.setScale(0.5); // Return to normal size
        }
    }
}
