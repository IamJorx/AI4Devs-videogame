let score = 0;

export function updateScore() {
    score++;
    document.getElementById('score-display').innerText = `Puntuación: ${score}`;
}
