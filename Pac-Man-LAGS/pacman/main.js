function update() {
    // Verificar si el juego está en estado 'playing'
    if (gameState !== 'playing') return;

    // Velocidad constante
    const speed = 160;

    // Manejar el movimiento con las teclas
    if (cursors.left.isDown) {
        player.setVelocityX(-speed);
        player.setVelocityY(0);
        player.angle = 180;
        if (!this.sounds.chomp.isPlaying) {
            this.sounds.chomp.play({ loop: true });
        }
    } 
    else if (cursors.right.isDown) {
        player.setVelocityX(speed);
        player.setVelocityY(0);
        player.angle = 0;
        if (!this.sounds.chomp.isPlaying) {
            this.sounds.chomp.play({ loop: true });
        }
    }
    else if (cursors.up.isDown) {
        player.setVelocityX(0);
        player.setVelocityY(-speed);
        player.angle = -90;
        if (!this.sounds.chomp.isPlaying) {
            this.sounds.chomp.play({ loop: true });
        }
    }
    else if (cursors.down.isDown) {
        player.setVelocityX(0);
        player.setVelocityY(speed);
        player.angle = 90;
        if (!this.sounds.chomp.isPlaying) {
            this.sounds.chomp.play({ loop: true });
        }
    }
    else {
        // Detener a Pac-Man si no hay teclas presionadas
        player.setVelocity(0);
        if (this.sounds.chomp.isPlaying) {
            this.sounds.chomp.stop();
        }
    }

    // Actualizar fantasmas si existen
    if (ghosts.length > 0) {
        ghosts.forEach(ghost => ghost.update());
    }
} 