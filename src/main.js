import { GameEngine } from './game/GameEngine.js';

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the game engine
    const game = new GameEngine();
    
    // Start the game
    game.initialize();
    
    // Handle window resize events
    window.addEventListener('resize', () => {
        game.handleResize();
    });
    
    // Prevent context menu on right click
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
}); 