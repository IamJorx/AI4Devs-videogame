class ObstacleManager {
    constructor() {
        this.obstacles = [];
        this.cans = [];
        this.lastSpawnTime = 0;
        this.spawnInterval = 2000;
    }

    update(deltaTime) {
        // Generar nuevos obstáculos y latas
        this.spawnObstacles();
        
        // Mover obstáculos
        this.obstacles.forEach((obstacle, index) => {
            obstacle.element.style.left = 
                (parseFloat(obstacle.element.style.left) - 5) + 'px';
            
            // Eliminar obstáculos fuera de pantalla
            if (parseFloat(obstacle.element.style.left) < -50) {
                obstacle.element.remove();
                this.obstacles.splice(index, 1);
            }
        });

        // Mover latas
        this.cans.forEach((can, index) => {
            can.element.style.left = 
                (parseFloat(can.element.style.left) - 5) + 'px';
            
            // Eliminar latas fuera de pantalla
            if (parseFloat(can.element.style.left) < -30) {
                can.element.remove();
                this.cans.splice(index, 1);
            }
        });
    }

    spawnObstacles() {
        const currentTime = Date.now();
        if (currentTime - this.lastSpawnTime > this.spawnInterval) {
            if (Math.random() < 0.7) {
                const obstacle = new Obstacle();
                this.obstacles.push(obstacle);
            } else {
                const can = new Can();
                this.cans.push(can);
            }
            this.lastSpawnTime = currentTime;
        }
    }

    reset() {
        // Limpiar todos los obstáculos y latas
        this.obstacles.forEach(obstacle => obstacle.element.remove());
        this.cans.forEach(can => can.element.remove());
        this.obstacles = [];
        this.cans = [];
        this.lastSpawnTime = 0;
    }

    getObstacles() {
        return this.obstacles;
    }

    getCans() {
        return this.cans;
    }
}

class Obstacle {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'obstacle';
        this.element.style.left = `${window.innerWidth}px`;
        document.getElementById('obstacles-container').appendChild(this.element);
    }
}

class Can {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'can';
        this.element.style.left = `${window.innerWidth}px`;
        document.getElementById('cans-container').appendChild(this.element);
    }
} 