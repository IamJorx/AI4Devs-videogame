Create a web-based puzzle game inspired by the classic **Rush Hour** game. Players must navigate a gridlocked parking lot by moving cars and trucks to clear the path for a designated vehicle to exit the grid. The game should be engaging, visually appealing, and intuitive, presented as a single-screen experience.

**Key Features:**

1. **Gameplay Mechanics:**
   - The game grid is a rectangular matrix (e.g., 6x6) with vehicles of varying lengths (1x2 for cars, 1x3 for trucks).
   - Vehicles can only move in their designated direction: horizontally or vertically.
   - The goal is to clear the path for the main vehicle (e.g., the red car) to exit the grid.

2. **Single-Screen Design:**
   - The game will have only one screen, which displays the current level.
   - The screen will include:
     - The game grid with movable vehicles.
     - A score tracker based on how quickly the player completes levels.
     - A counter showing how many levels the player has completed in a row.
     - A "Give Up" button that resets all progress and score while providing a new level.

3. **User Interface and Design:**
   - A visually appealing grid layout with movable vehicles.
   - Highlight the exit point and main vehicle.
   - Use animations to make vehicle movement smooth and satisfying.
   - Include sound effects for vehicle movement and success notification when a level is completed.

4. **Game Controls:**
   - Click and drag (or touch and drag on mobile) vehicles to move them.
   - Include a "Give Up" button for players who want to skip the current level at the cost of their progress.

5. **Scoring System:**
   - Track the time taken to complete each level and calculate the score such that faster completion results in a higher score.
   - Keep a streak counter to show how many levels the player completes consecutively.
   - Reset all progress and score if the player clicks "Give Up."

6. **Platform Compatibility:**
   - Ensure the game runs seamlessly on modern web browsers (Chrome, Firefox, Safari, Edge).
   - Make it responsive for both desktop and mobile devices.

**Technical Requirements:**

1. **Technology Stack:**
   - Use Phaser.js as the gaming framework to simplify development and manage the game interface and logic.
   - Write modular and maintainable JavaScript code using best practices, leveraging the gaming framework to handle game logic and interactivity.

3. **Data Management:**
   - Use a single JSON file to store and define level configurations.
   - Ensure all levels are possible to complete by implementing validation checks during level creation.
   - Allow easy addition of new levels by editing the JSON file.

5. **Testing:**
   - Implement automated tests to verify that all levels are solvable before they are made available to players.
   - Test the game on multiple browsers and devices to ensure compatibility.
   - Include unit tests for core functionality such as vehicle movement, scoring, and level completion.
   - Conduct usability testing to collect feedback from beta testers and refine the gameplay experience.

**Deliverables:**
1. A fully functional web game hosted on a live server.
2. A single HTML file containing the game interface.
4. A single JavaScript file for game logic, including validation and interaction handling.
5. A single JSON file defining level configurations, all validated to be solvable.
6. Automated testing suite to ensure functionality and level solvability.

