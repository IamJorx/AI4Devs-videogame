## Proceso de investigación - Chat GPT
```
quiero hacer un video juego, que me ayude a mejorar mi atención y entrar mas fácil en estado de focus. cual experto crees que me podría ayudar a entender cuales estrategias son mas eficientes para mejorar la atención y entrar en estado de focus
```

```
Eres un experto Neurocientífico y psicólogo cognitivo, dime cuales son las mejores estrategias para mejorar la concentración y entrar en estado de focus con mas facilidad
```

```
Ahora eres un experto desarrollador de videojuegos, utilizas javascript y haces videojuegos que funcionan en el navegador.

usas las mejores practicas de usabilidad y tienes conocimiento sobre las mejores técnicas de ui/ux y de coneptos avanzados sobre dinámicas de videojuegos, teniendo en cuenta la base de conocimiento de los problemas mas comunes al crear videojuegos.

vamos a crear un videojuego que nos ayude a mejorar la atención y entrenar el entrar en estado de focus, para ello hablamos con un experto neurocientífico y psicólogo conductivo y nos sugirió el siguiente enfoque para basarnos en la creación de nuestro videojuego:

1. Técnicas Basadas en Neuroplasticidad

	•	Entrenamiento de atención selectiva: Diseña tareas que requieran filtrar distracciones y enfocar en estímulos específicos (e.g., encontrar un objeto en un entorno complejo).
	•	Ejercicios de memoria de trabajo: Actividades que impliquen mantener y manipular información en la mente, como recordar una secuencia de elementos.
	•	Incremento progresivo de dificultad: Aumentar el desafío gradualmente ayuda a reforzar conexiones neuronales sin provocar frustración.

Antes de comenzar, dime si entendiste lo que vamos a hacer

```

```
dame una lista de las 3 mejores posibles opciones de videojuegos que podemos crear dado las instrucciones anteriores
```

## Implementación - github copilot(GPT-4o y Claude 3.5 Sonnet)
```
Quiero implementar este videojuego en javascript, quiero que me asesores en algunos aspectos como: librería para hacer videojuegos con javascript, y donde puedo conseguir las imágenes necesarias para el videojuego. La idea del video juego es las siguiente:
1. Juego de Búsqueda en un Entorno Complejo

Mecánica: El jugador debe encontrar objetos específicos en un entorno visualmente complejo y lleno de distracciones. A medida que avanzan, los entornos se vuelven más detallados y dinámicos, introduciendo más objetos que no son relevantes para la tarea, lo que obliga al jugador a concentrarse en los elementos correctos.
	•	Entrenamiento de atención selectiva: El jugador debe filtrar distracciones visuales y enfocar su atención en los objetos clave.
	•	Progresión de dificultad: A medida que se avanza, los objetos relevantes se mezclan más con los irrelevantes, y el tiempo para encontrar el objeto se reduce.
	•	Diseño: Utiliza entornos variados y colores que cambien según la complejidad del nivel, asegurando que el desafío aumente sin ser frustrante.
```

```
Eres un desarrollador de videojuegos experimentado. tienes total conocimiento de la librería [phaser](https://phaser.io/), y haces videojuegos para navegadores, con javascript. tu tarea es crear el siguiente videojuego llamado smartyland, es un videojuego estilo hidden objects. 

## Juego de Búsqueda en un Entorno Complejo

Mecánica: El jugador debe encontrar objetos específicos en un entorno visualmente complejo y lleno de distracciones. A medida que avanzan, los entornos se vuelven más detallados y dinámicos, introduciendo más objetos que no son relevantes para la tarea, lo que obliga al jugador a concentrarse en los elementos correctos.
	•	Entrenamiento de atención selectiva: El jugador debe filtrar distracciones visuales y enfocar su atención en los objetos clave.
	•	Progresión de dificultad: A medida que se avanza, los objetos relevantes se mezclan más con los irrelevantes, y el tiempo para encontrar el objeto se reduce.
	•	Diseño: Utiliza entornos variados y colores que cambien según la complejidad del nivel, asegurando que el desafío aumente sin ser frustrante.

### Epecificaciones:
	1.	Estilo visual:
		estilo realista
	2.	Entornos (para los fondos):
		cuarto desordenado, museo, setup de un desarrollador de software
	3.	Objetos para camuflar:
		libros, tazas, herramientas, juguetes, sombrillas, lamparas, figuras de 	acción, cables, esculturas etc.
	4.	Paleta de colores:
		tiene que inspirar un poco de misterio, usa una paleta de colores utilizada en el cine para películas de misterio 

### Tareas:
1. Construye la estructura base del proyecto, con algunos archivos y código base para el videojuego. proporciona los shell scripts necesarios para la creación de la estructura de carpetas(asegurate de que existe un archivo principal llamado index.html). El proyecto va a estar alojado en la ruta ./smartyland-JLSO
2. Has las preguntas necesesarias sobre lo que necesites saber para continuar con la creación del videojuego
```

```
1. Would you like me to implement a specific level progression system? (e.g., 3 levels with increasing difficulty, or a more dynamic system?) -> yes, 3 levels whith increasing difficulty
2. Do you want to include a scoring system? If so, what should be the scoring criteria? (time-based, accuracy-based, or both?) -> yes, impelement scoring system, base on elements finded and the time taken to finded them
3. Should we implement a hint system to help players when they're stuck? -> yes
4. Do you want to include sound effects and background music? -> yes, mistery music
5. Should we implement a time limit for each level? -> yes
6. Would you like to include any power-ups or special abilities? (e.g., magnifying glass, highlight all objects for 3 seconds, etc.) -> yes, magnifying glass
```

```

these are the next steps:

1. We need to create the hidden objects system
2. Implement the magnifying glass power-up functionality
3. Create the menu scene
4. Add scoring system
5. Implement hint system

Would you like me to continue with any of these specific implementations? Also, you'll need to provide or specify:

A list of specific objects to hide in each level
UI assets (buttons, icons, etc.)
Background images for each level
Sound effects and background music

lets start with the first step: create the hidden objects systems
the necessary images ara in this paths ./src/images/backgrounds and ./src/images/objects.

we are going to create only one level in this phase
```
