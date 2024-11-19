### **Prompts para crear el juego Pac-Man**


> La ultima es la vencida💪 👉realice 3 intentos,  cree tres proyectos los prompts que comparto corresponden al ultimo proyecto creado.
> Se me complico un poco inclusive apoyándome con ChatGPT para revisar si la forma en la que estaba preguntándole era la correcta.
> 
> **Conclusiones**:
> - Insisto se debe tener no solo el contexto funcional sino una mínima experticia técnica ya que nunca había trabajado con la técnica de los  sprite en los css y de por si siempre se me a dificultado el tema del diseño y los estilos. 
> - El juego le falta ajustarlo mas. 



#### 1. **Estructura del proyecto**

Prompt:
```
Crea una carpeta llamada `pacman-iniciales` que contenga:
- Un archivo `index.html` para estructurar el juego.
- Un archivo `style.css` para darle estilo al juego si es necesario.
- Un archivo `main.js` donde implementarás toda la lógica del juego utilizando el framework Phaser.
- Una subcarpeta `assets` donde se almacenarán los sprites proporcionados.

```

---

#### 2. **Configuración inicial del juego en Phaser**

Prompt:
```
Escribe el contenido del archivo `main.js` para iniciar un proyecto de Phaser con la siguiente configuración:
- Tamaño del lienzo: 800x600 píxeles.
- Fondo negro.
- Modo arcade para manejar la física.
- Crea una escena inicial (`Scene`) donde se carguen los sprites proporcionados, se definan los controles del teclado y el mapa del laberinto.

Ejemplo de respuesta esperada:
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    // Carga de sprites
    this.load.image('pacman', 'assets/pacman.png');
    this.load.image('ghost', 'assets/ghost.png');
    this.load.image('dot', 'assets/dot.png');
    this.load.image('powerPellet', 'assets/powerPellet.png');
    this.load.tilemapTiledJSON('map', 'assets/map.json'); // Opcional: para un mapa creado en Tiled
}

function create() {
    // Inicialización de objetos en la escena
}

function update() {
    // Lógica de juego
}

```


---

#### 3. **Cargar el laberinto y configurar los sprites**

Prompt:
```
Modifica el archivo `main.js` para:
1. Crear un mapa de laberinto utilizando una matriz bidimensional donde cada número represente un tipo de celda (0 = vacío, 1 = pared, 2 = punto, 3 = power pellet).
2. Renderizar el laberinto con gráficos básicos o utilizando un mapa Tiled JSON.
3. Posicionar los sprites de Pac-Man y los fantasmas en posiciones iniciales.

```

##### 3.1. **Iteración**
Prompt:
```
crea los personajes con base al sprite que te proporcione @spritesheet.png

```

##### 3.2. **Iteración**
Prompt:
```
necesito que por medio de css extraigas los personajes del sprits y desde alli lo pintes en el laberinto

```

---
#### 4. **Añadir movimiento y controles para Pac-Man**

Prompt:
```
Ajustar alguna de las dimensiones o posiciones específicas de los sprites en styles.css
Escribe el código necesario en `main.js` para que Pac-Man se mueva por el laberinto utilizando las teclas de flecha.
- Usa las físicas de Phaser para detectar colisiones entre Pac-Man y las paredes.
- Haz que Pac-Man pueda moverse libremente en los pasillos y detenerse al llegar a una pared.


```

4.1. **Iteración**
Prompt:
```
en consola esta generando este error  
main.js:23 Uncaught TypeError: Cannot read properties of null (reading 'style')  
at HTMLDocument.<anonymous> (main.js:23:10)
```

4.2. **Iteración**
Prompt:
```
Ten presente que las imagenes se estan tomando del css  
phaser.min.js:1 GET http://localhost:8000/assets/images/pacman-anim.png 404 (File not found) (anónimo) @ phaser.min.js:1 load @ phaser.min.js:1 (anónimo) @ phaser.min.js:1 each @ phaser.min.js:1 checkLoadQueue @ phaser.min.js:1 start @ phaser.min.js:1 bootScene @ phaser.min.js:1 start @ phaser.min.js:1 bootQueue @ phaser.min.js:1 (anónimo) @ phaser.min.js:1 texturesReady @ phaser.min.js:1 (anónimo) @ phaser.min.js:1 updatePending @ phaser.min.js:1 (anónimo) @ phaser.min.js:1 (anónimo) @ phaser.min.js:1 load addBase64 @ phaser.min.js:1 boot @ phaser.min.js:1 (anónimo) @ phaser.min.js:1 boot @ phaser.min.js:1 e @ phaser.min.js:1 phaser.min.js:1 GET http://localhost:8000/assets/images/wall.png 404 (File not found)
```

4.3. **Iteración**
Prompt:
```
no veo el laberinto 

💭 Adjuntos screenshot del juego
```

4.4. **Iteración**
Prompt:
```
esta generando este error main.js:60 Uncaught TypeError: wall.setImmovable is not a function  
at GameScene.create (main.js:60:26)  
at initialize.create (phaser.min.js:1:491015)  
at initialize.loadComplete (phaser.min.js:1:490466)  
at initialize.emit (phaser.min.js:1:7809)  
at initialize.loadComplete (phaser.min.js:1:944358)  
at initialize.fileProcessComplete (phaser.min.js:1:944058)  
at initialize.onProcessComplete (phaser.min.js:1:21253)  
at Image.<anonymous> (phaser.min.js:1:91778)
```

4.5. **Iteración**
Prompt:
```
los movimientos se ven bien pero no veo el pacman ni los fantasmas asegurate de estarlos tomando del css
```

4.6. **Iteración**
Prompt:
```
mira ahora esta generando este error  
main.js:135 Uncaught TypeError: Cannot read properties of undefined (reading 'x')  
at GameScene.updateSpritePositions (main.js:135:58)  
at GameScene.create (main.js:116:14)  
at initialize.create (phaser.min.js:1:491015)  
at initialize.bootScene (phaser.min.js:1:490336)  
at initialize.start (phaser.min.js:1:494019)  
at initialize.bootQueue (phaser.min.js:1:488688)  
at o.emit (phaser.min.js:1:8120)  
at initialize.texturesReady (phaser.min.js:1:792521)  
at initialize.emit (phaser.min.js:1:8120)  
at initialize.updatePending (phaser.min.js:1:498828)
```

---

#### 5. **Lógica de los fantasmas**

Prompt:
```
Implementa en `main.js` la lógica básica de movimiento de los fantasmas:
- Crea 4 fantasmas con comportamientos únicos:
    - Blinky: persigue directamente a Pac-Man.
    - Pinky: anticipa los movimientos de Pac-Man.
    - Inky: combina la posición de Pac-Man y Blinky.
    - Clyde: se mueve aleatoriamente.
- Añade detección de colisión entre los fantasmas y Pac-Man para determinar si el jugador pierde una vida.

```

5.1. **Iteración**
Prompt:
```
AUN NO SE VISUALIZA CORRECTAMENTE LOS PERSONAJES

💭 Adjuntos screenshot del juego
```

5.2. **Iteración**
Prompt:
```
Ajustame La imagen del spritesheet coincide con las dimensiones y posiciones especificadas en el CSS @spritesheet.png
```

5.3. **Iteración**
Prompt:
```
ajusta los frames o las imagenes acorde al tamaño en el laberinto, no se estan visualizando pareciera que la imagen es mas grande que su contenedor ajustalo para que se visualicen correctamente

💭 Adjuntos screenshot del juego
```

5.4. **Iteración**
Prompt:
```
los personajes no se visualizan bien sera que el tamaño no se esta ajustando al contenedor
```

5.5. **Iteración**
Prompt:
```
Ahora no veo animado los fantasmas no me siguen
```

5.6. **Iteración**
Prompt:
```
error en la consola del navegador  
main.js:230 Uncaught TypeError: this.getValidMoves is not a function  
at GameScene.moveGhostTowardsTarget (main.js:230:28)  
at main.js:166:22  
at Array.forEach (<anonymous>)  
at GameScene.updateGhostMovement (main.js:162:21)  
at initialize.update (phaser.min.js:1:1013884)  
at initialize.emit (phaser.min.js:1:8202)  
at initialize.step (phaser.min.js:1:225406)  
at initialize.update (phaser.min.js:1:490723)  
at initialize.step (phaser.min.js:1:793006)  
at initialize.step (phaser.min.js:1:433503)
```
---

#### 6. **Puntos, power pellets y sistema de puntuación**

Prompt:
```
Escribe en `main.js` la lógica para:
- Detectar cuando Pac-Man come puntos (bolitas pequeñas) y aumentar la puntuación.
- Detectar cuando Pac-Man come un power pellet y hacer que los fantasmas cambien de color a azul y puedan ser comidos.
- Aumentar el puntaje al comer fantasmas en modo vulnerable.
- Mostrar la puntuación en la pantalla durante el juego.

```

---

#### 7. **Pantalla de inicio y reinicio del juego**

Prompt:
```
Añade una escena inicial en el juego que:
- Muestre una pantalla de bienvenida con el título "Pac-Man".
- Permita al jugador iniciar el juego al presionar una tecla.
- Muestra una pantalla de "Game Over" cuando el jugador pierda todas las vidas.

```

---

#### 8. **Estilo y diseño**

Prompt:
```
Escribe el contenido del archivo `style.css` para:
- Centrar el lienzo del juego en la pantalla.
- Dar un estilo minimalista con fondo negro y texto en color amarillo para las pantallas de inicio y Game Over.

```

---