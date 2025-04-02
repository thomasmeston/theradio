import './styles.css';
import { images } from './assets.js';
import { GameEngine } from './game/GameEngine.js';
import { SceneManager } from './game/SceneManager';
import { ResourceDisplay } from './game/ui/ResourceDisplay';
import { RadioImage } from './game/ui/RadioImage';

// Debug log to check the image URL
console.log('Wood texture URL:', images.woodTexture);

// Create background container and overlay
const backgroundContainer = document.createElement('div');
backgroundContainer.className = 'background-container';

const overlay = document.createElement('div');
overlay.className = 'overlay';

// Create and load the image to verify it works
const testImage = new Image();
testImage.onload = () => {
    console.log('Wood texture loaded successfully');
    // Apply wood texture background to the container
    backgroundContainer.style.backgroundImage = `url("${images.woodTexture}")`;
    document.body.insertBefore(backgroundContainer, document.body.firstChild);
    document.body.insertBefore(overlay, document.body.firstChild.nextSibling);
};
testImage.onerror = (error) => {
    console.error('Failed to load wood texture:', error);
    document.body.style.backgroundColor = '#1a1a1a';
};
testImage.src = images.woodTexture;

class Game {
    constructor() {
        // Initialize game engine first
        this.gameEngine = new GameEngine();
        
        // Initialize scene manager
        this.sceneManager = new SceneManager(this.gameEngine);
        
        // Initialize UI components
        this.resourceDisplay = new ResourceDisplay(this.gameEngine);
        this.radioImage = new RadioImage(this.gameEngine);
        
        // Add initial day message
        this.gameEngine.addToLog('January 12, 1945 - Amazon Radio Outpost', 'system');
        
        // Initialize the game
        this.init();
    }

    init() {
        // Initialize game engine
        this.gameEngine.init();
        
        // Initialize scene manager
        this.sceneManager.initialize();
        
        // Set up event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Add any global event listeners here
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.togglePause();
            }
        });
    }

    togglePause() {
        // Implement pause functionality
        console.log('Game paused');
    }

    handleTransmission(data) {
        this.gameEngine.addMessage(
            `[${data.frequency}MHz] ${data.sender}: ${data.message}`,
            'transmission'
        );
    }

    handleFactionUpdate(data) {
        this.gameEngine.addMessage(
            `Faction Update: ${data.faction} - ${data.change}`,
            'faction'
        );
    }

    handleResourceUpdate(data) {
        this.gameEngine.addMessage(
            `Resource Update: ${data.resource} ${data.change > 0 ? '+' : ''}${data.change}`,
            'event'
        );
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.game = new Game();
}); 