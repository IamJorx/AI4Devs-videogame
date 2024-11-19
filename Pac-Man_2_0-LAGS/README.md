# Pac-Man 🎮

Este proyecto es una implementación básica del clásico juego Pac-Man utilizando el framework Phaser. El objetivo es recrear la experiencia de juego original con algunas adaptaciones modernas.

## Requisitos 🛠️

- Un navegador web moderno (se recomienda Google Chrome o Firefox).
- Un servidor local para servir los archivos (puedes usar extensiones como "Live Server" en VSCode).

## Estructura del Proyecto 📁

- `index.html`: Archivo principal que carga el juego.
- `style.css`: Archivo de estilos para el juego.
- `main.js`: Lógica del juego implementada con Phaser.
- `assets/`: Carpeta que contiene los sprites necesarios para el juego.

## Instrucciones de Ejecución 🚀

1. **Clona este repositorio** en tu máquina local:
   ```bash
   git clone https://github.com/tu-usuario/pacman-iniciales.git
   ```

2. **Navega al directorio del proyecto**:
   ```bash
   cd pacman-iniciales
   ```

3. **Inicia un servidor local**. Si estás usando Visual Studio Code, puedes instalar la extensión "Live Server" y hacer clic en "Go Live" en la parte inferior derecha. Alternativamente, puedes usar Python para iniciar un servidor simple:
   ```bash
   # Para Python 3.x
   python -m http.server
   ```

4. **Abre tu navegador web** y ve a `http://localhost:8000` (o el puerto que tu servidor local esté usando).

5. **Asegúrate de que todos los archivos estén en sus ubicaciones correctas**, especialmente los sprites en la carpeta `assets`.

## Cómo Jugar 🎲

- Usa las teclas de flecha para mover a Pac-Man por el laberinto.
- El objetivo es comer todos los puntos (bolitas pequeñas) y power pellets (bolitas grandes) mientras evitas a los fantasmas.
- Comer un power pellet hará que los fantasmas se vuelvan vulnerables por un tiempo limitado, permitiéndote comerlos para obtener puntos adicionales.
- El juego termina cuando pierdes todas tus vidas.

## Controles 🎮

- **Flecha Izquierda**: Mover a Pac-Man a la izquierda.
- **Flecha Derecha**: Mover a Pac-Man a la derecha.
- **Flecha Arriba**: Mover a Pac-Man hacia arriba.
- **Flecha Abajo**: Mover a Pac-Man hacia abajo.

## Créditos 🙌

Este proyecto fue desarrollado como parte del ejercicio "Videojuego" del programa AI4Devs, que prepara a los desarrolladores para utilizar herramientas de IA en su trabajo diario. La entrega incluyó la creación y documentación de un videojuego con Phaser, siguiendo las directrices del repositorio [AI4Devs-videogame](https://github.com/LIDR-academy/AI4Devs-videogame).

¡Gracias a AI4Devs por esta experiencia de aprendizaje! 🚀

## Notas 📝

- Asegúrate de que las imágenes y sprites estén correctamente referenciados en el CSS y que el servidor local esté configurado para servir los archivos estáticos.
- Si encuentras algún error, revisa la consola del navegador para obtener más detalles.

¡Disfruta del juego! 🎉
