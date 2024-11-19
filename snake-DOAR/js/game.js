import { handleMovement } from './movement.js';
import { checkCollision } from './collision.js';
import { updateScore } from './score.js';

const canvas = document.getElementById('game-board');
const context = canvas.getContext('2d');

function gameLoop() {
    handleMovement(context);
    if (checkCollision()) {
        alert('¡Juego Terminado!');
        return;
    }
    updateScore();
    requestAnimationFrame(gameLoop);
}

gameLoop();
