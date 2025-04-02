import { GameEngine } from './game/GameEngine.js';

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize the game engine
        const game = new GameEngine();
        
        // Start the game
        if (typeof game.init === 'function') {
            game.init();
        } else {
            console.error('Game initialization failed: init method not found');
        }
        
        // Handle window resize events
        window.addEventListener('resize', () => {
            game.handleResize();
        });
        
        // Prevent context menu on right click
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    } catch (error) {
        console.error('Error initializing game:', error);
    }
}); 