class Player {
    constructor() {
        this.element = document.getElementById('player');
        this.x = 50;
        this.y = 200;
        this.speed = 5;
        this.isJumping = false;
        this.isSliding = false;
        this.setupControls();
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    this.moveLeft();
                    break;
                case 'ArrowRight':
                    this.moveRight();
                    break;
                case ' ':
                    this.jump();
                    break;
                case 's':
                case 'S':
                    this.slide();
                    break;
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.key === 's' || e.key === 'S') {
                this.stopSliding();
            }
        });
    }

    update(deltaTime) {
        this.element.style.left = `${this.x}px`;
        this.element.style.bottom = `${this.y}px`;
    }

    moveLeft() {
        if (this.x > 0) {
            this.x -= this.speed;
        }
    }

    moveRight() {
        if (this.x < window.innerWidth - 50) {
            this.x += this.speed;
        }
    }

    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.element.classList.add('jumping');
            
            setTimeout(() => {
                this.isJumping = false;
                this.element.classList.remove('jumping');
            }, 500);
        }
    }

    slide() {
        if (!this.isSliding) {
            this.isSliding = true;
            this.element.classList.add('sliding');
        }
    }

    stopSliding() {
        this.isSliding = false;
        this.element.classList.remove('sliding');
    }

    checkCollision(element) {
        const rect1 = this.element.getBoundingClientRect();
        const rect2 = element.getBoundingClientRect();

        return !(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom);
    }

    reset() {
        this.x = 50;
        this.y = 200;
        this.isJumping = false;
        this.isSliding = false;
        this.element.classList.remove('jumping', 'sliding');
        this.update(0);
    }
} 